'use client';

import { useEffect } from 'react';
import { trackServicePageView } from '@/lib/analytics/events';

interface ServicePageTrackerProps {
  slug: string;
}

export function ServicePageTracker({ slug }: ServicePageTrackerProps): null {
  useEffect(() => {
    trackServicePageView({ slug, page_url: window.location.href });
  }, [slug]);
  return null;
}
