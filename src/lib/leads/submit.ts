/**
 * lib/leads/submit.ts
 * Inserts a lead record into Supabase using the service role client.
 * Only called from app/api/contact/route.ts.
 */

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import type { Lead, LeadInsert } from '@/types/lead';

interface SubmitLeadResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function submitLead(data: LeadInsert): Promise<SubmitLeadResult> {
  const client = createSupabaseAdminClient();

  // The admin client is created without a generated Database type.
  // We use the untyped client and assert the result shape we expect.
  const { data: inserted, error } = await (
    client
      .from('leads')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(data as any)
      .select('id')
      .single()
  ) as { data: Pick<Lead, 'id'> | null; error: { message: string } | null };

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, id: inserted?.id };
}
