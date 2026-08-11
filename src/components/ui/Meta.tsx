import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export function Meta({
  children,
  className,
  size = 'sm',
  muted = false,
  as: Tag = 'span',
}: {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'lg';
  muted?: boolean;
  as?: 'span' | 'p' | 'div' | 'dt' | 'dd' | 'li';
}) {
  return (
    <Tag className={cn('meta', size === 'lg' && 'meta--lg', muted && 'meta-muted', className)}>
      {children}
    </Tag>
  );
}

export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('meta flex items-center gap-3', className)}>
      <span className="tabular-nums text-[var(--accent)]">({index})</span>
      <span aria-hidden className="h-px w-8 shrink-0 bg-[var(--accent)] opacity-70" />
      <span>{children}</span>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={cn('h-[0.9em] w-[0.9em]', className)}
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}
