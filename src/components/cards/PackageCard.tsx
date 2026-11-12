/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PackageTier } from '../../types';

interface PackageCardProps {
  packageData: PackageTier;
  onSelect?: (pkg: PackageTier) => void;
  className?: string;
}

export function PackageCard({
  packageData,
  onSelect,
  className = ''
}: PackageCardProps) {
  const { name, systemName, tierNumber, target, status, pricingNote, features, highlight, isPending } = packageData;

  return (
    <div
      className={`
        relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300
        ${
          highlight
            ? 'bg-gradient-to-b from-[#181822] to-[#0E0E12] border-2 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/10'
            : isPending
            ? 'bg-[#101015]/60 border border-dashed border-[#343442]'
            : 'matte-card border border-[#22222E] hover:border-[#D4AF37]/40'
        }
        ${className}
      `}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0B0B0D] text-[10px] font-bold uppercase tracking-widest shadow-md">
          Most Selected System
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-semibold text-[#D4AF37] uppercase tracking-wider">
            {tierNumber || 'System Tier'}
          </span>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono ${
              isPending
                ? 'bg-amber-950/40 text-amber-300 border border-amber-800/50'
                : 'bg-[#191922] text-[#B0B0BA] border border-[#2A2A38]'
            }`}
          >
            {status}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2 leading-tight">
          {name}
        </h3>
        <p className="text-xs text-[#9595A0] leading-relaxed mb-5">{target}</p>

        {/* Pricing / Investment Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#131318] border border-[#23232C] mb-6">
          <div className="text-[10px] font-semibold text-[#8E8E98] uppercase tracking-wider font-mono">
            Investment Range
          </div>
          <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight break-words">
              {isPending ? (
                <span className="text-amber-400 font-mono text-xs">
                  [Pricing Unconfirmed - Pending Owner Scope]
                </span>
              ) : (
                pricingNote
              )}
            </span>
          </div>
          <div className="text-[11px] text-[#7E7E8A] mt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block shrink-0" aria-hidden="true" />
            <span>Direct media spend paid to ad platforms</span>
          </div>
        </div>

        {/* Inclusions */}
        <div className="space-y-3 mb-8">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A5A5B2] block font-mono">
            System Inclusions:
          </span>
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[#D8D8E0]">
              <CheckCircle2
                className={`w-4 h-4 shrink-0 mt-0.5 ${
                  isPending ? 'text-[#888898]' : 'text-[#D4AF37]'
                }`}
                aria-hidden="true"
              />
              <span className={feat.startsWith('Everything in') ? 'font-semibold text-white' : ''}>
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {isPending ? (
          <div className="w-full py-3.5 px-4 rounded-xl bg-[#15151B] border border-[#2B2B36] text-center text-xs text-[#9E9EA8] min-h-[44px] flex items-center justify-center font-mono">
            Awaiting Business Owner Scope Details
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onSelect && onSelect(packageData)}
            aria-label={`Select ${name} package`}
            className={`
              w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
              flex items-center justify-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none
              ${
                highlight
                  ? 'bg-gradient-to-r from-[#FFF0BE] via-[#D4AF37] to-[#B8860B] text-black hover:brightness-110 shadow-lg shadow-[#D4AF37]/15'
                  : 'bg-[#181820] text-white border border-[#2B2B38] hover:border-[#D4AF37]/50 hover:bg-[#1E1E28]'
              }
            `}
          >
            <span>Select {name}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
