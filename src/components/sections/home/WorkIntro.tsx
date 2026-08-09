import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { home } from '@/content/pages';

export function WorkIntro() {
  return (
    <Section height="small" theme="white">
      <SectionContent>
        <FluidGrid>
          <FluidBlock debugLabel="work/label" area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}>
            <SectionLabel index="03">Selected Work</SectionLabel>
          </FluidBlock>

          <FluidBlock
            debugLabel="work/heading"
            area={{ desktop: [3, 2, 6, 16], mobile: [3, 2, 7, 10] }}
          >
            <h2 className="display text-[length:calc(2.4rem+1.6*var(--type-step))]">
              {home.work.heading}
            </h2>
            <Meta muted className="mt-4 block">
              {home.work.body}
            </Meta>
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
