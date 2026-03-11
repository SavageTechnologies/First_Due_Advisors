/**
 * lib/supabase/admin.ts
 * Service role client — bypasses RLS.
 * ONLY import this in app/api/* and scripts/*.
 * Never import in components or pages.
 */
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '@/lib/site';

export function createSupabaseAdminClient(): ReturnType<typeof createClient> {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
