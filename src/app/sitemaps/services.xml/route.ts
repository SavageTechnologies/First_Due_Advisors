import { NextResponse } from 'next/server';
import { getServices } from '@/lib/data/services';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

export async function GET(): Promise<NextResponse> {
  const services = await getServices();

  const fallbackDate = new Date().toISOString().split('T')[0];

  const urls = services
    .map((service) => {
      const lastmod = service.updated_at
        ? new Date(service.updated_at).toISOString().split('T')[0]
        : fallbackDate;

      return `
  <url>
    <loc>${SITE_URL}/${service.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
