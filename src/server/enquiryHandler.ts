/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { insertLeadRecord, checkSupabaseHealth } from './supabase';

export interface EnquiryPayload {
  fullName: string;
  businessName: string;
  email: string;
  phoneOrWhatsApp: string;
  requiredService: string;
  businessGoal: string;
  additionalMessage?: string;
  marketingOptIn?: boolean;
  agreeToEnquiryProcessing: boolean;
  website_hp?: string; // Honeypot field (must be empty)
  formLoadedAt?: number; // Timestamp when form rendered on client
}

// In-Memory Rate Limiting: IP -> array of submission timestamps
interface RateLimitEntry {
  timestamps: number[];
}
const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// In-Memory Duplicate Detection: SHA-256 Hash -> { timestamp, referenceId }
interface DuplicateEntry {
  timestamp: number;
  referenceId: string;
}
const duplicateStore = new Map<string, DuplicateEntry>();
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// Clean up expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (entry.timestamps.length === 0) {
      rateLimitStore.delete(ip);
    }
  }
  for (const [key, entry] of duplicateStore.entries()) {
    if (now - entry.timestamp > DUPLICATE_WINDOW_MS) {
      duplicateStore.delete(key);
    }
  }
}, 60 * 1000);

// Single-line sanitizer: strips HTML, escapes entities, and removes CRLF to prevent SMTP header injection
function sanitizeSingleLine(str: unknown, maxLen = 150): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\r\n\0]/g, ' ') // Strip CRLF & null bytes to prevent SMTP header injection
    .replace(/<[^>]*>/g, '')   // Strip HTML tags
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case "'": return '&#39;';
        case '"': return '&quot;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim()
    .slice(0, maxLen);
}

// Multiline sanitizer: strips HTML, escapes entities, normalizes newlines, enforces max length
function sanitizeMultiline(str: unknown, maxLen = 2000): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\0/g, '')        // Strip null bytes
    .replace(/<[^>]*>/g, '')   // Strip HTML tags
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case "'": return '&#39;';
        case '"': return '&quot;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim()
    .slice(0, maxLen);
}

// Masking helpers to ensure zero plaintext PII in server logs
function maskEmail(emailStr: string): string {
  const [local, domain] = emailStr.split('@');
  if (!domain) return '***@***.***';
  const maskedLocal = local.length > 2 ? `${local[0]}***${local[local.length - 1]}` : '***';
  return `${maskedLocal}@${domain}`;
}

function maskPhone(phoneStr: string): string {
  if (phoneStr.length < 5) return '***';
  return `***${phoneStr.slice(-4)}`;
}

function maskName(nameStr: string): string {
  const parts = nameStr.split(' ');
  return parts.map((p) => (p.length > 1 ? `${p[0]}***` : '*')).join(' ');
}

// RFC-compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function handleEnquirySubmission(req: Request, res: Response): Promise<void> {
  // Use trusted req.ip (configured with app.set('trust proxy', 1))
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

  // 1. SPAM PREVENTION: Honeypot check
  const honeypot = req.body.website_hp;
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    console.warn(`[SPAM BLOCKED] Honeypot triggered by IP: ${clientIp}`);
    // Respond with generic ok to fool bots without processing
    res.status(200).json({
      success: true,
      referenceId: `ADV-${Math.floor(100000 + Math.random() * 900000)}`,
      message: 'Inquiry received for verification.'
    });
    return;
  }

  // 2. SPAM PREVENTION: Submission timing threshold
  const formLoadedAt = Number(req.body.formLoadedAt);
  if (formLoadedAt && !isNaN(formLoadedAt)) {
    const elapsedMs = Date.now() - formLoadedAt;
    // Submissions faster than 2000ms are almost certainly automated scripts
    if (elapsedMs < 2000) {
      console.warn(`[SPAM BLOCKED] Rapid submission bot detected (${elapsedMs}ms) from IP: ${clientIp}`);
      res.status(400).json({
        success: false,
        message: 'Submission rejected: Form was completed too quickly. Please take a moment to review and resubmit.'
      });
      return;
    }
  }

  // 3. RATE LIMITING
  const now = Date.now();
  let ipEntry = rateLimitStore.get(clientIp);
  if (!ipEntry) {
    ipEntry = { timestamps: [] };
    rateLimitStore.set(clientIp, ipEntry);
  }
  // Filter timestamps within current window
  ipEntry.timestamps = ipEntry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (ipEntry.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestTimestamp = ipEntry.timestamps[0];
    const retryAfterSec = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp)) / 1000);
    res.setHeader('Retry-After', retryAfterSec);
    res.status(429).json({
      success: false,
      message: `Too many consultation inquiries submitted from this network. Please wait ${Math.ceil(retryAfterSec / 60)} minutes before submitting again.`
    });
    return;
  }
  ipEntry.timestamps.push(now);

  // 4. SANITIZE & EXTRACT PAYLOAD (CRLF stripped from single-line fields)
  const rawBody = req.body || {};
  const fullName = sanitizeSingleLine(rawBody.fullName, 100);
  const businessName = sanitizeSingleLine(rawBody.businessName, 120);
  const email = sanitizeSingleLine(rawBody.email, 150).toLowerCase();
  const phoneOrWhatsApp = sanitizeSingleLine(rawBody.phoneOrWhatsApp, 30);
  const requiredService = sanitizeSingleLine(rawBody.requiredService, 80);
  const businessGoal = sanitizeSingleLine(rawBody.businessGoal, 100);
  const additionalMessage = sanitizeMultiline(rawBody.additionalMessage, 2000);
  const marketingOptIn = Boolean(rawBody.marketingOptIn);
  const agreeToEnquiryProcessing = Boolean(rawBody.agreeToEnquiryProcessing);

  // 5. SERVER-SIDE FIELD VALIDATION
  const errors: Record<string, string> = {};

  if (!fullName || fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  } else if (fullName.length > 100) {
    errors.fullName = 'Full name must not exceed 100 characters.';
  }

  if (!businessName || businessName.length < 2) {
    errors.businessName = 'Business or company name is required.';
  } else if (businessName.length > 120) {
    errors.businessName = 'Business name must not exceed 120 characters.';
  }

  if (!email) {
    errors.email = 'Corporate email address is required.';
  } else if (!EMAIL_REGEX.test(email) || email.length > 150) {
    errors.email = 'Please provide a valid corporate email address (e.g. name@company.com).';
  }

  if (!phoneOrWhatsApp) {
    errors.phoneOrWhatsApp = 'Telephone or WhatsApp contact number is required.';
  } else if (phoneOrWhatsApp.length < 7 || phoneOrWhatsApp.length > 30) {
    errors.phoneOrWhatsApp = 'Please provide a valid telephone or WhatsApp number with country code.';
  }

  if (!requiredService) {
    errors.requiredService = 'Please select a required service category.';
  }

  if (!businessGoal) {
    errors.businessGoal = 'Please select your primary commercial goal.';
  }

  if (additionalMessage && additionalMessage.length > 2000) {
    errors.additionalMessage = 'Additional message must not exceed 2000 characters.';
  }

  if (!agreeToEnquiryProcessing) {
    errors.agreeToEnquiryProcessing = 'Consent to process enquiry data is required for submission.';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      message: 'Please resolve the highlighted field errors.',
      errors
    });
    return;
  }

  // 6. DUPLICATE SUBMISSION PROTECTION (Cryptographic SHA-256 Fingerprint)
  const fingerprintRaw = `${email}|${businessName.toLowerCase()}|${requiredService.toLowerCase()}`;
  const fingerprint = crypto.createHash('sha256').update(fingerprintRaw).digest('hex');
  const existingSubmission = duplicateStore.get(fingerprint);

  if (existingSubmission && now - existingSubmission.timestamp < DUPLICATE_WINDOW_MS) {
    console.log(`[DUPLICATE DETECTED] Duplicate inquiry from ${maskEmail(email)} within 5 minutes. Returning reference: ${existingSubmission.referenceId}`);
    res.status(200).json({
      success: true,
      duplicate: true,
      referenceId: existingSubmission.referenceId,
      message: 'Your inquiry has already been registered and is currently in our executive review queue.',
      deliveryStatus: 'duplicate_acknowledged'
    });
    return;
  }

  // Generate unique submission reference
  const referenceId = `ADV-${Math.floor(100000 + Math.random() * 900000)}`;
  duplicateStore.set(fingerprint, { timestamp: now, referenceId });

  // 7. SUPABASE DATABASE PERSISTENCE
  // Securely inserts the sanitized enquiry into the Supabase PostgreSQL leads table
  const dbResult = await insertLeadRecord({
    full_name: fullName,
    business_name: businessName,
    email: email,
    phone: phoneOrWhatsApp,
    service: requiredService,
    business_goal: businessGoal,
    message: additionalMessage || null,
    status: 'new'
  });

  if (dbResult.success) {
    console.log(`[SUPABASE DB SUCCESS] Saved lead record ${dbResult.leadId} for ${maskEmail(email)}`);
  } else {
    console.warn(`[SUPABASE DB NOTICE] Lead persistence status: ${dbResult.reason} (${dbResult.error || 'N/A'})`);
  }

  // 8. EMAIL NOTIFICATION ENGINE
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'officialjassmanager@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `"ADVERUNE Intake Desk" <no-reply@adverune.com>`;

  let emailDeliveryStatus: 'delivered' | 'simulated_unconfigured_credentials' | 'delivery_failed' =
    'simulated_unconfigured_credentials';
  let emailDeliveryDetail = '';

  const emailSubject = `[ADVERUNE New Inquiry] ${referenceId} - ${businessName} (${requiredService})`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0B0B0D; color: #E5E5E7; margin: 0; padding: 24px; }
          .card { background: #14141C; border: 1px solid #D4AF37; border-radius: 12px; max-width: 600px; margin: 0 auto; padding: 32px; }
          .header { border-bottom: 1px solid #252535; padding-bottom: 20px; margin-bottom: 24px; }
          .logo { font-size: 20px; font-weight: 800; color: #D4AF37; letter-spacing: 2px; }
          .badge { display: inline-block; background: #221D12; border: 1px solid #D4AF37; color: #D4AF37; font-size: 11px; padding: 4px 8px; border-radius: 6px; font-weight: bold; }
          .field { margin-bottom: 16px; }
          .label { font-size: 11px; text-transform: uppercase; color: #8E8E98; letter-spacing: 1px; margin-bottom: 4px; }
          .value { font-size: 14px; color: #FFFFFF; font-weight: 500; }
          .message-box { background: #0E0E14; border-left: 3px solid #D4AF37; padding: 12px 16px; border-radius: 6px; margin-top: 8px; font-size: 13px; color: #C5C5D0; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #20202C; font-size: 11px; color: #70707C; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <span class="logo">ADVERUNE</span>
            <div style="float: right;">
              <span class="badge">REFERENCE: ${referenceId}</span>
            </div>
            <div style="clear: both;"></div>
            <h2 style="color: #FFFFFF; font-size: 20px; margin: 16px 0 4px 0;">New Strategic Consultation Intake</h2>
            <div style="color: #9E9EA8; font-size: 12px;">Submitted on ${new Date().toUTCString()}</div>
          </div>

          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${fullName}</div>
          </div>

          <div class="field">
            <div class="label">Business Name</div>
            <div class="value">${businessName}</div>
          </div>

          <div class="field">
            <div class="label">Contact Email</div>
            <div class="value"><a href="mailto:${email}" style="color: #D4AF37; text-decoration: none;">${email}</a></div>
          </div>

          <div class="field">
            <div class="label">Telephone / WhatsApp</div>
            <div class="value">${phoneOrWhatsApp}</div>
          </div>

          <div class="field">
            <div class="label">Required Service</div>
            <div class="value">${requiredService}</div>
          </div>

          <div class="field">
            <div class="label">Primary Commercial Goal</div>
            <div class="value">${businessGoal}</div>
          </div>

          ${
            additionalMessage
              ? `
              <div class="field">
                <div class="label">Additional Message / Context</div>
                <div class="message-box">${additionalMessage}</div>
              </div>
            `
              : ''
          }

          <div class="field" style="margin-top: 20px; padding-top: 16px; border-top: 1px dashed #252535;">
            <div class="label">Consent & Permissions</div>
            <div style="font-size: 12px; color: #A0A0B0;">
              • Enquiry Processing Acknowledged: <strong>YES</strong><br>
              • Marketing Communications Opt-In: <strong>${marketingOptIn ? 'YES (Explicitly Selected)' : 'NO (Default Separated)'}</strong>
            </div>
          </div>

          <div class="footer">
            CONFIDENTIAL COMMERCIAL INTAKE • ADVERUNE REVENUE ARCHITECTURE
          </div>
        </div>
      </body>
    </html>
  `;

  // Check if real SMTP provider is configured
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipientEmail,
        replyTo: email,
        subject: emailSubject,
        html: emailHtml
      });

      console.log(`[EMAIL DISPATCHED] Reference: ${referenceId} | Message ID: ${info.messageId}`);
      emailDeliveryStatus = 'delivered';
      emailDeliveryDetail = 'Inquiry transmitted to strategy desk for review.';
    } catch (sendErr) {
      console.error('[EMAIL DISPATCH ERROR]', (sendErr as Error).message);
      emailDeliveryStatus = 'delivery_failed';
      emailDeliveryDetail = 'Inquiry recorded in internal processing queue.';
    }
  } else {
    // Privacy-safe server-side logging (zero unmasked PII, no plaintext message dumped to logs)
    console.log(`[SIMULATED DISPATCH] Reference: ${referenceId} | Client: ${maskName(fullName)} <${maskEmail(email)}> | Org: ${businessName} | Srv: ${requiredService} | Goal: ${businessGoal} | Phone: ${maskPhone(phoneOrWhatsApp)} | Mktg: ${marketingOptIn} | MsgLength: ${additionalMessage.length} chars`);
    emailDeliveryStatus = 'simulated_unconfigured_credentials';
    emailDeliveryDetail = 'Inquiry successfully validated and queued for strategy desk review.';
  }

  // 9. SEND STRUCTURED SUCCESS RESPONSE (No internal recipient emails or server error internals leaked)
  res.status(200).json({
    success: true,
    referenceId,
    timestamp: new Date().toISOString(),
    deliveryStatus: emailDeliveryStatus,
    deliveryDetail: emailDeliveryDetail,
    databaseRecord: dbResult.success
      ? 'persisted'
      : dbResult.reason === 'table_not_found'
      ? 'pending_migration'
      : dbResult.reason === 'unconfigured'
      ? 'unconfigured'
      : 'failed',
    leadId: dbResult.leadId,
    message: 'Your strategic consultation inquiry has been successfully validated and recorded in our review queue.'
  });
}

export async function handleEnquiryHealthCheck(_req: Request, res: Response): Promise<void> {
  const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  const dbHealth = await checkSupabaseHealth();

  // Return operational telemetry without exposing internal recipient emails or SMTP hostnames
  res.status(200).json({
    status: 'healthy',
    service: 'ADVERUNE Enquiry Subsystem',
    database: {
      configured: dbHealth.configured,
      connected: dbHealth.connected,
      tableExists: dbHealth.tableExists,
      notice: dbHealth.error || (dbHealth.tableExists ? 'Leads table active with RLS protection' : 'Pending SQL migration')
    },
    smtpConfigured,
    antiSpamActive: true,
    rateLimitingActive: true,
    duplicateProtectionActive: true
  });
}
