import Link from 'next/link';
import {
  TCPA_CONSENT,
  TCPA_CONSENT_SHORT,
  NO_OBLIGATION,
  PRIVACY_FORM_NOTE,
} from '@/lib/compliance';

interface FormDisclaimerProps {
  compact?: boolean;
}

export function FormDisclaimer({
  compact = false,
}: FormDisclaimerProps): React.ReactElement {
  return (
    <div
      role="note"
      aria-label="Form disclosure"
      className="text-[0.7rem] leading-relaxed text-[var(--text-light)] space-y-1"
    >
      <p>{compact ? TCPA_CONSENT_SHORT : TCPA_CONSENT}</p>
      <p>
        {NO_OBLIGATION}{' '}
        {!compact && (
          <>
            {PRIVACY_FORM_NOTE.replace('View our Privacy Policy.', '')}{' '}
            <Link
              href="/privacy-policy"
              className="underline hover:text-[var(--text-muted)] transition-colors"
            >
              View our Privacy Policy.
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
