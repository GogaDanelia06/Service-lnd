import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';

type Fact = { label: string; value: string };

const HERO_SCRIM =
  'linear-gradient(100deg, rgba(20,21,26,0.78) 0%, rgba(20,21,26,0.6) 60%, rgba(20,21,26,0.22) 88%, rgba(20,21,26,0.06) 100%)';

export function Statement({
  site,
  facts,
  label,
  background,
}: {
  site: { tagline: string };
  facts: Fact[];
  label: string;
  background: { src: string; alt: string };
}) {
  return (
    <Section
      height="hero"
      theme="black"
      offsetHeader
      background={{
        src: background.src,
        alt: background.alt,
        overlay: 0.12,
        scrim: HERO_SCRIM,
        priority: true,
      }}
    >
      <SectionContent>
        <FluidGrid>
          <FluidBlock debugLabel="home/label" area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}>
            <SectionLabel index="01">{label}</SectionLabel>
          </FluidBlock>

          <FluidBlock
            debugLabel="home/statement"
            area={{ desktop: [3, 2, 9, 22], mobile: [3, 2, 9, 10] }}
          >
            <SplitText as="h1" text={site.tagline} className="display display--hero" />
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
