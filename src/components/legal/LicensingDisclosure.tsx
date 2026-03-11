import { LICENSING_DISCLOSURE } from '@/lib/compliance';

export function LicensingDisclosure(): React.ReactElement {
  return (
    <p className="text-xs text-[rgba(255,255,255,0.5)] leading-relaxed">
      {LICENSING_DISCLOSURE}
    </p>
  );
}
