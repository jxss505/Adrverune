/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  width?: 'narrow' | 'standard' | 'wide' | 'full';
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  width = 'wide',
  className = '',
  as: Component = 'div'
}: ContainerProps) {
  const widthClasses = {
    narrow: 'max-w-3xl',    // 768px - Forms, Legal, Articles
    standard: 'max-w-5xl',  // 1024px - Process, Hero, FAQs
    wide: 'max-w-7xl',      // 1280px - Global Layouts, Grids
    full: 'max-w-full'      // Edge to edge
  };

  return (
    <Component className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${widthClasses[width]} ${className}`}>
      {children}
    </Component>
  );
}
