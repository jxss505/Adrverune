/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield } from 'lucide-react';
import { Container } from '../common/Container';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  goldGradientText?: string;
  description: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCta?: () => void;
  onSecondaryCta?: () => void;
  showIntegrityBadge?: boolean;
  className?: string;
}

export function PageHero({
  eyebrow = "Integrated Paid Media & Revenue Operations Firm",
  title,
  goldGradientText,
  description,
  primaryCtaText = "Request Strategy Consultation",
  secondaryCtaText = "Explore Growth Systems",
  onPrimaryCta,
  onSecondaryCta,
  showIntegrityBadge = true,
  className = ""
}: PageHeroProps) {
  return (
    <section className={`relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1A22] overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <Container width="standard" className="relative z-10 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{eyebrow}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6 break-words text-balance">
          {title} <br className="hidden sm:inline" />
          {goldGradientText && (
            <span className="gold-text-gradient">{goldGradientText}</span>
          )}
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#A5A5B2] font-normal leading-relaxed mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
          {primaryCtaText && onPrimaryCta && (
            <PrimaryButton size="lg" onClick={onPrimaryCta} className="w-full sm:w-auto">
              {primaryCtaText}
            </PrimaryButton>
          )}
          {secondaryCtaText && onSecondaryCta && (
            <SecondaryButton size="lg" onClick={onSecondaryCta} className="w-full sm:w-auto">
              {secondaryCtaText}
            </SecondaryButton>
          )}
        </div>

        {showIntegrityBadge && (
          <div className="pt-10">
            <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-[#121217]/90 border border-[#22222B] text-left flex items-start gap-3 text-xs text-[#A5A5B2]">
              <Shield className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="font-semibold text-[#D4AF37]">Zero-Fabrication Standard:</span>{' '}
                ADVERUNE strictly enforces commercial truthfulness. No unverified revenue statistics, fake reviews, or fabricated client logos.
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
