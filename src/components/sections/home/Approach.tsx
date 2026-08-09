import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { home } from '@/content/pages';

export function Approach() {
  return (
    <Section height="medium" theme="white">
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="approach/label"
            area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
          >
            <SectionLabel index="04">Approach</SectionLabel>
          </FluidBlock>

          {home.approach.map((item, index) => {
            const col = 2 + index * 8;
            return (
              <FluidBlock
                key={item.title}
                debugLabel={`approach/${index}`}
                area={{
                  desktop: [3, col, 11, col + 7],
                  mobile: [3 + index * 9, 2, 11 + index * 9, 10],
                }}
                className="prose-utica"
              >
                <Reveal delay={index * 110}>
                  <div className="border-t border-[var(--rule)] pt-5">
                    <Meta muted>{String(index + 1).padStart(2, '0')}</Meta>
                    <h3 className="mt-4 text-[length:calc(1.5rem+0.8*var(--type-step))] leading-[1.3]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[var(--muted)]">{item.body}</p>
                  </div>
                </Reveal>
              </FluidBlock>
            );
          })}
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
