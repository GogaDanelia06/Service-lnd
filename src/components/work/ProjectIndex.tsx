import Image from 'next/image';
import Link from 'next/link';

import type { Project } from '@/content/types';
import { localePath, type Locale } from '@/i18n/config';

export function ProjectIndex({ locale, projects }: { locale: Locale; projects: Project[] }) {
  return (
    <ul className="grid grid-cols-1 gap-10 px-[var(--site-gutter)] fe:grid-cols-2">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <Link href={localePath(locale, `/work/${project.slug}`)} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-rule)]">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 767px) 88vw, 46vw"
                priority={index < 2}
                className="object-cover"
              />
            </div>
            <h4 className="mt-[0.9em]">
              <span className="underline-swipe group-hover:[background-size:100%_1px]">
                {project.title}
              </span>
            </h4>
          </Link>
        </li>
      ))}
    </ul>
  );
}
