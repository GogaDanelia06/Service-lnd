import type { MetadataRoute } from 'next';

import { getContent, shared } from '@/content';
import { locales } from '@/i18n/config';

const ROUTES = ['', '/about', '/services', '/work', '/our-team', '/press', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    ...ROUTES.map((route) => ({
      url: `${shared.url}/${locale}${route}`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((alt) => [alt, `${shared.url}/${alt}${route}`])),
      },
    })),
    ...getContent(locale).legal.map((page) => ({
      url: `${shared.url}/${locale}/legal/${page.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
    ...getContent(locale).projects.map((project) => ({
      url: `${shared.url}/${locale}/work/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]);
}
