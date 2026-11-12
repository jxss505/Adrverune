/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  metric?: string;
  className?: string;
  borderAccent?: boolean;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  metric,
  className = '',
  borderAccent = false
}: FeatureCardProps) {
  return (
    <div
      className={`
        matte-card matte-card-hover p-6 rounded-2xl flex flex-col justify-between
        ${borderAccent ? 'border-[#D4AF37]/30' : ''}
        ${className}
      `}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#1C1C24] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
            <Icon className="w-5 h-5" />
          </div>
          {badge && (
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#181820] text-[#D4AF37] border border-[#D4AF37]/20">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-white mb-2 font-heading">{title}</h3>
        <p className="text-xs text-[#9595A0] leading-relaxed">{description}</p>
      </div>

      {metric && (
        <div className="mt-4 pt-3 border-t border-[#1C1C24] text-[11px] font-mono text-[#D4AF37]">
          {metric}
        </div>
      )}
    </div>
  );
}
