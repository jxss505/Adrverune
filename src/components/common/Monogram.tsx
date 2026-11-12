/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface MonogramProps {
  className?: string;
  glow?: boolean;
}

export function Monogram({ className = "w-8 h-8", glow = false }: MonogramProps) {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${glow ? 'group' : ''}`}>
      {glow && (
        <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-lg blur-md transition-all group-hover:bg-[#D4AF37]/35" />
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} relative z-10`}
      >
        <defs>
          <linearGradient id="adveruneGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>
        </defs>
        {/* Subtle geometric outer shield */}
        <polygon
          points="50,6 92,26 92,74 50,94 8,74 8,26"
          stroke="url(#adveruneGoldGrad)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="rgba(15,15,18,0.7)"
        />
        {/* Sharp geometric monogram 'A' */}
        <path
          d="M50 16 L80 80 H64 L50 48 L36 80 H20 L50 16 Z"
          fill="url(#adveruneGoldGrad)"
        />
        {/* Inner negative prism */}
        <path
          d="M39 58 L50 40 L61 58 H39 Z"
          fill="#0B0B0D"
        />
        <circle cx="50" cy="50" r="3" fill="url(#adveruneGoldGrad)" />
      </svg>
    </div>
  );
}
