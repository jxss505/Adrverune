/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Target,
  Layers,
  Shield,
  FileText,
  BarChart3,
  Cpu,
  Flame,
  ArrowUpRight
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { NavRoute } from '../types';

interface InsightsPageProps {
  onNavigate: (route: NavRoute) => void;
}

export type InsightCategory =
  | 'All'
  | 'Digital Advertising'
  | 'Meta Ads'
  | 'Google Ads'
  | 'Social Media Marketing'
  | 'Lead Generation'
  | 'Business Growth'
  | 'Marketing Strategy'
  | 'Website Conversion';

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: Exclude<InsightCategory, 'All'>;
  readTime: string;
  publishDate: string;
  excerpt: string;
  featured?: boolean;
  schematicType: 'funnel' | 'capi' | 'friction' | 'search' | 'retention' | 'qualification';
  keyTakeaways: string[];
  content: {
    leadSummary: string;
    sections: {
      heading: string;
      paragraphs: string[];
      bulletPoints?: string[];
      highlightBox?: {
        title: string;
        text: string;
      };
    }[];
    conclusion: string;
  };
}

export const ARTICLES_DATABASE: InsightArticle[] = [
  {
    id: 'insight-1',
    slug: 'speed-to-lead-advertising-roi',
    title: 'The First 60 Minutes: Why Speed-to-Lead Dictates Advertising Return on Investment',
    category: 'Lead Generation',
    readTime: '6 min read',
    publishDate: 'November 2026',
    featured: true,
    schematicType: 'funnel',
    excerpt: 'Analyzing landmark Harvard Business Review research on why contacting an inbound inquiry within 1 hour delivers a 7x qualification multiplier compared to standard 24-hour delays.',
    keyTakeaways: [
      'Inquiries responded to within 5 minutes convert at 21x higher odds than those contacted at 30 minutes.',
      'A delay of 24 hours decreases lead qualification odds by more than 60 times.',
      'Ad spend generates awareness; automated operational routing converts awareness into revenue.',
      'Direct WhatsApp or SMS dispatch bridges the critical response gap before lead interest cools.'
    ],
    content: {
      leadSummary: 'Most commercial advertising audits reveal an unexpected paradox: marketing teams spend weeks optimizing cost-per-click and creative click-through rates, yet 70% of downstream conversion loss occurs after the lead is submitted because internal response cadences are delayed.',
      sections: [
        {
          heading: '1. The Decay Curve of Buyer Attention',
          paragraphs: [
            'When a decision-maker submits an inquiry form or clicks a direct-response ad, their intent and problem-awareness are at their apex. They are seated at their device, emotionally engaged with their operational bottleneck, and actively seeking resolution.',
            'Research published in the Harvard Business Review examining 1.25 million sales leads documented that companies attempting contact within one hour were nearly seven times more likely to qualify the lead than those who waited just one additional hour—and more than 60 times as likely as firms that waited 24 hours or longer.'
          ],
          highlightBox: {
            title: 'Empirical Speed-to-Lead Rule',
            text: 'Odds of entering a meaningful sales conversation decrease by 391% after the first minute of inaction. By minute 30, buyer attention has fractured into competing emails and meetings.'
          }
        },
        {
          heading: '2. The Disconnect Between Media Spend and Sales Response',
          paragraphs: [
            'In conventional business structures, advertising management is decoupled from customer relationship management. Paid media drives a form submission into an inbox or spreadsheet, where it sits waiting for a manual end-of-day triage by sales staff.',
            'By the time a representative initiates contact 18 to 36 hours later, the prospective customer has frequently revisited Google, consulted competitors, or dismissed the urgent priority.'
          ],
          bulletPoints: [
            'Unsynchronized ad webhooks that batch lead exports once per 24 hours',
            'Absence of automated immediate SMS or WhatsApp confirmation channels',
            'Sales representatives prioritizing cold outbound over immediate inbound warm triggers',
            'Lack of calendar self-booking directly embedded on the confirmation screen'
          ]
        },
        {
          heading: '3. Technical Remedies: The 5-Minute Inbound Architecture',
          paragraphs: [
            'Remedying speed-to-lead does not require expanding headcounts; it requires webhook infrastructure. Modern campaign architecture must deploy automated instant confirmations that immediately acknowledge receipt, set expectations, and provide direct calendar reservations.',
            'When Click-to-WhatsApp or automated SMS routing is paired with immediate calendar reservation systems, more than 40% of qualified leads select their own appointment slot before the sales team ever dials out manually.'
          ]
        }
      ],
      conclusion: 'Advertising budgets do not operate in a vacuum. If your operational response time exceeds 60 minutes, cutting cost-per-click will not solve pipeline stagnation. Accelerating the first response bridge remains the highest-leverage growth lever available.'
    }
  },
  {
    id: 'insight-2',
    slug: 'server-side-capi-tracking-deprecation',
    title: 'The Sunset of Browser Pixels: Why First-Party Server-Side CAPI Is Mandatory',
    category: 'Digital Advertising',
    readTime: '7 min read',
    publishDate: 'November 2026',
    schematicType: 'capi',
    excerpt: 'How browser privacy protections, ad blockers, and cookie deprecation blind ad algorithms—and why first-party server-side tracking is required for accurate attribution.',
    keyTakeaways: [
      'Standard JavaScript browser pixels lose between 15% to 35% of conversion events due to client-side ad blockers.',
      'Meta Conversions API (CAPI) sends purchase and lead signals directly from your server to Meta servers.',
      'Accurate conversion signals allow ad bidding algorithms to optimize for highest-value customers rather than low-intent clicks.',
      'Deduplication keys guarantee that dual browser-and-server setups avoid double-counting transactions.'
    ],
    content: {
      leadSummary: 'For more than a decade, digital marketers relied on client-side JavaScript tags embedded in web pages. Today, operating system privacy controls, browser tracking prevention, and widespread content blockers have rendered client-side measurement dangerously incomplete.',
      sections: [
        {
          heading: '1. The Mechanism of Client-Side Signal Loss',
          paragraphs: [
            'When a user visits a website, client-side tracking scripts execute within their local browser window. If the browser blocks third-party cookies or an ad-blocking extension halts script execution, the conversion event never registers on the ad platform.',
            'The commercial repercussion is severe: ad delivery algorithms depend on feedback loops. If an ad campaign generates 10 high-value leads but the browser pixel only reports 6, the algorithm assumes the campaign failed and reallocates budget to cheaper, lower-quality audiences.'
          ]
        },
        {
          heading: '2. The Server-to-Server Solution Architecture',
          paragraphs: [
            'Server-Side Conversion APIs (such as Meta CAPI and Google Enhanced Conversions) bypass the browser environment entirely. When a lead form or transaction is completed, your web server securely dispatches the event payload directly to the ad network via an encrypted REST API.',
            'Because the data transmission occurs directly between servers, ad blockers and browser privacy restrictions cannot intercept or drop the conversion packet.'
          ],
          highlightBox: {
            title: 'Event Quality Score (EQS) Impact',
            text: 'Accounts integrating server-side CAPI with hashed customer parameters (email, telephone, IP) consistently improve Event Quality Scores from sub-4.0 to above 8.5 out of 10.'
          }
        },
        {
          heading: '3. Redundancy and Event Deduplication',
          paragraphs: [
            'Industry best practice dictates a hybrid tracking architecture: both the browser pixel and the server-side API fire simultaneously with an identical unique Event ID.',
            'The advertising engine evaluates both signals and automatically deduplicates them, ensuring maximum event capture without inflating recorded conversion volume.'
          ]
        }
      ],
      conclusion: 'First-party data infrastructure is no longer an optional enterprise luxury. For mid-market brands investing significant capital in paid search and social, server-side attribution is the foundational prerequisite for algorithmic efficiency.'
    }
  },
  {
    id: 'insight-3',
    slug: 'high-ticket-conversion-friction-architecture',
    title: 'Friction-Engineered Conversion: Why Intent Gates Protect Sales Calendars',
    category: 'Website Conversion',
    readTime: '5 min read',
    publishDate: 'November 2026',
    schematicType: 'friction',
    excerpt: 'Why low-friction single-field lead forms flood sales calendars with unqualified tire-kickers, and how intentional qualification gates elevate lead close rates.',
    keyTakeaways: [
      'Zero-friction lead generation produces inflated conversion rates with depressed deal closure rates.',
      'Intentional qualification questions act as psychological commitment devices for serious buyers.',
      'Segmenting leads by budget and timeline prevents senior sales strategists from wasting hours on unqualified inquiries.',
      'Multi-step progressive forms outperform long static forms while capturing 40% richer intake intelligence.'
    ],
    content: {
      leadSummary: 'Common digital marketing dogma dictates that conversion friction must always be minimized. However, in B2B, premium consulting, and high-ticket service industries, minimizing friction frequently destroys sales team productivity.',
      sections: [
        {
          heading: '1. The Myth of the Frictionless Form',
          paragraphs: [
            'Single-click native lead forms asking only for a pre-filled name and phone number regularly report phenomenal conversion rates of 12% to 20%. Yet when sales representatives contact these submissions, over half claim they do not recall submitting the form or lack the budget to engage.',
            'Reducing friction to near-zero eliminates the psychological threshold of commitment. Qualified buyers are willing to invest two minutes answering diagnostic questions if they believe they are entering a consultative dialogue.'
          ]
        },
        {
          heading: '2. The Mechanics of the Intent Gate',
          paragraphs: [
            'An effective qualification gate introduces deliberate, value-adding friction. Instead of a single static block, the intake operates as a multi-step diagnostic workflow.',
            'By asking 3 to 4 diagnostic questions (e.g., current monthly ad budget, primary acquisition bottleneck, timeline to launch), the prospective client perceives the agency or service firm as discerning and specialized.'
          ],
          highlightBox: {
            title: 'The Commitment Principle',
            text: 'Behavioral economics demonstrates that individuals value solutions proportional to the investment required to access them. Easy access signals a commodity; structured intake signals exclusivity.'
          }
        },
        {
          heading: '3. Strategic Routing of Qualified vs. Unqualified Pipeline',
          paragraphs: [
            'Diagnostic forms empower dynamic routing logic: qualified prospects whose budget aligns with your target threshold are directed straight to calendar booking.',
            'Unqualified inquiries are politely routed to self-service resources, newsletters, or lower-tier automated packages without consuming executive sales time.'
          ]
        }
      ],
      conclusion: 'Optimize for qualified sales meetings and booked pipeline revenue rather than raw lead quantity. Strategic friction separates casual browsers from serious commercial partners.'
    }
  },
  {
    id: 'insight-4',
    slug: 'search-intent-clustering-google-ads',
    title: 'Intent Clustering in Google Ads: Moving Beyond Broad Match Dependency',
    category: 'Google Ads',
    readTime: '6 min read',
    publishDate: 'November 2026',
    schematicType: 'search',
    excerpt: 'How search term clustering and negative keyword sculpting prevent budget wastage in automated Performance Max and Smart Bidding campaigns.',
    keyTakeaways: [
      'Automated bidding models perform best when fed clean, unambiguous commercial intent keywords.',
      'Negative keyword sculpting is the single most critical defensive control against rogue search queries.',
      'High-intent search terms reflect explicit purchase desire, contrasting with exploratory research terms.',
      'Exact and Phrase match clusters preserve ad copy relevance and maximize Quality Scores.'
    ],
    content: {
      leadSummary: 'Google has aggressively transitioned its advertising ecosystem toward AI-driven automation, Smart Bidding, and Performance Max. While machine learning can scale volume, handing untethered control to algorithms without strict intent clustering results in budget cannibalization.',
      sections: [
        {
          heading: '1. The Trap of Broad Match Automation',
          paragraphs: [
            'Modern Broad Match matches search terms based on semantic context rather than syntax. While useful for discovering emerging query variants, it frequently pairs high-budget bids with low-intent queries such as "free templates," "internships," or "definition of."',
            'Without defensive keyword architectures, automated bidding optimizes for conversion volume, bidding aggressively on cheap queries that rarely convert into contracted revenue.'
          ]
        },
        {
          heading: '2. Structuring Tight Intent Clusters',
          paragraphs: [
            'Strategic campaign management requires segmenting keywords into thematic intent tiers: High Commercial Intent (e.g., "agency pricing," "hire provider"), Problem Exploration (e.g., "how to fix low leads"), and Informational Research.',
            'Dedicated ad groups with tailored ad copy ensure that the user sees their exact search problem reflected in the headline, improving Quality Score and lowering effective cost-per-click.'
          ]
        }
      ],
      conclusion: 'Algorithmic bidding is a powerful engine, but it requires precise rails. Rigorous intent clustering and aggressive negative keyword lists keep ad spend focused exclusively on commercial buyers.'
    }
  },
  {
    id: 'insight-5',
    slug: 'creative-fatigue-direct-response-framework',
    title: 'Defeating Creative Fatigue: The 4-Tier Ad Variation System',
    category: 'Meta Ads',
    readTime: '5 min read',
    publishDate: 'November 2026',
    schematicType: 'retention',
    excerpt: 'Why single winning ad creative burns out within 3 to 6 weeks, and how maintaining a 4-tier creative testing rotation stabilizes customer acquisition costs.',
    keyTakeaways: [
      'Creative fatigue manifests as rising CPMs and declining click-through rates as target audiences see the same visual repeatedly.',
      'Iterative angle testing (Hook, Agitation, Proof, Offer) yields higher returns than redesigning entire ads from scratch.',
      'High-contrast static creative often outperforms expensive video production in direct-response conversions.',
      'Systematic creative pipelines eliminate the feast-or-famine performance cycles common in social ads.'
    ],
    content: {
      leadSummary: 'On Meta, TikTok, and modern social platforms, creative is the primary targeting lever. Algorithms use the visual and spoken content of your ads to identify responsive consumer clusters. However, even the highest-performing ad inevitably suffers audience fatigue.',
      sections: [
        {
          heading: '1. Understanding Algorithmic Audience Saturation',
          paragraphs: [
            'When an ad performs exceptionally well, Meta prioritizes showing it to the highest-converting subset of your audience. As that pocket is exhausted, ad frequency climbs, click-through rates drop, and acquisition costs escalate rapidly.',
            'Relying on one or two "hero" ads creates severe operational vulnerability. When those creative units fatigue, lead flow plummets unexpectedly.'
          ]
        },
        {
          heading: '2. The 4-Tier Variation Methodology',
          paragraphs: [
            'To maintain stable acquisition costs, top-tier performance marketers run a structured 4-tier variation engine that tests individual variables systematically:',
            'Variable A: The Hook (First 3 seconds or headline banner)',
            'Variable B: Visual Presentation (Static diagram vs. split-screen vs. kinetic typography)',
            'Variable C: The Angle (Financial ROI vs. Time Savings vs. Risk Reduction)',
            'Variable D: The Call to Action (Direct booking vs. diagnostic quiz vs. case study review)'
          ]
        }
      ],
      conclusion: 'Creative testing should not be an ad-hoc panic response when sales drop. It must operate as a disciplined weekly engineering sprint that continuously seeds new winning angles into production campaigns.'
    }
  },
  {
    id: 'insight-6',
    slug: 'attribution-modeling-direct-client-account-ownership',
    title: 'The Truth About Ad Account Ownership & Attribution Transparency',
    category: 'Marketing Strategy',
    readTime: '6 min read',
    publishDate: 'November 2026',
    schematicType: 'qualification',
    excerpt: 'Why agency lock-in models and proprietary black-box ad accounts harm enterprise value, and how direct client account ownership creates mutual trust.',
    keyTakeaways: [
      'Clients should always own their ad accounts, pixel data, and tracking assets directly.',
      'Holding ad accounts in agency-owned containers creates dangerous dependencies and loss of historical data.',
      'Direct account ownership guarantees complete transparency into real media spend and platform billing.',
      'Trust is built on commercial alignment and verifiable performance, not contractual data hostages.'
    ],
    content: {
      leadSummary: 'One of the most persistent anti-patterns in the digital marketing agency sector is the practice of running client advertising campaigns inside agency-owned ad accounts, shielding actual media spend and retaining pixel data if the relationship concludes.',
      sections: [
        {
          heading: '1. The Danger of Proprietary Ad Account Lock-In',
          paragraphs: [
            'When an agency creates campaigns inside their own ad account rather than the client’s business manager, the client builds zero institutional asset value. All algorithmic learning, pixel data, custom audiences, and historical conversion histories remain trapped with the agency.',
            'Furthermore, this opacity allows unscrupulous operators to mark up media spend or conceal campaign inefficiencies behind aggregated reporting dashboards.'
          ]
        },
        {
          heading: '2. The ADVERUNE Standard: 100% Client Ownership',
          paragraphs: [
            'We believe that enterprise marketing data belongs solely to the enterprise paying for it. All ad accounts, tracking containers, and CRM pipelines must be provisioned in the client’s legal name, with the agency granted delegated partner administrative access.',
            'If an engagement ever concludes, the client retains every shred of historical data, every conversion model, and every pixel optimization without interruption.'
          ]
        }
      ],
      conclusion: 'True strategic partnerships are founded on mutual respect and objective performance. Ensuring 100% direct client account ownership is the ethical bedrock of modern digital advertising.'
    }
  }
];

export const UPCOMING_BRIEFINGS = [
  {
    title: 'Omnichannel B2B: Synchronizing LinkedIn Account Lists with Meta Direct Response',
    category: 'Marketing Strategy',
    status: 'In Editorial Peer Review',
    scheduledRelease: 'December 2026'
  },
  {
    title: 'The Math of Customer Acquisition Cost (CAC) to Lifetime Value (LTV) in Digital Services',
    category: 'Business Growth',
    status: 'Data Modeling Phase',
    scheduledRelease: 'December 2026'
  },
  {
    title: 'Click-to-WhatsApp Funnels: Architecture for Rapid Response in Global Markets',
    category: 'Social Media Marketing',
    status: 'Drafting Workflow',
    scheduledRelease: 'January 2027'
  }
];

export function InsightsPage({ onNavigate }: InsightsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const categories: InsightCategory[] = [
    'All',
    'Digital Advertising',
    'Meta Ads',
    'Google Ads',
    'Social Media Marketing',
    'Lead Generation',
    'Business Growth',
    'Marketing Strategy',
    'Website Conversion'
  ];

  const featuredArticle = useMemo(() => {
    return ARTICLES_DATABASE.find((a) => a.featured) || ARTICLES_DATABASE[0];
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATABASE.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenArticle = (article: InsightArticle) => {
    setActiveArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. DETAILED ARTICLE READER VIEW (When article is active) */}
      {/* ========================================================================= */}
      {activeArticle ? (
        <article className="py-12 md:py-20 animate-fade-in">
          <Container width="narrow">
            {/* Breadcrumb & Navigation */}
            <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#1E1E28]">
              <button
                type="button"
                onClick={handleCloseArticle}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Insights Index</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#7E7E8B]">
                <span className="font-mono text-[#D4AF37] uppercase text-[10px] px-2 py-0.5 rounded bg-[#161622] border border-[#D4AF37]/20">
                  {activeArticle.category}
                </span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            {/* Article Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E98] mb-3">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{activeArticle.publishDate}</span>
                <span>•</span>
                <span>ADVERUNE Strategy & Attribution Desk</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight mb-6">
                {activeArticle.title}
              </h1>

              <p className="text-base sm:text-lg text-[#B5B5C2] leading-relaxed italic border-l-2 border-[#D4AF37] pl-4 py-1">
                {activeArticle.excerpt}
              </p>
            </div>

            {/* Executive Key Takeaways Box */}
            <div className="matte-card p-6 rounded-2xl mb-10 border border-[#D4AF37]/30 bg-[#12121A]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-xs uppercase font-mono font-bold text-[#D4AF37] tracking-wider">
                  Executive Briefing Takeaways
                </h3>
              </div>
              <div className="space-y-2.5">
                {activeArticle.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E0E0EA]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schematic Graphic Representation */}
            <div className="w-full h-52 sm:h-64 rounded-2xl bg-[#0E0E14] border border-[#22222E] p-6 mb-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Technical System Visualisation</span>
                </span>
                <span className="text-[10px] font-mono text-[#6E6E78]">
                  FIGURE 1.0 • ARCHITECTURE
                </span>
              </div>

              <div className="relative z-10 text-center my-auto">
                <span className="text-xs font-mono text-[#8E8E98] block mb-1">
                  Topic Domain Model
                </span>
                <h4 className="text-lg font-bold text-white font-heading">
                  {activeArticle.title}
                </h4>
                <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-[#A0A0B0]">
                  <span className="px-2.5 py-1 rounded bg-[#161622] border border-[#252535]">
                    Validated Framework
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#161622] border border-[#252535]">
                    Peer-Reviewed Concepts
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#6A6A74] pt-2 border-t border-[#1C1C26]">
                <span>ADVERUNE Methodological Series</span>
                <span>Operational Discipline</span>
              </div>
            </div>

            {/* Longform Article Body */}
            <div className="prose prose-invert max-w-none space-y-8 text-sm sm:text-base text-[#B0B0C0] leading-relaxed">
              <p className="text-base text-[#D0D0DC] font-normal leading-relaxed">
                {activeArticle.content.leadSummary}
              </p>

              {activeArticle.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4 pt-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-[#A0A0B0] leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {section.highlightBox && (
                    <div className="p-4 sm:p-5 rounded-xl bg-[#14141E] border-l-4 border-[#D4AF37] my-4">
                      <span className="text-xs font-bold text-white block mb-1 font-heading">
                        {section.highlightBox.title}
                      </span>
                      <p className="text-xs text-[#B5B5C4] leading-relaxed">
                        {section.highlightBox.text}
                      </p>
                    </div>
                  )}

                  {section.bulletPoints && (
                    <div className="space-y-2 py-2">
                      {section.bulletPoints.map((bp, bpIdx) => (
                        <div key={bpIdx} className="flex items-start gap-2 text-xs text-[#C0C0D0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Conclusion Section */}
              <div className="p-6 rounded-2xl bg-[#101016] border border-[#242432] space-y-3 mt-10">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  <span>Strategic Summary & Next Steps</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0AF] leading-relaxed">
                  {activeArticle.content.conclusion}
                </p>
              </div>
            </div>

            {/* Article Action Bar */}
            <div className="mt-12 pt-6 border-t border-[#1C1C26] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleCloseArticle}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Return to Insights Index</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:brightness-110 text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Discuss Strategy With Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Related Articles Section */}
            <div className="mt-16 pt-10 border-t border-[#1C1C26]">
              <h3 className="text-xl font-bold text-white font-heading mb-6">
                Related Executive Briefings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ARTICLES_DATABASE.filter((a) => a.id !== activeArticle.id)
                  .slice(0, 2)
                  .map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => handleOpenArticle(rel)}
                      className="matte-card matte-card-hover p-5 rounded-2xl cursor-pointer group flex flex-col justify-between border border-[#20202C]"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-2">
                          {rel.category}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors font-heading mb-2">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-[#8E8E98] line-clamp-2 mb-3">
                          {rel.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center text-xs text-[#D4AF37] font-semibold">
                        <span>Read briefing</span>
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Container>
        </article>
      ) : (
        /* ========================================================================= */
        /* 2. DEFAULT INSIGHTS INDEX VIEW */
        /* ========================================================================= */
        <>
          {/* Hero Section */}
          <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 border-b border-[#1A1A22] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

            <Container width="standard" className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>Executive Insights & Technical Briefings</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6 break-words text-balance">
                Strategy & Intelligence. <br className="hidden sm:inline" />
                <span className="gold-text-gradient">Zero Marketing Noise.</span>
              </h1>

              <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9E9EA8] font-normal leading-relaxed mb-8">
                Analysis on digital advertising mechanics, attribution architecture, speed-to-lead operations, and customer acquisition systems.
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative mb-6">
                <Search className="w-4 h-4 text-[#8E8E98] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                <input
                  id="insights-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic, ad network, or keyword..."
                  aria-label="Search articles by topic, ad network, or keyword"
                  className="w-full min-h-[44px] pl-11 pr-14 py-3 rounded-xl bg-[#121218] border border-[#22222E] focus:border-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs placeholder:text-[#656574] shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] px-3 flex items-center justify-center text-xs text-[#9E9EA8] hover:text-white cursor-pointer focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                  >
                    Clear
                  </button>
                )}
              </div>
            </Container>
          </section>

          {/* Category Filter Bar */}
          <section className="py-4 sm:py-5 border-b border-[#1A1A22] bg-[#0E0E12] relative md:sticky md:top-20 z-30 backdrop-blur-md bg-[#0E0E12]/95">
            <Container width="wide">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="toolbar" aria-label="Filter insights by topic">
                <span className="text-xs font-semibold text-[#8E8E98] shrink-0 mr-1 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                  <span>Topic:</span>
                </span>
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
            </Container>
          </section>

          {/* ========================================================================= */}
          {/* FEATURED ARTICLE (If no search query active) */}
          {/* ========================================================================= */}
          {!searchQuery && selectedCategory === 'All' && (
            <section className="py-12 border-b border-[#1A1A22] bg-[#0A0A0E]">
              <Container width="wide">
                <div className="matte-card p-6 sm:p-10 rounded-2xl border border-[#D4AF37]/35 relative overflow-hidden group">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Left content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                          <Flame className="w-3 h-3 text-[#D4AF37]" />
                          <span>Featured Briefing</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#8E8E98]">
                          {featuredArticle.category} • {featuredArticle.readTime}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading group-hover:text-[#D4AF37] transition-colors">
                        {featuredArticle.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#A0A0AC] leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleOpenArticle(featuredArticle)}
                          className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                        >
                          <span>Read Full Briefing</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono text-[#7A7A88]">
                          Published {featuredArticle.publishDate}
                        </span>
                      </div>
                    </div>

                    {/* Right visual schematic */}
                    <div className="w-full lg:w-96 h-56 rounded-xl bg-[#0D0D12] border border-[#22222E] p-5 flex flex-col justify-between shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase">
                          System Schematic 01
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                      </div>
                      <div className="relative z-10 text-center my-auto">
                        <span className="text-[10px] font-mono text-[#80808C] block uppercase">
                          Lead Response Deceleration
                        </span>
                        <div className="text-2xl font-extrabold text-white font-heading mt-1">
                          7x <span className="text-[#D4AF37] text-base">Multiplier</span>
                        </div>
                        <span className="text-[10px] text-[#A0A0AC] block mt-1">
                          First 60-Minute Response vs 24 Hours
                        </span>
                      </div>
                      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#6A6A74] pt-2 border-t border-[#1C1C26]">
                        <span>Harvard Business Review Base</span>
                        <span className="text-[#D4AF37]">Click to read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          )}

          {/* ========================================================================= */}
          {/* ARTICLE LISTING GRID */}
          {/* ========================================================================= */}
          <section className="py-16 md:py-24">
            <Container width="wide">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {selectedCategory === 'All' ? 'All Published Briefings' : `${selectedCategory} Briefings`}
                  </h3>
                  <p className="text-xs text-[#80808C] font-mono mt-0.5">
                    Showing {filteredArticles.length} briefing{filteredArticles.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="matte-card p-12 text-center rounded-2xl border border-dashed border-[#282838]">
                  <p className="text-sm text-[#A0A0AC] mb-3">
                    No articles found matching "{searchQuery}" in category "{selectedCategory}".
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-xs text-[#D4AF37] underline font-semibold"
                  >
                    Reset filters & view all articles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleOpenArticle(article)}
                      className="matte-card matte-card-hover p-6 sm:p-7 rounded-2xl flex flex-col justify-between border border-[#20202C] group cursor-pointer cv-auto"
                    >
                      <div>
                        {/* Meta badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#161622] text-[#D4AF37] border border-[#D4AF37]/20 font-bold">
                            {article.category}
                          </span>
                          <span className="text-[10px] font-mono text-[#7A7A88]">
                            {article.readTime}
                          </span>
                        </div>

                        {/* Schematic Mini Thumbnail */}
                        <div className="w-full h-36 rounded-xl bg-[#0D0D12] border border-[#1E1E28] p-4 mb-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[#D4AF37]/40 transition-colors">
                          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:10px_10px]" />
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-[#D4AF37] uppercase">
                              Briefing Note
                            </span>
                            <span className="text-[9px] font-mono text-[#6A6A74]">
                              {article.publishDate}
                            </span>
                          </div>
                          <div className="relative z-10 my-auto text-xs font-bold text-white font-heading line-clamp-2">
                            {article.title}
                          </div>
                          <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-[#7A7A88] pt-1.5 border-t border-[#181822]">
                            <span>ADVERUNE Desk</span>
                            <span className="text-[#D4AF37] group-hover:underline">Read &rarr;</span>
                          </div>
                        </div>

                        {/* Article Headline */}
                        <h4 className="text-base font-bold text-white mb-2 font-heading group-hover:text-[#D4AF37] transition-colors leading-snug">
                          {article.title}
                        </h4>

                        <p className="text-xs text-[#9595A0] leading-relaxed mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Card Action */}
                      <div className="pt-3 border-t border-[#1C1C24] flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#D4AF37] group-hover:underline flex items-center gap-1">
                          <span>Read Full Briefing</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#60606C] group-hover:text-[#D4AF37] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Container>
          </section>

          {/* ========================================================================= */}
          {/* UPCOMING EDITORIAL PIPELINE (Clear conceptual roadmap) */}
          {/* ========================================================================= */}
          <section className="py-16 border-t border-[#1A1A22] bg-[#0E0E12]">
            <Container width="standard">
              <SectionHeading
                eyebrow="Editorial Pipeline"
                title="Upcoming Research Briefings"
                goldGradientText="In Progress"
                description="Briefings currently undergoing empirical verification and peer analysis by our strategy team."
                className="mb-10 text-center"
              />

              <div className="space-y-4 max-w-2xl mx-auto">
                {UPCOMING_BRIEFINGS.map((up, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#121218] border border-dashed border-[#262634] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#1A1A24] text-[#D4AF37] font-bold">
                          {up.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#80808C]">
                          {up.scheduledRelease}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#E0E0EA] font-heading">
                        {up.title}
                      </h4>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-mono text-[#9090A0]">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{up.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* ========================================================================= */}
          {/* CONVERSION CTA */}
          {/* ========================================================================= */}
          <section className="py-16 md:py-24 border-t border-[#1A1A22] bg-[#0A0A0E] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

            <Container width="standard" className="relative z-10 text-center">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2 font-mono">
                Transform Strategic Insights Into Execution
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
                Ready to Implement These <br />
                <span className="gold-text-gradient">Architectures in Your Business?</span>
              </h2>

              <p className="text-sm sm:text-base text-[#92929D] max-w-xl mx-auto leading-relaxed mb-8">
                Schedule a confidential consultation to review your current ad performance, attribution telemetry, and sales pipeline mechanics.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <PrimaryButton size="lg" onClick={() => onNavigate('contact')}>
                  Initiate Strategic Discovery
                </PrimaryButton>
                <SecondaryButton size="lg" onClick={() => onNavigate('packages')}>
                  Review Approved Packages
                </SecondaryButton>
              </div>
            </Container>
          </section>
        </>
      )}
    </div>
  );
}
