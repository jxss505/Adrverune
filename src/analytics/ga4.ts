/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ADVERUNE Google Analytics 4 (GA4) Analytics Subsystem
 *
 * Configurable Measurement ID Placeholder: [GA4_MEASUREMENT_ID]
 *
 * To activate live telemetry:
 * Set VITE_GA4_MEASUREMENT_ID="G-XXXXXXXXXX" in your .env configuration.
 * When set to [GA4_MEASUREMENT_ID] or left unset, telemetry runs in
 * non-transmitting Developer Debug Mode with local console verification.
 */

// Global window extensions for Google Tag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Isomorphic environment resolution (safe for Vite client, SSR, and Node environments)
const resolveMeasurementId = (): string => {
  if (
    typeof import.meta !== 'undefined' &&
    (import.meta as any).env &&
    (import.meta as any).env.VITE_GA4_MEASUREMENT_ID
  ) {
    return (import.meta as any).env.VITE_GA4_MEASUREMENT_ID;
  }
  if (typeof process !== 'undefined' && process.env && process.env.VITE_GA4_MEASUREMENT_ID) {
    return process.env.VITE_GA4_MEASUREMENT_ID;
  }
  return '[GA4_MEASUREMENT_ID]';
};

// Configurable measurement ID with explicit placeholder fallback
export const GA4_MEASUREMENT_ID: string = resolveMeasurementId();

// Check if a real, valid GA4 ID is present (starts with G- and is not placeholder)
export const isGA4Active = (): boolean => {
  return (
    typeof GA4_MEASUREMENT_ID === 'string' &&
    GA4_MEASUREMENT_ID.startsWith('G-') &&
    GA4_MEASUREMENT_ID !== '[GA4_MEASUREMENT_ID]'
  );
};

// Check if debug mode is active (via URL parameter ?debug_mode=true or local dev)
export const isDebugMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    window.location.search.includes('debug_mode=true') ||
    import.meta.env.DEV ||
    !isGA4Active()
  );
};

// PII Protection Guard: strictly strips sensitive personal data keys before dispatch
const PII_BLACK_LIST = new Set([
  'name',
  'fullname',
  'full_name',
  'firstname',
  'lastname',
  'email',
  'user_email',
  'contact_email',
  'phone',
  'telephone',
  'phoneorwhatsapp',
  'phone_number',
  'whatsapp',
  'message',
  'additionalmessage',
  'notes'
]);

export function sanitizeParams(params: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(params)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (PII_BLACK_LIST.has(normalizedKey)) {
      console.warn(`[GA4 PRIVACY SHIELD] Stripped potential PII key from telemetry: "${key}"`);
      continue;
    }
    // Also protect against raw email strings or phone sequences in values
    if (typeof value === 'string') {
      if (value.includes('@') && value.includes('.')) {
        console.warn(`[GA4 PRIVACY SHIELD] Stripped email-like value from telemetry param: "${key}"`);
        continue;
      }
    }
    sanitized[key] = value;
  }
  return sanitized;
}

let isInitialized = false;

/**
 * Initialize Google Analytics 4
 * Enforces send_page_view: false to prevent SPA duplicate page-view firing.
 */
export function initGA4(): void {
  if (typeof window === 'undefined' || isInitialized) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  const active = isGA4Active();

  if (active) {
    // Inject official Google Tag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    // CRITICAL: Disable automatic page view tracking to prevent double counts in SPA
    window.gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
      debug_mode: isDebugMode()
    });

    console.log(
      `%c[GA4 TELEMETRY]%c Active with Measurement ID: ${GA4_MEASUREMENT_ID} (SPA manual routing enabled)`,
      'color: #D4AF37; font-weight: bold;',
      'color: inherit;'
    );
  } else {
    console.log(
      `%c[GA4 TELEMETRY]%c Initialized in Developer Debug Mode with placeholder [GA4_MEASUREMENT_ID]. Events will log to console without external dispatch.`,
      'color: #D4AF37; font-weight: bold;',
      'color: inherit;'
    );
  }

  isInitialized = true;
}

/**
 * Core event emitter with PII sanitization and debug logging
 */
export function trackEvent(eventName: string, eventParams: Record<string, any> = {}): void {
  const sanitized = sanitizeParams(eventParams);

  if (isDebugMode()) {
    console.log(
      `%c[GA4 Event Debug]%c ${eventName}`,
      'background: #181822; color: #D4AF37; font-weight: bold; padding: 2px 6px; border-radius: 4px; border: 1px solid #D4AF37;',
      'color: #00E676; font-weight: bold;',
      sanitized
    );
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && isGA4Active()) {
    window.gtag('event', eventName, sanitized);
  }
}

// ============================================================================
// SPECIFIED GA4 EVENTS
// ============================================================================

/**
 * 1. page_view: Fired on every route transition (no duplicates)
 */
export function trackPageView(pagePath: string, pageTitle: string): void {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: typeof window !== 'undefined' ? window.location.href : pagePath
  });
}

/**
 * 2. whatsapp_click: Fired when visitor clicks an official WhatsApp interaction
 */
export function trackWhatsAppClick(contextLocation: string): void {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    click_location: contextLocation,
    channel: 'whatsapp'
  });
}

/**
 * 3. email_click: Fired when visitor clicks or copies an official email link
 */
export function trackEmailClick(contextLocation: string): void {
  trackEvent('email_click', {
    event_category: 'engagement',
    click_location: contextLocation,
    channel: 'email'
  });
}

/**
 * 4. strategy_call_click: Fired when visitor clicks "Book Consultation" or strategy CTAs
 */
export function trackStrategyCallClick(ctaLabel: string, ctaLocation: string): void {
  trackEvent('strategy_call_click', {
    event_category: 'conversion_intent',
    cta_label: ctaLabel,
    cta_location: ctaLocation
  });
}

/**
 * 5. contact_form_start: Fired when visitor begins interacting with the form (once per entry)
 */
export function trackContactFormStart(serviceFocus?: string): void {
  trackEvent('contact_form_start', {
    event_category: 'lead_funnel',
    service_focus: serviceFocus || 'unspecified'
  });
}

/**
 * 6. generate_lead: Fired ONLY after a valid enquiry has been successfully recorded
 * Strictly never fired on validation failures or network errors.
 * No PII (names, emails, phone numbers) is transmitted.
 */
export function trackGenerateLead(
  referenceId: string,
  serviceTier: string,
  businessGoal: string
): void {
  trackEvent('generate_lead', {
    event_category: 'conversion',
    transaction_id: referenceId, // Unique tracking code e.g. ADV-302348
    service_tier: serviceTier,
    business_goal: businessGoal,
    value: 1,
    currency: 'USD'
  });
}
