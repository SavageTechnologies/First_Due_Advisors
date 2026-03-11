import type { Testimonial } from '@/types/testimonial';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

interface TestimonialsBlockProps {
  testimonials: Testimonial[];
}

export function TestimonialsBlock({
  testimonials,
}: TestimonialsBlockProps): React.ReactElement | null {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-[var(--cream-warm)]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-[var(--text)] mb-8 text-center md:text-3xl">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
