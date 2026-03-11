import type { Testimonial } from '@/types/testimonial';
import { Badge } from './Badge';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({
  testimonial,
}: TestimonialCardProps): React.ReactElement {
  const stars = Math.min(5, Math.max(1, testimonial.rating ?? 5));

  return (
    <div className="flex flex-col gap-4 bg-white border border-[var(--border)] p-6 shadow-sm">
      <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < stars ? 'text-accent' : 'text-[var(--border)]'}
            aria-hidden="true"
          >
            &#9733;
          </span>
        ))}
      </div>
      <blockquote>
        <p className="font-serif text-[var(--text-mid)] leading-relaxed italic">
          &ldquo;{testimonial.body}&rdquo;
        </p>
      </blockquote>
      <footer className="flex flex-wrap items-center gap-2 mt-auto">
        <span className="font-semibold text-[var(--text)] text-sm">
          {testimonial.name}
        </span>
        {testimonial.location && (
          <span className="text-[var(--text-muted)] text-sm">
            &middot; {testimonial.location}
          </span>
        )}
        {testimonial.service_slug && (
          <Badge variant="muted">{testimonial.service_slug.replace(/-/g, ' ')}</Badge>
        )}
      </footer>
    </div>
  );
}
