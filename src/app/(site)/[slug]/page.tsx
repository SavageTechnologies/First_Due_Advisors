import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServiceSlugs } from '@/lib/data/services';
import { getTestimonials } from '@/lib/data/testimonials';
import { buildServiceMetadata } from '@/lib/seo/metadata';
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageShell } from '@/components/layout/PageShell';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { ServicePillarContent } from '@/components/blocks/ServicePillarContent';
import { CtaBlock } from '@/components/blocks/CtaBlock';
import { TestimonialsBlock } from '@/components/blocks/TestimonialsBlock';
import { ServicePageTracker } from './ServicePageTracker';
import { SITE_URL } from '@/lib/site';
import type { Faq } from '@/types/faq';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  return buildServiceMetadata(service);
}

export default async function ServicePage({ params }: PageProps): Promise<React.ReactElement> {
  const [service, testimonials] = await Promise.all([
    getServiceBySlug(params.slug),
    getTestimonials(params.slug),
  ]);

  if (!service) notFound();

  const faqs = (service.faqs ?? []) as Faq[];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/' },
    { label: service.title, href: `/${service.slug}` },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: SITE_URL },
    { name: service.title, url: `${SITE_URL}/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd data={buildServiceSchema(service)} />
      {faqs.length > 0 && <JsonLd data={buildFaqSchema(faqs)} />}
      <JsonLd data={breadcrumbSchema} />
      <ServicePageTracker slug={service.slug} />

      <HeroBlock
        heading={service.title}
        subheading={service.tagline ?? 'Speak with a licensed first responder today.'}
        eyebrow="First Due Advisors"
      />

      <PageShell breadcrumbs={breadcrumbs} showSidebar>
        <ServicePillarContent service={service} />
        <CtaBlock variant="mid" heading={`Ready to explore ${service.title}?`} />
        <TestimonialsBlock testimonials={testimonials} />
        <CtaBlock variant="bottom" />
      </PageShell>
    </>
  );
}
