import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

interface SitemapUrl {
  loc: string;
  priority: string;
  changefreq: string;
}

const STATIC_URLS: SitemapUrl[] = [
  { loc: '/',        priority: '1.0', changefreq: 'weekly'  },
  { loc: '/about',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
];

export function GET(): NextResponse {
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = STATIC_URLS.map(
    ({ loc, priority, changefreq }) => `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
