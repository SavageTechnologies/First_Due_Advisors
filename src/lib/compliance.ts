/**
 * lib/compliance.ts
 * Single source of truth for ALL compliance and legal text.
 * Nothing compliance-related is hardcoded anywhere else in this project.
 */

import { LICENSED_STATES, SITE_NAME } from '@/lib/site';

// ─── TCPA ────────────────────────────────────────────────────────────────────

export const TCPA_VERSION = '2026-03-v1' as const;

export const TCPA_CONSENT =
  'By submitting this form, you consent to be contacted by a licensed insurance ' +
  'professional at the phone number or email provided, including by telephone. ' +
  'Consent is not required to purchase any product or service. Message and data ' +
  'rates may apply.';

export const TCPA_CONSENT_SHORT =
  'By submitting, you consent to be contacted by a licensed insurance professional. ' +
  'Consent is not required to receive services.';

// ─── Disclaimers ─────────────────────────────────────────────────────────────

export const NOT_FINANCIAL_ADVICE =
  'The information on this site is for educational purposes only and does not ' +
  'constitute financial, tax, or legal advice. Consult a licensed professional ' +
  'before making insurance or financial decisions.';

export const FOOTER_DISCLAIMER =
  `${SITE_NAME} is an independent insurance brokerage. Insurance products ` +
  'are issued by third-party carriers and are not FDIC-insured or bank-guaranteed. ' +
  'Availability varies by state. Not all products available in all states.';

export const LICENSING_DISCLOSURE =
  `Insurance services offered by ${SITE_NAME}, a licensed insurance ` +
  `professional. Licensed in: ${LICENSED_STATES}. Not licensed in all states.`;

// ─── Form & UX Copy ──────────────────────────────────────────────────────────

export const NO_OBLIGATION = 'No obligation. No pressure. Free consultation.';

export const PRIVACY_FORM_NOTE =
  'Your information is never sold. View our Privacy Policy.';

// ─── Prohibited Phrases ───────────────────────────────────────────────────────
// Used to flag copy that must never appear on this site.

export const PROHIBITED_PHRASES: string[] = [
  'guaranteed returns',
  'risk-free investment',
  'best rates guaranteed',
  'seamlessly',
  'powerful',
  'robust',
  'leverage',
  'compelling',
  'transformative',
  'cutting-edge',
  'game-changing',
  'unleash',
  'unlock',
  'world-class',
  'best-in-class',
  'revolutionary',
  'disruptive',
  'innovative solution',
  'synergy',
];
