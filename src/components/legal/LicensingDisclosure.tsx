import { LICENSING_DISCLOSURE } from '@/lib/compliance';

export function LicensingDisclosure(): React.ReactElement {
  return (
    <p className="text-xs text-text-muted leading-relaxed">
      {LICENSING_DISCLOSURE}
    </p>
  );
}
