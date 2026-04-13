/**
 * lib/site.ts
 * The ONLY file in this project that reads process.env directly.
 * All other files import named constants from here.
 */

// ─── Site Identity ────────────────────────────────────────────────────────────

export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://firstdueadvisors.com';

export const SITE_NAME: string =
  process.env.NEXT_PUBLIC_SITE_NAME ?? 'First Due Advisors';

export const SITE_TAGLINE: string =
  process.env.NEXT_PUBLIC_SITE_TAGLINE ?? 'Service, Trust, and Integrity First';

export const SITE_DESCRIPTION: string =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  'First Due Advisors is a firefighter-owned insurance brokerage specializing in Medicare, health, life, annuities, and estate planning. Founded by first responders. Built on ethics.';

// ─── Contact Info ─────────────────────────────────────────────────────────────

export const SUPPORT_PHONE: string =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE ?? '(615) 714-9076';

export const SUPPORT_PHONE_HREF: string =
  process.env.NEXT_PUBLIC_SUPPORT_PHONE_HREF ?? 'tel:+16157149076';

export const SUPPORT_EMAIL: string =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'brandon@firstdueadvisors.com';

export const BUSINESS_ADDRESS: string =
  process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? 'P.O. BOX 94 Mt. Juliet, TN, 37121';

// ─── CTAs & Messaging ────────────────────────────────────────────────────────

export const CTA_PRIMARY: string =
  process.env.NEXT_PUBLIC_CTA_PRIMARY ?? 'Get a Free Consultation';

export const CTA_SECONDARY: string =
  process.env.NEXT_PUBLIC_CTA_SECONDARY ?? 'Speak with an Advisor';

export const CTA_PHONE: string =
  process.env.NEXT_PUBLIC_CTA_PHONE ?? 'Call Now';

export const FORM_SUCCESS_MESSAGE: string =
  process.env.NEXT_PUBLIC_FORM_SUCCESS_MESSAGE ??
  'Thank you. Brandon will be in touch within one business day.';

// ─── Author / Licensing ──────────────────────────────────────────────────────

export const AUTHOR_NAME: string =
  process.env.NEXT_PUBLIC_AUTHOR_NAME ?? 'Brandon Grimes';

export const AUTHOR_TITLE: string =
  process.env.NEXT_PUBLIC_AUTHOR_TITLE ?? 'Licensed Insurance Professional';

export const AUTHOR_CREDENTIAL: string =
  process.env.NEXT_PUBLIC_AUTHOR_CREDENTIAL ??
  '22 Years Experience | Health, Life & Estate Planning';

export const AUTHOR_BIO: string =
  process.env.NEXT_PUBLIC_AUTHOR_BIO ??
  'Brandon Grimes founded First Due Advisors to bring a higher standard of care and ethics to the insurance industry. With over 22 years of experience and a background as a first responder, Brandon built a brokerage where every agent shares that same commitment to community and integrity.';

export const LICENSED_ENTITY_NAME: string =
  process.env.NEXT_PUBLIC_LICENSED_ENTITY_NAME ?? 'First Due Advisors';

export const LICENSED_STATES: string =
  process.env.NEXT_PUBLIC_LICENSED_STATES ?? 'Tennessee';

// ─── Supabase ────────────────────────────────────────────────────────────────

export const SUPABASE_URL: string =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';

export const SUPABASE_ANON_KEY: string =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const SUPABASE_SERVICE_ROLE_KEY: string =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

// ─── Resend ──────────────────────────────────────────────────────────────────

export const RESEND_API_KEY: string =
  process.env.RESEND_API_KEY ?? '';

export const RESEND_FROM_EMAIL: string =
  process.env.RESEND_FROM_EMAIL ?? 'noreply@firstdueadvisors.com';

export const RESEND_FROM_NAME: string =
  process.env.RESEND_FROM_NAME ?? 'First Due Advisors';

export const RESEND_LEAD_NOTIFY_EMAIL: string =
  process.env.RESEND_LEAD_NOTIFY_EMAIL ?? 'brandon@firstdueadvisors.com';

// ─── Analytics ───────────────────────────────────────────────────────────────

export const GA_MEASUREMENT_ID: string =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

// ─── Upstash Redis ───────────────────────────────────────────────────────────

export const UPSTASH_REDIS_REST_URL: string =
  process.env.UPSTASH_REDIS_REST_URL ?? '';

export const UPSTASH_REDIS_REST_TOKEN: string =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? '';