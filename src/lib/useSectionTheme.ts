'use client';

import { useEffect, useRef, useState } from 'react';

export type SectionTheme = 'white' | 'dark' | 'black';

export function useSectionTheme(key: string) {
  const [theme, setTheme] = useState<SectionTheme>('white');
  const [lifted, setLifted] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    const sample = () => {
      const main = document.querySelector('main');
      if (!main) return;

      const probe = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.6;
      let found: SectionTheme = 'white';

      for (const section of main.querySelectorAll<HTMLElement>('[data-theme]')) {
        const box = section.getBoundingClientRect();
        if (box.top <= probe && box.bottom > probe) {
          found = (section.dataset.theme as SectionTheme) ?? 'white';
        }
      }

      setTheme(found);
      setLifted(window.scrollY > 24);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(sample);
    };

    sample();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', sample);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', sample);
    };
  }, [key]);

  return { theme, lifted };
}
