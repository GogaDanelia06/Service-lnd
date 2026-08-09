import { projects, type Project } from '@/content/projects';

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}

export function specRows(project: Project) {
  return [
    { label: 'Client', value: project.client },
    { label: 'Location', value: project.location },
    { label: 'Programme', value: project.programme },
    { label: 'Area', value: project.area },
    { label: 'Completed', value: project.year },
    { label: 'Status', value: project.status },
  ];
}
