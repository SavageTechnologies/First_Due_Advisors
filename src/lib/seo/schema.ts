import type { Service } from '@/types/service';
import type { Faq } from '@/types/faq';
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SUPPORT_PHONE,
  SUPPORT_EMAIL,
  BUSINESS_ADDRESS,
  AUTHOR_NAME,
  AUTHOR_TITLE,
  LICENSED_STATES,
} from '@/lib/site';

export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    telephone: SUPPORT_PHONE,
    email: SUPPORT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_ADDRESS,
    },
    sameAs: [],
  };
}

export function buildLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    telephone: SUPPORT_PHONE,
    email: SUPPORT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_ADDRESS,
    },
    areaServed: LICENSED_STATES.split(',').map((s) => s.trim()),
    priceRange: 'Free consultation',
  };
}

export function buildServiceSchema(service: Service): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.meta_description ?? service.excerpt ?? '',
    url: `${SITE_URL}/${service.slug}`,
    provider: {
      '@type': 'InsuranceAgency',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildFaqSchema(faqs: Faq[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function buildPersonSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    jobTitle: AUTHOR_TITLE,
    worksFor: {
      '@type': 'InsuranceAgency',
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/about`,
  };
}
