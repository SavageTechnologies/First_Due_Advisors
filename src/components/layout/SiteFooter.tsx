import Image from 'next/image';
import Link from 'next/link';
import { SITE_NAME, SITE_TAGLINE, SUPPORT_PHONE, SUPPORT_PHONE_HREF, SUPPORT_EMAIL, BUSINESS_ADDRESS } from '@/lib/site';
import { FOOTER_DISCLAIMER } from '@/lib/compliance';
import { LicensingDisclosure } from '@/components/legal/LicensingDisclosure';

const SERVICE_LINKS = [
  { href: '/medicare-plans', label: 'Medicare Plans' },
  { href: '/health-insurance', label: 'Health Insurance' },
  { href: '/life-insurance', label: 'Life Insurance' },
  { href: '/annuities', label: 'Annuities' },
  { href: '/estate-planning', label: 'Estate Planning' },
];

export function SiteFooter(): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cream-warm text-text border-t-2 border-accent">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt={SITE_NAME}
              width={39}
              height={36}
              className="h-9 w-auto"
            />
          </div>
          <p className="text-sm text-text-mid leading-relaxed">
            {SITE_TAGLINE}
          </p>
          <p className="text-sm text-text-muted leading-relaxed">
            Firefighter-owned and operated. All agents are first responders.
            Built on ethics, community, and integrity.
          </p>
        </div>

        {/* Services column */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Services
          </p>
          <ul className="flex flex-col gap-2">
            {SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-mid hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Contact
          </p>
          <ul className="flex flex-col gap-2 text-sm text-text-mid">
            {SUPPORT_PHONE && (
              <li>
                <a href={SUPPORT_PHONE_HREF} className="hover:text-accent transition-colors">
                  {SUPPORT_PHONE}
                </a>
              </li>
            )}
            {SUPPORT_EMAIL && (
              <li>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-accent transition-colors">
                  {SUPPORT_EMAIL}
                </a>
              </li>
            )}
            {BUSINESS_ADDRESS && <li>{BUSINESS_ADDRESS}</li>}
          </ul>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-border-warm px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <p className="text-xs text-text-muted leading-relaxed">
            {FOOTER_DISCLAIMER}
          </p>
          <LicensingDisclosure />
          <div className="flex flex-wrap items-center gap-4 text-xs text-text-light">
            <span>&copy; {year} {SITE_NAME}. All rights reserved.</span>
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
