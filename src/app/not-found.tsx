import Link from 'next/link';
import { SITE_NAME } from '@/lib/site';
import { ContactForm } from '@/components/forms/ContactForm';
import { PhoneLink } from '@/components/ui/PhoneLink';
import { PageDisclaimer } from '@/components/legal/PageDisclaimer';

export default function NotFound(): React.ReactElement {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-start px-4 py-16">
      <div className="w-full max-w-lg">
        <p className="font-display font-bold text-white text-xl mb-2">{SITE_NAME}</p>
        <h1 className="font-display text-4xl font-bold text-white mb-3 md:text-5xl">
          Page Not Found
        </h1>
        <p className="font-serif text-[rgba(255,255,255,0.75)] text-lg mb-8">
          This page does not exist. Let us help you find what you need.
        </p>
        <nav className="flex flex-wrap gap-4 mb-10">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
            { href: '/medicare-plans', label: 'Medicare Plans' },
            { href: '/health-insurance', label: 'Health Insurance' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white underline underline-offset-2 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="bg-white p-6 mb-6">
          <p className="font-sans font-bold text-[var(--text)] mb-4">
            Or send us a message:
          </p>
          <ContactForm source="404-page" />
        </div>
        <div className="flex justify-center">
          <PhoneLink location="header" />
        </div>
        <div className="mt-8">
          <PageDisclaimer />
        </div>
      </div>
    </div>
  );
}
