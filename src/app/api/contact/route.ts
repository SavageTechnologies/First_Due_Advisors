/**
 * app/api/contact/route.ts
 * Public POST endpoint for the contact form.
 * Processing order: validate -> insert lead -> send emails -> 200
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { submitLead } from '@/lib/leads/submit';
import { sendLeadNotification, sendLeadConfirmation } from '@/lib/leads/notify';
import { TCPA_VERSION } from '@/lib/compliance';

const SERVICE_VALUES = [
  'medicare-plans',
  'health-insurance',
  'life-insurance',
  'annuities',
  'estate-planning',
  'general',
] as const;

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('A valid email address is required.'),
  phone: z.string().optional(),
  service_interest: z.enum(SERVICE_VALUES).optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message must be 2000 characters or fewer.'),
  source: z.string().min(1, 'Source is required.'),
  page_url: z.string().url('A valid page URL is required.'),
});

type ContactPayload = z.infer<typeof contactSchema>;

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Parse and validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string') {
        fieldErrors[key] = issue.message;
      }
    }
    return NextResponse.json({ error: 'Validation failed.', fields: fieldErrors }, { status: 400 });
  }

  const data: ContactPayload = parsed.data;

  // 2. Insert lead
  const submitResult = await submitLead({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    service_interest: data.service_interest ?? null,
    message: data.message,
    source: data.source,
    page_url: data.page_url,
    tcpa_consent: true,
    tcpa_version: TCPA_VERSION,
    status: 'new',
    notes: null,
  });

  if (!submitResult.success) {
    console.error('[contact] submitLead failed:', submitResult.error);
    return NextResponse.json(
      { error: 'Something went wrong. Please call us directly.' },
      { status: 500 },
    );
  }

  const lead = {
    id: submitResult.id ?? '',
    created_at: new Date().toISOString(),
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    service_interest: data.service_interest ?? null,
    message: data.message,
    source: data.source,
    page_url: data.page_url,
    tcpa_consent: true as const,
    tcpa_version: TCPA_VERSION,
    status: 'new' as const,
    notes: null,
  };

  // 3. Notify Brandon (fire-and-forget)
  void sendLeadNotification(lead);

  // 4. Confirmation to visitor
  void sendLeadConfirmation(lead);

  // 5. Success
  return NextResponse.json({ success: true }, { status: 200 });
}