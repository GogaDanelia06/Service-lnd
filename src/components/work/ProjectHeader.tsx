import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import type { Project } from '@/content/types';

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <Section height="small" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid className="gap-y-[2.6vmax]">
          <FluidSpan span={{ desktop: [2, 20], mobile: [2, 10] }}>
            <SplitText as="h1" text={project.title} className="display" />
            <Reveal delay={200}>
              <p className="mt-[0.6em] max-w-[46ch] text-[length:calc(1.25rem+0.5*var(--type-step))] leading-[1.5] text-[var(--muted)]">
                {project.summary}
              </p>
            </Reveal>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
