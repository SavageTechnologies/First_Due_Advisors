interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPage({
  title,
  lastUpdated,
  children,
}: LegalPageProps): React.ReactElement {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <header className="mb-8 pb-6 border-b border-[var(--border)]">
        <h1 className="font-display text-3xl font-bold text-[var(--text)] mb-2 md:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Last updated: {lastUpdated}
        </p>
      </header>
      <div className="prose-legal font-serif text-[var(--text-mid)] leading-relaxed space-y-4">
        {children}
      </div>
    </article>
  );
}
