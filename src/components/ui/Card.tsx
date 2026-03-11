import { cn } from '@/lib/utils/cn';

type CardVariant = 'default' | 'featured' | 'warm';

interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white border border-[var(--border)] shadow-sm',
  featured:
    'bg-primary border-2 border-accent text-white',
  warm: 'bg-[var(--cream-warm)] border border-[var(--border-warm)]',
};

export function Card({
  variant = 'default',
  children,
  className,
}: CardProps): React.ReactElement {
  return (
    <div className={cn('p-6', variantStyles[variant], className)}>
      {children}
    </div>
  );
}
