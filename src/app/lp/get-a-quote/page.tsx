import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { ContactForm } from '@/components/forms/ContactForm';
import { PhoneLink } from '@/components/ui/PhoneLink';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: `Get a Free Quote | ${SITE_NAME}`,
  description: 'Request a free, no-obligation insurance consultation from First Due Advisors.',
  canonical: '/lp/get-a-quote',
  noIndex: true,
});

export default function GetAQuotePage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[var(--cream-warm)] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 text-center">
          <p className="font-display font-bold text-primary text-xl">{SITE_NAME}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">{SITE_TAGLINE}</p>
        </div>

        {/* Trust line */}
        <p className="text-center text-sm font-semibold text-[var(--text-mid)] mb-6">
          Firefighter-owned. First responder agents. Free, no-obligation consultation.
        </p>

        {/* Form */}
        <div className="bg-white border border-[var(--border)] p-6">
          <h1 className="font-display text-2xl font-bold text-[var(--text)] mb-1">
            Get a Free Consultation
          </h1>
          <p className="font-serif text-sm text-[var(--text-muted)] mb-6">
            A licensed first responder will be in touch within one business day.
          </p>
          <ContactForm source="lp-get-a-quote" />
        </div>

        {/* Phone */}
        <div className="flex justify-center mt-6">
          <PhoneLink location="cta_block" />
        </div>
      </div>
    </div>
  );
}
