import type { MetadataRoute } from 'next';

import { projects } from '@/content/projects';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/our-team', '/press', '/contact'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
