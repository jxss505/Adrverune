/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Search,
  BookOpen,
  Target,
  Sparkles,
  Settings,
  Rocket,
  Compass,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
  ChevronRight,
  Check,
  FileCheck2,
  Users,
  Lock
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { NavRoute } from '../types';

interface ProcessPageProps {
  onNavigate: (route: NavRoute) => void;
}

interface ProcessStage {
  number: string;
  id: string;
  name: string;
  timeline: string;
  headline: string;
  summary: string;
  whatWeDo: string[];
  clientInvolvement: string;
  deliverables: string[];
  icon: React.ElementType;
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    id: 'stage-1-discovery',
    name: 'Discovery',
    timeline: 'Days 1–3',
    headline: 'Understand the Business, Product and Core Commercial Objective',
    summary: 'Every partnership begins with a thorough diagnostic assessment of your commercial offer, unit economics, existing sales channels, and target growth goals.',
    icon: Search,
    whatWeDo: [
      'Conduct a structured intake review of your product/service offering',
      'Audit existing digital assets, ad accounts, and conversion tracking',
      'Examine current lead qualification bottlenecks and sales conversion rates',
      'Establish clear baseline KPIs: target Cost Per Acquisition (CPA) and Lead targets'
    ],
    clientInvolvement: 'Complete structured onboarding intake questionnaire and grant delegated partner access to ad platforms.',
    deliverables: ['Discovery Brief', 'Historical Account Health Audit', 'Baseline Target KPI Alignment']
  },
  {
    number: '02',
    id: 'stage-2-research',
    name: 'Research',
    timeline: 'Days 4–6',
    headline: 'Understand the Target Audience, Market and Competitive Environment',
    summary: 'We conduct comprehensive market and audience research to uncover how your target decision-makers evaluate, choose, and purchase commercial solutions.',
    icon: BookOpen,
    whatWeDo: [
      'Identify primary customer pain points, buying objections, and emotional triggers',
      'Analyze competitor ad messaging, keyword strategies, and landing page positioning',
      'Segment the target market into high-intent audience clusters and buying personas',
      'Map the buyer journey from initial discovery to final sales inquiry'
    ],
    clientInvolvement: 'Provide feedback on historical customer questions and typical sales objections encountered by your team.',
    deliverables: ['Audience Persona Breakdown', 'Competitor Ad Landscape Matrix', 'Buyer Journey Map']
  },
  {
    number: '03',
    id: 'stage-3-strategy',
    name: 'Strategy',
    timeline: 'Days 7–9',
    headline: 'Develop an Appropriate Advertising and Marketing Plan',
    summary: 'With discovery and research established, we engineer the complete campaign architecture: channel allocation, funnel paths, and budget pacing.',
    icon: Target,
    whatWeDo: [
      'Determine the optimal paid channel mix (Meta Ads vs. Google Search intent)',
      'Design the conversion funnel structure (Click-to-WhatsApp vs. Dedicated Landing Page)',
      'Formulate direct-response core offers, value hooks, and qualification gates',
      'Draft the multi-touch retargeting sequence and frequency capping guidelines'
    ],
    clientInvolvement: 'Review and formally approve the strategic campaign plan, offer formulation, and budget allocation.',
    deliverables: ['Complete Campaign Strategy Document', 'Funnel Architecture Blueprint', 'Media Budget Allocation Plan']
  },
  {
    number: '04',
    id: 'stage-4-creative-development',
    name: 'Creative Development',
    timeline: 'Days 10–14',
    headline: 'Prepare Concepts, Direct-Response Messages and Creatives',
    summary: 'Our creative team designs, scripts, and produces high-craft direct-response visual assets and landing pages engineered to command feed attention.',
    icon: Sparkles,
    whatWeDo: [
      'Write persuasive direct-response ad copy targeting specific audience pain points',
      'Design high-contrast static ad units, carousels, and offer badges',
      'Script short-form video hooks optimized for sound-off mobile feed consumption',
      'Develop conversion landing page layouts with structured qualification forms'
    ],
    clientInvolvement: 'Review creative batches and landing page copy to ensure complete brand tone consistency.',
    deliverables: ['Direct-Response Ad Creative Suite', 'Video Scripts & Hook Cuts', 'Custom Landing Page Environment']
  },
  {
    number: '05',
    id: 'stage-5-campaign-setup',
    name: 'Campaign Setup',
    timeline: 'Days 15–17',
    headline: 'Configure the Approved Marketing Activities and Infrastructure',
    summary: 'We build out the technical campaign infrastructure inside your dedicated ad accounts, wiring conversion tracking and automated routing before launch.',
    icon: Settings,
    whatWeDo: [
      'Build campaign structures inside client-owned Meta Ads Manager and Google Ads',
      'Configure audience clusters, search keyword match types, and negative keyword lists',
      'Implement server-side Meta Conversions API (CAPI) and Google Tag Manager events',
      'Set up speed-to-lead notification webhooks and CRM pipeline stage routing'
    ],
    clientInvolvement: 'Approve final campaign staging inside client ad accounts prior to budget activation.',
    deliverables: ['Configured Campaign Hierarchy', 'Verified Server-Side Tracking Pipeline', 'Automated Lead Routing Workflows']
  },
  {
    number: '06',
    id: 'stage-6-execution',
    name: 'Execution',
    timeline: 'Go-Live (Day 18)',
    headline: 'Launch and Manage the Approved Advertising Campaigns',
    summary: 'Campaigns go live under controlled initial pacing, actively monitoring auction dynamics, delivery health, and early click-through behavior.',
    icon: Rocket,
    whatWeDo: [
      'Execute controlled campaign activation across approved networks',
      'Monitor real-time delivery status, auction impressions, and ad approvals',
      'Perform live lead test submissions to verify instantaneous notification delivery',
      'Ensure ad spend paces accurately without auction volatility'
    ],
    clientInvolvement: 'Notify ADVERUNE when the first live inquiries arrive to confirm sales rep notification receipt.',
    deliverables: ['Live Campaign Deployment', 'End-to-End Test Lead Verification', 'Go-Live Status Confirmation']
  },
  {
    number: '07',
    id: 'stage-7-tracking',
    name: 'Tracking',
    timeline: 'Ongoing Daily',
    headline: 'Monitor Relevant Advertising and Inbound Lead Data',
    summary: 'We monitor lead flow, click-through rates, cost per lead, and CRM status updates daily to ensure full attribution accuracy.',
    icon: Compass,
    whatWeDo: [
      'Track Cost Per Lead (CPL) and Cost Per Qualified Lead (CPQL) continuously',
      'Monitor search term reports on Google Ads to identify search intent patterns',
      'Analyze creative fatigue indicators: frequency levels, CPM spikes, and CTR shifts',
      'Verify that CRM deal stages stay in sync with advertising touchpoints'
    ],
    clientInvolvement: 'Provide weekly updates on lead close rates and sales qualification feedback.',
    deliverables: ['Live Performance Dashboard', 'Daily Delivery Monitoring', 'Attribution Verification Logs']
  },
  {
    number: '08',
    id: 'stage-8-optimisation',
    name: 'Optimisation',
    timeline: 'Ongoing Sprints',
    headline: 'Use Available Performance Data to Recommend and Execute Improvements',
    summary: 'We operate continuous optimization sprints: pruning underperforming keywords, rotating fresh creative hooks, and scaling winning ad sets.',
    icon: TrendingUp,
    whatWeDo: [
      'Prune underperforming keywords and add emerging negative search terms',
      'Rotate fatigued ad creative variants with fresh direct-response iterations',
      'Calibrate bid targets based on verified conversion cost trends',
      'Optimize landing page headline variants and multi-step form questions'
    ],
    clientInvolvement: 'Participate in bi-weekly strategic reviews to discuss scaling milestones and pipeline growth.',
    deliverables: ['Weekly Tactical Iteration Sprints', 'Bi-Weekly Executive Strategy Reviews', 'Budget Scaling Recommendations']
  }
];

export function ProcessPage({ onNavigate }: ProcessPageProps) {
  const [activeStageId, setActiveStageId] = useState<string>('stage-1-discovery');

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. PROCESS HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1A22] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The 8-Stage Engineering Methodology</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6">
            Predictable Execution. <br className="hidden sm:inline" />
            <span className="gold-text-gradient">From Discovery to Scale.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9E9EA8] font-normal leading-relaxed mb-8">
            We demystify digital advertising. Explore our structured 8-stage operational methodology—built to eliminate guesswork and replace disorganized agency retainers with transparent, accountable engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Initiate Stage 1: Discovery
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('packages')}>
              View Growth Packages
            </SecondaryButton>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROCESS JOURNEY OVERVIEW (Horizontal Flow Bar) */}
      {/* ========================================================================= */}
      <section className="py-4 sm:py-6 border-b border-[#1A1A22] bg-[#0E0E12] relative md:sticky md:top-20 z-30 backdrop-blur-md bg-[#0E0E12]/95">
        <Container width="wide">
          <div className="flex items-center justify-start lg:justify-between overflow-x-auto gap-2 sm:gap-3 py-1 scrollbar-none" role="tablist" aria-label="8-stage methodology stages">
            {PROCESS_STAGES.map((stage) => {
              const IconComponent = stage.icon;
              const isActive = activeStageId === stage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={stage.id}
                  onClick={() => {
                    setActiveStageId(stage.id);
                    const el = document.getElementById(stage.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`
                    min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none shrink-0
                    ${
                      isActive
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                        : 'bg-[#14141A] text-[#A5A5B2] border-[#22222C] hover:border-[#D4AF37]/40 hover:text-white'
                    }
                  `}
                >
                  <span className="font-mono text-[10px] font-bold">{stage.number}</span>
                  <span>{stage.name}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. DETAILED 8 STAGES BREAKDOWN */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 space-y-12">
        <Container width="standard">
          <div className="space-y-12">
            {PROCESS_STAGES.map((stage, idx) => {
              const IconComp = stage.icon;

              return (
                <div
                  key={stage.id}
                  id={stage.id}
                  className="matte-card p-8 sm:p-10 rounded-3xl border border-[#22222C] scroll-mt-36 relative overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/35"
                >
                  {/* Background Step Watermark */}
                  <div className="absolute top-6 right-8 text-7xl font-extrabold text-[#181822] font-mono select-none pointer-events-none">
                    {stage.number}
                  </div>

                  <div className="relative z-10 space-y-6">
                    {/* Header Lockup */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#D4AF37]">
                            Stage {stage.number}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181820] text-[#7A7A85] border border-[#262630]">
                            {stage.timeline}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                          Stage {stage.number}: {stage.name}
                        </h2>
                      </div>
                    </div>

                    {/* Headline & Summary */}
                    <div className="border-b border-[#1C1C24] pb-5 space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#F0F0F5] font-heading">
                        {stage.headline}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">
                        {stage.summary}
                      </p>
                    </div>

                    {/* What We Do */}
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-white block font-mono">
                        Stage Execution Activities:
                      </span>
                      <div className="space-y-2">
                        {stage.whatWeDo.map((item, wIdx) => (
                          <div key={wIdx} className="flex items-start gap-2.5 text-xs text-[#C5C5D0]">
                            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Client Role & Deliverables */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1C1C24]">
                      <div className="p-4 rounded-xl bg-[#121217] border border-[#1E1E28]">
                        <span className="text-[10px] uppercase font-mono font-bold text-[#D4AF37] block mb-1">
                          Client Collaboration:
                        </span>
                        <p className="text-xs text-[#8E8E98] leading-relaxed">
                          {stage.clientInvolvement}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#121217] border border-[#1E1E28]">
                        <span className="text-[10px] uppercase font-mono font-bold text-white block mb-1">
                          Stage Deliverables:
                        </span>
                        <div className="space-y-1">
                          {stage.deliverables.map((del, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                              <span>{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. CLIENT COLLABORATION & GOVERNANCE */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 border-t border-[#1A1A22] bg-[#0E0E12]">
        <Container width="wide">
          <SectionHeading
            eyebrow="Operating Standards"
            title="How We Maintain Quality"
            goldGradientText="Throughout the Journey"
            description="Our process is engineered with clear checkpoints so you always know what is being built, when it launches, and how it performs."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-[#121218] border border-[#20202A]">
              <div className="w-9 h-9 rounded-lg bg-[#181822] text-[#D4AF37] flex items-center justify-center mb-3">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">Approval Gates Before Spend</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                Zero advertising capital is deployed until you review and formally authorize the campaign strategy, creative assets, and landing page environment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121218] border border-[#20202A]">
              <div className="w-9 h-9 rounded-lg bg-[#181822] text-[#D4AF37] flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">Structured Reporting Cadence</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                No automated, confusing 40-page PDF reports. We provide concise asynchronous updates and bi-weekly strategic syncs focused on revenue impact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121218] border border-[#20202A]">
              <div className="w-9 h-9 rounded-lg bg-[#181822] text-[#D4AF37] flex items-center justify-center mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">Continuous IP Ownership</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                All landing page code, ad copy, creative variants, and pixel data developed during the 8 stages belong 100% to your company.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. FINAL PROCESS CTA */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#0A0A0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2 font-mono">
            Get Started
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Initiate Stage 1: <br />
            <span className="gold-text-gradient">The Growth Discovery Audit</span>
          </h2>

          <p className="text-sm sm:text-base text-[#92929D] max-w-xl mx-auto leading-relaxed mb-8">
            Tell us about your target growth objectives. We will review your current customer journey and guide you through Stage 1 Discovery within one business day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Request Discovery Audit
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('packages')}>
              Explore Growth Packages
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
