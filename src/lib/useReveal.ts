'use client';

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

export type RevealPhase = 'static' | 'pending' | 'in';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function useReveal({
  ref,
  threshold = 0.9,
  delay = 0,
  pollMs = 800,
}: {
  ref: RefObject<HTMLElement | null>;

  threshold?: number;
  delay?: number;
  pollMs?: number;
}): RevealPhase {
  const [phase, setPhase] = useState<RevealPhase>('static');
  const settled = useRef(false);
  const reduced = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reduced.current = true;
      settled.current = true;
      return;
    }
    setPhase('pending');
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced.current || settled.current) return;

    const inView = () => node.getBoundingClientRect().top < window.innerHeight * threshold;

    let teardown = () => {};
    const enter = () => {
      if (settled.current) return;
      settled.current = true;
      window.setTimeout(() => setPhase('in'), delay);
      teardown();
    };

    if (inView()) {
      const raf = requestAnimationFrame(enter);
      const fallback = window.setTimeout(enter, 250);
      return () => {
        cancelAnimationFrame(raf);
        window.clearTimeout(fallback);
      };
    }

    const check = () => {
      if (inView()) enter();
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) enter();
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );
    intersection.observe(node);

    const layout = new ResizeObserver(check);
    layout.observe(document.documentElement);

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    const failsafe = window.setInterval(check, pollMs);

    teardown = () => {
      intersection.disconnect();
      layout.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      window.clearInterval(failsafe);
    };

    return () => teardown();
  }, [ref, threshold, delay, pollMs]);

  return phase;
}
