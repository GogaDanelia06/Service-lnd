import Image from 'next/image';

import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { site } from '@/content/site';

type Action = { label: string; href: string };

export function CtaSection({
  heading,
  body,
  action,
}: {
  heading: string;
  body: string;
  action: Action;
}) {
  return (
    <Section height="medium" theme="dark">
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="cta/label"
            area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
          >
            <SectionLabel index="05">Contact</SectionLabel>
          </FluidBlock>

          <FluidBlock
            debugLabel="cta/heading"
            area={{ desktop: [3, 2, 7, 18], mobile: [3, 2, 8, 10] }}
          >
            <SplitText as="h2" text={heading} className="display" />
          </FluidBlock>

          <FluidBlock
            debugLabel="cta/body"
            area={{ desktop: [8, 2, 12, 12], mobile: [9, 2, 16, 10] }}
            className="prose-utica"
          >
            <Reveal delay={140}>
              <p className="text-[var(--muted)]">{body}</p>
            </Reveal>
          </FluidBlock>

          <FluidBlock
            debugLabel="cta/action"
            area={{ desktop: [8, 18, 10, 26], mobile: [17, 2, 20, 10] }}
          >
            <Reveal delay={200}>
              <div className="flex flex-col items-start gap-6 fe:items-end">
                <ButtonLink href={action.href}>{action.label}</ButtonLink>
                <Meta muted>
                  <a href={`mailto:${site.email}`} className="underline-swipe">
                    {site.email}
                  </a>
                </Meta>
              </div>
            </Reveal>
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}

export function CtaImageSection({
  heading,
  action,
  image,
  alt = '',
  theme = 'dark',
}: {
  heading: string;
  action: Action;
  image: string;
  alt?: string;
  theme?: 'dark' | 'black';
}) {
  return (
    <Section height="custom" customHeightSteps={9} theme={theme} className="overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="cta-image/heading"
            area={{ desktop: [4, 2, 8, 18], mobile: [4, 2, 9, 10] }}
          >
            <SplitText as="h2" text={heading} className="display" />
          </FluidBlock>

          <FluidBlock
            debugLabel="cta-image/action"
            area={{ desktop: [9, 2, 11, 10], mobile: [10, 2, 13, 10] }}
          >
            <Reveal delay={160}>
              <ButtonLink href={action.href}>{action.label}</ButtonLink>
            </Reveal>
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
