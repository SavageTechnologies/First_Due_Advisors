import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { BreadcrumbItem } from '@/components/ui/Breadcrumbs';
import { PageDisclaimer } from '@/components/legal/PageDisclaimer';
import { ConsultationSidebarCard } from '@/components/blocks/ConsultationSidebarCard';

interface PageShellProps {
  children: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  showSidebar?: boolean;
}

export function PageShell({
  children,
  breadcrumbs,
  showSidebar = true,
}: PageShellProps): React.ReactElement {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <Breadcrumbs items={breadcrumbs} />
      <div
        className={
          showSidebar
            ? 'mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10'
            : 'mt-6'
        }
      >
        <main
          className={showSidebar ? 'lg:col-span-8' : undefined}
        >
          {children}
          <PageDisclaimer />
        </main>
        {showSidebar && (
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <ConsultationSidebarCard source="sidebar" />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
