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
    <footer className="bg-[var(--primary-dark)] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 56 60" width="36" height="39" aria-hidden="true">
              <path d="M28 2L4 11v18c0 16 10 27 24 29 14-2 24-13 24-29V11L28 2z" fill="white" opacity="0.9"/>
              <rect x="22" y="24" width="12" height="12" fill="#B91C1C"/>
              <polygon points="24,10 32,10 31,24 25,24" fill="#B91C1C"/>
              <polygon points="25,36 31,36 32,50 24,50" fill="#B91C1C"/>
              <polygon points="8,25 8,31 22,30 22,26" fill="#B91C1C"/>
              <polygon points="34,26 34,30 48,31 48,25" fill="#B91C1C"/>
            </svg>
            <span className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-base tracking-tight">First Due</span>
              <span className="font-sans text-accent text-[9px] tracking-[0.2em] uppercase">Advisors</span>
            </span>
          </div>
          <p className="text-sm text-[rgba(255,255,255,0.7)] leading-relaxed">
            {SITE_TAGLINE}
          </p>
          <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">
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
                  className="text-sm text-[rgba(255,255,255,0.7)] hover:text-white transition-colors"
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
          <ul className="flex flex-col gap-2 text-sm text-[rgba(255,255,255,0.7)]">
            {SUPPORT_PHONE && (
              <li>
                <a href={SUPPORT_PHONE_HREF} className="hover:text-white transition-colors">
                  {SUPPORT_PHONE}
                </a>
              </li>
            )}
            {SUPPORT_EMAIL && (
              <li>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors">
                  {SUPPORT_EMAIL}
                </a>
              </li>
            )}
            {BUSINESS_ADDRESS && <li>{BUSINESS_ADDRESS}</li>}
          </ul>
        </div>
      </div>

      {/* Legal row */}
      <div className="border-t border-[rgba(255,255,255,0.1)] px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <p className="text-xs text-[rgba(255,255,255,0.5)] leading-relaxed">
            {FOOTER_DISCLAIMER}
          </p>
          <LicensingDisclosure />
          <div className="flex flex-wrap items-center gap-4 text-xs text-[rgba(255,255,255,0.4)]">
            <span>&copy; {year} {SITE_NAME}. All rights reserved.</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
