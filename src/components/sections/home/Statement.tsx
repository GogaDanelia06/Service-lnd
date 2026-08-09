import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { facts, site } from '@/content/site';

export function Statement() {
  return (
    <Section height="small" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid>
          <FluidBlock debugLabel="home/label" area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}>
            <SectionLabel index="01">Work</SectionLabel>
          </FluidBlock>

          <FluidBlock
            debugLabel="home/statement"
            area={{ desktop: [3, 2, 9, 22], mobile: [3, 2, 9, 10] }}
          >
            <SplitText as="h1" text={site.tagline} className="display" />
          </FluidBlock>

          <FluidBlock
            debugLabel="home/facts"
            area={{ desktop: [10, 2, 12, 22], mobile: [10, 2, 16, 10] }}
          >
            <Reveal delay={260}>
              <dl className="flex flex-col gap-3 border-t border-[var(--rule)] pt-5 fe:flex-row fe:gap-12">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex gap-3">
                    <Meta as="dt" muted>
                      {fact.label}
                    </Meta>
                    <Meta as="dd">{fact.value}</Meta>
                  </div>
                ))}
              </dl>
            </Reveal>
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
