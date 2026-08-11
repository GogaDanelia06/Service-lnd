import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { StatRow } from '@/components/sections/StatRow';
import { SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';

export function Practice({
  practice,
  label,
  stats,
}: {
  practice: { heading: string; body: string };
  label: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <Section height="medium" theme="tint">
      <SectionContent>
        <FluidGrid className="gap-y-[2.6vmax]">
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SectionLabel index="02">{label}</SectionLabel>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 17], mobile: [2, 10] }}>
            <SplitText
              as="h2"
              text={practice.heading}
              className="text-[length:calc(2.1rem+1.5*var(--type-step))] leading-[1.22] font-[family-name:var(--font-heading)] font-medium tracking-[-0.018em]"
            />
          </FluidSpan>

          <FluidSpan span={{ desktop: [18, 26], mobile: [2, 10] }} className="prose-utica">
            <Reveal delay={140}>
              <p className="text-[var(--muted)]">{practice.body}</p>
            </Reveal>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <StatRow stats={stats} />
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
