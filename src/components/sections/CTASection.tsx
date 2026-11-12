/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Container } from '../common/Container';
import { PrimaryButton } from '../common/PrimaryButton';
import { SecondaryButton } from '../common/SecondaryButton';

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function CTASection({
  eyebrow = "Next Step",
  title = "Initiate Your Growth Discovery",
  description = "Evaluate campaign viability and acquisition infrastructure with our senior strategy team.",
  primaryButtonText = "Request Strategy Consultation",
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  className = ""
}: CTASectionProps) {
  return (
    <section className={`py-16 md:py-24 relative overflow-hidden border-t border-[#1C1C24] ${className}`}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />

      <Container width="standard" className="relative z-10 text-center">
        {eyebrow && (
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2">
            {eyebrow}
          </span>
        )}

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight mb-4 break-words text-balance">
          {title}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-[#A5A5B2] max-w-xl mx-auto leading-relaxed mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-none mx-auto">
          {primaryButtonText && onPrimaryClick && (
            <PrimaryButton size="lg" onClick={onPrimaryClick} className="w-full sm:w-auto">
              {primaryButtonText}
            </PrimaryButton>
          )}
          {secondaryButtonText && onSecondaryClick && (
            <SecondaryButton size="lg" onClick={onSecondaryClick} className="w-full sm:w-auto">
              {secondaryButtonText}
            </SecondaryButton>
          )}
        </div>
      </Container>
    </section>
  );
}
