/**
 * lib/leads/notify.ts
 * Sends lead notification to Brandon and confirmation to the visitor.
 * Both functions handle Resend errors gracefully.
 * A Resend failure must NOT cause the API route to return an error.
 */

import { Resend } from 'resend';
import {
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  RESEND_FROM_NAME,
  RESEND_LEAD_NOTIFY_EMAIL,
  SUPPORT_PHONE,
  FORM_SUCCESS_MESSAGE,
} from '@/lib/site';
import type { Lead } from '@/types/lead';

function getResendClient(): Resend {
  return new Resend(RESEND_API_KEY);
}

function formatDateET(isoString: string): string {
  return new Date(isoString).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function buildNotificationHtml(lead: Lead): string {
  const submitted = lead.created_at ? formatDateET(lead.created_at) : 'Unknown';
  const phone = lead.phone ?? 'Not provided';
  const service = lead.service_interest ?? 'General';
  const pageUrl = lead.page_url ?? 'Unknown';

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Lead</title></head>
<body style="font-family: sans-serif; font-size: 15px; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h2 style="margin-top: 0; color: #0d1b3e;">New Inquiry from First Due Advisors</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; font-weight: 600; width: 140px;">Name</td><td>${lead.name}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td>${lead.email ?? ''}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Phone</td><td>${phone}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Service Interest</td><td>${service}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Message</td><td style="white-space: pre-wrap;">${lead.message ?? ''}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Page URL</td><td>${pageUrl}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: 600;">Submitted</td><td>${submitted} ET</td></tr>
  </table>
  <p style="margin-top: 24px; font-size: 13px; color: #666;">
    This lead is stored in your Supabase dashboard under the leads table.
  </p>
</body>
</html>
  `.trim();
}

function buildNotificationText(lead: Lead): string {
  const submitted = lead.created_at ? formatDateET(lead.created_at) : 'Unknown';
  return [
    'New Inquiry - First Due Advisors',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email ?? ''}`,
    `Phone: ${lead.phone ?? 'Not provided'}`,
    `Service Interest: ${lead.service_interest ?? 'General'}`,
    `Message: ${lead.message ?? ''}`,
    `Page URL: ${lead.page_url ?? 'Unknown'}`,
    `Submitted: ${submitted} ET`,
  ].join('\n');
}

function buildConfirmationHtml(lead: Lead): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>We received your message</title></head>
<body style="font-family: sans-serif; font-size: 15px; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h2 style="margin-top: 0; color: #0d1b3e;">First Due Advisors</h2>
  <p>Hello ${lead.name},</p>
  <p>${FORM_SUCCESS_MESSAGE}</p>
  <p>If you need to reach us sooner, you are welcome to call directly:</p>
  <p style="font-size: 18px; font-weight: 700; color: #0d1b3e;">${SUPPORT_PHONE}</p>
  <p style="color: #555; font-size: 14px;">We are typically available Monday through Friday during normal business hours.</p>
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
  <p style="font-size: 13px; color: #666;">
    First Due Advisors is a firefighter-owned independent insurance brokerage. Every agent is a first responder.
    We are here to help you find coverage that fits your life, not push products that fit our bottom line.
  </p>
  <p style="font-size: 13px; color: #666;">
    First Due Advisors | ${SUPPORT_PHONE}
  </p>
</body>
</html>
  `.trim();
}

function buildConfirmationText(lead: Lead): string {
  return [
    `Hello ${lead.name},`,
    '',
    FORM_SUCCESS_MESSAGE,
    '',
    `If you need to reach us sooner, call: ${SUPPORT_PHONE}`,
    'We are available Monday through Friday during normal business hours.',
    '',
    'First Due Advisors is a firefighter-owned independent insurance brokerage.',
    'Every agent is a first responder. We are here to help you find the right coverage.',
    '',
    `First Due Advisors | ${SUPPORT_PHONE}`,
  ].join('\n');
}

export async function sendLeadNotification(lead: Lead): Promise<void> {
  try {
    const resend = getResendClient();
    const service = lead.service_interest ?? 'General';
    const subject = `New Inquiry - ${lead.name} - ${service}`;

    await resend.emails.send({
      from: `${RESEND_FROM_NAME} <${RESEND_FROM_EMAIL}>`,
      to: RESEND_LEAD_NOTIFY_EMAIL,
      subject,
      html: buildNotificationHtml(lead),
      text: buildNotificationText(lead),
    });
  } catch (err) {
    console.error('[notify] sendLeadNotification failed:', err);
  }
}

export async function sendLeadConfirmation(lead: Lead): Promise<void> {
  if (!lead.email) return;

  try {
    const resend = getResendClient();

    await resend.emails.send({
      from: `${RESEND_FROM_NAME} <${RESEND_FROM_EMAIL}>`,
      to: lead.email,
      subject: 'We received your message - First Due Advisors',
      html: buildConfirmationHtml(lead),
      text: buildConfirmationText(lead),
    });
  } catch (err) {
    console.error('[notify] sendLeadConfirmation failed:', err);
  }
}
