/**
 * lib/analytics/events.ts
 * All GA4 event tracking flows through this file.
 * Stub populated in Mission 3 — PhoneLink and ContactForm need this now.
 */

import type { AnalyticsEvent } from '@/types/analytics';

type PhoneLocation = 'header' | 'sidebar' | 'footer' | 'mobile_bar' | 'cta_block';

function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== 'function') return;
  w.gtag('event', event.name, event.params);
}

export function trackLeadSubmitted(params: {
  source: string;
  page_url: string;
  service_interest?: string;
}): void {
  track({ name: 'lead_submitted', params });
}

export function trackPhoneClick(params: {
  location: PhoneLocation;
}): void {
  track({ name: 'phone_click', params });
}

export function trackCtaClick(params: {
  cta_text: string;
  page_url: string;
  location: string;
}): void {
  track({ name: 'cta_click', params });
}

export function trackServicePageView(params: {
  slug: string;
  page_url: string;
}): void {
  track({ name: 'service_page_view', params });
}
