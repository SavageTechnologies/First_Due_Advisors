/**
 * types/analytics.ts
 * AnalyticsEvent union type — stub for Mission 1.
 * Fully populated with all event types in Mission 3.
 */

export type AnalyticsEvent =
  | { name: 'page_view'; params: { page_path: string } }
  | { name: 'phone_click'; params: { location: string } }
  | { name: 'cta_click'; params: { cta_text: string; page_url: string; location: string } }
  | { name: 'form_start'; params: { form_id: string } }
  | { name: 'form_submit'; params: { form_id: string; service_interest: string | null } }
  | { name: 'form_success'; params: { form_id: string } }
  | { name: 'form_error'; params: { form_id: string; error: string } }
  | { name: 'lead_submitted'; params: { source: string; page_url: string; service_interest?: string } }
  | { name: 'service_page_view'; params: { slug: string; page_url: string } };
