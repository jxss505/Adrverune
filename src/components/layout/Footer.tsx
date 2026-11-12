/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Mail, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Monogram } from '../common/Monogram';
import { NavRoute } from '../../types';
import { trackStrategyCallClick, trackEmailClick } from '../../analytics/ga4';
import { prefetchRoute } from '../../utils/prefetch';

interface FooterProps {
  onNavigate: (route: NavRoute) => void;
  className?: string;
}

export function Footer({
  onNavigate,
  className = ''
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t border-[#1C1C22] bg-[#0A0A0D] text-[#A5A5B2] text-xs ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Logo & Brand Description */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Monogram className="w-7 h-7 shrink-0" />
              <span className="text-lg font-bold text-white tracking-widest font-serif">ADVERUNE</span>
            </div>
            <p className="text-xs text-[#A5A5B2] leading-relaxed max-w-sm">
              Premium digital advertising and marketing agency delivering high-performance growth, precision paid media, and conversion systems.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121218] border border-[#22222E] text-[11px] text-[#D4AF37]">
              <Shield className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Zero-Fabrication Standard Active</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  onMouseEnter={() => prefetchRoute('home')}
                  onFocus={() => prefetchRoute('home')}
                  onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                  className="hover:text-white transition-colors cursor-pointer block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onMouseEnter={() => prefetchRoute('about')}
                  onFocus={() => prefetchRoute('about')}
                  onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
                  className="hover:text-white transition-colors cursor-pointer block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  About Us & Governance
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onMouseEnter={() => prefetchRoute('services')}
                  onFocus={() => prefetchRoute('services')}
                  onClick={(e) => { e.preventDefault(); onNavigate('services'); }}
                  className="hover:text-white transition-colors cursor-pointer block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  All 11 Services
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  onMouseEnter={() => prefetchRoute('packages')}
                  onFocus={() => prefetchRoute('packages')}
                  onClick={(e) => { e.preventDefault(); onNavigate('packages'); }}
                  className="hover:text-white transition-colors cursor-pointer block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  Growth Packages
                </a>
              </li>
              <li>
                <a
                  href="/process"
                  onMouseEnter={() => prefetchRoute('process')}
                  onFocus={() => prefetchRoute('process')}
                  onClick={(e) => { e.preventDefault(); onNavigate('process'); }}
                  className="hover:text-white transition-colors cursor-pointer block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  8-Stage Methodology
                </a>
              </li>
              <li>
                <a
                  href="/work"
                  onMouseEnter={() => prefetchRoute('work')}
                  onFocus={() => prefetchRoute('work')}
                  onClick={(e) => { e.preventDefault(); onNavigate('work'); }}
                  className="hover:text-white transition-colors cursor-pointer block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  Our Work & Blueprints
                </a>
              </li>
              <li>
                <a
                  href="/insights"
                  onMouseEnter={() => prefetchRoute('insights')}
                  onFocus={() => prefetchRoute('insights')}
                  onClick={(e) => { e.preventDefault(); onNavigate('insights'); }}
                  className="hover:text-white transition-colors cursor-pointer block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  Acquisition Insights
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Links */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Approved Capabilities
            </div>
            <ul className="space-y-2 text-[#A5A5B2]">
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">Meta Ads Architecture</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">Google Search & PMax</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">Creative Design Units</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">Short-Form Video Production</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">Lead Generation Funnels</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">Server-Side CAPI Lead Tracking</a></li>
              <li><a href="/services" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="hover:text-white transition-colors block py-0.5 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">Sales & Speed-to-Lead Routing</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Social Placeholders */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Contact & Inquiries
            </div>
            <div className="space-y-3 text-xs">
              <div
                className="flex items-start gap-2.5 cursor-pointer group p-1 rounded focus-within:ring-2 focus-within:ring-[#D4AF37]"
                onClick={() => {
                  trackEmailClick('footer_inbound');
                  onNavigate('contact');
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trackEmailClick('footer_inbound');
                    onNavigate('contact');
                  }
                }}
                role="button"
                aria-label="Navigate to contact page to send email"
              >
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div>
                  <span className="text-[10px] uppercase text-[#9E9EA8] block">Inbound Channel</span>
                  <span className="text-white font-medium group-hover:text-[#D4AF37] transition-colors break-words">[Official Email Provided on Onboarding]</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-1">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-[10px] uppercase text-[#9E9EA8] block">SLA Response Window</span>
                  <span className="text-white font-medium">Within 1 Business Day</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    trackStrategyCallClick('Initiate Consultation', 'footer');
                    onNavigate('contact');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#16161E] border border-[#2B2B38] text-[#D4AF37] hover:border-[#D4AF37] text-xs font-semibold transition-all cursor-pointer block text-center min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  Initiate Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials, Legal */}
        <div className="pt-8 border-t border-[#181820] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9EA8]">
          <div className="text-center sm:text-left">
            © {currentYear} ADVERUNE. All rights reserved. Strictly no unverified claims or fake reviews published.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/privacy" onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }} className="hover:text-white transition-colors cursor-pointer py-1 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">
              Privacy Policy
            </a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); onNavigate('terms'); }} className="hover:text-white transition-colors cursor-pointer py-1 focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none">
              Terms & Conditions
            </a>
            <span className="text-[#D4AF37]">Foundation Architecture v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
