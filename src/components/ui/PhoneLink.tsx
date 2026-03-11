'use client';

import { SUPPORT_PHONE, SUPPORT_PHONE_HREF, CTA_PHONE } from '@/lib/site';
import { trackPhoneClick } from '@/lib/analytics/events';
import { Button } from './Button';

type PhoneLinkLocation =
  | 'header'
  | 'sidebar'
  | 'footer'
  | 'mobile_bar'
  | 'cta_block';

interface PhoneLinkProps {
  location?: PhoneLinkLocation;
  className?: string;
}

export function PhoneLink({
  location = 'header',
  className,
}: PhoneLinkProps): React.ReactElement {
  function handleClick(): void {
    trackPhoneClick({ location });
  }

  return (
    <a href={SUPPORT_PHONE_HREF} onClick={handleClick} className={className}>
      <Button variant="phone" size="md">
        {CTA_PHONE} {SUPPORT_PHONE}
      </Button>
    </a>
  );
}
