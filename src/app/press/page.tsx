import type { Metadata } from 'next';

import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaImageSection } from '@/components/sections/CtaSection';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { press } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Press',
  description: 'Selected writing about Utica.',
  alternates: { canonical: '/press' },
};

export default function PressPage() {
  return (
    <>
      <Section height="small" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid>
            <FluidBlock
              debugLabel="press/label"
              area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
            >
              <SectionLabel index="01">Press</SectionLabel>
            </FluidBlock>
            <FluidBlock
              debugLabel="press/heading"
              area={{ desktop: [3, 2, 8, 20], mobile: [3, 2, 9, 10] }}
            >
              <SplitText as="h1" text="What people write about the work." className="display" />
            </FluidBlock>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="small" theme="white">
        <SectionContent>
          <FluidGrid>
            {press.quotes.map((entry, index) => (
              <FluidBlock
                key={entry.quote.slice(0, 32)}
                debugLabel={`press/quote-${index}`}
                area={{
                  desktop: [1 + index * 9, 2, 9 + index * 9, 26],
                  mobile: [1 + index * 13, 2, 13 + index * 13, 10],
                }}
              >
                <Reveal delay={index * 80}>
                  <figure className="grid gap-6 border-t border-[var(--rule)] pt-6 fe:grid-cols-[10rem_1fr] fe:gap-[var(--fe-gap)]">
                    <div className="flex items-baseline gap-4 fe:flex-col fe:gap-2">
                      <Meta muted>({String(index + 1).padStart(2, '0')})</Meta>
                      <Meta muted>{entry.year}</Meta>
                    </div>

                    <div>
                      <blockquote>
                        <p className="text-[length:calc(1.5rem+1*var(--type-step))] leading-[1.45] font-[family-name:var(--font-heading)] font-medium tracking-[-0.012em]">
                          &ldquo;{entry.quote}&rdquo;
                        </p>
                      </blockquote>
                      <figcaption className="mt-6">
                        <Meta muted>— {entry.source}</Meta>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
              </FluidBlock>
            ))}
          </FluidGrid>
        </SectionContent>
      </Section>

      <CtaImageSection
        heading={press.cta.heading}
        action={press.cta.action}
        image={press.cta.image}
        alt="Dense city blocks seen from above"
        theme="black"
      />
    </>
  );
}
