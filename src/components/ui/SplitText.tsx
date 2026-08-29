'use client';

import { Fragment, useEffect, useRef, type ElementType } from 'react';

import { cn } from '@/lib/cn';
import { useReveal } from '@/lib/useReveal';

export function SplitText({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const phase = useReveal({ ref, delay });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const words = node.querySelectorAll<HTMLElement>('.split-word');
      let line = -1;
      let previousTop = Number.NaN;

      for (const word of words) {
        if (word.offsetTop !== previousTop) {
          previousTop = word.offsetTop;
          line += 1;
        }
        word.style.setProperty('--line', String(line));
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref} data-split={phase === 'static' ? undefined : phase} className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={cn('split-word')}>
            <span className="split-inner">{word}</span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
