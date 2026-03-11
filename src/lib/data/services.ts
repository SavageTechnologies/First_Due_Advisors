import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/site';
import type { Service } from '@/types/service';

function getClient(): ReturnType<typeof createClient> | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function getServices(): Promise<Service[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('getServices error:', error.message);
    return [];
  }
  return (data ?? []) as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const client = getClient();
  if (!client) return null;

  const { data, error } = await client
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('getServiceBySlug error:', error.message);
    }
    return null;
  }
  return data as Service;
}

export async function getServiceSlugs(): Promise<string[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from('services')
    .select('slug')
    .eq('is_published', true);

  if (error) {
    console.error('getServiceSlugs error:', error.message);
    return [];
  }
  return (data ?? []).map((row: { slug: string }) => row.slug);
}
