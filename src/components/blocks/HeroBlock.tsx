import Link from 'next/link';
import { CTA_PRIMARY, CTA_SECONDARY } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { PhoneLink } from '@/components/ui/PhoneLink';

const TRUST_ITEMS = [
  '22 Years Experience',
  'First Responder Agents',
  'Independent Brokerage',
  'No Obligation Consultation',
];

interface HeroBlockProps {
  heading: string;
  subheading: string;
  eyebrow?: string;
}

export function HeroBlock({
  heading,
  subheading,
  eyebrow,
}: HeroBlockProps): React.ReactElement {
  return (
    <section className="bg-primary py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold text-white leading-tight md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="font-serif text-lg text-[rgba(255,255,255,0.8)] leading-relaxed max-w-2xl md:text-xl">
          {subheading}
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              {CTA_PRIMARY}
            </Button>
          </Link>
          <PhoneLink location="cta_block" />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 border-t border-[rgba(255,255,255,0.15)] pt-6">
          {TRUST_ITEMS.map((item) => (
            <span key={item} className="text-sm font-semibold text-[rgba(255,255,255,0.75)] flex items-center gap-1.5">
              <span className="text-accent text-base leading-none">&#10003;</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
