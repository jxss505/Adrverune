/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type NavRoute =
  | 'home'
  | 'services'
  | 'packages'
  | 'process'
  | 'work'
  | 'about'
  | 'insights'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'not-found';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Paid Media' | 'Creative & Assets' | 'Web & Funnels' | 'Revenue Operations';
  tagline: string;
  description: string;
  icon: React.ElementType;
  deliverables: string[];
  operationalRole: string;
  commonFailurePoint: string;
}

export interface PackageTier {
  id: string;
  name: string;
  systemName: string;
  target: string;
  status: string;
  pricingNote: string;
  features: string[];
  highlight: boolean;
  tierNumber?: string;
  isPending?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  metric?: string;
}
