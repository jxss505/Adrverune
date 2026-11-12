/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Layers,
  PhoneCall
} from 'lucide-react';
import { ServiceItem, PackageTier, FAQItem } from '../types';

export const APPROVED_SERVICES: ServiceItem[] = [
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    category: 'Paid Media',
    tagline: 'Precision paid social acquisition across Facebook and Instagram.',
    description: 'Data-driven paid social campaigns across Facebook and Instagram architected for measurable, predictable customer acquisition.',
    icon: Target,
    operationalRole: 'Captures and stimulates qualified buyer intent with granular audience clustering and iterative creative testing.',
    commonFailurePoint: 'Generic boosting and weak pixel tracking lead to high CPMs and unqualified form submissions.',
    deliverables: [
      'Custom Audience Architecture',
      'Direct-Response Creative Iteration',
      'Pixel & CAPI Attribution Setup',
      'Weekly Budget Scaling Protocols'
    ]
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'Paid Media',
    tagline: 'High-intent search, Performance Max, and display campaigns.',
    description: 'High-intent search, Performance Max, and display campaigns capturing active demand at the exact moment of commercial consideration.',
    icon: BarChart3,
    operationalRole: 'Intercepts active solution-seekers with tight keyword clusters and aggressive negative keyword filtering.',
    commonFailurePoint: 'Broad match leakage and lack of negative keywords waste budgets on irrelevant search queries.',
    deliverables: [
      'Search Intent Clustering',
      'Negative Keyword Engineering',
      'Smart Bidding Strategy',
      'Quality Score Optimization'
    ]
  },
  {
    id: 'social-media-marketing',
    name: 'Social Media Marketing',
    category: 'Creative & Assets',
    tagline: 'Strategic positioning and organic authority development.',
    description: 'Strategic organic positioning and brand narrative development that establishes category authority, trust, and community engagement.',
    icon: Users,
    operationalRole: 'Validates paid traffic by presenting an authoritative, active, and trustworthy brand presence.',
    commonFailurePoint: 'Inconsistent posting without strategic pillars or clear commercial relevance.',
    deliverables: [
      'Editorial Calendar Architecture',
      'Brand Tone & Content Pillars',
      'Engagement Playbooks',
      'Community Authority Strategy'
    ]
  },
  {
    id: 'creative-design',
    name: 'Creative Design',
    category: 'Creative & Assets',
    tagline: 'Direct-response visual assets and high-converting ad units.',
    description: 'High-converting ad creatives, brand collateral, and visual identities crafted to command attention in competitive feeds.',
    icon: Sparkles,
    operationalRole: 'Stops scrolling users and clearly communicates offer value within the first 1.5 seconds of impression.',
    commonFailurePoint: 'Aesthetic-only designs that look pretty but fail to generate clicks or convey the direct offer.',
    deliverables: [
      'Direct-Response Static Creatives',
      'Dynamic Ad Variants',
      'Offer Badges & Motion Banners',
      'Brand System Guidelines'
    ]
  },
  {
    id: 'video-content-production',
    name: 'Video and Content Production',
    category: 'Creative & Assets',
    tagline: 'Hook-focused video scripts and short-form direct-response assets.',
    description: 'Engaging video scripts, hook-focused short-form content, and high-production brand stories built for digital distribution.',
    icon: Video,
    operationalRole: 'Accelerates prospect conviction and communicates complex value propositions rapidly.',
    commonFailurePoint: 'Slow opening hooks that cause 80%+ viewer drop-off within the first 3 seconds.',
    deliverables: [
      'Scriptwriting & Hook Frameworks',
      'Reels / TikTok / Shorts Direct Edits',
      'Product Demo Visuals',
      'Iterative Creative Cuts'
    ]
  },
  {
    id: 'website-landing-page',
    name: 'Website and Landing Page Development',
    category: 'Web & Funnels',
    tagline: 'Fast, mobile-first conversion environments engineered for ROI.',
    description: 'Fast, mobile-first, conversion-optimized landing pages and digital agency presences engineered for maximum ROI.',
    icon: Globe,
    operationalRole: 'Transforms cold paid traffic into qualified sales inquiries through frictionless layout engineering.',
    commonFailurePoint: 'Sending paid traffic to bloated homepages with dozens of distractions and slow load times.',
    deliverables: [
      'Responsive Tailored Layouts',
      'Conversion Architecture & Sticky CTAs',
      'Technical SEO & Fast Load Speeds',
      'Accessibility Compliance'
    ]
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation',
    category: 'Paid Media',
    tagline: 'Full-funnel demand generation with upfront qualification.',
    description: 'Full-funnel demand generation systems qualifying prospective clients before they ever reach your sales calendar.',
    icon: TrendingUp,
    operationalRole: 'Filters high-intent prospects from curiosity clickers using interactive multi-step logic.',
    commonFailurePoint: 'Single-click form fills that flood internal teams with spam and non-responsive contacts.',
    deliverables: [
      'Multi-Step Qualification Funnels',
      'Lead Magnet Architecture',
      'Form Qualification Logic',
      'Channel Acquisition Routing'
    ]
  },
  {
    id: 'retargeting',
    name: 'Retargeting',
    category: 'Paid Media',
    tagline: 'Multi-touch remarketing sequences that convert abandoned consideration.',
    description: 'Multi-touch remarketing sequences that nurture warm prospects and convert abandoned consideration into confirmed clients.',
    icon: Repeat,
    operationalRole: 'Re-engages the 95%+ of visitors who do not convert on their initial visit with objection-handling sequences.',
    commonFailurePoint: 'Aggressive ad spamming that burns audience goodwill rather than systematically overcoming objections.',
    deliverables: [
      'Omnichannel Retargeting Pools',
      'Dynamic Frequency Capping',
      'Objection-Handling Ad Sequences',
      'Lapsed Audience Re-engagement'
    ]
  },
  {
    id: 'lead-tracking',
    name: 'Lead Tracking',
    category: 'Revenue Operations',
    tagline: 'Server-side attribution and conversion API synchronization.',
    description: 'End-to-end attribution setups, server-side event tracking, and dashboard reporting that give total visibility over acquisition costs.',
    icon: Compass,
    operationalRole: 'Eliminates privacy signal loss by sending first-party conversion data directly to ad platform algorithms.',
    commonFailurePoint: 'Relying exclusively on browser cookies that get blocked by privacy filters and iOS restrictions.',
    deliverables: [
      'Server-Side Tracking (GTM / Meta CAPI)',
      'UTM Standardization',
      'Multi-Touch Attribution Audits',
      'Custom Performance Dashboards'
    ]
  },
  {
    id: 'lead-management',
    name: 'Lead Management',
    category: 'Revenue Operations',
    tagline: 'Systematic pipeline routing, qualification scoring, and CRM sync.',
    description: 'Systematic pipeline routing, qualification scoring, and lead status synchronization ensuring zero leakage in deal flow.',
    icon: Layers,
    operationalRole: 'Ensures every inbound inquiry is categorized, scored, and assigned to the right team member instantly.',
    commonFailurePoint: 'Leads trapped in disjointed spreadsheets with no tracking of sales follow-up status.',
    deliverables: [
      'CRM Pipeline Configuration',
      'Lead Scoring Rules',
      'Instant Notification Webhooks',
      'Automated Assignment Routing'
    ]
  },
  {
    id: 'sales-followup-systems',
    name: 'Sales and Follow-up Systems',
    category: 'Revenue Operations',
    tagline: 'Automated multi-channel speed-to-lead and appointment cadences.',
    description: 'Automated email/SMS follow-up cadences and sales enablement playbooks that turn cold inquiries into booked calls and closed revenue.',
    icon: PhoneCall,
    operationalRole: 'Capitalizes on the critical first 60 minutes when lead qualification probability is 7x higher.',
    commonFailurePoint: 'Waiting 24 to 48 hours to contact an inbound lead, allowing them to turn cold or buy elsewhere.',
    deliverables: [
      'Multi-Channel Follow-up Cadences (SMS/Email)',
      'Speed-to-Lead Instant Automation',
      'Appointment Confirmation Workflows',
      'Re-Activation Sequences'
    ]
  }
];

export const APPROVED_PACKAGES: PackageTier[] = [
  {
    id: 'lead-generation-system',
    name: 'Lead Generation System',
    systemName: 'Lead Generation System',
    tierNumber: 'Package 01',
    target: 'Emerging businesses seeking consistent, qualified inbound inquiries via direct messaging & core advertising.',
    status: 'Foundation Tier',
    pricingNote: '₹15,000 – ₹45,000',
    features: [
      'Core advertising (Meta Ads)',
      'Basic creatives (Static ad formats)',
      'Click-to-WhatsApp campaign architecture',
      'WhatsApp setup & business profile routing',
      'Lead tracking & conversion event setup',
      'Basic Google Business Profile optimization',
      'Follow-up templates for manual outreach',
      'Basic reporting & performance summary'
    ],
    highlight: false
  },
  {
    id: 'lead-sales-growth-system',
    name: 'Lead + Sales Growth System',
    systemName: 'Lead + Sales Growth System',
    tierNumber: 'Package 02',
    target: 'Growing businesses ready to expand across Google Search, retargeting, and automated sales pipelines.',
    status: 'Recommended',
    pricingNote: '₹40,000 – ₹1,25,000',
    features: [
      'Everything in Lead Generation System, plus:',
      'Google Ads (Search & high-intent demand harvesting)',
      'Retargeting (Omnichannel remarketing pools)',
      'Dedicated conversion landing pages (Mobile-first)',
      'CRM and lead management pipeline setup',
      'Lead qualification gates & friction filters',
      'Automated sales and follow-up system (Speed-to-lead <5 min)',
      'Weekly optimization sprints & KPI reporting'
    ],
    highlight: true
  },
  {
    id: 'full-growth-performance-system',
    name: 'Full Growth & Performance System',
    systemName: 'Full Growth & Performance System',
    tierNumber: 'Package 03',
    target: 'Scaling companies requiring complete omnichannel paid media, video creative production, custom funnels, and CRM automation.',
    status: 'Enterprise Scale',
    pricingNote: '₹1,00,000 – ₹5,00,000',
    features: [
      'Everything in Lead + Sales Growth System, plus:',
      'Video and content production (Hook scripts & direct edits)',
      'Advanced server-side tracking (Meta CAPI & GTM setup)',
      'Full-funnel custom landing page development',
      'Multi-channel appointment booking & SMS/Email cadences',
      'Omnichannel scaling protocols across Meta & Google',
      'Dedicated senior strategist & priority channel management'
    ],
    highlight: false,
    isPending: false
  }
];

export const FOUNDATION_FAQS: FAQItem[] = [
  {
    id: 'account-ownership',
    question: 'Who owns the advertising accounts, domains, and tracking data?',
    answer: 'The client maintains 100% direct ownership of all ad accounts (Meta Ads Manager, Google Ads), domain assets, and analytics properties. ADVERUNE operates strictly as a delegated partner access manager.'
  },
  {
    id: 'pricing-and-guarantees',
    question: 'Do you guarantee a specific number of leads, sales, or exact revenue?',
    answer: 'In strict adherence to professional advertising ethics and compliance standards, ADVERUNE never makes speculative numerical revenue guarantees. We engineer the highest caliber of targeting, landing page conversion, and speed-to-lead follow-up systems.'
  },
  {
    id: 'timeline-to-launch',
    question: 'How quickly does an acquisition system go live?',
    answer: 'Following Phase 1 Discovery and strategic sign-off, Phase 3 Creative and Funnel build typically completes within 10 to 14 business days before entering Phase 4 Controlled Launch and Attribution QA.'
  },
  {
    id: 'followup-integration',
    question: 'How do your sales and follow-up systems connect to our existing sales team?',
    answer: 'In the Lead + Sales Growth System, we build automated instant response workflows (SMS, email notification, webhook routing) that trigger within minutes of an inquiry being submitted, alerting your sales reps or booking directly into their calendar.'
  }
];
