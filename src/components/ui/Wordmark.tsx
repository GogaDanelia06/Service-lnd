import Link from 'next/link';

import { cn } from '@/lib/cn';
import { localePath, type Locale } from '@/i18n/config';

export function Wordmark({
  locale,
  name,
  label,
  className,
}: {
  locale: Locale;
  name: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={localePath(locale, '/')}
      aria-label={`${name} — ${label}`}
      className={cn(
        'relative z-30 font-[family-name:var(--font-heading)] text-[length:var(--logo-size)] leading-[1.4] font-medium tracking-[-0.02em]',
        className,
      )}
    >
      {name}
    </Link>
  );
}
