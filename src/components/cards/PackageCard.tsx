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
  const { name, systemName, target, status, pricingNote, features, highlight, isPending } = packageData;

  return (
    <div
      className={`
        relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300
        ${
          highlight
            ? 'bg-gradient-to-b from-[#181822] to-[#0E0E12] border-2 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/10'
            : isPending
            ? 'bg-[#101015]/60 border border-dashed border-[#343442]'
            : 'matte-card'
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
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">{name}</span>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono ${
              isPending
                ? 'bg-amber-950/40 text-amber-300 border border-amber-800/50'
                : 'bg-[#191922] text-[#B0B0BA]'
            }`}
          >
            {status}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white font-heading mb-2">{systemName}</h3>
        <p className="text-xs text-[#9595A0] leading-relaxed mb-6">{target}</p>

        {/* Pricing / Investment Box */}
        <div className="p-4 rounded-xl bg-[#131318] border border-[#23232C] mb-6">
          <div className="text-[10px] font-semibold text-[#8E8E98] uppercase tracking-wider">Investment Level</div>
          <div className="text-sm font-medium text-white mt-1">
            {isPending ? (
              <span className="text-amber-400 font-mono text-xs">
                [Pricing Unconfirmed - Pending Owner Scope]
              </span>
            ) : (
              <span className="text-[#E0E0E6]">{pricingNote}</span>
            )}
          </div>
        </div>

        {/* Inclusions */}
        <div className="space-y-3 mb-8">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A5A5B2] block">
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
              <span className={isPending ? 'text-[#9E9EA8]' : ''}>{feat}</span>
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
            aria-label={`Select ${systemName} (${name}) package`}
            className={`
              w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
              flex items-center justify-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none
              ${
                highlight
                  ? 'bg-gradient-to-r from-[#FFF0BE] via-[#D4AF37] to-[#B8860B] text-black hover:brightness-110 shadow-lg shadow-[#D4AF37]/10'
                  : 'bg-[#181820] text-white border border-[#2B2B38] hover:border-[#D4AF37]/50'
              }
            `}
          >
            <span>Select {systemName}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
