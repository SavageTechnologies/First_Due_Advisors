'use client';

import Link from 'next/link';
import { PhoneLink } from '@/components/ui/PhoneLink';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps): React.ReactElement {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white">
      <div className="max-w-md w-full text-center">
        <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-3 md:text-4xl">
          Something went wrong
        </h1>
        <p className="font-serif text-[var(--text-mid)] mb-2">
          {error.message ?? 'An unexpected error occurred. Please try again.'}
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          If the problem persists, please call us directly.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={reset}
            className="font-sans font-semibold text-sm bg-primary text-white px-5 py-2.5 hover:bg-[var(--primary-mid)] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="font-sans font-semibold text-sm border border-[var(--border)] text-[var(--text)] px-5 py-2.5 hover:bg-[var(--cream-warm)] transition-colors"
          >
            Return home
          </Link>
        </div>
        <PhoneLink location="header" />
      </div>
    </div>
  );
}
