/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Clock,
  Target,
  Sparkles,
  PhoneCall,
  Lock,
  Layers,
  ChevronRight,
  MessageCircle,
  Globe,
  BarChart3,
  Check,
  AlertCircle
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { PackageCard } from '../components/cards/PackageCard';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { APPROVED_PACKAGES } from '../data/foundationData';
import { NavRoute, PackageTier, FAQItem } from '../types';

interface PackagesPageProps {
  onNavigate: (route: NavRoute) => void;
  onSelectPackage: (pkg: PackageTier) => void;
}

export function PackagesPage({
  onNavigate,
  onSelectPackage
}: PackagesPageProps) {
  const [packageFaqOpen, setPackageFaqOpen] = useState<number | null>(0);

  const scrollToComparison = () => {
    const el = document.getElementById('package-comparison-table');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Structured Comparison Matrix Data
  const comparisonRows = [
    {
      feature: 'Core Advertising (Meta Ads)',
      category: 'Traffic & Media',
      smallBiz: 'Included (Feed & Story)',
      mediumBiz: 'Included (Feed, Story, Reels)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Basic Creatives',
      category: 'Traffic & Media',
      smallBiz: 'Included (Static Ad Formats)',
      mediumBiz: 'Included (Direct-Response Variants)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Click-to-WhatsApp Architecture',
      category: 'Traffic & Media',
      smallBiz: 'Included (Direct Message Funnel)',
      mediumBiz: 'Included (Alternative Flow)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'WhatsApp Setup & Profile Routing',
      category: 'Lead Capture',
      smallBiz: 'Included (Greeting & Quick Replies)',
      mediumBiz: 'Included (Integrated with CRM)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Lead Tracking & Pixel Setup',
      category: 'Tracking & Data',
      smallBiz: 'Included (Standard Conversion Events)',
      mediumBiz: 'Included (Server-Side Meta CAPI)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Basic Google Business Profile',
      category: 'Local Presence',
      smallBiz: 'Included (Profile Audit & Setup)',
      mediumBiz: 'Included (Enhanced Optimization)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Follow-up Templates',
      category: 'Sales Enablement',
      smallBiz: 'Included (Manual Outreach Scripts)',
      mediumBiz: 'Included (Automated Multi-Channel)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Performance Reporting',
      category: 'Reporting',
      smallBiz: 'Included (Bi-Weekly Summary)',
      mediumBiz: 'Included (Weekly Optimization Sprints)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Google Ads (High-Intent Search)',
      category: 'Traffic & Media',
      smallBiz: 'Not Included (Limitation)',
      mediumBiz: 'Included (Search & PMax)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Omnichannel Retargeting Sequences',
      category: 'Traffic & Media',
      smallBiz: 'Not Included (Limitation)',
      mediumBiz: 'Included (Meta + Google)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Dedicated Conversion Landing Pages',
      category: 'Lead Capture',
      smallBiz: 'Not Included (Limitation)',
      mediumBiz: 'Included (Custom React/Tailwind)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'CRM & Lead Management Pipeline',
      category: 'Sales Enablement',
      smallBiz: 'Not Included (Limitation)',
      mediumBiz: 'Included (Pipeline Stages & Routing)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Lead Qualification Gates',
      category: 'Lead Capture',
      smallBiz: 'Not Included (Limitation)',
      mediumBiz: 'Included (Multi-Step Friction Filters)',
      tier3: '[UNCONFIRMED]'
    },
    {
      feature: 'Automated Sales & Follow-up Systems',
      category: 'Sales Enablement',
      smallBiz: 'Not Included (Limitation)',
      mediumBiz: 'Included (< 5 Min Speed-to-Lead)',
      tier3: '[UNCONFIRMED]'
    }
  ];

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. PACKAGES HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1A22] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Approved Agency Growth Systems</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6 break-words text-balance">
            Engineered Growth Systems <br className="hidden sm:inline" />
            <span className="gold-text-gradient">For Your Business Stage.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#A5A5B2] font-normal leading-relaxed mb-8">
            Pre-configured acquisition and pipeline systems designed to eliminate sales leakage. Transparent deliverables, direct client ad account ownership, and zero hidden limitations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')} className="w-full sm:w-auto">
              Inquire About Growth Packages
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={scrollToComparison} className="w-full sm:w-auto">
              Compare Systems Directly
            </SecondaryButton>
          </div>

          {/* Pricing Policy Callout */}
          <div className="pt-10">
            <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-[#121217]/90 border border-[#22222B] text-left flex items-start gap-3 text-xs text-[#8E8E98]">
              <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#D4AF37]">Pricing Policy:</span>{' '}
                ADVERUNE publishes owner-approved pricing only. Until finalized commercial tiers are confirmed, all packages display <span className="text-amber-400 font-mono">[PRICE TO BE ADDED]</span>.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTRODUCTION */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-[#1A1A22] bg-[#0E0E12]">
        <Container width="wide">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
              The Architecture of Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Why ADVERUNE Packages Are Built as Systems
            </h2>
            <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">
              Most digital agencies sell isolated hours or piecemeal tasks—such as running a single Facebook campaign without lead follow-up. This creates pipeline leakage: you pay for ad clicks, but prospects slip through the cracks before sales reps make contact.
            </p>
            <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">
              ADVERUNE designs complete systems. The <span className="text-white font-semibold">Small Business: Lead Generation System</span> establishes immediate, direct customer communication via Core Advertising and WhatsApp. The <span className="text-white font-semibold">Medium Business: Lead + Sales Growth System</span> adds Google Search, omnichannel retargeting, dedicated landing pages, CRM integration, and automated speed-to-lead response sequences.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-xl bg-[#121217] border border-[#22222C] text-xs">
                <span className="text-[#D4AF37] font-semibold block mb-1">Direct Ad Spend Ownership:</span>
                <span className="text-[#8E8E98]">
                  Clients pay media spend directly to advertising networks (Meta/Google). We take zero secret margins on your ad budget.
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#121217] border border-[#22222C] text-xs">
                <span className="text-[#D4AF37] font-semibold block mb-1">Zero Hidden Exclusions:</span>
                <span className="text-[#8E8E98]">
                  Every deliverable, limitation, and communication frequency is documented in your proposal before work begins.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. INDIVIDUAL PACKAGE CARDS */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22]">
        <Container width="wide">
          <SectionHeading
            eyebrow="Approved Systems"
            title="Commercial Package Matrix"
            goldGradientText="& Inclusions"
            description="Review the approved foundations for emerging and growing businesses. Package 3 remains unconfirmed."
            className="mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {APPROVED_PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.id}
                packageData={pkg}
                onSelect={(selected) => {
                  onSelectPackage(selected);
                  onNavigate('contact');
                }}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. PACKAGE COMPARISON TABLE */}
      {/* ========================================================================= */}
      <section id="package-comparison-table" className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12] scroll-mt-20">
        <Container width="wide">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
              Transparent Evaluation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mt-1">
              Detailed Deliverables Comparison
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#92929D] leading-relaxed">
              Compare exact features across the approved Small Business and Medium Business foundations. Important limitations are explicitly marked.
            </p>
          </div>

          {/* Mobile Horizontal Scroll Indicator */}
          <div className="lg:hidden text-center text-xs text-[#A5A5B2] mb-3 flex items-center justify-center gap-1.5 font-mono">
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Scroll horizontally to compare all package columns</span>
          </div>

          {/* Desktop & Mobile Scrollable Table View */}
          <div className="overflow-x-auto rounded-2xl border border-[#22222E] bg-[#101016]">
            <table className="min-w-[680px] sm:min-w-[720px] w-full text-left text-xs border-collapse" aria-label="Commercial package deliverables and inclusions comparison table">
              <thead>
                <tr className="border-b border-[#20202C] bg-[#14141C]">
                  <th scope="col" className="py-4 px-6 font-bold text-white uppercase tracking-wider text-[11px] w-2/5">
                    Service Deliverable / Feature
                  </th>
                  <th scope="col" className="py-4 px-6 font-bold text-white uppercase tracking-wider text-[11px] w-1/5">
                    Small Business
                    <span className="block text-[10px] text-[#D4AF37] font-mono font-normal">
                      Lead Gen System
                    </span>
                  </th>
                  <th scope="col" className="py-4 px-6 font-bold text-[#FFF0BE] uppercase tracking-wider text-[11px] w-1/5 bg-[#181824] border-x border-[#2A2A38]">
                    Medium Business
                    <span className="block text-[10px] text-[#D4AF37] font-mono font-normal">
                      Lead + Sales Growth (Recommended)
                    </span>
                  </th>
                  <th scope="col" className="py-4 px-6 font-bold text-[#A5A5B2] uppercase tracking-wider text-[11px] w-1/5">
                    [Package 3]
                    <span className="block text-[10px] text-amber-400 font-mono font-normal">
                      UNCONFIRMED
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C26]">
                {comparisonRows.map((row, idx) => {
                  const isSmallBizLimitation = row.smallBiz.includes('Not Included');

                  return (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-[#101016]' : 'bg-[#0D0D12]'}
                    >
                      <th scope="row" className="py-3.5 px-6 font-medium text-white text-left font-normal">
                        <div className="font-semibold">{row.feature}</div>
                        <span className="text-[10px] text-[#8E8E98] font-mono">{row.category}</span>
                      </th>

                      {/* Small Biz */}
                      <td className="py-3.5 px-6">
                        {isSmallBizLimitation ? (
                          <div className="flex items-center gap-1.5 text-red-400 font-medium">
                            <XCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
                            <span>Not Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[#D8D8E0]">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                            <span>{row.smallBiz}</span>
                          </div>
                        )}
                      </td>

                      {/* Medium Biz (Highlighted Column) */}
                      <td className="py-3.5 px-6 bg-[#14141E] border-x border-[#2A2A38]">
                        <div className="flex items-center gap-1.5 text-white font-medium">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                          <span>{row.mediumBiz}</span>
                        </div>
                      </td>

                      {/* Tier 3 Unconfirmed */}
                      <td className="py-3.5 px-6 text-[#9E9EA8] font-mono text-[11px]">
                        {row.tier3}
                      </td>
                    </tr>
                  );
                })}

                {/* Investment Row */}
                <tr className="bg-[#14141E] border-t-2 border-[#262638]">
                  <th scope="row" className="py-4 px-6 font-bold text-white uppercase tracking-wider text-[11px] text-left">
                    Monthly Management Investment
                  </th>
                  <td className="py-4 px-6 font-bold text-[#E5E5E8] font-mono">
                    [PRICE TO BE ADDED]
                  </td>
                  <td className="py-4 px-6 font-bold text-[#D4AF37] font-mono bg-[#181826] border-x border-[#2A2A38]">
                    [PRICE TO BE ADDED]
                  </td>
                  <td className="py-4 px-6 font-mono text-amber-400">
                    [PRICE TO BE ADDED]
                  </td>
                </tr>

                {/* Action Row */}
                <tr className="bg-[#101016]">
                  <th scope="row" className="py-4 px-6 text-xs text-[#A5A5B2] text-left font-normal">
                    Select to pre-populate consultation application
                  </th>
                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPackage(APPROVED_PACKAGES[0]);
                        onNavigate('contact');
                      }}
                      aria-label="Inquire about Small Business Lead Generation System package"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#181820] hover:bg-[#20202B] text-white font-semibold text-xs border border-[#2B2B38] transition-all cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    >
                      Inquire Small Biz
                    </button>
                  </td>
                  <td className="py-4 px-6 bg-[#14141E] border-x border-[#2A2A38]">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPackage(APPROVED_PACKAGES[1]);
                        onNavigate('contact');
                      }}
                      aria-label="Inquire about Medium Business Lead and Sales Growth System package"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:brightness-110 text-black font-bold text-xs transition-all cursor-pointer shadow-md min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                      Inquire Medium Biz
                    </button>
                  </td>
                  <td className="py-4 px-6 text-xs text-[#9E9EA8] font-mono">
                    Awaiting Owner Details
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. SERVICE INCLUSIONS DEEP DIVE */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22]">
        <Container width="wide">
          <SectionHeading
            eyebrow="Deliverables Breakdown"
            title="Understanding What Is Included"
            goldGradientText="In Each Foundation"
            description="A detailed analysis of the core components powering our two approved agency growth systems."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Small Business Breakdown */}
            <div className="matte-card p-8 rounded-2xl border border-[#22222E]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#D4AF37]">PACKAGE 01 FOUNDATION</span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading mb-3">
                Small Business: Lead Generation System
              </h3>
              <p className="text-xs text-[#95959F] leading-relaxed mb-6">
                Engineered for emerging businesses requiring an immediate, low-friction channel to acquire customer conversations without the overhead of complex CRM pipelines.
              </p>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                  <span className="font-bold text-white block mb-1">Core Advertising (Meta Ads):</span>
                  <p className="text-[#8E8E98]">
                    Strategic ad campaigns across Facebook and Instagram targeting localized or demographically refined audiences.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                  <span className="font-bold text-white block mb-1">Click-to-WhatsApp Funnel:</span>
                  <p className="text-[#8E8E98]">
                    Ad clicks open a direct WhatsApp conversation, removing the friction of complex web forms for local and service buyers.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                  <span className="font-bold text-white block mb-1">WhatsApp Business Setup & Quick Replies:</span>
                  <p className="text-[#8E8E98]">
                    We configure your business profile, greeting messages, away alerts, and standard FAQ quick-replies.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                  <span className="font-bold text-white block mb-1">Basic Google Business Profile & Tracking:</span>
                  <p className="text-[#8E8E98]">
                    Profile audit and conversion tracking setup so we can measure message starts and ad attribution.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                  <span className="font-bold text-white block mb-1">Follow-up Outreach Templates:</span>
                  <p className="text-[#8E8E98]">
                    Direct-response text and script templates for your team to manually follow up and close conversations.
                  </p>
                </div>
              </div>
            </div>

            {/* Medium Business Breakdown */}
            <div className="matte-card p-8 rounded-2xl border-2 border-[#D4AF37]/50 shadow-xl shadow-[#D4AF37]/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-[#D4AF37]">PACKAGE 02 FOUNDATION (EXPANDED)</span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading mb-3">
                Medium Business: Lead + Sales Growth System
              </h3>
              <p className="text-xs text-[#95959F] leading-relaxed mb-6">
                Engineered for growing companies that have validated their offering and need multi-channel demand harvesting, dedicated landing pages, and speed-to-lead automation.
              </p>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                  <span className="font-bold text-[#FFF0BE] block mb-1">Includes Small Business Foundation, PLUS:</span>
                  <p className="text-[#8E8E98]">
                    All core advertising, creative design, tracking, and Google Business Profile foundations are preserved.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                  <span className="font-bold text-white block mb-1">Google Ads (Search & Demand Interception):</span>
                  <p className="text-[#8E8E98]">
                    Captures high-intent search queries at the exact moment buyers seek solutions, using tight keyword clustering.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                  <span className="font-bold text-white block mb-1">Omnichannel Retargeting Sequences:</span>
                  <p className="text-[#8E8E98]">
                    Recaptures dropped prospects across Meta and Google display networks with objection-handling creative sequences.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                  <span className="font-bold text-white block mb-1">Dedicated Conversion Landing Pages:</span>
                  <p className="text-[#8E8E98]">
                    Fast, custom-coded mobile-first landing pages engineered with multi-step qualification gates that eliminate spam.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                  <span className="font-bold text-white block mb-1">CRM & Lead Management Pipeline:</span>
                  <p className="text-[#8E8E98]">
                    Full deal stage synchronization in your CRM, ensuring complete visibility over lead status and sales rep assignment.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                  <span className="font-bold text-white block mb-1">Automated Sales & Follow-up Systems:</span>
                  <p className="text-[#8E8E98]">
                    Instant automated response cadences (under 5 minutes) via SMS and email, booking calendar appointments before prospects decay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 6. SUITABLE BUSINESS STAGE */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12]">
        <Container width="wide">
          <SectionHeading
            eyebrow="Stage Alignment"
            title="Which Package Matches"
            goldGradientText="Your Business Stage?"
            description="Selecting the right acquisition system ensures capital efficiency and prevents operational bottlenecks."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1A1A22] text-[#D4AF37] flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  Small Business System Is Ideal If:
                </h3>
                <ul className="space-y-2 text-xs text-[#95959F]">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You need fast, direct prospect conversations via WhatsApp or Messenger.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You do not currently operate a complex multi-stage CRM pipeline.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Your primary goal is establishing predictable initial inquiry flow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You have dedicated team members to manually respond to chat inquiries.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between border-[#D4AF37]/40 bg-gradient-to-b from-[#181822] to-[#101016]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#242434] text-[#D4AF37] flex items-center justify-center mb-4 border border-[#D4AF37]/30">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  Medium Business System Is Ideal If:
                </h3>
                <ul className="space-y-2 text-xs text-[#C5C5D2]">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You want both social demand (Meta) and active search intent (Google Ads).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You need dedicated landing pages with qualification friction to filter spam.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Leads have decayed in the past due to slow manual response times.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You require automated speed-to-lead follow-up sequences and CRM routing.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between border-dashed border-[#343440] bg-[#101014]/60">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1A1A22] text-[#80808C] flex items-center justify-center mb-4">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#A0A0AA] mb-2 font-heading">
                  [Package 3 - UNCONFIRMED]
                </h3>
                <p className="text-xs text-[#80808C] leading-relaxed mb-4">
                  The third package tier remains unconfirmed by the business owner. No assumptions regarding its scope, target stage, or pricing are made.
                </p>
                <div className="p-3 rounded-lg bg-[#141419] border border-[#22222B] text-[11px] font-mono text-amber-400">
                  Status: Awaiting Owner Approval
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 7. DIFFERENCES BETWEEN PACKAGES */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22]">
        <Container width="standard">
          <SectionHeading
            eyebrow="Architectural Distinction"
            title="Core Differences Between"
            goldGradientText="Our Two Systems"
            description="Transparently contrasting the operational mechanics between the Small and Medium Business packages."
            className="mb-14"
          />

          <div className="space-y-6">
            <div className="matte-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 p-3 rounded-xl bg-[#1A1A22] text-[#D4AF37]">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1 font-heading">
                  Single-Channel vs. Omnichannel Acquisition
                </h4>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  The Small Business system focuses exclusively on Core Advertising (Meta Ads) to maximize budget concentration on social feeds. The Medium Business system pairs Meta Ads with Google Search, intercepting active solution-seekers and capturing high-intent commercial volume simultaneously.
                </p>
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 p-3 rounded-xl bg-[#1A1A22] text-[#D4AF37]">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1 font-heading">
                  Direct Messaging vs. Dedicated Landing Pages & Qualification
                </h4>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  Small Business routes prospects straight into a structured WhatsApp chat. Medium Business routes traffic into custom-coded, mobile-first Landing Pages featuring multi-step qualification gates that screen for budget, timeline, and fit before reaching your sales team.
                </p>
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 p-3 rounded-xl bg-[#1A1A22] text-[#D4AF37]">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1 font-heading">
                  Manual Templates vs. Automated Speed-to-Lead Workflows
                </h4>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  Small Business provides your team with tested outreach templates for manual communication. Medium Business automates the entire process: inquiries trigger automated SMS and email sequences within 5 minutes, synchronizing with your CRM pipeline to eliminate lead decay.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 8. PACKAGING FAQS */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12]">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Commercial Clarity"
            title="Packaging & Pricing FAQs"
            description="Clear answers regarding our pricing policy, ad spend management, and package transitions."
            className="mb-12"
          />

          <FAQAccordion
            items={[
              {
                id: 'pkg-faq-1',
                question: 'Why do the packages display [PRICE TO BE ADDED]?',
                answer: 'In strict compliance with our governance rules, ADVERUNE only publishes verified, business-owner-approved pricing figures. Until the final fee schedule is formally approved, all tiers display [PRICE TO BE ADDED] to ensure full commercial transparency without speculation.'
              },
              {
                id: 'pkg-faq-2',
                question: 'Is media spend included in the package fee?',
                answer: 'No. Advertising spend is paid directly by the client to Meta and Google Ads. This ensures 100% financial transparency: you always know exactly how much capital goes toward ad distribution versus management and systems engineering.'
              },
              {
                id: 'pkg-faq-3',
                question: 'Can a client begin with the Small Business system and upgrade later?',
                answer: 'Yes. Many clients start with the Lead Generation System to establish predictable messaging and immediate lead flow, then transition into the Lead + Sales Growth System once they have sales capacity to handle Google Search, landing pages, and CRM automation.'
              },
              {
                id: 'pkg-faq-4',
                question: 'What is the status of Package 3?',
                answer: 'Package 3 is currently unconfirmed. In accordance with strict project rules, we do not invent its title, inclusions, pricing, or deliverables until supplied and authorized by the business owner.'
              },
              {
                id: 'pkg-faq-5',
                question: 'Who owns the ad accounts and landing page assets?',
                answer: 'You do. The client maintains 100% ownership of their ad accounts, pixel data, WhatsApp numbers, domains, and custom landing page code. We operate strictly through delegated partner access.'
              }
            ]}
            defaultOpenId="pkg-faq-1"
          />
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 9. CONSULTATION CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#0A0A0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2 font-mono">
            Structured Onboarding
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Ready to Select Your <br />
            <span className="gold-text-gradient">Acquisition System?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#92929D] max-w-xl mx-auto leading-relaxed mb-8">
            Submit your business profile and target advertising budget. Our senior strategists will review your current customer journey and provide a tailored system proposal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Request System Proposal
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('services')}>
              Review All 11 Services
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
