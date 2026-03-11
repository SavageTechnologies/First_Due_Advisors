const TRUST_STATS = [
  {
    stat: '22+ Years',
    label: 'Licensed Insurance Professional',
  },
  {
    stat: '5 Services',
    label: 'Medicare \u00b7 Health \u00b7 Life \u00b7 Annuities \u00b7 Estate',
  },
  {
    stat: 'First Responders',
    label: 'All agents are first responders',
  },
  {
    stat: 'Independent',
    label: 'We work for you, not the carrier',
  },
];

export function TrustBar(): React.ReactElement {
  return (
    <section className="bg-[var(--cream-warm)] border-y border-[var(--border-warm)] py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6 md:grid-cols-4">
        {TRUST_STATS.map((item) => (
          <div key={item.stat} className="flex flex-col gap-1 text-center md:text-left">
            <span className="font-display text-2xl font-bold text-primary">
              {item.stat}
            </span>
            <span className="text-xs font-semibold text-[var(--text-muted)] leading-snug">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
