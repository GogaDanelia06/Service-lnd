import Link from 'next/link';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import type { Project } from '@/content/types';
import { localePath, type Locale } from '@/i18n/config';
import { mtavruli } from '@/lib/mtavruli';

export function NextProject({
  locale,
  project,
  label,
}: {
  locale: Locale;
  project: Project;
  label: string;
}) {
  return (
    <Section height="small" theme="white">
      <SectionContent>
        <FluidGrid>
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <div className="flex justify-end">
              <Link
                href={localePath(locale, `/work/${project.slug}`)}
                aria-label={`${label}: ${project.title}`}
                className="next-project inline-flex items-center gap-4"
              >
                <h2 className="[--fs:2.2]">{mtavruli(project.title)}</h2>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  focusable="false"
                  className="h-[0.62em] w-[0.62em] shrink-0 text-[length:calc(2.2rem+1.2*var(--type-step))]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M9 4l8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
