'use client';

import { useRef, type ElementType, type ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { useReveal } from '@/lib/useReveal';

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const phase = useReveal({ ref });

  return (
    <Tag
      ref={ref}
      className={cn(phase !== 'static' && 'reveal', className)}
      data-shown={phase === 'in' ? 'true' : undefined}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
