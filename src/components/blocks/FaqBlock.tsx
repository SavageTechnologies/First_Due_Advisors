'use client';

import { useState } from 'react';
import type { Faq } from '@/types/faq';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/site';

interface FaqBlockProps {
  faqs: Faq[];
}

interface FaqSchemaItem {
  '@type': string;
  name: string;
  acceptedAnswer: {
    '@type': string;
    text: string;
  };
}

export function FaqBlock({ faqs }: FaqBlockProps): React.ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number): void {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq): FaqSchemaItem => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    url: typeof window !== 'undefined' ? window.location.href : SITE_URL,
  };

  return (
    <section className="mt-10">
      <JsonLd data={schema} />
      <h2 className="font-display text-2xl font-bold text-[var(--text)] mb-6">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-4">
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-start text-left gap-4 font-sans font-semibold text-[var(--text)] text-base focus:outline-none focus:underline"
              >
                <span>{faq.question}</span>
                <span className="shrink-0 text-accent text-lg leading-none mt-0.5">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <p className="mt-3 font-serif font-light text-[var(--text-mid)] leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
