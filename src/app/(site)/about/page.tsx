import type { Metadata } from 'next';
import Image from 'next/image';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildPersonSchema, buildOrganizationSchema, buildBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBlock } from '@/components/blocks/CtaBlock';
import { LicensingDisclosure } from '@/components/legal/LicensingDisclosure';
import { SITE_NAME, SITE_URL, AUTHOR_NAME, AUTHOR_TITLE } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: `About ${SITE_NAME}`,
  description: `Meet Brandon Grimes and the team at First Due Advisors. A firefighter-founded insurance brokerage built on 22 years of experience, first responder values, and community-first ethics.`,
  canonical: '/about',
});

const STATS = [
  { stat: '22 Years', label: 'Licensed Experience' },
  { stat: 'First Responder', label: 'Founded and Staffed' },
  { stat: '5 Services', label: 'Medicare to Estate Planning' },
  { stat: 'Your Community', label: 'Independent Brokerage' },
];

export default function AboutPage(): React.ReactElement {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
  ]);

  return (
    <>
      <JsonLd data={buildPersonSchema()} />
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={breadcrumbSchema} />

      <PageShell breadcrumbs={breadcrumbs} showSidebar>
        <SectionHeading
          heading="About First Due Advisors"
          eyebrow="Our Story"
          className="mb-8"
        />

        <div className="flex flex-col gap-10">
          {/* Photo + intro */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
            <div className="relative aspect-[3/4] overflow-hidden border border-[var(--border-warm)]">
              <Image
                src="/images/brandon-grimes.jpg"
                alt={`${AUTHOR_NAME} — ${AUTHOR_TITLE}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl font-bold text-[var(--text)]">
                {AUTHOR_NAME}
              </h2>
              <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                {AUTHOR_TITLE}
              </p>
              <p className="font-serif text-[var(--text-mid)] leading-relaxed">
                Brandon Grimes founded First Due Advisors with a clear purpose: to
                bring a higher standard of care and ethics to the insurance industry.
                After more than two decades as a licensed insurance professional with
                a background as a first responder, Brandon saw firsthand how confusing
                and impersonal the insurance process had become for everyday families.
              </p>
              <p className="font-serif text-[var(--text-mid)] leading-relaxed">
                He built First Due Advisors to be different. Not a call center. Not a
                national conglomerate. A brokerage where the person on the other end
                of the phone has actually run toward emergencies and knows what it means
                to put other people first.
              </p>
            </div>
          </div>

          {/* Founding story */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-[var(--text)]">
              Why First Responders
            </h3>
            <p className="font-serif text-[var(--text-mid)] leading-relaxed">
              Brandon made a deliberate decision when building his team: every agent
              at First Due Advisors is or has been a first responder. Firefighters,
              paramedics, law enforcement. People who have trained to make calm,
              clear-headed decisions under pressure. People who understand that when
              someone calls for help, the job is to show up.
            </p>
            <p className="font-serif text-[var(--text-mid)] leading-relaxed">
              That same mindset applies to insurance. When a client comes to Brandon
              and his team, they are not met with sales scripts or pressure tactics.
              They are met with honest guidance, plain language, and a genuine effort
              to find coverage that fits their situation.
            </p>
          </div>

          {/* Independent brokerage */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-[var(--text)]">
              What Independent Means for You
            </h3>
            <p className="font-serif text-[var(--text-mid)] leading-relaxed">
              First Due Advisors is an independent brokerage. That means Brandon and
              his team work for the client, not for any single insurance carrier. They
              have access to plans from multiple carriers and are free to recommend the
              one that actually fits each client's needs, budget, and goals.
            </p>
            <p className="font-serif text-[var(--text-mid)] leading-relaxed">
              There are no quotas. No carrier incentives that override client
              recommendations. Just honest advice from people with 22 years of
              experience and a career built on doing the right thing.
            </p>
          </div>

          {/* Community commitment */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display text-xl font-bold text-[var(--text)]">
              A Commitment to Community
            </h3>
            <p className="font-serif text-[var(--text-mid)] leading-relaxed">
              The name First Due comes from the firehouse. It refers to the first unit
              arriving on scene. Always ready. Always first. That is the standard
              Brandon holds his team to: show up, do the job right, and leave people
              better off than you found them.
            </p>
            <p className="font-serif text-[var(--text-mid)] leading-relaxed">
              Whether you are enrolling in Medicare for the first time, protecting
              your family with life insurance, or planning your estate, First Due
              Advisors is committed to guiding you through the process with patience
              and clarity.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 bg-[var(--cream-warm)] border border-[var(--border-warm)] p-6 md:grid-cols-4">
            {STATS.map((item) => (
              <div key={item.stat} className="flex flex-col gap-1 text-center">
                <span className="font-display text-2xl font-bold text-primary">
                  {item.stat}
                </span>
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Licensing */}
          <div className="bg-primary p-4">
            <LicensingDisclosure />
          </div>
        </div>

        <CtaBlock variant="bottom" />
      </PageShell>
    </>
  );
}
