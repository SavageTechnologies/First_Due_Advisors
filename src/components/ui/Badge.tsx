import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'primary' | 'accent' | 'success' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary text-white',
  accent: 'bg-accent text-white',
  success: 'bg-[var(--success-light)] text-success border border-success',
  muted: 'bg-[var(--cream-warm)] text-[var(--text-muted)] border border-[var(--border-warm)]',
};

export function Badge({
  children,
  variant = 'primary',
  className,
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        'inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
        variantStyles[variant],
        className,
      )}
      style={{ borderRadius: '4px' }}
    >
      {children}
    </span>
  );
}
