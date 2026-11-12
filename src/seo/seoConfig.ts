/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavRoute } from '../types';

export interface PageSEO {
  route: NavRoute;
  path: string;
  title: string;
  description: string;
  h1: string;
  ogType: 'website' | 'article';
  keywords: string[];
  breadcrumbs: { name: string; item: string }[];
  schemaGenerator: (baseUrl: string) => Record<string, unknown>[];
}

export const ROUTE_PATH_MAP: Record<NavRoute, string> = {
  home: '/',
  services: '/services',
  packages: '/packages',
  process: '/process',
  work: '/work',
  about: '/about',
  insights: '/insights',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  'not-found': '/404'
};

export const PATH_ROUTE_MAP: Record<string, NavRoute> = {
  '/': 'home',
  '/services': 'services',
  '/packages': 'packages',
  '/process': 'process',
  '/work': 'work',
  '/about': 'about',
  '/insights': 'insights',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/404': 'not-found'
};

export const SITE_NAME = 'ADVERUNE';
export const DEFAULT_OG_IMAGE = '/og-image.png';

export const SEO_PAGES: Record<NavRoute, PageSEO> = {
  home: {
    route: 'home',
    path: '/',
    title: 'ADVERUNE | Premium Digital Advertising & Growth Systems',
    description: 'ADVERUNE is a premium digital advertising and marketing agency delivering high-performance growth, precision paid media, and conversion systems.',
    h1: 'Turning Business Potential Into Measurable Growth.',
    ogType: 'website',
    keywords: [
      'digital advertising agency',
      'paid social marketing',
      'Google ads management',
      'meta ads agency',
      'lead generation systems',
      'customer acquisition agency',
      'speed to lead automation'
    ],
    breadcrumbs: [{ name: 'Home', item: '/' }],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'ADVERUNE',
        url: baseUrl,
        logo: `${baseUrl}/favicon.ico`,
        description: 'Premium digital advertising agency specializing in precision paid media, Google search intent clustering, and conversion systems.',
        sameAs: []
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ADVERUNE Digital Advertising',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/insights?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  },
  services: {
    route: 'services',
    path: '/services',
    title: 'Advertising & Growth Services | ADVERUNE Digital Agency',
    description: 'Explore 11 integrated digital advertising and growth services: Meta Ads, Google Ads, Speed-to-Lead, Landing Pages, Conversion Tracking, and CRM Systems.',
    h1: 'Engineered Acquisition Services. Built for Predictable Scale.',
    ogType: 'website',
    keywords: [
      'Meta ads services',
      'Google ads PPC management',
      'direct response creative design',
      'high converting landing pages',
      'conversion tracking server side CAPI',
      'lead tracking and CRM integration'
    ],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Services', item: '/services' }
    ],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Digital Advertising & Paid Media',
        provider: {
          '@type': 'Organization',
          name: 'ADVERUNE',
          url: baseUrl
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'ADVERUNE Marketing Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads Management' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Intent Harvesting' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Positioning' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Direct-Response Creative Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Short-Form Video Production' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Friction-Engineered Landing Pages' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lead Generation Funnels' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dynamic Retargeting Architecture' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Server-Side CAPI Lead Tracking' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM & Speed-to-Lead Routing' } }
          ]
        }
      }
    ]
  },
  packages: {
    route: 'packages',
    path: '/packages',
    title: 'Service Packages & Growth Systems | ADVERUNE Advertising',
    description: "Compare ADVERUNE's 3 structured acquisition packages: Lead Generation System (₹15,000 – ₹45,000), Lead + Sales Growth System (₹40,000 – ₹1,25,000), and Full Growth & Performance System (₹1,00,000 – ₹5,00,000).",
    h1: 'Structured Growth Systems. Engineered for Scalable Acquisition.',
    ogType: 'website',
    keywords: [
      'digital marketing packages',
      'lead generation system',
      'lead and sales growth system',
      'full growth performance system',
      'B2B advertising package',
      'agency service tiers'
    ],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Packages', item: '/packages' }
    ],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'ADVERUNE Approved Service Packages',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Package 1: Lead Generation System',
            description: 'Core advertising, basic creatives, WhatsApp setup, lead tracking, Google Business profile, and follow-up templates (₹15,000 – ₹45,000).'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Package 2: Lead + Sales Growth System',
            description: 'Includes Lead Generation foundation plus Google Ads, retargeting, landing pages, CRM management, lead qualification, and sales systems (₹40,000 – ₹1,25,000).'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Package 3: Full Growth & Performance System',
            description: 'Includes Lead + Sales Growth plus video production, advanced server-side CAPI tracking, full-funnel custom landing pages, and senior strategist oversight (₹1,00,000 – ₹5,00,000).'
          }
        ]
      }
    ]
  },
  process: {
    route: 'process',
    path: '/process',
    title: 'Our 8-Stage Advertising Methodology | ADVERUNE Process',
    description: 'Discover our rigorous 8-stage advertising and marketing engineering methodology: from discovery and research to tracking and performance optimization.',
    h1: 'Rigorous Methodology. Transparent Engineering Execution.',
    ogType: 'website',
    keywords: [
      'advertising process',
      'marketing methodology',
      'campaign discovery and research',
      'creative development workflow',
      'attribution tracking and optimization'
    ],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Our Process', item: '/process' }
    ],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'The ADVERUNE 8-Stage Advertising Methodology',
        description: 'Comprehensive operational procedure for commercial customer acquisition and campaign management.',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Discovery', text: 'Understand the business model, unit economics, and growth objectives.' },
          { '@type': 'HowToStep', position: 2, name: 'Research', text: 'Conduct market, audience, and competitive environment intelligence.' },
          { '@type': 'HowToStep', position: 3, name: 'Strategy', text: 'Architect channel distribution, messaging angles, and budget allocation.' },
          { '@type': 'HowToStep', position: 4, name: 'Creative Development', text: 'Produce direct-response visual units, copy variants, and angles.' },
          { '@type': 'HowToStep', position: 5, name: 'Campaign Setup', text: 'Configure ad accounts, conversion pixels, and webhook integrations.' },
          { '@type': 'HowToStep', position: 6, name: 'Execution', text: 'Launch and systematically manage approved live campaigns.' },
          { '@type': 'HowToStep', position: 7, name: 'Tracking', text: 'Monitor lead attribution, CAPI event delivery, and speed-to-lead.' },
          { '@type': 'HowToStep', position: 8, name: 'Optimisation', text: 'Reallocate capital toward verified high-return ad angles.' }
        ]
      }
    ]
  },
  work: {
    route: 'work',
    path: '/work',
    title: 'Documented Work & Campaign Blueprints | ADVERUNE Portfolio',
    description: 'Inspect our documented creative standards, direct-response design units, campaign concepts, and revenue operations blueprints. Zero fabricated results.',
    h1: 'Documented Craft. Strategic Architecture.',
    ogType: 'website',
    keywords: [
      'advertising portfolio',
      'campaign concepts',
      'direct response ad designs',
      'landing page blueprints',
      'marketing strategy samples'
    ],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Our Work', item: '/work' }
    ],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'ADVERUNE Conceptual Portfolio & Work Demonstration',
        description: 'Documented creative and strategic acquisition blueprints across 7 commercial categories.'
      }
    ]
  },
  about: {
    route: 'about',
    path: '/about',
    title: 'About ADVERUNE | Governance, Philosophy & Principles',
    description: "Learn about ADVERUNE's strategic philosophy, corporate governance, client-focused principles, and direct ad account ownership commitment.",
    h1: 'Strategic Precision. Modern Advertising Excellence.',
    ogType: 'website',
    keywords: [
      'about ADVERUNE',
      'advertising agency governance',
      'direct client account ownership',
      'transparent marketing agency',
      'strategic digital advertising'
    ],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'About Us', item: '/about' }
    ],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About ADVERUNE',
        description: 'Strategic agency philosophy, vision, mission, and client-first operating principles.'
      }
    ]
  },
  insights: {
    route: 'insights',
    path: '/insights',
    title: 'Digital Advertising Insights & Research | ADVERUNE Desk',
    description: 'Executive briefings on digital advertising mechanics, server-side CAPI attribution, speed-to-lead operations, and qualification conversion architectures.',
    h1: 'Strategy & Intelligence. Zero Marketing Noise.',
    ogType: 'website',
    keywords: [
      'digital marketing insights',
      'speed to lead statistics HBR',
      'server side CAPI tracking',
      'high ticket conversion friction',
      'Google ads broad match negative keywords',
      'creative fatigue testing'
    ],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Insights', item: '/insights' }
    ],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'ADVERUNE Executive Marketing Insights',
        description: 'Technical and empirical analysis of digital advertising systems, conversion telemetry, and commercial pipeline mechanics.'
      }
    ]
  },
  contact: {
    route: 'contact',
    path: '/contact',
    title: 'Initiate Strategic Consultation | ADVERUNE Contact',
    description: 'Apply for an objective strategic consultation. Inquire about media management, lead generation packages, and bespoke acquisition pipeline setups.',
    h1: 'Initiate Strategic Contact. Direct. Structured. Focused.',
    ogType: 'website',
    keywords: [
      'contact advertising agency',
      'digital marketing consultation',
      'inquire marketing packages',
      'hire advertising team'
    ],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Contact', item: '/contact' }
    ],
    schemaGenerator: (baseUrl: string) => [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'ADVERUNE Strategic Consultation Intake',
        description: 'Structured intake portal for business growth consultations and marketing evaluations.'
      }
    ]
  },
  privacy: {
    route: 'privacy',
    path: '/privacy',
    title: 'Privacy Policy & Data Processing Notice | ADVERUNE',
    description: 'Review the operational privacy policy and data processing framework for ADVERUNE. Learn how inquiry data is collected, secured, and retained.',
    h1: 'Privacy Policy & Data Processing Notice',
    ogType: 'website',
    keywords: ['privacy policy', 'data processing notice', 'enquiry data privacy', 'GDPR consent separation'],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Privacy Policy', item: '/privacy' }
    ],
    schemaGenerator: () => []
  },
  terms: {
    route: 'terms',
    path: '/terms',
    title: 'Terms & Conditions of Website Use | ADVERUNE',
    description: 'Official terms of use governing the ADVERUNE website, preliminary consultation inquiries, intellectual property, and commercial service boundaries.',
    h1: 'Terms & Conditions of Website Use',
    ogType: 'website',
    keywords: ['terms and conditions', 'website terms of use', 'commercial inquiry terms'],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Terms and Conditions', item: '/terms' }
    ],
    schemaGenerator: () => []
  },
  'not-found': {
    route: 'not-found',
    path: '/404',
    title: '404: Strategic Route Not Found | ADVERUNE',
    description: "The requested page could not be located. Explore ADVERUNE's approved advertising services, growth packages, or initiate an inquiry.",
    h1: '404: Strategic Route Not Found',
    ogType: 'website',
    keywords: ['404', 'page not found'],
    breadcrumbs: [
      { name: 'Home', item: '/' },
      { name: 'Not Found', item: '/404' }
    ],
    schemaGenerator: () => []
  }
};

export function getCanonicalUrl(path: string, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const cleanBase = base.replace(/\/+$/, '');
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
