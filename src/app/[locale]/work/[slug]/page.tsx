import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BleedImage } from '@/components/sections/BleedImage';
import { NextProject } from '@/components/work/NextProject';
import { ProjectGallery } from '@/components/work/ProjectGallery';
import { ProjectHeader } from '@/components/work/ProjectHeader';
import { ProjectSpec } from '@/components/work/ProjectSpec';
import { getContent, shared } from '@/content';
import { isLocale, locales } from '@/i18n/config';
import { getAdjacentProjects, getProject } from '@/lib/projects';

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getContent(locale).projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(locale, slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/${locale}/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${getContent(locale).site.name}`,
      description: project.summary,
      images: [{ url: `${shared.url}${project.hero}` }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = getProject(locale, slug);
  if (!project) notFound();

  const { ui } = getContent(locale);
  const { next } = getAdjacentProjects(locale, slug);

  return (
    <>
      <ProjectHeader project={project} />

      <BleedImage
        src={project.hero}
        alt={`${project.title} — ${project.location}`}
        priority
        height="88vh"
      />

      <ProjectSpec project={project} labels={ui.spec} />
      <ProjectGallery images={project.gallery} />

      {next ? <NextProject locale={locale} project={next} label={ui.nextProject} /> : null}
    </>
  );
}
