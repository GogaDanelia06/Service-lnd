import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';

export function WorkIntro({
  work,
  label,
}: {
  work: { heading: string; body: string };
  label: string;
}) {
  return (
    <Section height="small" theme="white">
      <SectionContent>
        <FluidGrid className="gap-y-[2.6vmax]">
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SectionLabel index="03">{label}</SectionLabel>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 16], mobile: [2, 10] }}>
            <h2 className="display text-[length:calc(2.4rem+1.6*var(--type-step))]">
              {work.heading}
            </h2>
            <Meta muted className="mt-4 block">
              {work.body}
            </Meta>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
