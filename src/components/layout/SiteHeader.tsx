'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SITE_NAME, CTA_PRIMARY } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { PhoneLink } from '@/components/ui/PhoneLink';

const SERVICE_LINKS = [
  { href: '/medicare-plans', label: 'Medicare Plans' },
  { href: '/health-insurance', label: 'Health Insurance' },
  { href: '/life-insurance', label: 'Life Insurance' },
  { href: '/annuities', label: 'Annuities' },
  { href: '/estate-planning', label: 'Estate Planning' },
];

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  function toggleMenu(): void {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu(): void {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-primary border-b-2 border-accent shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link href="/" aria-label={`${SITE_NAME} — Home`} className="flex items-center gap-3 shrink-0" onClick={closeMenu}>
          <svg
            viewBox="0 0 56 60"
            width="40"
            height="43"
            aria-hidden="true"
            className="flex-shrink-0"
          >
            <path d="M28 2L4 11v18c0 16 10 27 24 29 14-2 24-13 24-29V11L28 2z" fill="white"/>
            <rect x="22" y="24" width="12" height="12" fill="#B91C1C"/>
            <polygon points="24,10 32,10 31,24 25,24" fill="#B91C1C"/>
            <polygon points="25,36 31,36 32,50 24,50" fill="#B91C1C"/>
            <polygon points="8,25 8,31 22,30 22,26" fill="#B91C1C"/>
            <polygon points="34,26 34,30 48,31 48,25" fill="#B91C1C"/>
          </svg>
          <span className="flex flex-col leading-none">
            <span className="font-display font-bold text-white text-lg tracking-tight">
              First Due
            </span>
            <span className="font-sans text-accent text-[10px] tracking-[0.2em] uppercase">
              Advisors
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-white">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 hover:text-accent transition-colors"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services
              <span className="text-xs">&#9660;</span>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2 w-52 z-50">
                <div className="bg-white border border-[var(--border)] shadow-lg">
                {SERVICE_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 text-[var(--text)] hover:bg-[var(--cream-warm)] hover:text-primary text-sm transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/about" className="hover:text-accent transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <PhoneLink location="header" />
          <Link href="/contact">
            <Button variant="primary" size="sm">
              {CTA_PRIMARY}
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <span className="text-2xl leading-none">&times;</span>
          ) : (
            <span className="flex flex-col gap-1.5">
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
            </span>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-primary border-t border-[var(--primary-mid)] px-4 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white font-semibold text-base hover:text-accent transition-colors"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[var(--primary-mid)] pt-4">
            <p className="text-xs uppercase tracking-widest text-accent font-bold mb-3">
              Services
            </p>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white text-sm py-1.5 hover:text-accent transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[var(--primary-mid)] pt-4 flex flex-col gap-3">
            <PhoneLink location="header" />
            <Link href="/contact" onClick={closeMenu}>
              <Button variant="primary" size="md" className="w-full">
                {CTA_PRIMARY}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
