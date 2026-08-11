import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Common = { children: ReactNode; className?: string };

export function ButtonLink({ href, children, className }: Common & { href: string }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);

  if (external) {
    return (
      <a href={href} className={cn('btn', className)} rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn('btn', className)}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  className,
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn('btn', className)}>
      {children}
    </button>
  );
}
