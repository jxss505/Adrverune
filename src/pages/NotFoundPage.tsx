/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Compass,
  ArrowRight,
  Home,
  Layers,
  Sparkles,
  BookOpen,
  Mail,
  ShieldAlert
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { NavRoute } from '../types';
import { routeToPath } from '../utils/navigation';

interface NotFoundPageProps {
  onNavigate: (route: NavRoute) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container width="narrow" className="relative z-10 text-center">
        {/* 404 Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A22] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-mono tracking-widest uppercase mb-6">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>HTTP 404 • Resource Not Located</span>
        </div>

        {/* Big Code Graphic */}
        <div className="text-7xl sm:text-9xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0BE] via-[#D4AF37] to-[#554010] leading-none mb-4 select-none">
          404
        </div>

        {/* H1 Heading */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4 break-words text-balance">
          Strategic Route Not Found
        </h1>

        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#A5A5B2] leading-relaxed mb-8">
          The requested URL path does not correspond to an approved ADVERUNE marketing system, briefing, or commercial intake page.
        </p>

        {/* Recovery CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <PrimaryButton size="lg" onClick={() => onNavigate('home')}>
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </span>
          </PrimaryButton>
          <SecondaryButton size="lg" onClick={() => onNavigate('services')}>
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Explore All 11 Services</span>
            </span>
          </SecondaryButton>
        </div>

        {/* Fast Directory Links */}
        <div className="matte-card p-6 rounded-2xl border border-[#22222E] max-w-lg mx-auto text-left">
          <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-bold block mb-3">
            Core Agency Navigation Directory:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs" role="navigation" aria-label="Quick directory recovery links">
            {[
              { label: 'Growth Packages', route: 'packages' as NavRoute, path: '/packages' },
              { label: '8-Stage Process', route: 'process' as NavRoute, path: '/process' },
              { label: 'Documented Work', route: 'work' as NavRoute, path: '/work' },
              { label: 'Executive Insights', route: 'insights' as NavRoute, path: '/insights' },
              { label: 'About & Governance', route: 'about' as NavRoute, path: '/about' },
              { label: 'Consultation Intake', route: 'contact' as NavRoute, path: '/contact' }
            ].map((link) => (
              <a
                key={link.route}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.route);
                }}
                className="min-h-[44px] p-2.5 px-3 rounded-lg bg-[#121217] border border-[#1E1E26] hover:border-[#D4AF37]/50 text-[#C0C0D0] hover:text-white transition-colors flex items-center justify-between focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
