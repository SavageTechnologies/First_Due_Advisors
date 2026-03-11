import { NOT_FINANCIAL_ADVICE } from '@/lib/compliance';

export function PageDisclaimer(): React.ReactElement {
  return (
    <aside
      role="note"
      aria-label="Financial advice disclaimer"
      className="border-t border-[var(--border)] mt-8 pt-4 text-xs text-[var(--text-light)] leading-relaxed"
    >
      {NOT_FINANCIAL_ADVICE}
    </aside>
  );
}
