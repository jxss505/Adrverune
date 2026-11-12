/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { NavRoute } from '../types';
import { SEO_PAGES, getCanonicalUrl } from './seoConfig';

interface SEOHeadProps {
  route: NavRoute;
}

export function SEOHead({ route }: SEOHeadProps) {
  useEffect(() => {
    const page = SEO_PAGES[route] || SEO_PAGES.home;
    const canonicalUrl = getCanonicalUrl(page.path);

    // 1. Update Title
    document.title = page.title;

    // Helper to update or create meta tags
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', page.description);
    setMetaTag('name', 'keywords', page.keywords.join(', '));

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', page.title);
    setMetaTag('property', 'og:description', page.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', page.ogType);
    setMetaTag('property', 'og:site_name', 'ADVERUNE');

    // 4. Twitter / X Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', page.title);
    setMetaTag('name', 'twitter:description', page.description);

    // 5. Canonical Link Tag
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // 6. Schema.org JSON-LD Structured Data
    const schemas = page.schemaGenerator(window.location.origin);
    let schemaScript = document.getElementById('adverune-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'adverune-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    if (schemas.length > 0) {
      schemaScript.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
    } else {
      schemaScript.textContent = '';
    }
  }, [route]);

  return null;
}
