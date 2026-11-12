/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Target,
  BarChart3,
  Users,
  Sparkles,
  Video,
  Globe,
  TrendingUp,
  Repeat,
  Compass,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Clock,
  ChevronRight,
  Filter,
  Check,
  Briefcase,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { NavRoute } from '../types';

interface ServicesPageProps {
  onNavigate: (route: NavRoute) => void;
  onSelectServiceForInquiry?: (serviceName: string) => void;
}

interface ServiceSectionData {
  id: string;
  number: string;
  name: string;
  headline: string;
  category: 'Paid Media' | 'Creative & Assets' | 'Web & Funnels' | 'Revenue Operations';
  shortIntro: string;
  whatItMeans: string;
  problemAddressed: string;
  howItWorks: string;
  whatClientReceives: string[];
  suitableFor: string[];
  icon: React.ElementType;
  badge: string;
}

export const DETAILED_SERVICES: ServiceSectionData[] = [
  {
    id: 'meta-ads',
    number: '01',
    name: 'Meta Ads',
    headline: 'Precision Paid Social Acquisition Across Facebook & Instagram',
    category: 'Paid Media',
    badge: 'Acquisition',
    icon: Target,
    shortIntro: 'Data-driven paid social campaigns engineered to capture qualified buyer attention, stimulate commercial demand, and lower customer acquisition costs.',
    whatItMeans: 'Meta Ads is the systematic deployment of direct-response paid social campaigns across Facebook and Instagram feeds, Stories, and Reels, utilizing custom audience clustering and real-time algorithmic bidding.',
    problemAddressed: 'Rising advertising costs, ad fatigue in competitive feeds, and unvetted reach that generates vanity impressions without producing qualified inbound inquiries.',
    howItWorks: 'We architect a 3-tier audience structure: Cold Intent Testing (identifying winning creative hooks), Warm Engagement Harvesting (nurturing interested viewers), and Dynamic Retargeting to drive final conversions.',
    whatClientReceives: [
      'Custom audience architecture & lookalike segmentation',
      'Direct-response static & video creative variants',
      'Pixel & Meta Conversions API (CAPI) server-side setup',
      'Weekly bid strategy calibration & budget scaling protocols',
      'Bi-weekly strategic reporting & live performance visibility'
    ],
    suitableFor: [
      'B2B professional service providers',
      'High-ticket consultants & agencies',
      'Growing commercial brands seeking scale',
      'Appointment-based local & regional operators'
    ]
  },
  {
    id: 'google-ads',
    number: '02',
    name: 'Google Ads',
    headline: 'High-Intent Search, Performance Max & Commercial Demand Interception',
    category: 'Paid Media',
    badge: 'Search Intent',
    icon: BarChart3,
    shortIntro: 'Capturing prospective clients at the precise moment they actively search for your commercial solutions using intent clustering and negative keyword engineering.',
    whatItMeans: 'Google Ads is the disciplined harvesting of active search demand across Google Search, Performance Max, and Display networks, placing your business directly in front of buyers with immediate intent.',
    problemAddressed: 'Wasting advertising capital on broad, irrelevant search queries that consume budget without converting, alongside aggressive bidding on low-commercial keywords.',
    howItWorks: 'We group keywords into tightly clustered intent themes, aggressively filter negative search terms to eliminate budget waste, calibrate smart bidding targets (Target CPA / Target ROAS), and match copy to dedicated landing pages.',
    whatClientReceives: [
      'Comprehensive search intent taxonomy & clustering',
      'Exhaustive negative keyword filter libraries',
      'Performance Max multi-asset group configurations',
      'Quality Score optimization & ad copy split tests',
      'Conversion tracking & search query audit logs'
    ],
    suitableFor: [
      'Commercial contractors & emergency services',
      'B2B software & technical vendors',
      'Legal, financial, and healthcare practices',
      'Established businesses with high-ticket offerings'
    ]
  },
  {
    id: 'social-media-marketing',
    number: '03',
    name: 'Social Media Marketing',
    headline: 'Strategic Organic Positioning & Category Authority Development',
    category: 'Creative & Assets',
    badge: 'Brand Authority',
    icon: Users,
    shortIntro: 'Building an authoritative organic digital footprint that validates paid advertising traffic, commands prestige, and cultivates high-value buyer trust.',
    whatItMeans: 'Social Media Marketing is the deliberate curation of brand narrative, thought leadership, and strategic editorial pillars across key corporate social platforms to reinforce agency credibility.',
    problemAddressed: 'Paid prospects clicking through to check your organic social profiles and finding outdated posts, amateur visual assets, or an inactive brand presence that kills conversion momentum.',
    howItWorks: 'We establish 4 consistent content pillars: Industry Authority (breakdowns & teardowns), Process Transparency (how you operate), Proof of Competence (frameworks & capabilities), and Cultural Leadership.',
    whatClientReceives: [
      'Monthly editorial calendar & topic mapping',
      'Brand aesthetic guidelines & post templates',
      'Direct-response carousel & graphic design',
      'Platform profile optimization (bio, headers, links)',
      'Community engagement & authority growth strategy'
    ],
    suitableFor: [
      'Executive leaders & founder-led brands',
      'Premium agencies & boutique consultancies',
      'B2B firms closing high-value commercial deals',
      'Growth-stage companies building category authority'
    ]
  },
  {
    id: 'creative-design',
    number: '04',
    name: 'Creative Design',
    headline: 'Direct-Response Visual Assets & Feed-Stopping Creatives',
    category: 'Creative & Assets',
    badge: 'Creative Craft',
    icon: Sparkles,
    shortIntro: 'High-craft graphic assets built specifically to capture feed attention in under two seconds while clearly communicating offer value and driving click-throughs.',
    whatItMeans: 'Creative Design merges luxury brand aesthetics with scientific direct-response advertising principles, creating static units, dynamic banners, and carousels engineered for conversion.',
    problemAddressed: 'Generic stock photography and aesthetic-only designs that fail to halt scrolling feeds or clearly communicate what problem your service solves.',
    howItWorks: 'We design multiple visual angles per campaign: Problem Callout, Feature Comparison, Offer Breakdown, and Authority Badging. Assets are exported across 1:1, 9:16, and 16:9 aspect ratios.',
    whatClientReceives: [
      'Direct-response static feed & story ads',
      'Multi-slide educational & offer carousels',
      'Conversion badge & promotional sticker sets',
      'High-contrast visual hierarchy formatting',
      'Iterative design variant batches for weekly testing'
    ],
    suitableFor: [
      'Any business actively running paid social campaigns',
      'Brands experiencing ad fatigue and rising CPMs',
      'Companies launching new packages or services',
      'Businesses requiring unified visual prestige'
    ]
  },
  {
    id: 'video-content-production',
    number: '05',
    name: 'Video and Content Production',
    headline: 'Hook-Focused Video Scripts & Short-Form Direct-Response Cuts',
    category: 'Creative & Assets',
    badge: 'Video Production',
    icon: Video,
    shortIntro: 'High-retention short-form video creative engineered for Reels, TikTok, and YouTube Shorts that transforms passive viewers into qualified inbound prospects.',
    whatItMeans: 'Video and Content Production involves writing, editing, and formatting high-pace direct-response video assets optimized for sound-off mobile feed environments.',
    problemAddressed: 'Slow, cinematic video openings that cause 80%+ of viewers to scroll past in the first 3 seconds, burning video ad spend without communicating the core message.',
    howItWorks: 'We apply the 3-second hook framework: Visual Disruption (pattern interrupt), Problem Agitation (relatable pain point), Solution Bridge (your service mechanism), and Clear Call to Action.',
    whatClientReceives: [
      'Direct-response video scripts & hook variations',
      'Vertical 9:16 video editing with sound-off captions',
      'B-roll pacing & graphic callout overlays',
      'High-click-through thumbnail packaging',
      'Iterative creative cuts for split-testing'
    ],
    suitableFor: [
      'Founders & experts building digital authority',
      'B2B companies with complex service offerings',
      'Brands scaling paid media on Meta, TikTok & YouTube',
      'Businesses seeking authentic client engagement'
    ]
  },
  {
    id: 'website-landing-page',
    number: '06',
    name: 'Website and Landing Page Development',
    headline: 'Fast, Mobile-First Conversion Environments Engineered for ROI',
    category: 'Web & Funnels',
    badge: 'Web Engineering',
    icon: Globe,
    shortIntro: 'Bespoke, distraction-free landing pages and corporate digital presences coded for lightning-fast mobile speeds, pristine accessibility, and maximum inquiry conversion.',
    whatItMeans: 'Website and Landing Page Development is the technical engineering of high-intent digital conversion environments designed specifically to receive paid and organic traffic.',
    problemAddressed: 'Directing expensive advertising traffic to slow, bloated websites loaded with multi-navigation distraction, resulting in high bounce rates and lost ad dollars.',
    howItWorks: 'We build custom, mobile-first responsive interfaces with sub-2 second load speeds, clean typography hierarchy, friction-engineered qualification forms, and sticky mobile conversion triggers.',
    whatClientReceives: [
      'Custom React/Tailwind landing page or website build',
      'Mobile-first responsive architecture & fast load speed audit',
      'Conversion tracking pixel & server-side event wiring',
      'Structured qualification form with validation',
      'Complete intellectual property & code ownership'
    ],
    suitableFor: [
      'Companies launching dedicated paid media funnels',
      'Businesses redesigning outdated, slow websites',
      'Brands needing high-ticket qualification intake',
      'Enterprises prioritizing mobile conversion rates'
    ]
  },
  {
    id: 'lead-generation',
    number: '07',
    name: 'Lead Generation',
    headline: 'Full-Funnel Demand Generation Systems With Upfront Qualification',
    category: 'Paid Media',
    badge: 'Demand Gen',
    icon: TrendingUp,
    shortIntro: 'Predictable, full-funnel customer acquisition systems designed to qualify prospective buyers before they ever arrive on your sales calendar.',
    whatItMeans: 'Lead Generation is the end-to-end orchestration of traffic, messaging, qualification gates, and intake workflows that consistently produce high-intent inquiries.',
    problemAddressed: 'Sales reps wasting 50%+ of their working hours calling unqualified, non-responsive leads who clicked an ad by accident or lack the budget to purchase.',
    howItWorks: 'We deploy multi-step interactive qualification funnels. By asking 3 to 5 targeted diagnostic questions (budget, timeline, service need), we filter tire-kickers and route only qualified buyers to sales.',
    whatClientReceives: [
      'Full-funnel customer acquisition architecture',
      'Multi-step qualification questionnaire setup',
      'Lead magnet integration (if applicable)',
      'Automated email/SMS instant lead notification routing',
      'Weekly cost-per-qualified-lead (CPQL) audits'
    ],
    suitableFor: [
      'B2B consultancies & professional service firms',
      'High-ticket commercial service providers',
      'Companies with dedicated sales teams seeking qualified calls',
      'Businesses replacing unpredictable word-of-mouth'
    ]
  },
  {
    id: 'retargeting',
    number: '08',
    name: 'Retargeting',
    headline: 'Multi-Touch Remarketing Sequences That Convert Abandoned Consideration',
    category: 'Paid Media',
    badge: 'Retention',
    icon: Repeat,
    shortIntro: 'Re-engaging the 95%+ of prospects who browse without buying, systematically addressing objections through structured sequences until they book a consultation.',
    whatItMeans: 'Retargeting is the precision deployment of cross-platform advertising tailored specifically to users who have previously visited your website or engaged with your brand.',
    problemAddressed: 'High visitor drop-off where interested prospects leave your website due to timing, distractions, or unanswered objections, never to return.',
    howItWorks: 'We build segmented time-decay pools (Days 1–3: Value Reminder; Days 4–10: Objection Dissolution; Days 11–30: Final Invitation). Frequency capping ensures we nurture without spamming.',
    whatClientReceives: [
      'Multi-platform retargeting audience pools (Meta + Google)',
      'Dynamic frequency capping & ad fatigue prevention rules',
      'Objection-handling ad sequences & creative cuts',
      'Lapsed visitor win-back campaigns',
      'Attribution tracking across touchpoint sequences'
    ],
    suitableFor: [
      'Businesses with sales cycles longer than 24 hours',
      'High-consideration purchases requiring executive approval',
      'Brands with steady organic or paid web traffic',
      'Companies wanting to maximize ROI on existing traffic'
    ]
  },
  {
    id: 'lead-tracking',
    number: '09',
    name: 'Lead Tracking',
    headline: 'Server-Side Attribution & Conversion API (CAPI) Infrastructure',
    category: 'Revenue Operations',
    badge: 'Attribution',
    icon: Compass,
    shortIntro: 'Total visibility over customer acquisition costs, eliminating browser cookie blind spots by transmitting verified first-party conversion data server-to-server.',
    whatItMeans: 'Lead Tracking is the technical implementation of first-party, server-side data infrastructure (Meta CAPI, Google Enhanced Conversions) that connects ad spend directly to closed revenue.',
    problemAddressed: 'Platform signal loss caused by browser ad blockers, Apple iOS privacy updates, and cookie deprecation, leaving marketing teams blind to which ads actually drive sales.',
    howItWorks: 'Instead of relying on browser pixels, our server sends encrypted, first-party event data directly to ad platform servers when a lead converts, restoring 95%+ tracking accuracy.',
    whatClientReceives: [
      'Meta Conversions API (CAPI) gateway implementation',
      'Google Tag Manager (GTM) Server-Side configuration',
      'UTM parameter governance & taxonomy documentation',
      'Multi-touch attribution review & CRM synchronization',
      'Custom performance reporting dashboard'
    ],
    suitableFor: [
      'Companies spending $3,000+ monthly on paid advertising',
      'Businesses experiencing conflicting platform metrics',
      'Marketing directors requiring audit-grade CAC reporting',
      'Enterprises prioritizing strict data privacy compliance'
    ]
  },
  {
    id: 'lead-management-sales-systems',
    number: '10',
    name: 'Lead Management & Sales Systems',
    headline: 'Automated Speed-to-Lead Workflows & CRM Pipeline Synchronization',
    category: 'Revenue Operations',
    badge: 'Sales Ops',
    icon: PhoneCall,
    shortIntro: 'Closing the gap between ad lead generation and closed deals through instant automated response cadences, CRM pipeline routing, and appointment confirmation workflows.',
    whatItMeans: 'Lead Management and Sales Systems combine speed-to-lead automation (SMS, Email, Webhooks) with structured CRM deal pipelines to ensure zero inquiries slip through the cracks.',
    problemAddressed: 'Leads going cold because internal sales teams take 24 to 48 hours to follow up, resulting in disconnected calls and wasted advertising spend.',
    howItWorks: 'The moment a lead submits an inquiry, an automated workflow initiates contact within 5 minutes, notifies your team via instant webhook, and delivers appointment confirmation cadences.',
    whatClientReceives: [
      'Automated speed-to-lead response workflows (< 5 minutes)',
      'Multi-channel email & SMS follow-up nurture cadences',
      'CRM pipeline stage mapping (HubSpot, GoHighLevel, etc.)',
      'Calendar booking confirmation & reminder sequences',
      'Lead status tracking & qualification scoring rules'
    ],
    suitableFor: [
      'Growing businesses with dedicated sales reps',
      'Appointment-driven consultancies and service firms',
      'Companies suffering from slow internal lead response times',
      'Businesses needing reliable CRM pipeline integration'
    ]
  }
];

export function ServicesPage({
  onNavigate,
  onSelectServiceForInquiry
}: ServicesPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedSpecId, setExpandedSpecId] = useState<string | null>(null);

  const categories = ['All', 'Paid Media', 'Creative & Assets', 'Web & Funnels', 'Revenue Operations'];

  const filteredServices = activeCategory === 'All'
    ? DETAILED_SERVICES
    : DETAILED_SERVICES.filter(s => s.category === activeCategory);

  const handleInquireClick = (serviceName: string) => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(serviceName);
    }
    onNavigate('contact');
  };

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. SERVICES PAGE HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1A22] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Comprehensive Strategic Capabilities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6">
            Engineering Every Node of <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Your Acquisition Pipeline.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9E9EA8] font-normal leading-relaxed mb-8">
            ADVERUNE unites high-performance media buying, direct-response creative craft, conversion web development, and revenue operations into an integrated growth engine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Initiate Strategic Consultation
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('packages')}>
              Explore Pre-Configured Packages
            </SecondaryButton>
          </div>

          {/* Quick Jump Bar */}
          <div className="pt-12">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8E8E98] mb-3">
              Quick Jump to Capability:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
              {DETAILED_SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToService(s.id)}
                  aria-label={`Jump to ${s.name} service details`}
                  className="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#121217] hover:bg-[#1C1C24] border border-[#202028] hover:border-[#D4AF37]/50 text-xs text-[#C5C5D0] hover:text-white transition-all cursor-pointer font-medium flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER & INTRODUCTION BAR */}
      {/* ========================================================================= */}
      <section className="py-4 sm:py-5 border-b border-[#1A1A22] bg-[#0E0E12] relative md:sticky md:top-20 z-30 backdrop-blur-md bg-[#0E0E12]/95">
        <Container width="wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#A5A5B2]">
              <Filter className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              <span className="font-semibold text-white">Filter by Operational Category:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Filter services by category">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`
                    min-h-[44px] px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none
                    ${
                      activeCategory === cat
                        ? 'bg-[#D4AF37] text-black font-semibold shadow-md'
                        : 'bg-[#141419] text-[#A5A5B2] border border-[#22222A] hover:border-[#D4AF37]/40 hover:text-white'
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
      {/* 3. DETAILED 10 SERVICE SECTIONS */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 space-y-16">
        <Container width="wide">
          <div className="space-y-16">
            {filteredServices.map((service, index) => {
              const IconComp = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="matte-card p-8 sm:p-10 rounded-3xl border border-[#22222C] scroll-mt-36 relative overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/35 cv-auto"
                >
                  {/* Subtle corner number indicator */}
                  <div className="absolute top-6 right-8 text-6xl font-extrabold text-[#181822] font-mono select-none pointer-events-none">
                    {service.number}
                  </div>

                  <div className="relative z-10 space-y-8">
                    {/* Top Meta Header */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#D4AF37]">
                            Section {service.number}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#181822] text-[#8E8E98] border border-[#272733] font-mono">
                            {service.category}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                          {service.name}
                        </h2>
                      </div>
                    </div>

                    {/* Headline & Short Introduction */}
                    <div className="space-y-2 border-b border-[#1C1C24] pb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-[#F0F0F5] font-heading">
                        {service.headline}
                      </h3>
                      <p className="text-sm text-[#A0A0AC] leading-relaxed">
                        {service.shortIntro}
                      </p>
                    </div>

                    {/* Main Content Grid: What it Means, Problem Addressed, How it Works */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 rounded-xl bg-[#111116] border border-[#1E1E28]">
                        <span className="text-[11px] uppercase font-semibold text-[#D4AF37] block mb-2 font-mono">
                          What The Service Means
                        </span>
                        <p className="text-xs text-[#C5C5D0] leading-relaxed">
                          {service.whatItMeans}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#171111] border border-red-900/30">
                        <span className="text-[11px] uppercase font-semibold text-red-400 block mb-2 font-mono">
                          Business Problem Addressed
                        </span>
                        <p className="text-xs text-[#D8B4B4] leading-relaxed">
                          {service.problemAddressed}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl bg-[#111418] border border-blue-900/30">
                        <span className="text-[11px] uppercase font-semibold text-blue-300 block mb-2 font-mono">
                          How It Works Mechanically
                        </span>
                        <p className="text-xs text-[#C5D5E5] leading-relaxed">
                          {service.howItWorks}
                        </p>
                      </div>
                    </div>

                    {/* Deliverables & Suitable Business Types */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-[#1C1C24] items-start">
                      {/* Left: What the Client Receives (7 cols) */}
                      <div className="lg:col-span-7 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-white block">
                          What You Receive as a Client:
                        </span>
                        <div className="space-y-2">
                          {service.whatClientReceives.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#D0D0D8]">
                              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Suitable Business Types & CTA (5 cols) */}
                      <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-[#121218] border border-[#22222E]">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-white block mb-2">
                            Suitable Business Profiles:
                          </span>
                          <div className="space-y-1.5">
                            {service.suitableFor.map((biz, bIdx) => (
                              <div key={bIdx} className="flex items-center gap-2 text-xs text-[#A5A5B2]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                                <span>{biz}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#1E1E28]">
                          <button
                            type="button"
                            onClick={() => handleInquireClick(service.name)}
                            aria-label={`Inquire about ${service.name} commercial deployment`}
                            className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-[#D4AF37] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] focus-visible:outline-none"
                          >
                            <span>Inquire About {service.name}</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
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
      {/* 4. CROSS-CAPABILITY INTEGRATION MATRIX */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-t border-[#1A1A22] bg-[#0E0E12]">
        <Container width="wide">
          <SectionHeading
            eyebrow="Ecosystem Architecture"
            title="How Our Capabilities"
            goldGradientText="Operate Together"
            description="Our 10 core service domains do not operate in silos. They function as a synchronized revenue pipeline."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="matte-card p-6 rounded-2xl border-t-2 border-t-[#D4AF37]">
              <div className="text-xs font-mono text-[#D4AF37] mb-2 font-bold">NODE 01</div>
              <h4 className="text-base font-bold text-white mb-2 font-heading">Demand Ingestion</h4>
              <p className="text-xs text-[#90909A] leading-relaxed">
                Meta Ads and Google Ads capture and stimulate intent across high-intent search queries and social feeds.
              </p>
            </div>

            <div className="matte-card p-6 rounded-2xl border-t-2 border-t-[#D4AF37]">
              <div className="text-xs font-mono text-[#D4AF37] mb-2 font-bold">NODE 02</div>
              <h4 className="text-base font-bold text-white mb-2 font-heading">Creative Conversion</h4>
              <p className="text-xs text-[#90909A] leading-relaxed">
                Direct-Response Design and Short-Form Video cuts command attention and route users into custom-built Landing Pages.
              </p>
            </div>

            <div className="matte-card p-6 rounded-2xl border-t-2 border-t-[#D4AF37]">
              <div className="text-xs font-mono text-[#D4AF37] mb-2 font-bold">NODE 03</div>
              <h4 className="text-base font-bold text-white mb-2 font-heading">Friction Qualification</h4>
              <p className="text-xs text-[#90909A] leading-relaxed">
                Multi-step Lead Generation gates filter low-intent tire-kickers while Retargeting recaptures dropped prospects.
              </p>
            </div>

            <div className="matte-card p-6 rounded-2xl border-t-2 border-t-[#D4AF37]">
              <div className="text-xs font-mono text-[#D4AF37] mb-2 font-bold">NODE 04</div>
              <h4 className="text-base font-bold text-white mb-2 font-heading">Revenue Operations</h4>
              <p className="text-xs text-[#90909A] leading-relaxed">
                Server-Side Tracking syncs CAPI data while Lead Management & Automated Follow-up close deals in under 5 minutes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. BOTTOM CONVERSION CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-t border-[#1A1A22] bg-[#0A0A0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2 font-mono">
            Direct Commercial Engagement
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Not Sure Which Services Match <br />
            <span className="gold-text-gradient">Your Current Revenue Stage?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#92929D] max-w-xl mx-auto leading-relaxed mb-8">
            Every engagement begins with an objective discovery audit. Tell us your current marketing channels and monthly acquisition objectives, and a senior strategist will evaluate the right configuration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
              Request Growth Consultation
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('packages')}>
              View Pre-Packaged Systems
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
