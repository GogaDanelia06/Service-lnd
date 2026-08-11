import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

import { fontClass } from '@/app/fonts';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Grain } from '@/components/ui/Grain';
import { getContent, shared } from '@/content';
import { htmlLang, isLocale, locales, ogLocale, type Locale } from '@/i18n/config';

import '@/app/globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site } = getContent(locale);

  return {
    metadataBase: new URL(shared.url),
    title: { default: site.name, template: `%s — ${site.name}` },
    description: site.description,
    openGraph: {
      type: 'website',
      locale: ogLocale[locale],
      siteName: site.name,
      title: site.name,
      description: site.description,
      url: `${shared.url}/${locale}`,
    },
    twitter: { card: 'summary_large_image' },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
    },
  };
}

export const viewport: Viewport = { themeColor: '#f6f4ef', colorScheme: 'light' };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale as Locale);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ArchitecturalService',
    name: content.site.name,
    description: content.site.description,
    url: `${shared.url}/${locale}`,
    telephone: shared.phone,
    email: shared.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.site.address.street,
      addressLocality: content.site.address.city,
      addressCountry: content.site.address.country,
    },
  };

  return (
    <html lang={htmlLang[locale]} className={fontClass}>
      <body>
        <a href="#main" className="skip-link">
          {content.ui.skip}
        </a>

        <SiteHeader locale={locale} nav={content.nav} site={content.site} ui={content.ui} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} content={content} />
        <Grain />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
