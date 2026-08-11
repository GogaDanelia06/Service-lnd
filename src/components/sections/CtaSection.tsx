import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
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
        <FluidGrid className="gap-y-[2.6vmax]">
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SectionLabel index="05">{label}</SectionLabel>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SplitText as="h2" text={heading} className="display" />
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }} className="prose-utica">
            <Reveal delay={140}>
              <p className="text-[var(--muted)]">{body}</p>
            </Reveal>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
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
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
