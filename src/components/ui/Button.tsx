import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Arrow } from '@/components/ui/Meta';
import { cn } from '@/lib/cn';

type Common = { children: ReactNode; className?: string };

export function ButtonLink({
  href,
  children,
  className,
  arrow = true,
}: Common & { href: string; arrow?: boolean }) {
  const content = (
    <>
      {children}
      {arrow ? <Arrow className="btn__arrow" /> : null}
    </>
  );
  const external = /^(https?:|mailto:|tel:)/.test(href);

  if (external) {
    return (
      <a href={href} className={cn('btn', className)} rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn('btn', className)}>
      {content}
    </Link>
  );
}

export function Button({
  children,
  className,
  arrow = false,
  ...props
}: Common & { arrow?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn('btn', className)}>
      {children}
      {arrow ? <Arrow className="btn__arrow" /> : null}
    </button>
  );
}
