import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  heading: string;
  eyebrow?: string;
  subheading?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  heading,
  eyebrow,
  subheading,
  align = 'left',
  className,
}: SectionHeadingProps): React.ReactElement {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={cn('flex flex-col gap-3', alignClass, className)}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold text-[var(--text)] leading-tight md:text-4xl">
        {heading}
      </h2>
      {subheading && (
        <p className="font-serif text-lg text-[var(--text-muted)] leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
}
