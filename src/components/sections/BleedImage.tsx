'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { Meta } from '@/components/ui/Meta';

export function BleedImage({
  src,
  alt,
  caption,
  priority = false,
  height = '100vh',
  theme = 'black',
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  height?: string;
  theme?: 'black' | 'dark';
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const update = () => {
      const section = ref.current;
      const layer = inner.current;
      if (!section || !layer) return;

      const box = section.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;

      const progress = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
      layer.style.transform = `translate3d(0, ${(progress * 8).toFixed(2)}%, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      data-theme={theme}
      style={{ height }}
      className="section-shell relative overflow-hidden"
    >
      <div
        ref={inner}

        className="absolute inset-x-0 -inset-y-[6%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority={priority}
          className="object-cover"
        />
      </div>

      <div aria-hidden className="absolute inset-0 bg-black/15" />

      {children ? <div className="relative">{children}</div> : null}

      {caption ? (
        <div className="site-pad absolute inset-x-0 bottom-[var(--header-pad-y)]">
          <Meta muted className="text-[var(--fg)] opacity-70">
            {caption}
          </Meta>
        </div>
      ) : null}
    </section>
  );
}
