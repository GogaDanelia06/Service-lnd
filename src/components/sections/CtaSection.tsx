import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { shared } from '@/content';
import { localePath, type Locale } from '@/i18n/config';

type Action = { label: string; href: string };

export function CtaSection({
  locale,
  heading,
  body,
  action,
  label,
}: {
  locale: Locale;
  heading: string;
  body: string;
  action: Action;
  label: string;
}) {
  return (
    <Section height="medium" theme="dark">
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="cta/label"
            area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
          >
            <SectionLabel index="05">{label}</SectionLabel>
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
                <ButtonLink href={localePath(locale, action.href)}>{action.label}</ButtonLink>
                <Meta muted>
                  <a href={`mailto:${shared.email}`} className="underline-swipe">
                    {shared.email}
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
