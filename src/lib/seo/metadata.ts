import type { Metadata } from 'next';
import type { Service } from '@/types/service';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/site';

interface PageMetadataOptions {
  title: string;
  description: string;
  canonical: string;
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  canonical,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullCanonical = canonical.startsWith('http')
    ? canonical
    : `${SITE_URL}${canonical}`;

  return {
    title,
    description,
    alternates: {
      canonical: fullCanonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: fullCanonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildServiceMetadata(service: Service): Metadata {
  const title = service.meta_title ?? `${service.title} | ${SITE_NAME}`;
  const description = service.meta_description ?? SITE_DESCRIPTION;
  const canonical = `${SITE_URL}/${service.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: service.og_title ?? title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/services/${service.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: service.og_title ?? title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.og_title ?? title,
      description,
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
  },
};
