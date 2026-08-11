'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/cn';
import { localeNames, locales, swapLocale, type Locale } from '@/i18n/config';

export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <div className="meta flex items-center gap-2" role="group" aria-label={label}>
      {locales.map((option, index) => (
        <span key={option} className="flex items-center gap-2">
          {index > 0 ? (
            <span aria-hidden className="opacity-30">
              /
            </span>
          ) : null}
          <Link
            href={swapLocale(pathname, option)}
            hrefLang={option}
            lang={option}
            aria-current={option === locale ? 'true' : undefined}
            title={localeNames[option]}
            className={cn(
              'transition-opacity duration-300',
              option === locale ? 'opacity-100' : 'opacity-45 hover:opacity-100',
            )}
          >
            {option === 'ka' ? 'ქარ' : 'ENG'}
          </Link>
        </span>
      ))}
    </div>
  );
}
