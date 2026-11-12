/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function PrimaryButton({
  children,
  icon = true,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-xs',
    lg: 'px-8 py-3.5 text-sm'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wider
        bg-gradient-to-r from-[#FFF0BE] via-[#D4AF37] to-[#B8860B] text-[#0B0B0D]
        shadow-lg shadow-[#D4AF37]/15 hover:brightness-110 active:scale-[0.98]
        transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] focus-visible:outline-none
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {icon && <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
    </button>
  );
}
