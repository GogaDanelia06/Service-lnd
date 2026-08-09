import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { StatRow } from '@/components/sections/StatRow';
import { SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { home } from '@/content/pages';

export function Practice() {
  return (
    <Section height="medium" theme="white">
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="practice/label"
            area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
          >
            <SectionLabel index="02">Practice</SectionLabel>
          </FluidBlock>

          <FluidBlock
            debugLabel="practice/heading"
            area={{ desktop: [3, 2, 9, 17], mobile: [3, 2, 12, 10] }}
          >
            <SplitText
              as="h2"
              text={home.practice.heading}
              className="text-[length:calc(2.1rem+1.5*var(--type-step))] leading-[1.22] font-[family-name:var(--font-heading)] font-medium tracking-[-0.018em]"
            />
          </FluidBlock>

          <FluidBlock
            debugLabel="practice/body"
            area={{ desktop: [4, 18, 9, 26], mobile: [13, 2, 20, 10] }}
            className="prose-utica"
          >
            <Reveal delay={140}>
              <p className="text-[var(--muted)]">{home.practice.body}</p>
            </Reveal>
          </FluidBlock>

          <FluidBlock
            debugLabel="practice/stats"
            area={{ desktop: [11, 2, 16, 26], mobile: [22, 2, 40, 10] }}
          >
            <StatRow />
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
