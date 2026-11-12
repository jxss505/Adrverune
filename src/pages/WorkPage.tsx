/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Shield,
  Target,
  Sparkles,
  Layers,
  ArrowRight,
  Video,
  Globe,
  FileCheck2,
  Lock,
  Eye,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Filter,
  BarChart3,
  Users,
  Compass
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { NavRoute } from '../types';

interface WorkPageProps {
  onNavigate: (route: NavRoute) => void;
}

export type WorkCategory =
  | 'All'
  | 'Advertising Campaign Concepts'
  | 'Creative Design'
  | 'Social Media Content'
  | 'Video Content'
  | 'Landing Page Design'
  | 'Website Projects'
  | 'Marketing Strategy Samples';

export interface PortfolioProject {
  id: string;
  title: string;
  category: WorkCategory;
  shortDescription: string;
  creativeObjective: string;
  previewType: 'ads' | 'design' | 'social' | 'video' | 'landing' | 'web' | 'strategy';
  projectDetails: {
    channels: string[];
    coreMechanism: string;
    deliverables: string[];
    audienceFocus: string;
  };
}

export const CONCEPTUAL_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-1-omnichannel-b2b',
    title: 'Omnichannel B2B Customer Acquisition Blueprint',
    category: 'Advertising Campaign Concepts',
    shortDescription: 'Dual Google Search intent harvesting paired with Meta direct-response feeds and automated speed-to-lead routing.',
    creativeObjective: 'Demonstrate how search demand and social stimulation interconnect to reduce customer acquisition cost without budget leakage.',
    previewType: 'ads',
    projectDetails: {
      channels: ['Meta Ads (Feed & Story)', 'Google Ads (Search & PMax)', 'Meta Retargeting'],
      coreMechanism: 'High-intent search keyword clustering synchronized with 3-tier audience social testing and automated SMS qualification.',
      deliverables: ['Search Intent Keyword Cluster', 'Direct-Response Ad Variant Suite', 'Speed-to-Lead Webhook Logic'],
      audienceFocus: 'High-ticket B2B service firms & commercial vendors'
    }
  },
  {
    id: 'proj-2-high-contrast-creatives',
    title: 'High-Contrast Direct-Response Ad Suite',
    category: 'Creative Design',
    shortDescription: 'Feed-stopping visual units built with mathematical typography contrast, clear value proposition badges, and thumb-stopping hooks.',
    creativeObjective: 'Prove that aesthetic restraint and direct-response conversion principles can coexist in luxury and corporate brand sectors.',
    previewType: 'design',
    projectDetails: {
      channels: ['Meta Ads', 'LinkedIn Sponsored Content', 'Google Display'],
      coreMechanism: 'Dark substrate styling, metallic gold accent focal points, and clear problem-callout headlines formatted for 1:1 and 9:16 feeds.',
      deliverables: ['Static Ad Suites (1:1 & 9:16)', 'Multi-Slide Offer Carousels', 'Conversion Badge System'],
      audienceFocus: 'Premium consultancies, SaaS, and boutique service brands'
    }
  },
  {
    id: 'proj-3-authority-content-pillars',
    title: 'Executive Authority & Category Leadership Framework',
    category: 'Social Media Content',
    shortDescription: 'Structured organic content pillars establishing thought leadership, process transparency, and commercial conviction.',
    creativeObjective: 'Create an authoritative digital footprint that validates paid ad traffic when prospects review organic profiles prior to booking.',
    previewType: 'social',
    projectDetails: {
      channels: ['LinkedIn Corporate & Founder Profiles', 'Meta Business Pages', 'X/Twitter'],
      coreMechanism: '4-pillar weekly rotation: Industry Teardowns, Process Transparency, Proof of Competence, and Market Perspectives.',
      deliverables: ['Monthly Editorial Calendar', 'Branded Document Carousels', 'Graphic Quote & Stat Cards'],
      audienceFocus: 'Founder-led agencies, enterprise service providers, and B2B leaders'
    }
  },
  {
    id: 'proj-4-hook-retention-video',
    title: 'Short-Form Kinetic Hook & Retention Framework',
    category: 'Video Content',
    shortDescription: 'Scripted short-form video cuts optimized for 9:16 mobile feeds with sound-off kinetic captions and sub-3-second visual pattern interrupts.',
    creativeObjective: 'Solve the 80%+ drop-off issue in social video advertising by front-loading problem agitation in the first 2.5 seconds.',
    previewType: 'video',
    projectDetails: {
      channels: ['Meta Reels', 'TikTok Ads', 'YouTube Shorts'],
      coreMechanism: '3-second hook structure (Visual Disruption -> Relatable Agitation -> Solution Bridge -> Direct Call to Action).',
      deliverables: ['Direct-Response Video Scripts', 'Kinetic Sound-Off Captions', 'Thumbnail Packaging'],
      audienceFocus: 'Video-first direct-to-consumer & B2B digital services'
    }
  },
  {
    id: 'proj-5-friction-landing-page',
    title: 'Friction-Engineered Conversion Landing Page',
    category: 'Landing Page Design',
    shortDescription: 'Ultra-fast, distraction-free landing page interface featuring interactive multi-step qualification logic that filters out tire-kickers.',
    creativeObjective: 'Eliminate bounce rates caused by slow generic websites by delivering sub-1.8s mobile load speeds and single-goal conversion paths.',
    previewType: 'landing',
    projectDetails: {
      channels: ['Dedicated Paid Media Landing Page'],
      coreMechanism: 'No header escape navigation; mobile-first layout with step-by-step diagnostic questionnaire before calendar booking.',
      deliverables: ['Custom React/Tailwind Layout', 'Qualification Intake Logic', 'Pixel & CAPI Event Wiring'],
      audienceFocus: 'High-ticket service businesses with dedicated sales reps'
    }
  },
  {
    id: 'proj-6-agency-web-platform',
    title: 'Modern Corporate Agency Digital Presence',
    category: 'Website Projects',
    shortDescription: 'A multi-page agency web platform engineered for complete technical SEO, server-side attribution, and luxury brand prestige.',
    creativeObjective: 'Establish an institutional-grade brand presence that conveys strategic maturity, zero marketing fluff, and radical transparency.',
    previewType: 'web',
    projectDetails: {
      channels: ['Full Corporate Web Presence'],
      coreMechanism: 'Matte black & metallic gold design tokens, semantic Schema.org structured data, and modular React component architecture.',
      deliverables: ['10-Page Information Architecture', 'Component Design System', 'Responsive Navigation & Drawer'],
      audienceFocus: 'Mid-market & enterprise corporate digital brands'
    }
  },
  {
    id: 'proj-7-speed-to-lead-strategy',
    title: 'Full-Funnel Speed-to-Lead & RevOps Strategy Blueprint',
    category: 'Marketing Strategy Samples',
    shortDescription: 'Comprehensive end-to-end customer journey map connecting top-of-funnel ad spend to sub-5-minute automated sales cadences.',
    creativeObjective: 'Demonstrate how speed-to-lead automation prevents lead decay and captures the 7x qualification advantage verified by HBR research.',
    previewType: 'strategy',
    projectDetails: {
      channels: ['Omnichannel Paid Media + CRM Integration'],
      coreMechanism: 'Webhook-triggered SMS and email response sequences within 5 minutes of form completion, paired with CRM stage routing.',
      deliverables: ['Full Journey Architecture Map', 'Speed-to-Lead Automation Cadence', 'Attribution Data Governance Plan'],
      audienceFocus: 'Fast-growing companies experiencing sales pipeline leakage'
    }
  }
];

export function WorkPage({ onNavigate }: WorkPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProjectModal(null);
      }
    };
    if (activeProjectModal) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeProjectModal]);

  const categories: WorkCategory[] = [
    'All',
    'Advertising Campaign Concepts',
    'Creative Design',
    'Social Media Content',
    'Video Content',
    'Landing Page Design',
    'Website Projects',
    'Marketing Strategy Samples'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? CONCEPTUAL_PROJECTS
    : CONCEPTUAL_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. OUR WORK HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1A22] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Creative & Strategic Work Demonstration</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6 break-words text-balance">
            Documented Craft. <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Strategic Architecture.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9E9EA8] font-normal leading-relaxed mb-8">
            Explore our documented creative standards, direct-response design units, campaign concepts, and revenue operations blueprints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Request Custom Blueprint
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('services')}>
              Explore All 11 Services
            </SecondaryButton>
          </div>

          {/* Explicit Integrity Disclaimer Banner */}
          <div className="pt-10">
            <div className="max-w-2xl mx-auto p-4 rounded-xl bg-[#121217]/95 border border-[#262633] text-left flex items-start gap-3.5 text-xs text-[#9E9EA8]">
              <Lock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-semibold text-[#D4AF37]">Authentic Portfolio Policy:</span>{' '}
                ADVERUNE strictly enforces commercial truthfulness. In place of unverified client metrics or fabricated logos, the works presented below represent clearly labeled <span className="text-white font-medium">Conceptual Portfolio Frameworks</span> developed by our internal strategy team to demonstrate our exact methodologies. Zero speculative revenue numbers are published.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER TABS */}
      {/* ========================================================================= */}
      <section className="py-4 sm:py-5 border-b border-[#1A1A22] bg-[#0E0E12] relative md:sticky md:top-20 z-30 backdrop-blur-md bg-[#0E0E12]/95">
        <Container width="wide">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none" role="toolbar" aria-label="Filter projects by category">
            <div className="flex items-center gap-1.5 shrink-0 text-xs text-[#9E9EA8] pr-2">
              <Filter className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span className="font-medium hidden sm:inline text-white">Categories:</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    min-h-[44px] px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none
                    ${
                      selectedCategory === cat
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                        : 'bg-[#141419] text-[#A5A5B2] border-[#22222A] hover:border-[#D4AF37]/40 hover:text-white'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. PORTFOLIO SHOWCASE GRID */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="matte-card matte-card-hover p-6 sm:p-7 rounded-2xl flex flex-col justify-between border border-[#22222C] group cv-auto"
              >
                <div>
                  {/* Top Badge & Conceptual Label */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#161622] text-[#D4AF37] border border-[#D4AF37]/25 font-bold">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-[#70707C] font-mono">
                      [Conceptual Work]
                    </span>
                  </div>

                  {/* Visual Blueprint Thumbnail Representation */}
                  <div className="w-full h-44 rounded-xl bg-[#0D0D12] border border-[#1E1E28] p-4 mb-5 flex flex-col justify-between relative overflow-hidden group-hover:border-[#D4AF37]/40 transition-colors">
                    {/* Schematic grid background */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px]" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                        Blueprint Schematics
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    </div>

                    <div className="relative z-10 space-y-1.5 my-auto">
                      <div className="text-xs font-bold text-white font-heading">
                        {project.title}
                      </div>
                      <div className="text-[11px] text-[#80808C] line-clamp-2">
                        {project.creativeObjective}
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#6E6E78] pt-2 border-t border-[#181822]">
                      <span>ADVERUNE System Spec</span>
                      <span className="text-[#D4AF37]">Click to Inspect</span>
                    </div>
                  </div>

                  {/* Title & Copy */}
                  <h3 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-[#D4AF37] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#9595A0] leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  <div className="p-3 rounded-lg bg-[#121217] border border-[#1E1E28] text-xs text-[#C5C5D0] mb-4">
                    <span className="text-[10px] uppercase font-semibold text-[#D4AF37] block font-mono mb-0.5">
                      Creative Objective:
                    </span>
                    <p className="text-[11px] text-[#A0A0AA]">{project.creativeObjective}</p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-[#1C1C24] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    aria-label={`Inspect blueprint specifications for ${project.title}`}
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-2"
                  >
                    <span>Inspect Blueprint Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <Eye className="w-4 h-4 text-[#8E8E98]" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. DETAIL SPECIFICATION MODAL */}
      {/* ========================================================================= */}
      {activeProjectModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
        >
          <div className="matte-card p-6 sm:p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-[#D4AF37]/40 shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[#181820] text-[#9E9EA8] hover:text-white cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="mb-4 pr-10">
              <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#161622] text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                {activeProjectModal.category}
              </span>
              <h2 id="work-modal-title" className="text-2xl font-bold text-white font-heading mt-2">
                {activeProjectModal.title}
              </h2>
              <p className="text-xs text-[#9E9EA8] font-mono mt-1">
                [Conceptual Framework - Created by ADVERUNE Strategy & Creative Team]
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#C5C5D0] leading-relaxed mb-6">
              {activeProjectModal.shortDescription}
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                <span className="text-[10px] uppercase font-mono font-bold text-[#D4AF37] block mb-1">
                  Creative & Strategic Objective
                </span>
                <p className="text-xs text-[#D8D8E0] leading-relaxed">
                  {activeProjectModal.creativeObjective}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                <span className="text-[10px] uppercase font-mono font-bold text-white block mb-1">
                  Core Mechanical Workflow
                </span>
                <p className="text-xs text-[#A5A5B2] leading-relaxed">
                  {activeProjectModal.projectDetails.coreMechanism}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                  <span className="text-[10px] uppercase font-mono font-bold text-white block mb-2">
                    Channels Deployed
                  </span>
                  <div className="space-y-1">
                    {activeProjectModal.projectDetails.channels.map((ch, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-[#C5C5D0]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#121217] border border-[#202028]">
                  <span className="text-[10px] uppercase font-mono font-bold text-white block mb-2">
                    Key Deliverables
                  </span>
                  <div className="space-y-1">
                    {activeProjectModal.projectDetails.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-[#C5C5D0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#202028] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#9E9EA8]">
                Ready to adapt this framework for your brand?
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveProjectModal(null);
                  onNavigate('contact');
                }}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] focus-visible:outline-none"
              >
                <span>Request Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. PORTFOLIO BOTTOM CTA */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-t border-[#1A1A22] bg-[#0A0A0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2 font-mono">
            Custom Acquisition Architecture
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Need a Tailored System <br />
            <span className="gold-text-gradient">For Your Commercial Model?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#92929D] max-w-xl mx-auto leading-relaxed mb-8">
            Tell us about your target customer, current advertising channels, and acquisition objectives. We will prepare an objective growth blueprint for your review.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Request Growth Blueprint
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('packages')}>
              Explore Approved Packages
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
