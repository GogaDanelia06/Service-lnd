import { getContent } from '@/content';
import type { Project } from '@/content/types';
import type { Locale } from '@/i18n/config';

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getContent(locale).projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(locale: Locale, slug: string) {
  const list = getContent(locale).projects;
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? list[index - 1] : list[list.length - 1],
    next: index < list.length - 1 ? list[index + 1] : list[0],
  };
}

export function specRows(project: Project, labels: Record<string, string>) {
  return [
    { label: labels.client!, value: project.client },
    { label: labels.location!, value: project.location },
    { label: labels.programme!, value: project.programme },
    { label: labels.area!, value: project.area },
    { label: labels.completed!, value: project.year },
    { label: labels.status!, value: project.status },
  ];
}
