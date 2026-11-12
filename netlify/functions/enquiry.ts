/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Handler, HandlerEvent, HandlerResponse } from '@netlify/functions';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { insertLeadRecord } from '../../src/server/supabase';

const jsonHeaders: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8'
};

// In-Memory Rate Limiting for serverless instance lifetime
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

// Single-line sanitizer: strips HTML, escapes entities, and removes CRLF to prevent SMTP header injection
function sanitizeSingleLine(str: unknown, maxLen = 150): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[\r\n\0]/g, ' ')
    .replace(/<[^>]*>/g, '')
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

// Multiline sanitizer
function sanitizeMultiline(str: unknown, maxLen = 2000): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\0/g, '')
    .replace(/<[^>]*>/g, '')
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

// Masking helpers for server logs
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

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const handler: Handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  // 1. HTTP Method Check
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        ...jsonHeaders,
        Allow: 'POST'
      },
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  // 2. Client IP Extraction (Netlify edge headers)
  const clientIp =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['client-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0].trim() ||
    '127.0.0.1';

  let body: any = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, message: 'Invalid JSON payload' })
    };
  }

  // 3. Spam Prevention: Honeypot check
  const honeypot = body.website_hp;
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    console.warn(`[SPAM BLOCKED] Honeypot triggered in Netlify Function from IP: ${clientIp}`);
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: true,
        referenceId: `ADV-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Inquiry received for verification.'
      })
    };
  }

  // 4. Spam Prevention: Submission timing threshold
  const formLoadedAt = Number(body.formLoadedAt);
  if (formLoadedAt && !isNaN(formLoadedAt)) {
    const elapsedMs = Date.now() - formLoadedAt;
    if (elapsedMs < 2000) {
      console.warn(`[SPAM BLOCKED] Rapid submission bot detected (${elapsedMs}ms) in Netlify Function from IP: ${clientIp}`);
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({
          success: false,
          message: 'Submission rejected: Form was completed too quickly. Please review and resubmit.'
        })
      };
    }
  }

  // 5. Rate Limiting
  const now = Date.now();
  let ipEntry = rateLimitStore.get(clientIp);
  if (!ipEntry) {
    ipEntry = { timestamps: [] };
    rateLimitStore.set(clientIp, ipEntry);
  }
  ipEntry.timestamps = ipEntry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (ipEntry.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestTimestamp = ipEntry.timestamps[0];
    const retryAfterSec = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldestTimestamp)) / 1000);
    return {
      statusCode: 429,
      headers: {
        ...jsonHeaders,
        'Retry-After': String(retryAfterSec)
      },
      body: JSON.stringify({
        success: false,
        message: `Too many consultation inquiries submitted. Please wait ${Math.ceil(retryAfterSec / 60)} minutes before trying again.`
      })
    };
  }
  ipEntry.timestamps.push(now);

  // 6. Sanitize Payload
  const fullName = sanitizeSingleLine(body.fullName, 100);
  const businessName = sanitizeSingleLine(body.businessName, 120);
  const email = sanitizeSingleLine(body.email, 150).toLowerCase();
  const phoneOrWhatsApp = sanitizeSingleLine(body.phoneOrWhatsApp, 30);
  const requiredService = sanitizeSingleLine(body.requiredService, 80);
  const businessGoal = sanitizeSingleLine(body.businessGoal, 100);
  const additionalMessage = sanitizeMultiline(body.additionalMessage, 2000);
  const marketingOptIn = Boolean(body.marketingOptIn);
  const agreeToEnquiryProcessing = Boolean(body.agreeToEnquiryProcessing);

  // 7. Validation
  const errors: Record<string, string> = {};

  if (!fullName || fullName.length < 2) errors.fullName = 'Full name must be at least 2 characters.';
  if (!businessName || businessName.length < 2) errors.businessName = 'Business or company name is required.';
  if (!email || !EMAIL_REGEX.test(email)) errors.email = 'Please provide a valid corporate email address.';
  if (!phoneOrWhatsApp || phoneOrWhatsApp.length < 7) errors.phoneOrWhatsApp = 'Telephone or WhatsApp contact number is required.';
  if (!requiredService) errors.requiredService = 'Please select a required service category.';
  if (!businessGoal) errors.businessGoal = 'Please select your primary commercial goal.';
  if (!agreeToEnquiryProcessing) errors.agreeToEnquiryProcessing = 'Consent to process enquiry data is required.';

  if (Object.keys(errors).length > 0) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: false,
        message: 'Please resolve the highlighted field errors.',
        errors
      })
    };
  }

  // 8. Cryptographic Duplicate Detection
  const fingerprintRaw = `${email}|${businessName.toLowerCase()}|${requiredService.toLowerCase()}`;
  const fingerprint = crypto.createHash('sha256').update(fingerprintRaw).digest('hex');
  const existingSubmission = duplicateStore.get(fingerprint);

  if (existingSubmission && now - existingSubmission.timestamp < DUPLICATE_WINDOW_MS) {
    console.log(`[DUPLICATE DETECTED] Duplicate inquiry in Netlify Function from ${maskEmail(email)}. Reference: ${existingSubmission.referenceId}`);
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: true,
        duplicate: true,
        referenceId: existingSubmission.referenceId,
        message: 'Your inquiry has already been registered and is currently in our executive review queue.',
        deliveryStatus: 'duplicate_acknowledged'
      })
    };
  }

  const referenceId = `ADV-${Math.floor(100000 + Math.random() * 900000)}`;
  duplicateStore.set(fingerprint, { timestamp: now, referenceId });

  // 9. Supabase Database Insertion
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
    console.log(`[SUPABASE DB SUCCESS] Saved lead ${dbResult.leadId} via Netlify Function for ${maskEmail(email)}`);
  } else {
    console.warn(`[SUPABASE DB NOTICE] Lead persistence: ${dbResult.reason} (${dbResult.error || 'N/A'})`);
  }

  // 10. Email Notification
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'officialjassmanager@gmail.com';
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `"ADVERUNE Intake Desk" <no-reply@adverune.com>`;

  let emailDeliveryStatus: 'delivered' | 'simulated_unconfigured_credentials' | 'delivery_failed' =
    'simulated_unconfigured_credentials';
  let emailDeliveryDetail = 'Inquiry recorded in internal processing queue.';

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: recipientEmail,
        replyTo: email,
        subject: `[ADVERUNE New Inquiry] ${referenceId} - ${businessName} (${requiredService})`,
        text: `New consultation intake from ${fullName} (${businessName}). Reference: ${referenceId}`
      });

      console.log(`[EMAIL DISPATCHED] Reference: ${referenceId} | Netlify Message ID: ${info.messageId}`);
      emailDeliveryStatus = 'delivered';
      emailDeliveryDetail = 'Inquiry transmitted to strategy desk for review.';
    } catch (err) {
      console.error('[EMAIL DISPATCH ERROR]', (err as Error).message);
      emailDeliveryStatus = 'delivery_failed';
    }
  } else {
    console.log(`[SIMULATED DISPATCH] Reference: ${referenceId} | Client: ${maskName(fullName)} <${maskEmail(email)}> | Org: ${businessName} | Srv: ${requiredService} | Goal: ${businessGoal} | Phone: ${maskPhone(phoneOrWhatsApp)} | Mktg: ${marketingOptIn} | Netlify Function`);
    emailDeliveryDetail = 'Inquiry successfully validated and queued for strategy desk review.';
  }

  return {
    statusCode: 200,
    headers: jsonHeaders,
    body: JSON.stringify({
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
    })
  };
};
