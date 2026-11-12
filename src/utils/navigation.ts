/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NavRoute } from '../types';
import { ROUTE_PATH_MAP, PATH_ROUTE_MAP } from '../seo/seoConfig';

export function routeToPath(route: NavRoute): string {
  return ROUTE_PATH_MAP[route] || '/';
}

export function pathToRoute(pathname: string): NavRoute {
  // Normalize trailing slash (except for root '/')
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '').toLowerCase();
  return PATH_ROUTE_MAP[clean] || 'not-found';
}
