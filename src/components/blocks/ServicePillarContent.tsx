import type { Service } from '@/types/service';
import type { Faq } from '@/types/faq';
import { Badge } from '@/components/ui/Badge';
import { FaqBlock } from './FaqBlock';

interface WhyItem {
  icon_label: string;
  heading: string;
  body: string;
}

interface WhySection {
  heading: string;
  items: WhyItem[];
}

function parseWhySection(raw: Service['why_section']): WhySection | null {
  if (!raw) return null;
  if (
    typeof raw === 'object' &&
    'heading' in raw &&
    'items' in raw
  ) {
    return raw as unknown as WhySection;
  }
  return null;
}

function parseFaqs(raw: Service['faqs']): Faq[] {
  if (!raw || !Array.isArray(raw)) return [];
  return raw as unknown as Faq[];
}

interface ServicePillarContentProps {
  service: Service;
}

export function ServicePillarContent({
  service,
}: ServicePillarContentProps): React.ReactElement {
  const whySection = parseWhySection(service.why_section);
  const faqs = parseFaqs(service.faqs);

  return (
    <article className="flex flex-col gap-8">
      {/* Intro body */}
      {service.body_intro && (
        <div className="font-serif text-[var(--text-mid)] leading-relaxed space-y-4">
          {service.body_intro.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {/* Detail body */}
      {service.body_detail && (
        <div className="font-serif text-[var(--text-mid)] leading-relaxed space-y-4">
          {service.body_detail.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {/* Why section */}
      {whySection && (
        <section>
          <h2 className="font-display text-2xl font-bold text-[var(--text)] mb-6">
            {whySection.heading}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {whySection.items.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--cream-warm)] border border-[var(--border-warm)] p-5 flex flex-col gap-3"
              >
                <Badge variant="accent">{item.icon_label}</Badge>
                <h3 className="font-sans font-bold text-[var(--text)] text-base">
                  {item.heading}
                </h3>
                <p className="font-serif text-sm text-[var(--text-mid)] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && <FaqBlock faqs={faqs} />}
    </article>
  );
}
