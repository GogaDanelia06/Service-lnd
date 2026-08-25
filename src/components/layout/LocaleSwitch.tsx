'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { localeNames, localeShort, otherLocale, swapLocale, type Locale } from '@/i18n/config';

export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const next = otherLocale(locale);

  return (
    <Link
      href={swapLocale(pathname, next)}
      hrefLang={next}
      aria-label={`${label}: ${localeNames[next]}`}
      title={localeNames[next]}
      className="underline-swipe inline-block font-light"
    >
      {localeShort[next]}
    </Link>
  );
}
