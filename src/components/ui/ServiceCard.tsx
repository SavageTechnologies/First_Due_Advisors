import Link from 'next/link';
import type { Service } from '@/types/service';
import { Card } from './Card';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps): React.ReactElement {
  const excerpt =
    service.excerpt && service.excerpt.length > 140
      ? service.excerpt.slice(0, 140).trimEnd() + '...'
      : (service.excerpt ?? '');

  return (
    <Card variant="default" className="flex flex-col h-full">
      <div className="flex flex-col gap-3 flex-1">
        <h3 className="font-display text-xl font-bold text-[var(--text)]">
          {service.title}
        </h3>
        {service.tagline && (
          <p className="text-sm font-semibold text-accent uppercase tracking-wide">
            {service.tagline}
          </p>
        )}
        {excerpt && (
          <p className="font-serif text-[var(--text-mid)] leading-relaxed text-sm flex-1">
            {excerpt}
          </p>
        )}
      </div>
      <div className="mt-4">
        <Link
          href={`/${service.slug}`}
          className="text-sm font-bold text-primary underline-offset-2 hover:underline"
        >
          Learn more
        </Link>
      </div>
    </Card>
  );
}
