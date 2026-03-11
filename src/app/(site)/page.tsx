import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getServices } from '@/lib/data/services';
import { getTestimonials } from '@/lib/data/testimonials';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
} from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { HeroBlock } from '@/components/blocks/HeroBlock';
import { TrustBar } from '@/components/blocks/TrustBar';
import { CtaBlock } from '@/components/blocks/CtaBlock';
import { TestimonialsBlock } from '@/components/blocks/TestimonialsBlock';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME, AUTHOR_TITLE } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE_NAME} | Insurance Built on Service and Trust`,
  description: SITE_DESCRIPTION,
  canonical: '/',
});

export default async function HomePage(): Promise<React.ReactElement> {
  const [services, testimonials] = await Promise.all([
    getServices(),
    getTestimonials(),
  ]);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: 'https://firstdueadvisors.com',
  };

  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={websiteSchema} />

      <HeroBlock
        heading="Insurance Guidance Built on Service and Trust"
        subheading="First Due Advisors is a firefighter-owned brokerage staffed entirely by first responders. We bring the same discipline and integrity from the firehouse to every policy we help you choose."
        eyebrow="Firefighter-Owned. Community-First."
      />

      <TrustBar />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeading
          heading="What We Cover"
          eyebrow="Our Services"
          subheading="From Medicare enrollment to estate planning, we guide you through every stage of life."
          align="center"
          className="mb-10"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <CtaBlock variant="mid" />

      <TestimonialsBlock testimonials={testimonials} />

      {/* About teaser */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
          <div className="relative aspect-[3/4] overflow-hidden border border-[var(--border-warm)]">
            <Image
              src="/images/brandon-grimes.jpg"
              alt={`${AUTHOR_NAME} — ${AUTHOR_TITLE}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              About Brandon
            </p>
            <h2 className="font-display text-3xl font-bold text-[var(--text)] leading-tight md:text-4xl">
              {AUTHOR_NAME}
            </h2>
            <p className="font-sans text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wide">
              {AUTHOR_TITLE}
            </p>
            <p className="font-serif text-[var(--text-mid)] leading-relaxed">
              Brandon Grimes founded First Due Advisors to bring a higher standard
              of care to the insurance industry. Every agent on his team is a
              first responder trained to make clear-headed, ethical decisions
              when it matters most.
            </p>
            <div className="flex flex-wrap gap-4">
              {['22 Years Experience', 'First Responder Founded', 'Independent Brokerage'].map(
                (badge) => (
                  <span
                    key={badge}
                    className="text-xs font-bold text-primary border border-primary px-3 py-1 uppercase tracking-wide"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
            <Link
              href="/about"
              className="font-sans font-bold text-sm text-primary underline-offset-2 hover:underline"
            >
              Meet Brandon
            </Link>
          </div>
        </div>
      </section>

      <CtaBlock variant="bottom" />
    </>
  );
}
