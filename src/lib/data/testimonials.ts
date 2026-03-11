import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/site';
import type { Testimonial } from '@/types/testimonial';

function getClient(): ReturnType<typeof createClient> | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function getTestimonials(serviceSlug?: string): Promise<Testimonial[]> {
  const client = getClient();
  if (!client) return [];

  let query = client
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (serviceSlug) {
    query = query.eq('service_slug', serviceSlug);
  }

  const { data, error } = await query;

  if (error) {
    console.error('getTestimonials error:', error.message);
    return [];
  }
  return (data ?? []) as Testimonial[];
}
