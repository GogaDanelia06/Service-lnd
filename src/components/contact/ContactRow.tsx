import { Meta } from '@/components/ui/Meta';

export function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 border-t border-[var(--rule)] py-3.5">
      <Meta as="dt" muted className="shrink-0">
        {label}
      </Meta>
      <Meta as="dd" className="text-right">
        {children}
      </Meta>
    </div>
  );
}
