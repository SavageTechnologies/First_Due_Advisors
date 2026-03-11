import { PhoneLink } from '@/components/ui/PhoneLink';

export function MobileCallBar(): React.ReactElement {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[var(--primary-dark)] border-t-2 border-accent"
      style={{ minHeight: '56px' }}
    >
      <div className="flex items-center justify-between px-4 h-14 gap-3">
        <p className="text-sm font-semibold text-white leading-tight">
          Questions about coverage?
        </p>
        <PhoneLink location="mobile_bar" />
      </div>
    </div>
  );
}
