import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { areaStyle, columnStyle, type FluidArea, type FluidColumn } from '@/lib/fluid';

export function FluidGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('fe-grid w-full', className)}>{children}</div>;
}

export type FluidBlockProps = {
  area: FluidArea;
  children: ReactNode;
  className?: string;
  as?: ElementType;

  debugLabel?: string;
};

export function FluidBlock({
  area,
  children,
  className,
  as: Tag = 'div',
  debugLabel,
}: FluidBlockProps) {
  return (
    <Tag style={areaStyle(area, debugLabel)} className={cn('fe-block', className)}>
      {children}
    </Tag>
  );
}

export function FluidSpan({
  span,
  children,
  className,
  as: Tag = 'div',
}: {
  span: FluidColumn;
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag style={columnStyle(span)} className={cn('fe-span', className)}>
      {children}
    </Tag>
  );
}
