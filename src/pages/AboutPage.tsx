/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Shield,
  Target,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
  Compass,
  Briefcase,
  Check,
  Eye,
  Award,
  Zap,
  Flame,
  FileCheck2
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { Monogram } from '../components/common/Monogram';
import { NavRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: NavRoute) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. ABOUT ADVERUNE & HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1A22] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Agency Standard & Operating Principles</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6 break-words text-balance">
            Engineered Precision. <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Commercial Truthfulness.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9E9EA8] font-normal leading-relaxed mb-8">
            ADVERUNE is a premium digital advertising and marketing agency delivering high-performance customer acquisition, direct-response creative, and automated revenue operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Initiate Strategic Consultation
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('process')}>
              Explore Our Working Process
            </SecondaryButton>
          </div>

          {/* Compliance Badge */}
          <div className="pt-10">
            <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-[#121217]/90 border border-[#22222B] text-left flex items-start gap-3 text-xs text-[#8E8E98]">
              <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#D4AF37]">Business Accuracy Standard:</span>{' '}
                ADVERUNE publishes approved brand information only. We do not invent founder awards, fictional case histories, employee counts, or unverified client relationships.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. BRAND INTRODUCTION */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12]">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                An Acquisition Partner <br />
                <span className="text-[#C8C8D0]">Built for Measurable Growth.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#9595A0] leading-relaxed">
                In an industry crowded with opaque reporting, inflated claims, and disconnected marketing tactics, ADVERUNE was conceived around a single mandate: to build disciplined, accountable customer acquisition systems.
              </p>
              <p className="text-xs sm:text-sm text-[#9595A0] leading-relaxed">
                We combine the analytical rigor of performance media buying with the refined craft of direct-response design and the operational speed of modern sales automations. Our clients retain 100% direct ownership of their ad accounts, data, and digital assets.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="matte-card p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">Performance Driven</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  Every ad campaign and landing page is constructed with a single commercial purpose: to generate qualified inbound inquiries at a sustainable acquisition cost.
                </p>
              </div>

              <div className="matte-card p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">Direct-Response Craft</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  We reject generic stock visuals. Our visual assets are engineered to stop the feed, establish authority, and communicate offer value in under two seconds.
                </p>
              </div>

              <div className="matte-card p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">Complete Transparency</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  Zero hidden markups on media spend. Clients pay advertising networks directly and hold primary administrative ownership over their digital properties.
                </p>
              </div>

              <div className="matte-card p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-heading">Speed-to-Lead Operations</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  We integrate automated workflows ensuring inbound leads receive instant engagement within five minutes, preventing prospect decay.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3 & 4. VISION & MISSION */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22]">
        <Container width="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="matte-card p-8 sm:p-10 rounded-3xl border border-[#22222E] flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider font-mono">
                  <span>Our Vision</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  The Benchmark for Accountable Digital Growth
                </h3>
                <p className="text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">
                  To establish a new standard in digital marketing where customer acquisition is recognized as an engineered discipline rather than an unpredictable gamble. We envision a digital advertising ecosystem governed by mathematical transparency, direct client data ownership, and closed-loop revenue accountability.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#1C1C26] text-xs font-mono text-[#D4AF37]">
                Pillar: Scientific Acquisition Infrastructure
              </div>
            </div>

            {/* Mission */}
            <div className="matte-card p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#181822] to-[#101016] flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1E28] border border-[#D4AF37]/40 text-[11px] font-semibold text-[#FFF0BE] uppercase tracking-wider font-mono">
                  <span>Our Mission</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  Eliminating Pipeline Friction & Maximizing Client ROI
                </h3>
                <p className="text-xs sm:text-sm text-[#C8C8D2] leading-relaxed">
                  To engineer, deploy, and scale comprehensive client acquisition systems for ambitious businesses. We fulfill this by uniting precision paid media (Meta & Google Ads), conversion-optimized landing pages, and automated sales follow-up systems—ensuring every marketing dollar is directly measurable against revenue.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#222232] text-xs font-mono text-[#D4AF37]">
                Pillar: Zero Pipeline Leakage
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR PHILOSOPHY */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12]">
        <Container width="standard">
          <SectionHeading
            eyebrow="Core Conviction"
            title="The ADVERUNE"
            goldGradientText="Philosophy"
            description="Our fundamental beliefs about digital advertising, consumer psychology, and commercial partnerships."
            className="mb-14"
          />

          <div className="matte-card p-8 sm:p-10 rounded-3xl border border-[#22222E] space-y-6 text-xs sm:text-sm text-[#9E9EA8] leading-relaxed">
            <h3 className="text-xl font-bold text-white font-heading">
              Acquisition Is a System, Not a Tactic
            </h3>
            <p>
              Too many businesses approach digital advertising by chasing whatever platform or trend is currently popular. They buy ad clicks, send traffic to an unoptimized homepage, and wonder why revenue does not follow.
            </p>
            <p>
              At ADVERUNE, our philosophy rests on three immutable realities:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#121217] border border-[#1E1E28] text-xs">
                <span className="font-bold text-white block mb-1">1. Traffic Without Architecture Is Waste:</span>
                <span className="text-[#8E8E98]">
                  Buying clicks without dedicated, mobile-first conversion landing pages simply subsidizes ad platforms at your expense.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#121217] border border-[#1E1E28] text-xs">
                <span className="font-bold text-white block mb-1">2. Lead Inquiries Decay Exponentially:</span>
                <span className="text-[#8E8E98]">
                  A lead contacted within 5 minutes is exponentially more likely to qualify than one contacted the next business day. Speed-to-lead is an operational prerequisite for ad ROI.
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#121217] border border-[#1E1E28] text-xs">
                <span className="font-bold text-white block mb-1">3. Server-Side Data Is Non-Negotiable:</span>
                <span className="text-[#8E8E98]">
                  With third-party cookie deprecation, agencies relying solely on browser tracking are operating blind. Server-side event synchronization is essential to protect attribution.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 6 & 7. STRATEGIC & CREATIVE APPROACH */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22]">
        <Container width="wide">
          <SectionHeading
            eyebrow="Dual Engine"
            title="Our Strategic & Creative"
            goldGradientText="Methodology"
            description="How mathematical media targeting and direct-response creative craft reinforce each other."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Strategic Approach */}
            <div className="matte-card p-8 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] text-[#D4AF37] flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Our Strategic Approach</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  We approach media buying through data-backed audience segmentation and intent harvesting rather than broad speculative guesses.
                </p>
                <div className="space-y-2 pt-2 text-xs text-[#C5C5D0]">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Search Intent Clustering: Isolating high-commercial terms on Google.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Exhaustive Negative Filtering: Pruning search terms to eliminate budget drain.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Recency-Based Retargeting: Segmenting audiences by engagement recency.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1C1C26] text-[11px] text-[#D4AF37] font-mono">
                Focus: Maximizing Return on Ad Spend (ROAS)
              </div>
            </div>

            {/* Creative Approach */}
            <div className="matte-card p-8 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] text-[#D4AF37] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Our Creative Approach</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  Direct-response visual assets designed with strict typographic hierarchy, high-contrast layouts, and feed-stopping hooks.
                </p>
                <div className="space-y-2 pt-2 text-xs text-[#C5C5D0]">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>3-Second Video Hook Frameworks: Halting scroll drop-off immediately.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Problem-Centric Creative Iteration: Testing multiple pain-point angles.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Sound-Off Kinetic Typography: Optimizing for silent mobile viewing.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1C1C26] text-[11px] text-[#D4AF37] font-mono">
                Focus: Commanding Feed Attention & High CTR
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 8. CLIENT-FOCUSED WORKING PRINCIPLES */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12]">
        <Container width="wide">
          <SectionHeading
            eyebrow="Commercial Governance"
            title="Client-Focused Working Principles"
            goldGradientText="& Commitments"
            description="Six operational standards that govern how we interact, execute, and communicate with every partner."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-[#111116] border border-[#1E1E26]">
              <div className="w-9 h-9 rounded-lg bg-[#181820] text-[#D4AF37] flex items-center justify-center mb-3">
                <Shield className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">1. 100% Account Ownership</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                You retain primary administrative ownership of your ad accounts, pixel data, domains, and CRM. ADVERUNE manages via delegated partner access.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111116] border border-[#1E1E26]">
              <div className="w-9 h-9 rounded-lg bg-[#181820] text-[#D4AF37] flex items-center justify-center mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">2. Zero Hidden Ad Spend Margins</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                You pay media spend directly to Meta and Google Ads. We do not inflate or conceal your true advertising costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111116] border border-[#1E1E26]">
              <div className="w-9 h-9 rounded-lg bg-[#181820] text-[#D4AF37] flex items-center justify-center mb-3">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">3. Truthful Business Representation</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                We never publish fake testimonials, manufactured case figures, or speculative guarantees. What you see is authentic.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111116] border border-[#1E1E26]">
              <div className="w-9 h-9 rounded-lg bg-[#181820] text-[#D4AF37] flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">4. Dedicated Response SLA</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                Strategic communications and inquiries are acknowledged within one business day, ensuring proactive collaboration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111116] border border-[#1E1E26]">
              <div className="w-9 h-9 rounded-lg bg-[#181820] text-[#D4AF37] flex items-center justify-center mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">5. Integrated Systems Over Silos</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                We take accountability for the entire funnel—from the creative hook down to the automated lead follow-up.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111116] border border-[#1E1E26]">
              <div className="w-9 h-9 rounded-lg bg-[#181820] text-[#D4AF37] flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-heading">6. Continuous Data Optimization</h4>
              <p className="text-[#8E8E98] leading-relaxed">
                Campaigns are evaluated on structured weekly sprints, pruning underperforming assets and scaling verified winning clusters.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 9. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-[#0A0A0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2 font-mono">
            Partner With ADVERUNE
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Build Your Engineered <br />
            <span className="gold-text-gradient">Acquisition Infrastructure.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#92929D] max-w-xl mx-auto leading-relaxed mb-8">
            Initiate a discovery consultation to discuss your business stage, target channels, and customer acquisition targets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Request Strategy Consultation
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('services')}>
              Explore All 11 Services
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
