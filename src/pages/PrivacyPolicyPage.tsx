/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Shield,
  Lock,
  FileText,
  AlertTriangle,
  Mail,
  Building,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Database,
  Clock,
  UserCheck
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { NavRoute } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (route: NavRoute) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <div className="w-full py-16 md:py-24">
      <Container width="narrow">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 pb-4 border-b border-[#1E1E28] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-2"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Return to Contact Experience</span>
          </button>
          <span className="text-[10px] font-mono text-[#8E8E98] uppercase">
            Document Reference: ADV-PRIV-2026-V1
          </span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A24] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-mono mb-4">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Privacy Policy Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4 break-words text-balance">
            Privacy Policy & Data Processing Notice
          </h1>

          <p className="text-sm text-[#9E9EA8] leading-relaxed">
            This document outlines the operational data processing framework for ADVERUNE. It details how commercial inquiry information is collected, processed, secured, and retained.
          </p>
        </div>

        {/* MANDATORY LEGAL COUNSEL NOTICE BANNER */}
        <div className="p-5 rounded-2xl bg-[#1A150D] border border-[#D4AF37]/40 mb-10 text-xs text-[#E5D2A0] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#D4AF37]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="font-mono uppercase tracking-wider">
              [Document Status: Legal Review Framework]
            </span>
          </div>
          <p className="leading-relaxed">
            This privacy policy constitutes an architectural and operational framework describing ADVERUNE&apos;s real data workflows. It must undergo final review, adaptation, and formal statutory localization by qualified legal counsel prior to commercial production deployment.
          </p>
        </div>

        {/* Structured Legal Framework Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#A5A5B2] leading-relaxed">
          {/* SECTION 1: OVERVIEW & SCOPE */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">01.</span>
                <span>Scope & Applicability</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [LEGAL REVIEW REQUIRED]
              </span>
            </div>
            <p>
              This Privacy Policy governs the collection, processing, and handling of business and personal data submitted through the ADVERUNE website, commercial inquiry portals, diagnostic assessments, and preliminary consultation channels.
            </p>
            <div className="p-3.5 rounded-xl bg-[#121217] border border-dashed border-[#282838] font-mono text-[11px] text-[#8E8E98]">
              [LEGAL REVIEW REQUIRED: Specify the exact legal corporate entity name, registered office address, and jurisdiction governing this privacy notice upon company formation.]
            </div>
          </div>

          {/* SECTION 2: ENQUIRY DATA COLLECTION */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">02.</span>
                <span>Enquiry Data Collection & Categories</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [OPERATIONAL MAPPING]
              </span>
            </div>
            <p>
              When a commercial user submits an inquiry or consultation request through our website, we collect only the business parameters necessary to evaluate commercial feasibility and prepare a tailored strategic response:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-[#121218] border border-[#1E1E28]">
                <strong className="text-white block font-heading mb-1 text-xs">Direct Identity & Contact:</strong>
                <span className="text-[11px] text-[#8E8E98]">
                  Full Name, Business/Company Name, Corporate Email Address, and Phone or WhatsApp contact number.
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#121218] border border-[#1E1E28]">
                <strong className="text-white block font-heading mb-1 text-xs">Commercial Context:</strong>
                <span className="text-[11px] text-[#8E8E98]">
                  Target service category, primary business growth goal, approximate monthly media spend, and operational bottleneck notes.
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: PURPOSE OF DATA PROCESSING & CONSENT SEPARATION */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">03.</span>
                <span>Purposes of Processing & Strict Consent Separation</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [STRICT GOVERNANCE RULE]
              </span>
            </div>
            <p>
              Submitted inquiry data is processed strictly for legitimate pre-contractual commercial evaluation and communication:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs text-[#C5C5D2]">
              <li>Evaluating company profile and advertising channel feasibility.</li>
              <li>Preparing customized discovery proposals, growth blueprints, and package recommendations.</li>
              <li>Direct one-to-one communication via email, telephone, or WhatsApp regarding the inquiry.</li>
            </ul>

            <div className="p-4 rounded-xl bg-[#14141E] border border-[#D4AF37]/35 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold text-xs">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                <span>Strict Separation of Marketing Email Consent</span>
              </div>
              <p className="text-[11px] text-[#A5A5B5] leading-relaxed">
                In strict adherence to international privacy principles (including GDPR Article 7 and anti-spam standards), <strong>consent to receive marketing newsletters or promotional updates is never automatically bundled with the general inquiry submission</strong>. Marketing opt-ins require an affirmative, un-coerced, separate checkbox. A user may submit an inquiry without opting into marketing.
              </p>
            </div>
          </div>

          {/* SECTION 4: DATA STORAGE, ENCRYPTION & SECURITY */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">04.</span>
                <span>Data Storage & Security Measures</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [TECHNICAL SAFEGUARDS]
              </span>
            </div>
            <p>
              We implement industry-standard administrative, physical, and technical safeguards to protect all submitted business data from unauthorized access, accidental alteration, or disclosure:
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-[#C0C0D0]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Encryption in Transit:</strong> All data submitted through forms is transmitted using TLS 1.3 / HTTPS encrypted tunnels.</span>
              </div>
              <div className="flex items-start gap-2 text-[#C0C0D0]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Access Control:</strong> Only authorized strategy directors bound by non-disclosure agreements have access to incoming inquiry payloads.</span>
              </div>
              <div className="flex items-start gap-2 text-[#C0C0D0]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Zero Data Resale:</strong> ADVERUNE never sells, rents, leases, or trades commercial contact data or inquiry details to third parties.</span>
              </div>
              <div className="flex items-start gap-2 text-[#C0C0D0]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span><strong>Third-Party Processors & Infrastructure:</strong> To process commercial requests, we engage vetted infrastructure sub-processors: (a) Transactional SMTP email delivery relays operating under TLS encryption; (b) Supabase managed PostgreSQL database storage operating under strict Row Level Security (RLS); and (c) Google Analytics 4 for pseudonymous aggregate site telemetry. Under strict system rules, Google Analytics never receives names, email addresses, telephone numbers, or client messages.</span>
              </div>
            </div>
          </div>

          {/* SECTION 5: DATA RETENTION SCHEDULE */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">05.</span>
                <span>Retention Schedules & Disposal</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [LEGAL REVIEW REQUIRED]
              </span>
            </div>
            <p>
              Inquiry data is retained only for as long as strictly necessary to fulfill the commercial purpose for which it was gathered:
            </p>
            <div className="p-3.5 rounded-xl bg-[#121217] border border-dashed border-[#282838] font-mono text-[11px] text-[#8E8E98] space-y-1">
              <div>[LEGAL REVIEW REQUIRED: Define exact timeframes, for example:]</div>
              <div>• Non-converting inquiries: Retained for up to [NUMBER TO BE DETERMINED, e.g., 12 months] following last commercial contact, then permanently purged.</div>
              <div>• Active commercial client records: Retained in compliance with statutory commercial tax and accounting requirements [e.g., 5 to 7 years].</div>
            </div>
          </div>

          {/* SECTION 6: USER & DATA SUBJECT RIGHTS */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">06.</span>
                <span>User & Data Subject Rights</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [STATUTORY RIGHTS]
              </span>
            </div>
            <p>
              Depending on your location and applicable data protection legislation (such as GDPR, UK GDPR, or CCPA), you hold verifiable rights regarding your personal information:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-[#111116] border border-[#1E1E28]">
                <strong className="text-white block font-medium">Right of Access:</strong>
                <span className="text-[11px] text-[#80808C]">Request a copy of the personal data held about you.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#111116] border border-[#1E1E28]">
                <strong className="text-white block font-medium">Right to Rectification:</strong>
                <span className="text-[11px] text-[#80808C]">Request correction of inaccurate or incomplete records.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#111116] border border-[#1E1E28]">
                <strong className="text-white block font-medium">Right to Erasure (&quot;Be Forgotten&quot;):</strong>
                <span className="text-[11px] text-[#80808C]">Request deletion of your data when retention is no longer justified.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#111116] border border-[#1E1E28]">
                <strong className="text-white block font-medium">Right to Restrict or Object:</strong>
                <span className="text-[11px] text-[#80808C]">Object to processing or withdraw marketing consent at any time.</span>
              </div>
            </div>
          </div>

          {/* SECTION 7: DIRECT AD ACCOUNT OWNERSHIP POLICY */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">07.</span>
                <span>Direct Client Ad Account & Pixel Ownership</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [ADVERUNE PRINCIPLE]
              </span>
            </div>
            <p>
              In our paid advertising and tracking implementations, ADVERUNE operates under the core principle of <strong>Direct Client Account Ownership</strong>. All ad accounts (Meta Business Manager, Google Ads), tracking containers (Google Tag Manager, CAPI endpoints), and analytics assets must be provisioned in the client&apos;s corporate name. We act strictly as an authorized administrative manager; all customer conversion data remains client property.
            </p>
          </div>

          {/* SECTION 8: CONTACT FOR PRIVACY INQUIRIES */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">08.</span>
                <span>Data Protection Contact & Exercising Rights</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [OFFICIAL PLACEHOLDER]
              </span>
            </div>
            <p>
              To exercise any statutory data subject rights or submit questions regarding this privacy notice, contact our designated privacy desk:
            </p>

            <div className="p-4 rounded-xl bg-[#111116] border border-[#1E1E28] space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#7E7E8B]">Designated Privacy Officer Email:</span>
                <span className="text-white font-bold break-all">[DATA PROTECTION OFFICER EMAIL TO BE CONFIGURED]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7E7E8B]">Registered Corporate Entity:</span>
                <span className="text-white font-bold">[REGISTERED LEGAL ENTITY NAME TO BE CONFIGURED]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7E7E8B]">Physical Address for Notices:</span>
                <span className="text-white">[REGISTERED CORPORATE ADDRESS TO BE CONFIGURED]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 pt-6 border-t border-[#1C1C26] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-2"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Return to Contact Experience</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('terms')}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs text-[#A5A5B2] hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-2"
          >
            <span>Review Terms & Conditions</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </div>
  );
}
