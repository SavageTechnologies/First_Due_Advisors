import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { buildLocalBusinessSchema, buildBreadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import {
  SITE_NAME,
  SITE_URL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_HREF,
  SUPPORT_EMAIL,
  BUSINESS_ADDRESS,
} from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: `Contact ${SITE_NAME}`,
  description: 'Get in touch with First Due Advisors. Speak directly with a licensed first responder about Medicare, health, life, annuities, or estate planning.',
  canonical: '/contact',
});

export default function ContactPage(): React.ReactElement {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Contact', url: `${SITE_URL}/contact` },
  ]);

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd data={breadcrumbSchema} />

      <PageShell breadcrumbs={breadcrumbs} showSidebar={false}>
        <SectionHeading
          heading="Get in Touch"
          eyebrow="Contact Us"
          subheading="A licensed first responder will respond within one business day. No pressure. No obligation."
          className="mb-10"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Form */}
          <div>
            <ContactForm source="contact-page" />
          </div>

          {/* Contact info card */}
          <div className="flex flex-col gap-6">
            <div className="bg-primary p-6 flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                  Phone
                </p>
                <a
                  href={SUPPORT_PHONE_HREF}
                  className="font-display text-xl font-bold text-white hover:text-accent transition-colors"
                >
                  {SUPPORT_PHONE}
                </a>
                <p className="text-xs text-[rgba(255,255,255,0.6)] mt-1">
                  Monday through Friday
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-white font-semibold hover:text-accent transition-colors text-sm"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>

              {BUSINESS_ADDRESS && BUSINESS_ADDRESS !== 'City, State' && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                    Location
                  </p>
                  <p className="text-white text-sm">{BUSINESS_ADDRESS}</p>
                </div>
              )}

              <div className="border-t border-[rgba(255,255,255,0.15)] pt-4">
                <p className="text-sm font-serif text-[rgba(255,255,255,0.75)] leading-relaxed italic">
                  Every agent at {SITE_NAME} is a licensed first responder.
                  We show up for our clients the same way we showed up on the job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    </>
  );
}
