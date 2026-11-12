/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavRoute } from '../types';

const prefetchMap: Partial<Record<NavRoute, () => Promise<any>>> = {
  services: () => import('../pages/ServicesPage'),
  packages: () => import('../pages/PackagesPage'),
  process: () => import('../pages/ProcessPage'),
  work: () => import('../pages/WorkPage'),
  about: () => import('../pages/AboutPage'),
  insights: () => import('../pages/InsightsPage'),
  contact: () => import('../pages/ContactPage'),
  privacy: () => import('../pages/PrivacyPolicyPage'),
  terms: () => import('../pages/TermsPage')
};

const prefetchedRoutes = new Set<NavRoute>();

/**
 * Speculatively prefetch a route chunk on intent (hover or keyboard focus)
 * Uses requestIdleCallback to guarantee zero impact on main thread interactivity.
 */
export function prefetchRoute(route: NavRoute): void {
  if (prefetchedRoutes.has(route)) return;
  const loader = prefetchMap[route];
  if (loader) {
    prefetchedRoutes.add(route);
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => loader().catch(() => {}));
    } else {
      setTimeout(() => loader().catch(() => {}), 60);
    }
  }
}
