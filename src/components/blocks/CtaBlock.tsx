import Link from 'next/link';
import { CTA_PRIMARY } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { PhoneLink } from '@/components/ui/PhoneLink';

type CtaVariant = 'mid' | 'bottom';

interface CtaBlockProps {
  variant?: CtaVariant;
  heading?: string;
}

const DEFAULT_HEADINGS: Record<CtaVariant, string> = {
  mid: 'Ready to find the right coverage?',
  bottom: 'Get a free consultation today.',
};

const DEFAULT_SUBHEADINGS: Record<CtaVariant, string> = {
  mid: 'Speak with a licensed first responder who knows your options. No pressure. No obligation.',
  bottom: 'Brandon Grimes and his team are ready to help you make a confident, informed decision.',
};

export function CtaBlock({
  variant = 'bottom',
  heading,
}: CtaBlockProps): React.ReactElement {
  const isMid = variant === 'mid';

  return (
    <section
      className={
        isMid
          ? 'bg-primary py-12 px-4'
          : 'bg-[var(--cream-warm)] border-y border-[var(--border-warm)] py-12 px-4'
      }
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center text-center">
        <h2
          className={
            `font-display text-2xl font-bold md:text-3xl ${isMid ? 'text-white' : 'text-[var(--text)]'}`
          }
        >
          {heading ?? DEFAULT_HEADINGS[variant]}
        </h2>
        <p
          className={
            `font-serif text-base max-w-xl leading-relaxed ${isMid ? 'text-[rgba(255,255,255,0.8)]' : 'text-[var(--text-mid)]'}`
          }
        >
          {DEFAULT_SUBHEADINGS[variant]}
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              {CTA_PRIMARY}
            </Button>
          </Link>
          <PhoneLink location="cta_block" />
        </div>
      </div>
    </section>
  );
}
