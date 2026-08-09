import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BleedImage } from '@/components/sections/BleedImage';
import { NextProject } from '@/components/work/NextProject';
import { ProjectGallery } from '@/components/work/ProjectGallery';
import { ProjectHeader } from '@/components/work/ProjectHeader';
import { ProjectSpec } from '@/components/work/ProjectSpec';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { getAdjacentProjects, getProject } from '@/lib/projects';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      images: [{ url: project.hero }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { next } = getAdjacentProjects(slug);

  return (
    <>
      <ProjectHeader project={project} />

      <BleedImage
        src={project.hero}
        alt={`${project.title} — ${project.location}`}
        priority
        height="88vh"
      />

      <ProjectSpec project={project} />
      <ProjectGallery images={project.gallery} />

      {next ? <NextProject project={next} /> : null}
    </>
  );
}
