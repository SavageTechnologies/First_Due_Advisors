/**
 * types/analytics.ts
 * AnalyticsEvent union type — stub for Mission 1.
 * Fully populated with all event types in Mission 3.
 */

export type AnalyticsEvent =
  | { name: 'page_view'; params: { page_path: string } }
  | { name: 'phone_click'; params: { location: string } }
  | { name: 'cta_click'; params: { label: string; location: string } }
  | { name: 'form_start'; params: { form_id: string } }
  | { name: 'form_submit'; params: { form_id: string; service_interest: string | null } }
  | { name: 'form_success'; params: { form_id: string } }
  | { name: 'form_error'; params: { form_id: string; error: string } };
