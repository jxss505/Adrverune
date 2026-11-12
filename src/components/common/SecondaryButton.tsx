/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function SecondaryButton({
  children,
  icon = true,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-xs',
    lg: 'px-7 py-3.5 text-sm'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-full font-medium
        bg-[#141419] text-[#E5E5E8] border border-[#2B2B36]
        hover:border-[#D4AF37]/50 hover:text-white hover:bg-[#1A1A22] active:scale-[0.98]
        transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] focus-visible:outline-none
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {icon && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />}
    </button>
  );
}
