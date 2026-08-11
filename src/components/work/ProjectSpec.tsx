import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import type { Project } from '@/content/types';
import { specRows } from '@/lib/projects';

export function ProjectSpec({
  project,
  labels,
}: {
  project: Project;
  labels: Record<string, string>;
}) {
  return (
    <Section height="medium" theme="tint">
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="project/spec"
            area={{ desktop: [1, 2, 12, 10], mobile: [1, 2, 16, 10] }}
          >
            <Reveal>
              <dl className="flex flex-col">
                {specRows(project, labels).map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-6 border-t border-[var(--rule)] py-3.5"
                  >
                    <Meta as="dt" muted className="shrink-0">
                      {row.label}
                    </Meta>
                    <Meta as="dd" className="text-right">
                      {row.value}
                    </Meta>
                  </div>
                ))}
              </dl>
            </Reveal>
          </FluidBlock>

          <FluidBlock
            debugLabel="project/body"
            area={{ desktop: [1, 12, 12, 26], mobile: [18, 2, 40, 10] }}
            className="prose-utica"
          >
            <Reveal delay={120}>
              {project.body.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={index === 0 ? 'lead' : 'text-[var(--muted)]'}
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
