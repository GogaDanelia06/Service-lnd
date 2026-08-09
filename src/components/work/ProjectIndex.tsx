import Image from 'next/image';
import Link from 'next/link';

import { Arrow, Meta } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import type { Project } from '@/content/projects';

type Slot = {

  col: number;
  span: number;
  ratio: string;

  offset: number;
};

const SLOTS: Slot[] = [
  { col: 1, span: 13, ratio: '4 / 3', offset: 0 },
  { col: 16, span: 9, ratio: '3 / 4', offset: 11 },
  { col: 3, span: 12, ratio: '4 / 3', offset: 0 },
  { col: 17, span: 8, ratio: '3 / 4', offset: 9 },
];

export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ul className="site-pad mx-auto grid w-full max-w-[var(--site-max-width)] grid-cols-1 gap-y-20 fe:grid-cols-24 fe:gap-x-[var(--fe-gap)] fe:gap-y-[9vw]">
      {projects.map((project, index) => {
        const slot = SLOTS[index % SLOTS.length]!;

        const sizes = `(max-width: 767px) 88vw, ${Math.ceil((slot.span / 24) * 92)}vw`;

        return (
          <li
            key={project.slug}
            className="fe:[grid-column:var(--col)/span_var(--span)] fe:mt-[var(--offset)]"
            style={
              {
                '--col': slot.col,
                '--span': slot.span,
                '--offset': `${slot.offset}vw`,
              } as React.CSSProperties
            }
          >
            <Reveal>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="media media--zoom" style={{ aspectRatio: slot.ratio }}>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes={sizes}
                    priority={index < 2}
                    className="object-cover"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-[var(--rule)] pt-4">
                  <Meta muted>
                    {project.index} / {String(projects.length).padStart(2, '0')}
                  </Meta>
                  <Meta muted className="text-right">
                    {project.year} · {project.type}
                  </Meta>
                </div>

                <h3 className="mt-[0.45em] flex items-center gap-3">
                  <span className="underline-swipe group-hover:[background-size:100%_1px]">
                    {project.title}
                  </span>
                  <Arrow className="translate-y-[0.05em] opacity-0 transition-all duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-1 group-hover:opacity-60" />
                </h3>

                <p className="mt-[0.3em] max-w-[42ch] text-[var(--muted)]">{project.summary}</p>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
