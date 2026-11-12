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
  AlertCircle,
  TrendingUp,
  Zap
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

  // Structured Comparison Matrix Data for All 3 Systems
  const comparisonRows = [
    {
      feature: 'Core Advertising (Meta Ads)',
      category: 'Traffic & Media',
      leadGen: 'Included (Feed & Story)',
      growth: 'Included (Feed, Story, Reels)',
      fullGrowth: 'Included (Full-Funnel Omnichannel)'
    },
    {
      feature: 'Direct-Response Ad Creatives',
      category: 'Traffic & Media',
      leadGen: 'Included (Static Ad Formats)',
      growth: 'Included (Direct-Response Variants)',
      fullGrowth: 'Included (Static + Video Cuts)'
    },
    {
      feature: 'Click-to-WhatsApp Architecture',
      category: 'Traffic & Media',
      leadGen: 'Included (Direct Message Funnel)',
      growth: 'Included (Alternative Flow)',
      fullGrowth: 'Included (Custom Routing Protocol)'
    },
    {
      feature: 'WhatsApp Setup & Profile Routing',
      category: 'Lead Capture',
      leadGen: 'Included (Greeting & Quick Replies)',
      growth: 'Included (Integrated with CRM)',
      fullGrowth: 'Included (CRM & API Synchronized)'
    },
    {
      feature: 'Lead Tracking & Pixel Setup',
      category: 'Tracking & Data',
      leadGen: 'Included (Standard Conversion Events)',
      growth: 'Included (Server-Side Meta CAPI)',
      fullGrowth: 'Included (Server-Side CAPI & GTM Setup)'
    },
    {
      feature: 'Google Business Profile Optimization',
      category: 'Local Presence',
      leadGen: 'Included (Profile Audit & Setup)',
      growth: 'Included (Enhanced Optimization)',
      fullGrowth: 'Included (Comprehensive Authority Setup)'
    },
    {
      feature: 'Follow-up Outreach Scripts & Templates',
      category: 'Sales Enablement',
      leadGen: 'Included (Manual Outreach Scripts)',
      growth: 'Included (Automated Multi-Channel)',
      fullGrowth: 'Included (Automated Cadences & Playbooks)'
    },
    {
      feature: 'Performance Reporting & Audits',
      category: 'Reporting',
      leadGen: 'Included (Bi-Weekly Summary)',
      growth: 'Included (Weekly Optimization Sprints)',
      fullGrowth: 'Included (Weekly Sprints & Custom Dashboards)'
    },
    {
      feature: 'Google Ads (High-Intent Search)',
      category: 'Traffic & Media',
      leadGen: 'Not Included (Limitation)',
      growth: 'Included (Search & PMax)',
      fullGrowth: 'Included (Search, Display & PMax Scaling)'
    },
    {
      feature: 'Omnichannel Retargeting Sequences',
      category: 'Traffic & Media',
      leadGen: 'Not Included (Limitation)',
      growth: 'Included (Meta + Google)',
      fullGrowth: 'Included (Omnichannel Retargeting Across Networks)'
    },
    {
      feature: 'Dedicated Conversion Landing Pages',
      category: 'Lead Capture',
      leadGen: 'Not Included (Limitation)',
      growth: 'Included (Mobile-First Landing Page)',
      fullGrowth: 'Included (Full-Funnel Custom Landing Page Build)'
    },
    {
      feature: 'CRM & Lead Management Pipeline',
      category: 'Sales Enablement',
      leadGen: 'Not Included (Limitation)',
      growth: 'Included (Pipeline Stages & Routing)',
      fullGrowth: 'Included (Deal Pipeline, Scoring & Assignment)'
    },
    {
      feature: 'Lead Qualification Gates',
      category: 'Lead Capture',
      leadGen: 'Not Included (Limitation)',
      growth: 'Included (Multi-Step Friction Filters)',
      fullGrowth: 'Included (Multi-Step Logic & Qualification)'
    },
    {
      feature: 'Automated Sales & Follow-up Systems',
      category: 'Sales Enablement',
      leadGen: 'Not Included (Limitation)',
      growth: 'Included (< 5 Min Speed-to-Lead)',
      fullGrowth: 'Included (Instant Speed-to-Lead SMS, Email & Booking)'
    },
    {
      feature: 'Video and Content Production',
      category: 'Creative & Assets',
      leadGen: 'Not Included (Limitation)',
      growth: 'Not Included (Limitation)',
      fullGrowth: 'Included (Hook Scripts & Direct Edits)'
    },
    {
      feature: 'Strategic Direction & Oversight',
      category: 'Account Management',
      leadGen: 'Standard Technical Support',
      growth: 'Priority Strategic Support',
      fullGrowth: 'Included (Dedicated Senior Strategist)'
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
                <span className="font-semibold text-[#D4AF37]">Commercial Pricing:</span>{' '}
                ADVERUNE operates with verified investment ranges (₹15,000 – ₹5,00,000) structured by channel scope and organizational stage. Advertising media spend is paid directly by clients to ad networks.
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
              ADVERUNE designs complete systems. The <span className="text-white font-semibold">Lead Generation System</span> (₹15,000 – ₹45,000) establishes immediate, direct customer communication via Core Advertising and WhatsApp. The <span className="text-white font-semibold">Lead + Sales Growth System</span> (₹40,000 – ₹1,25,000) adds Google Search, omnichannel retargeting, dedicated landing pages, CRM integration, and automated speed-to-lead response sequences. The <span className="text-white font-semibold">Full Growth & Performance System</span> (₹1,00,000 – ₹5,00,000) provides comprehensive multi-channel infrastructure, video content production, custom funnels, and advanced attribution.
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
            description="Explore our three engineered acquisition packages tailored to match your company's revenue stage and operational capacity."
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
              Compare exact features across the Lead Generation, Lead + Sales Growth, and Full Growth & Performance systems. Critical inclusions and stage boundaries are explicitly marked.
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
                    Lead Generation System
                    <span className="block text-[11px] text-[#D4AF37] font-mono font-bold mt-0.5">
                      ₹15,000 – ₹45,000
                    </span>
                  </th>
                  <th scope="col" className="py-4 px-6 font-bold text-[#FFF0BE] uppercase tracking-wider text-[11px] w-1/5 bg-[#181824] border-x border-[#2A2A38]">
                    Lead + Sales Growth
                    <span className="block text-[11px] text-[#D4AF37] font-mono font-bold mt-0.5">
                      ₹40,000 – ₹1,25,000
                    </span>
                  </th>
                  <th scope="col" className="py-4 px-6 font-bold text-white uppercase tracking-wider text-[11px] w-1/5">
                    Full Growth & Performance
                    <span className="block text-[11px] text-[#D4AF37] font-mono font-bold mt-0.5">
                      ₹1,00,000 – ₹5,00,000
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C26]">
                {comparisonRows.map((row, idx) => {
                  const isLeadGenLimitation = row.leadGen.includes('Not Included');
                  const isGrowthLimitation = row.growth.includes('Not Included');

                  return (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-[#101016]' : 'bg-[#0D0D12]'}
                    >
                      <th scope="row" className="py-3.5 px-6 font-medium text-white text-left font-normal">
                        <div className="font-semibold">{row.feature}</div>
                        <span className="text-[10px] text-[#8E8E98] font-mono">{row.category}</span>
                      </th>

                      {/* Lead Gen */}
                      <td className="py-3.5 px-6">
                        {isLeadGenLimitation ? (
                          <div className="flex items-center gap-1.5 text-red-400 font-medium">
                            <XCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
                            <span>Not Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[#D8D8E0]">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                            <span>{row.leadGen}</span>
                          </div>
                        )}
                      </td>

                      {/* Growth (Highlighted Column) */}
                      <td className="py-3.5 px-6 bg-[#14141E] border-x border-[#2A2A38]">
                        {isGrowthLimitation ? (
                          <div className="flex items-center gap-1.5 text-red-400 font-medium">
                            <XCircle className="w-4 h-4 shrink-0 text-red-400" aria-hidden="true" />
                            <span>Not Included</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-white font-medium">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                            <span>{row.growth}</span>
                          </div>
                        )}
                      </td>

                      {/* Full Growth */}
                      <td className="py-3.5 px-6 text-[#D8D8E0]">
                        <div className="flex items-center gap-1.5 text-white font-medium">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                          <span>{row.fullGrowth}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* Investment Row */}
                <tr className="bg-[#14141E] border-t-2 border-[#262638]">
                  <th scope="row" className="py-4 px-6 font-bold text-white uppercase tracking-wider text-[11px] text-left">
                    Investment Range
                  </th>
                  <td className="py-4 px-6 font-bold text-white font-heading text-sm sm:text-base">
                    ₹15,000 – ₹45,000
                  </td>
                  <td className="py-4 px-6 font-bold text-[#D4AF37] font-heading text-sm sm:text-base bg-[#181826] border-x border-[#2A2A38]">
                    ₹40,000 – ₹1,25,000
                  </td>
                  <td className="py-4 px-6 font-bold text-white font-heading text-sm sm:text-base">
                    ₹1,00,000 – ₹5,00,000
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
                      aria-label="Inquire about Lead Generation System package"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#181820] hover:bg-[#20202B] text-white font-semibold text-xs border border-[#2B2B38] hover:border-[#D4AF37]/50 transition-all cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    >
                      Inquire Lead Gen
                    </button>
                  </td>
                  <td className="py-4 px-6 bg-[#14141E] border-x border-[#2A2A38]">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPackage(APPROVED_PACKAGES[1]);
                        onNavigate('contact');
                      }}
                      aria-label="Inquire about Lead + Sales Growth System package"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFF0BE] via-[#D4AF37] to-[#B8860B] hover:brightness-110 text-black font-bold text-xs transition-all cursor-pointer shadow-md min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                      Inquire Growth System
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPackage(APPROVED_PACKAGES[2]);
                        onNavigate('contact');
                      }}
                      aria-label="Inquire about Full Growth & Performance System package"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#181820] hover:bg-[#20202B] text-white font-semibold text-xs border border-[#2B2B38] hover:border-[#D4AF37]/50 transition-all cursor-pointer min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    >
                      Inquire Full Growth
                    </button>
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
            goldGradientText="In Each System"
            description="A detailed analysis of the core components powering our three commercial growth systems."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Lead Generation System Breakdown */}
            <div className="matte-card p-7 sm:p-8 rounded-2xl border border-[#22222E] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">PACKAGE 01 FOUNDATION</span>
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-2">
                  Lead Generation System
                </h3>
                <div className="text-xs font-mono font-semibold text-[#D4AF37] mb-3">
                  ₹15,000 – ₹45,000
                </div>
                <p className="text-xs text-[#95959F] leading-relaxed mb-6">
                  Engineered for emerging businesses requiring an immediate, low-friction channel to acquire customer conversations without the overhead of complex CRM pipelines.
                </p>

                <div className="space-y-3.5 text-xs">
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
            </div>

            {/* Lead + Sales Growth System Breakdown */}
            <div className="matte-card p-7 sm:p-8 rounded-2xl border-2 border-[#D4AF37]/50 shadow-xl shadow-[#D4AF37]/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">PACKAGE 02 ACCELERATION</span>
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-2">
                  Lead + Sales Growth System
                </h3>
                <div className="text-xs font-mono font-semibold text-[#D4AF37] mb-3">
                  ₹40,000 – ₹1,25,000
                </div>
                <p className="text-xs text-[#95959F] leading-relaxed mb-6">
                  Engineered for growing companies that have validated their offering and need multi-channel demand harvesting, dedicated landing pages, and speed-to-lead automation.
                </p>

                <div className="space-y-3.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                    <span className="font-bold text-[#FFF0BE] block mb-1">Includes Lead Generation Foundation, PLUS:</span>
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

            {/* Full Growth & Performance System Breakdown */}
            <div className="matte-card p-7 sm:p-8 rounded-2xl border border-[#2A2A38] hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">PACKAGE 03 SCALE & PERFORMANCE</span>
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-2">
                  Full Growth & Performance System
                </h3>
                <div className="text-xs font-mono font-semibold text-[#D4AF37] mb-3">
                  ₹1,00,000 – ₹5,00,000
                </div>
                <p className="text-xs text-[#95959F] leading-relaxed mb-6">
                  Engineered for scaling enterprises requiring end-to-end multi-channel paid acquisition, short-form video creative production, custom funnels, and advanced revenue operations.
                </p>

                <div className="space-y-3.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#14141E] border border-[#2B2B38]">
                    <span className="font-bold text-[#FFF0BE] block mb-1">Includes Lead + Sales Growth Foundation, PLUS:</span>
                    <p className="text-[#8E8E98]">
                      All Meta, Google Ads, retargeting, WhatsApp routing, and CRM pipeline structures are included.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="font-bold text-white block mb-1">Video and Content Production:</span>
                    <p className="text-[#8E8E98]">
                      Hook-focused short-form video scripts, product demo cuts, and continuous direct-response creative iteration.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="font-bold text-white block mb-1">Advanced Server-Side Attribution:</span>
                    <p className="text-[#8E8E98]">
                      First-party server-side tracking (Meta CAPI & GTM server containers) to eliminate cookie decay and restore attribution accuracy.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="font-bold text-white block mb-1">Full-Funnel Custom Landing Page Build:</span>
                    <p className="text-[#8E8E98]">
                      Multi-stage interactive qualification environments engineered with friction gates that eliminate low-intent submissions.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="font-bold text-white block mb-1">Strategic Growth & Channel Scaling:</span>
                    <p className="text-[#8E8E98]">
                      Dedicated senior strategist, omnichannel budget scaling protocols, and weekly optimization sprints.
                    </p>
                  </div>
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
                  Lead Generation System Is Ideal If:
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
                    <span>You have team members ready to manually respond to chat inquiries.</span>
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
                  Lead + Sales Growth System Is Ideal If:
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

            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between border border-[#2A2A38] bg-[#101016]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#1A1A22] text-[#D4AF37] flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">
                  Full Growth & Performance System Is Ideal If:
                </h3>
                <ul className="space-y-2 text-xs text-[#95959F]">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You require comprehensive multi-channel paid acquisition across Meta and Google.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You need short-form direct-response video creative production and rapid iteration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>You want custom multi-step funnels with friction gates and server-side tracking.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Your sales team needs automated speed-to-lead cadences and CRM pipeline routing.</span>
                  </li>
                </ul>
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
            goldGradientText="Our Three Systems"
            description="Transparently contrasting the operational mechanics across the Lead Generation, Lead + Sales Growth, and Full Growth systems."
            className="mb-14"
          />

          <div className="space-y-6">
            <div className="matte-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 p-3 rounded-xl bg-[#1A1A22] text-[#D4AF37]">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1 font-heading">
                  Single-Channel Focus vs. Multi-Channel vs. Omnichannel Scale
                </h4>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  The Lead Generation System concentrates media budget on Core Advertising (Meta Ads) for immediate social volume. The Lead + Sales Growth System pairs Meta Ads with Google Search intent. The Full Growth & Performance System coordinates search, social, short-form video production, and omnichannel retargeting into one unified ecosystem.
                </p>
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 p-3 rounded-xl bg-[#1A1A22] text-[#D4AF37]">
                <Globe className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1 font-heading">
                  Direct Messaging vs. Dedicated Landing Pages vs. Multi-Stage Qualification Funnels
                </h4>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  Lead Generation routes prospects straight into a structured WhatsApp chat. Lead + Sales Growth routes traffic into mobile-first landing pages with qualification gates. Full Growth & Performance builds custom multi-step interactive funnels with friction gates and server-side tracking that screen for budget, timeline, and fit.
                </p>
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
              <div className="shrink-0 p-3 rounded-xl bg-[#1A1A22] text-[#D4AF37]">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1 font-heading">
                  Manual Templates vs. Automated Speed-to-Lead vs. Full Revenue Operations Sync
                </h4>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  Lead Generation equips your team with tested outreach templates for manual communication. Lead + Sales Growth automates speed-to-lead response sequences within 5 minutes. Full Growth & Performance integrates multi-channel appointment booking, automated deal stage synchronization, and rep assignment directly into your CRM.
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
            description="Clear answers regarding our pricing ranges, ad spend management, and package transitions."
            className="mb-12"
          />

          <FAQAccordion
            items={[
              {
                id: 'pkg-faq-1',
                question: 'How is the investment range structured for each system?',
                answer: 'ADVERUNE packages feature verified investment tiers: Lead Generation System (₹15,000 – ₹45,000), Lead + Sales Growth System (₹40,000 – ₹1,25,000), and Full Growth & Performance System (₹1,00,000 – ₹5,00,000). The exact investment within each range is tailored to your required channel footprint, creative production cadence, and custom technical integrations.'
              },
              {
                id: 'pkg-faq-2',
                question: 'Is media spend included in the package fee?',
                answer: 'No. Advertising spend is paid directly by the client to Meta and Google Ads. This ensures 100% financial transparency: you always know exactly how much capital goes toward ad distribution versus management and systems engineering.'
              },
              {
                id: 'pkg-faq-3',
                question: 'Can a client begin with the Lead Generation System and upgrade later?',
                answer: 'Yes. Many clients start with the Lead Generation System to establish predictable messaging and immediate lead flow, then transition into the Lead + Sales Growth System once they have sales capacity to handle Google Search, landing pages, and CRM automation.'
              },
              {
                id: 'pkg-faq-4',
                question: 'What is included in the Full Growth & Performance System?',
                answer: 'The Full Growth & Performance System (₹1,00,000 – ₹5,00,000) is our comprehensive acquisition infrastructure designed for scaling companies. It includes full omnichannel paid advertising (Meta & Google), short-form direct-response video creative production, custom high-converting landing pages, advanced server-side CAPI tracking, CRM pipeline integration, and automated speed-to-lead response workflows.'
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
