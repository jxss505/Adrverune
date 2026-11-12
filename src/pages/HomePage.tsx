/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  Target,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
  BarChart3,
  Globe,
  Compass,
  FileCheck2,
  Layers,
  Repeat,
  Users,
  Video,
  Check,
  AlertCircle
} from 'lucide-react';

// Components
import { Container } from '../components/common/Container';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { SectionHeading } from '../components/common/SectionHeading';
import { FeatureCard } from '../components/common/FeatureCard';
import { ServiceCard } from '../components/cards/ServiceCard';
import { PackageCard } from '../components/cards/PackageCard';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { Monogram } from '../components/common/Monogram';

// Data & Types
import { APPROVED_SERVICES, APPROVED_PACKAGES, FOUNDATION_FAQS } from '../data/foundationData';
import { NavRoute, ServiceItem, PackageTier } from '../types';

interface HomePageProps {
  onNavigate: (route: NavRoute) => void;
  onOpenServiceSpec: (service: ServiceItem) => void;
  onSelectPackage: (pkg: PackageTier) => void;
}

export function HomePage({
  onNavigate,
  onOpenServiceSpec,
  onSelectPackage
}: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    serviceInterest: 'Lead Generation',
    budgetRange: '$3,000 - $10,000 / month',
    objectives: ''
  });

  const categories = ['All', 'Paid Media', 'Creative & Assets', 'Web & Funnels', 'Revenue Operations'];

  const filteredServices = React.useMemo(() => {
    return selectedCategory === 'All'
      ? APPROVED_SERVICES
      : APPROVED_SERVICES.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('services');
    }
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 02. PREMIUM HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1A22] overflow-hidden">
        {/* Ambient background lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Premium Digital Advertising & Revenue Operations Agency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6 break-words text-balance">
            Turning Business Potential <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Into Measurable Growth.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#A5A5B2] font-normal leading-relaxed mb-8">
            ADVERUNE designs, executes, and automates high-performance digital advertising systems. By connecting precision paid media across Meta and Google to conversion-engineered landing pages and automated sales follow-up cadences, we turn ad traffic into predictable pipeline revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
            <PrimaryButton
              size="lg"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto"
            >
              Book a Strategy Call
            </PrimaryButton>
            <SecondaryButton
              size="lg"
              onClick={scrollToServices}
              className="w-full sm:w-auto"
            >
              Explore Our Services
            </SecondaryButton>
          </div>

          {/* Strict Rule 1-6 Integrity Assurance */}
          <div className="pt-10">
            <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-[#121217]/90 border border-[#22222B] text-left flex items-start gap-3 text-xs text-[#A5A5B2]">
              <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-semibold text-[#D4AF37]">Zero-Fabrication Standard:</span>{' '}
                ADVERUNE strictly enforces commercial truthfulness. We publish zero fabricated client logos, fake revenue screenshots, or synthetic reviews. All campaigns operate with direct client ad account ownership.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 03. AGENCY INTRODUCTION */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 border-b border-[#1A1A22] bg-[#0E0E12]">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                <span>The ADVERUNE Thesis</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                Digital Advertising Is Not About Vanity Impressions. <br />
                <span className="text-[#C8C8D0]">It Is an Engineered Discipline.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#9595A0] leading-relaxed">
                Most companies waste thousands of dollars in paid media not because their product lacks demand, but because their acquisition pipeline is fragmented. Front-end ads direct traffic to generic websites without qualification, and inbound leads sit uncontacted for 24 to 48 hours.
              </p>
              <p className="text-xs sm:text-sm text-[#9595A0] leading-relaxed">
                At ADVERUNE, we construct closed-loop acquisition infrastructure. We unify precision paid media, direct-response creative, server-side attribution, and automated speed-to-lead follow-up systems into one predictable revenue engine.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer"
                >
                  <span>Learn more about our agency governance & standard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="matte-card p-6 rounded-2xl border border-red-950/20">
                <div className="w-10 h-10 rounded-xl bg-red-950/30 border border-red-800/30 flex items-center justify-center text-red-400 mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">The Ad Isolation Trap</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  Sending paid traffic to bloated generic homepages with dozens of distractions burns ad capital and yields single-digit conversion rates.
                </p>
              </div>

              <div className="matte-card p-6 rounded-2xl border border-amber-950/20">
                <div className="w-10 h-10 rounded-xl bg-amber-950/30 border border-amber-800/30 flex items-center justify-center text-amber-400 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">The 48-Hour Lead Void</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  Per Harvard Business Review data, response delays beyond 1 hour decrease qualification odds by 7x. Leads that sit cold decay rapidly.
                </p>
              </div>

              <div className="matte-card p-6 rounded-2xl border border-blue-950/20">
                <div className="w-10 h-10 rounded-xl bg-blue-950/30 border border-blue-800/30 flex items-center justify-center text-blue-400 mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Attribution Signal Loss</h3>
                <p className="text-xs text-[#95959F] leading-relaxed">
                  Browser cookie deprecation and privacy filters blind standard ad pixels. Without server-side tracking (CAPI), true CAC remains unknown.
                </p>
              </div>

              <div className="matte-card p-6 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#181822] to-[#121218]">
                <div className="w-10 h-10 rounded-xl bg-[#22222E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">The ADVERUNE Remedy</h3>
                <p className="text-xs text-[#D8D8E0] leading-relaxed">
                  Dedicated conversion landing pages, automated instant multi-channel follow-ups (&lt;5 min), and verified server-side CAPI event tracking.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 04. SERVICES OVERVIEW (11 Approved Capabilities with Filter) */}
      {/* ========================================================================= */}
      <section id="services-overview" className="py-16 md:py-24 border-b border-[#1A1A22] scroll-mt-20">
        <Container width="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <SectionHeading
              align="left"
              eyebrow="Approved Capabilities"
              title="11 Approved Agency Services"
              description="A cohesive suite of marketing and engineering disciplines designed to function as an integrated revenue engine."
            />

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer
                    ${
                      selectedCategory === cat
                        ? 'bg-[#D4AF37] text-black font-semibold'
                        : 'bg-[#141419] text-[#9E9EA8] border border-[#22222A] hover:border-[#D4AF37]/30'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectSpec={onOpenServiceSpec}
                onInquire={(srv) => {
                  onNavigate('contact');
                }}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <SecondaryButton size="md" onClick={() => onNavigate('services')}>
              View Detailed Service Architecture & Deliverables
            </SecondaryButton>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 05. WHY CHOOSE ADVERUNE (Strategic Differentiators) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12] cv-auto">
        <Container width="wide">
          <SectionHeading
            eyebrow="Core Differentiation"
            title="Why Ambitious Brands"
            goldGradientText="Choose ADVERUNE"
            description="Four foundational operational commitments that separate our engineering approach from conventional marketing agencies."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-5">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Closed-Loop Acquisition</h3>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  We never run paid ads in isolation. Every campaign connects to dedicated conversion landing pages and automated CRM pipelines.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1C1C26] text-[11px] font-mono text-[#D4AF37]">
                Zero Disjointed Silos
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">100% Client Ownership</h3>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  You maintain complete, direct ownership of all ad accounts (Meta, Google), domains, and tracking pixels. Zero hostage retainers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1C1C26] text-[11px] font-mono text-[#D4AF37]">
                Direct Partner Access Only
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-5">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Speed-to-Lead Automation</h3>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  Inbound leads trigger automated instant SMS/Email engagement cadences in under 5 minutes to capitalize on peak prospect attention.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1C1C26] text-[11px] font-mono text-[#D4AF37]">
                7x Qualification Multiplier
              </div>
            </div>

            <div className="matte-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-5">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Truthful Integrity Standard</h3>
                <p className="text-xs text-[#9595A0] leading-relaxed">
                  No invented statistics, no fake testimonials, and no unverified revenue screenshots. We operate with radical transparency.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1C1C26] text-[11px] font-mono text-[#D4AF37]">
                Strict Rule 1–15 Governance
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 06. BUSINESS GROWTH APPROACH (The Triad Architecture) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] cv-auto">
        <Container width="wide">
          <SectionHeading
            eyebrow="Conversion Science"
            title="The Three Pillars of"
            goldGradientText="Predictable Acquisition"
            description="How our media buying, asset creation, and revenue operations integrate to generate qualified sales opportunities."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="matte-card p-7 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <span className="text-5xl font-extrabold text-[#1F1F2A] font-mono absolute top-4 right-4">01</span>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] text-[#D4AF37] flex items-center justify-center mb-5">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. Demand Interception & Generation</h3>
                <p className="text-xs text-[#9595A0] leading-relaxed mb-4">
                  We deploy targeted Meta Ads to stimulate latent customer demand and Google Search campaigns to intercept active, high-intent solution-seekers.
                </p>
                <ul className="space-y-2 text-xs text-[#C5C5D0]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Search intent clustering & negative keyword sweeps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Iterative creative testing & custom audiences</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="matte-card p-7 rounded-2xl relative overflow-hidden flex flex-col justify-between border-[#D4AF37]/30">
              <span className="text-5xl font-extrabold text-[#1F1F2A] font-mono absolute top-4 right-4">02</span>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] text-[#D4AF37] flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Friction-Engineered Conversion</h3>
                <p className="text-xs text-[#9595A0] leading-relaxed mb-4">
                  We route paid traffic to custom-coded, ultra-fast landing pages featuring interactive multi-step qualification forms that eliminate tire-kickers.
                </p>
                <ul className="space-y-2 text-xs text-[#C5C5D0]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Sub-2 second mobile load times</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Upfront qualification criteria & intent filters</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="matte-card p-7 rounded-2xl relative overflow-hidden flex flex-col justify-between">
              <span className="text-5xl font-extrabold text-[#1F1F2A] font-mono absolute top-4 right-4">03</span>
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1C1C24] text-[#D4AF37] flex items-center justify-center mb-5">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Automated Revenue Acceleration</h3>
                <p className="text-xs text-[#9595A0] leading-relaxed mb-4">
                  Once qualified, leads are instantly routed into your CRM while automated SMS and email confirmation cadences secure calendar commitments.
                </p>
                <ul className="space-y-2 text-xs text-[#C5C5D0]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Instant speed-to-lead webhook notifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Server-side CAPI event attribution syncing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 07. PACKAGES OVERVIEW (Strict Rule 5 & 6 Compliance) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12] cv-auto">
        <Container width="wide">
          <SectionHeading
            eyebrow="Commercial Packaging"
            title="Stage-Specific Growth Systems"
            goldGradientText="For Your Business"
            description="Engineered acquisition packages tailored to match your company's revenue stage and operational capacity."
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

          <div className="mt-10 p-5 rounded-xl bg-[#121217] border border-[#22222B] text-xs text-[#8E8E98] max-w-2xl mx-auto text-center">
            <span className="font-semibold text-white">Pricing & Scope Transparency:</span> All investment proposals are tailored directly to required channel scope and monthly advertising allocation. Clients directly pay media spend to platforms.
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 08. OUR WORKING PROCESS (6-Step Linear Flow) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] cv-auto">
        <Container width="wide">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <SectionHeading
              align="left"
              eyebrow="Execution Framework"
              title="The 6-Phase Engineering Method"
              description="How we take your acquisition pipeline from diagnostic audit to live, predictable scale."
            />
            <button
              type="button"
              onClick={() => onNavigate('process')}
              className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold hover:underline cursor-pointer self-start sm:self-end"
            >
              <span>Explore detailed process specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '01',
                name: 'Growth Audit',
                time: 'Days 1–3',
                desc: 'Historical ad data, audience sizing & competitor teardown.'
              },
              {
                step: '02',
                name: 'Architecture',
                time: 'Days 4–7',
                desc: 'Channel selection, offer positioning & funnel mapping.'
              },
              {
                step: '03',
                name: 'Asset Build',
                time: 'Days 8–14',
                desc: 'Landing page development, ad copy & short-form video cuts.'
              },
              {
                step: '04',
                name: 'Attribution QA',
                time: 'Days 15–18',
                desc: 'Server-side CAPI testing, UTMs & webhook routing verification.'
              },
              {
                step: '05',
                name: 'Scaling Sprints',
                time: 'Weekly Sprints',
                desc: 'Negative keyword pruning, creative rotation & budget allocation.'
              },
              {
                step: '06',
                name: 'Automation',
                time: 'Monthly Growth',
                desc: 'Speed-to-lead workflow calibration & retargeting pool expansion.'
              }
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#111116] border border-[#1E1E26] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#D4AF37]">{st.step}</span>
                    <span className="text-[10px] text-[#70707A] font-mono">{st.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{st.name}</h4>
                  <p className="text-xs text-[#8A8A96] leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 09. PORTFOLIO PREVIEW (Conceptual System Blueprints - Rule 2 Compliant) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22] bg-[#0E0E12] cv-auto">
        <Container width="wide">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
              <span>Authentic Portfolio Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Documented System Blueprints & Teardowns
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#92929D] leading-relaxed">
              In strict compliance with our business ethics, ADVERUNE never publishes invented reviews or unverified client statistics. Below are verified conceptual architecture frameworks illustrating our exact deployment mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Conceptual Blueprint 1 */}
            <div className="matte-card p-7 rounded-2xl border border-dashed border-[#2E2E3E] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37]">
                    <FileCheck2 className="w-4 h-4" />
                    <span>[Conceptual Framework #1: Lead Generation System]</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A1A22] text-[#8E8E98]">
                    Small Business Architecture
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">B2B Paid Social to Qualification Funnel</h3>
                <p className="text-xs text-[#95959F] leading-relaxed mb-6">
                  Engineered to eliminate high bounce rates from broad Meta ad campaigns by utilizing 3-tier audience clustering and a 4-step interactive qualification landing page.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-6">
                  <div className="p-3 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="text-[10px] text-[#70707A] block font-mono">Paid Channel</span>
                    <span className="font-semibold text-white">Meta Feed & Reels</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="text-[10px] text-[#70707A] block font-mono">Capture Mode</span>
                    <span className="font-semibold text-white">Interactive Funnel</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="text-[10px] text-[#70707A] block font-mono">Attribution</span>
                    <span className="font-semibold text-white">Pixel + CAPI</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C1C26] flex items-center justify-between text-[11px] text-[#80808C]">
                <span>Status: Framework Documentation</span>
                <span className="text-[#D4AF37]">[Awaiting Client Authorization]</span>
              </div>
            </div>

            {/* Conceptual Blueprint 2 */}
            <div className="matte-card p-7 rounded-2xl border border-dashed border-[#2E2E3E] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4AF37]">
                    <FileCheck2 className="w-4 h-4" />
                    <span>[Conceptual Framework #2: Lead + Sales Growth]</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1A1A22] text-[#8E8E98]">
                    Medium Business Architecture
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">High-Intent Search & Speed-to-Lead Cadences</h3>
                <p className="text-xs text-[#95959F] leading-relaxed mb-6">
                  Orchestrated Google Ads search intent harvesting with synchronized automated SMS and email appointment cadences triggering within 5 minutes of form completion.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-6">
                  <div className="p-3 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="text-[10px] text-[#70707A] block font-mono">Paid Channels</span>
                    <span className="font-semibold text-white">Google Search + Meta</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="text-[10px] text-[#70707A] block font-mono">Response Window</span>
                    <span className="font-semibold text-white">&lt; 5-Min Automated</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#121217] border border-[#1E1E28]">
                    <span className="text-[10px] text-[#70707A] block font-mono">Revenue Ops</span>
                    <span className="font-semibold text-white">CRM Pipeline Sync</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C1C26] flex items-center justify-between text-[11px] text-[#80808C]">
                <span>Status: Framework Documentation</span>
                <span className="text-[#D4AF37]">[Awaiting Client Authorization]</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-b border-[#1A1A22]">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Truthful Clarity"
            title="Frequently Asked Questions"
            description="Clear answers regarding campaign ownership, timeline expectations, and our technical engagement process."
            className="mb-12"
          />

          <FAQAccordion items={FOUNDATION_FAQS} />
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 11. FINAL INQUIRY & DISCOVERY CONVERSION GATE */}
      {/* ========================================================================= */}
      <section id="discovery-gate" className="py-16 md:py-24 bg-[#0A0A0E] relative overflow-hidden cv-auto">
        {/* Glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

        <Container width="standard" className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
              <span>Initiate Consultation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
              Ready to Engineer Your <br />
              <span className="gold-text-gradient">Acquisition Pipeline?</span>
            </h2>
            <p className="mt-3 text-sm text-[#92929D] leading-relaxed">
              Every partnership begins with a comprehensive Discovery Audit. Provide your company parameters below, and a senior strategist will respond within one business day.
            </p>
          </div>

          <div className="matte-card p-8 sm:p-10 rounded-2xl max-w-2xl mx-auto border border-[#262633] shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Strategy Application Received</h3>
                <p className="text-xs sm:text-sm text-[#9E9EA8] max-w-md mx-auto leading-relaxed">
                  Thank you for applying to partner with ADVERUNE. A senior strategist will review your advertising channels and respond within one business day.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#181820] text-xs text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-black font-semibold transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-fullName" className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      id="home-fullName"
                      required
                      type="text"
                      placeholder="e.g. Marcus Vance"
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141419] border border-[#252530] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs placeholder:text-[#555562] min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-email" className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      id="home-email"
                      required
                      type="email"
                      placeholder="marcus@company.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141419] border border-[#252530] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs placeholder:text-[#555562] min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-company" className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider">
                      Company Name *
                    </label>
                    <input
                      id="home-company"
                      required
                      type="text"
                      placeholder="e.g. Apex Global"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141419] border border-[#252530] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs placeholder:text-[#555562] min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-phone" className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      id="home-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141419] border border-[#252530] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs placeholder:text-[#555562] min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-serviceInterest" className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider">
                      Primary Service Focus
                    </label>
                    <select
                      id="home-serviceInterest"
                      value={contactForm.serviceInterest}
                      onChange={(e) => setContactForm({ ...contactForm, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141419] border border-[#252530] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs min-h-[44px]"
                    >
                      {APPROVED_SERVICES.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#141419] text-white">
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="home-budgetRange" className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider">
                      Monthly Advertising Allocation
                    </label>
                    <select
                      id="home-budgetRange"
                      value={contactForm.budgetRange}
                      onChange={(e) => setContactForm({ ...contactForm, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141419] border border-[#252530] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs min-h-[44px]"
                    >
                      <option value="Under $3,000 / month">Under $3,000 / month</option>
                      <option value="$3,000 - $10,000 / month">$3,000 - $10,000 / month</option>
                      <option value="$10,000 - $25,000 / month">$10,000 - $25,000 / month</option>
                      <option value="$25,000+ / month">$25,000+ / month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="home-objectives" className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider">
                    Core Acquisition Bottleneck / Objectives
                  </label>
                  <textarea
                    id="home-objectives"
                    rows={4}
                    placeholder="Describe current customer acquisition channels, lead qualification challenges, or target timeline..."
                    value={contactForm.objectives}
                    onChange={(e) => setContactForm({ ...contactForm, objectives: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141419] border border-[#252530] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs placeholder:text-[#555562]"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A5A5B2]">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span>Mutual NDA assured. We respect proprietary business and ad spend parameters.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFF0BE] via-[#D4AF37] to-[#B8860B] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl shadow-[#D4AF37]/15 flex items-center justify-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  <span>Submit Strategy Application</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
