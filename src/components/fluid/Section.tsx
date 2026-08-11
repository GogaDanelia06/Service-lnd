import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type SectionHeight = 'small' | 'medium' | 'large' | 'hero' | 'custom';
export type SectionTheme = 'white' | 'tint' | 'dark' | 'black';

const HEIGHT: Record<Exclude<SectionHeight, 'custom'>, { pad: string; minHeight: string }> = {
  small: { pad: '3.3vmax', minHeight: '33vh' },
  medium: { pad: '6.6vmax', minHeight: '66vh' },
  large: { pad: '10vmax', minHeight: '100vh' },
  hero: { pad: '3.4vmax', minHeight: '100svh' },
};

export type BackgroundImage = {
  src: string;
  alt?: string;

  overlay?: number;
  scrim?: string;
  priority?: boolean;

  position?: string;
};

export type SectionProps = {
  children?: ReactNode;
  height?: SectionHeight;

  customHeightSteps?: number;
  theme?: SectionTheme;
  background?: BackgroundImage;

  offsetHeader?: boolean;
  className?: string;
  id?: string;
  as?: 'section' | 'header' | 'footer';
};

export function Section({
  children,
  height = 'medium',
  customHeightSteps = 10,
  theme = 'white',
  background,
  offsetHeader = false,
  className,
  id,
  as: Tag = 'section',
}: SectionProps) {
  const metrics =
    height === 'custom'
      ? { pad: '10vmax', minHeight: `${customHeightSteps * 10}vh` }
      : HEIGHT[height];

  const style: CSSProperties = {
    '--pad': metrics.pad,
    minHeight: metrics.minHeight,
    paddingTop: offsetHeader ? 'var(--header-height)' : undefined,
  } as CSSProperties;

  return (
    <Tag id={id} data-theme={theme} style={style} className={cn('section-shell', className)}>
      {background ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={background.src}
            alt={background.alt ?? ''}
            fill
            priority={background.priority}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: background.position ?? '50% 50%' }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-black"
            style={{ opacity: background.overlay ?? 0.15 }}
          />
          {background.scrim ? (
            <div aria-hidden className="absolute inset-0" style={{ background: background.scrim }} />
          ) : null}
        </div>
      ) : null}

      {children}
    </Tag>
  );
}

export function SectionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {

  return <div className={cn('relative py-[var(--pad)]', className)}>{children}</div>;
}
