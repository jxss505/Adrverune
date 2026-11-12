/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  goldGradientText?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  goldGradientText,
  description,
  align = 'center',
  className = ''
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto'
  };

  return (
    <div className={`flex flex-col max-w-3xl ${alignClasses[align]} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading leading-tight break-words text-balance">
        {title}{' '}
        {goldGradientText && (
          <span className="gold-text-gradient">{goldGradientText}</span>
        )}
      </h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-[#A5A5B2] font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
