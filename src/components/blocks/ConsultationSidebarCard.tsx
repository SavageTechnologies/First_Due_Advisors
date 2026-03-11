import { ContactForm } from '@/components/forms/ContactForm';
import { SUPPORT_PHONE, SUPPORT_PHONE_HREF } from '@/lib/site';

interface ConsultationSidebarCardProps {
  source?: string;
  prefillService?: string;
}

export function ConsultationSidebarCard({
  source = 'sidebar',
  prefillService,
}: ConsultationSidebarCardProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-0">
      {/* Header */}
      <div className="bg-accent px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">
          Free Consultation
        </p>
        <p className="text-sm text-[rgba(255,255,255,0.9)] leading-snug">
          No obligation. Speak with a licensed first responder today.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border border-[var(--border)] border-t-0 px-5 py-5">
        <ContactForm prefillService={prefillService} source={source} />
      </div>

      {/* Phone card */}
      <div className="bg-primary px-5 py-4 flex flex-col gap-1 mt-3">
        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
          Prefer to call?
        </p>
        <a
          href={SUPPORT_PHONE_HREF}
          className="text-white font-bold text-lg hover:text-accent transition-colors"
        >
          {SUPPORT_PHONE}
        </a>
        <p className="text-xs text-[rgba(255,255,255,0.6)]">
          Available Monday through Friday
        </p>
      </div>
    </div>
  );
}
