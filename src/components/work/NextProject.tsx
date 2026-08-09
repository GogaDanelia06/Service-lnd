import Image from 'next/image';
import Link from 'next/link';

import { Arrow, Meta } from '@/components/ui/Meta';
import type { Project } from '@/content/projects';

export function NextProject({ project }: { project: Project }) {
  return (
    <section data-theme="black" className="section-shell group relative overflow-hidden">
      <Link href={`/work/${project.slug}`} className="block">
        <div className="absolute inset-0">
          <Image
            src={project.hero}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-55 transition-[transform,opacity] duration-[1200ms] ease-[var(--ease-out-quint)] group-hover:scale-[1.03] group-hover:opacity-70"
          />
        </div>

        <div className="site-pad relative py-[10vmax]">
          <Meta muted className="block">
            Next project — {project.index}
          </Meta>

          <h2 className="display mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{project.title}</span>
            <Arrow className="h-[0.5em] w-[0.5em] transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-3" />
          </h2>

          <Meta muted className="mt-6 block">
            {project.year} · {project.location} · {project.type}
          </Meta>
        </div>
      </Link>
    </section>
  );
}
