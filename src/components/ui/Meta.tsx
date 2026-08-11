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
