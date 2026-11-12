/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  FileText,
  AlertTriangle,
  Scale,
  Shield,
  ChevronLeft,
  ArrowRight,
  Lock,
  Building,
  CheckCircle2
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { NavRoute } from '../types';

interface TermsPageProps {
  onNavigate: (route: NavRoute) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
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
            Document Reference: ADV-TERMS-2026-V1
          </span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A24] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-mono mb-4">
            <Scale className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Terms & Conditions Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4 break-words text-balance">
            Terms & Conditions of Website Use
          </h1>

          <p className="text-sm text-[#9E9EA8] leading-relaxed">
            This document outlines the operational and legal framework governing the use of the ADVERUNE website, diagnostic tools, and preliminary consultation channels.
          </p>
        </div>

        {/* MANDATORY LEGAL REVIEW BANNER */}
        <div className="p-5 rounded-2xl bg-[#1A150D] border border-[#D4AF37]/40 mb-10 text-xs text-[#E5D2A0] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#D4AF37]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span className="font-mono uppercase tracking-wider">
              [Document Status: Legal Review Framework]
            </span>
          </div>
          <p className="leading-relaxed">
            This document represents a structured operational framework defining website use terms and commercial inquiry boundaries. It does not constitute formal legal counsel and must be reviewed, finalized, and executed under the advice of licensed legal counsel in the relevant operating jurisdiction.
          </p>
        </div>

        {/* Structured Terms Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#A5A5B2] leading-relaxed">
          {/* SECTION 1: ACCEPTANCE & SCOPE */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">01.</span>
                <span>Acceptance of Terms</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [LEGAL REVIEW REQUIRED]
              </span>
            </div>
            <p>
              By accessing, browsing, or submitting an inquiry via the ADVERUNE website, users agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, you must refrain from using this website.
            </p>
            <div className="p-3.5 rounded-xl bg-[#121217] border border-dashed border-[#282838] font-mono text-[11px] text-[#8E8E98]">
              [LEGAL REVIEW REQUIRED: Insert specific formal entity identification, effective legal date, and age eligibility clauses.]
            </div>
          </div>

          {/* SECTION 2: NON-BINDING INQUIRIES */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">02.</span>
                <span>Informational Purpose & Non-Binding Inquiries</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [COMMERCIAL BOUNDARY]
              </span>
            </div>
            <p>
              All materials published on this website—including service descriptions, package frameworks, technical briefings, and portfolio schematics—are provided for general informational and preliminary discovery purposes only:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs text-[#C5C5D2]">
              <li>Submitting an inquiry, contact form, or diagnostic questionnaire does not constitute an agency-client contract, commercial retainer, or binding commitment.</li>
              <li>A commercial engagement is only established upon the mutual signing of an official Master Services Agreement (MSA) or Statement of Work (SOW).</li>
              <li>ADVERUNE reserves the right to decline or disqualify any commercial inquiry at its discretion based on channel viability or capacity.</li>
            </ul>
          </div>

          {/* SECTION 3: SEPARATE COMMERCIAL SERVICE AGREEMENTS */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">03.</span>
                <span>Commercial Retainers & Master Service Agreements</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [CONTRACTUAL SEPARATION]
              </span>
            </div>
            <p>
              When a prospective client enters into a formal engagement with ADVERUNE:
            </p>
            <div className="p-3.5 rounded-xl bg-[#121217] border border-dashed border-[#282838] font-mono text-[11px] text-[#8E8E98] space-y-1">
              <div>[LEGAL REVIEW REQUIRED: Define formal contracting hierarchy:]</div>
              <div>• Specific scopes of work, management fees, deliverables, and service levels are governed exclusively by executed bilateral contracts.</div>
              <div>• Package pricing and deliverables displayed on the website are indicative frameworks; official fees are confirmed in formal proposals.</div>
            </div>
          </div>

          {/* SECTION 4: ABSENCE OF SPECULATIVE GUARANTEES */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">04.</span>
                <span>No Speculative Advertising Guarantees</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [DISCLAIMER CLAUSE]
              </span>
            </div>
            <p>
              Digital advertising performance involves external variables beyond agency control, including platform auction algorithms (Meta Ads, Google Ads), consumer purchasing power, macroeconomic conditions, and competitor bidding activities.
            </p>
            <p>
              ADVERUNE strictly disclaims any speculative or absolute guarantees of exact sales revenue, Return on Ad Spend (ROAS), or closed contracts. Deliverables are committed to methodological excellence, rigorous testing, and accurate technical tracking.
            </p>
          </div>

          {/* SECTION 5: INTELLECTUAL PROPERTY */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">05.</span>
                <span>Intellectual Property & Website Content</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [PROPRIETARY ASSETS]
              </span>
            </div>
            <p>
              The ADVERUNE trademark, logo marks, design tokens, custom code, diagrams, articles, and documented conceptual frameworks are the proprietary intellectual property of ADVERUNE and are protected by applicable intellectual property laws.
            </p>
            <p>
              No part of this website may be reproduced, reverse-engineered, scraped, or republished without prior written authorization.
            </p>
          </div>

          {/* SECTION 6: THIRD-PARTY PLATFORMS & EXTERNAL LINKS */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">06.</span>
                <span>Third-Party Platforms & External Services</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [THIRD-PARTY ADVISORY]
              </span>
            </div>
            <p>
              Our services interact with independent third-party platforms including Meta (Facebook, Instagram, WhatsApp), Google (Google Ads, Analytics), and CRM providers. Clients remain bound by the respective terms of service, acceptable use policies, and privacy notices of those platforms.
            </p>
          </div>

          {/* SECTION 7: LIMITATION OF LIABILITY */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">07.</span>
                <span>Limitation of Liability</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [LEGAL REVIEW REQUIRED]
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#121217] border border-dashed border-[#282838] font-mono text-[11px] text-[#8E8E98] space-y-1">
              <div>[LEGAL REVIEW REQUIRED: Counsel must insert standard statutory disclaimer, including:]</div>
              <div>• Disclaimer of indirect, consequential, punitive, or special damages arising from website downtime or inquiry form transmission delays.</div>
              <div>• Maximum liability caps for free website browsing (e.g. limited to zero or nominal statutory amounts).</div>
            </div>
          </div>

          {/* SECTION 8: GOVERNING JURISDICTION & LEGAL CONTACT */}
          <div className="matte-card p-6 sm:p-8 rounded-2xl border border-[#22222E] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span className="text-[#D4AF37] font-mono text-xs">08.</span>
                <span>Governing Law & Legal Notices</span>
              </h2>
              <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                [OFFICIAL PLACEHOLDER]
              </span>
            </div>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction specified upon formal commercial entity incorporation:
            </p>

            <div className="p-4 rounded-xl bg-[#111116] border border-[#1E1E28] space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#7E7E8B]">Designated Legal Notices Email:</span>
                <span className="text-white font-bold break-all">[LEGAL INQUIRIES EMAIL TO BE CONFIGURED]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7E7E8B]">Applicable Governing Jurisdiction:</span>
                <span className="text-white font-bold">[GOVERNING JURISDICTION AND DISPUTE VENUE TO BE SPECIFIED BY LEGAL COUNSEL]</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7E7E8B]">Registered Entity Name:</span>
                <span className="text-white">[REGISTERED LEGAL ENTITY NAME TO BE CONFIGURED]</span>
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
            onClick={() => onNavigate('privacy')}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs text-[#A5A5B2] hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-2"
          >
            <span>Review Privacy Policy</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </div>
  );
}
