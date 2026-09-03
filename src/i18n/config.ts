export const locales = ['en', 'ka'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ka';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ka: 'ქართული',
};

export const localeShort: Record<Locale, string> = {
  en: 'ENG',
  ka: 'GEO',
};

export function otherLocale(locale: Locale): Locale {
  return locales.find((option) => option !== locale) ?? locale;
}

export const htmlLang: Record<Locale, string> = {
  en: 'en',
  ka: 'ka',
};

export const ogLocale: Record<Locale, string> = {
  en: 'en_GB',
  ka: 'ka_GE',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(locale: Locale, href: string): string {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href;
  }
  return href === '/' ? `/${locale}` : `/${locale}${href}`;
}

export function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && isLocale(segments[0]!)) segments[0] = next;
  else segments.unshift(next);
  return `/${segments.join('/')}`;
}
