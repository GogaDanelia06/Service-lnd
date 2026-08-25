import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';
import { localePath, type Locale } from '@/i18n/config';

type Action = { label: string; href: string };

export function CtaSection({
  locale,
  heading,
  body,
  action,
}: {
  locale: Locale;
  heading: string;
  body: string;
  action: Action;
}) {
  return (
    <Section height="medium" theme="dark">
      <SectionContent>
        <FluidGrid className="gap-y-[2.4vmax]">
          <FluidSpan span={{ desktop: [2, 14], mobile: [2, 10] }} className="prose-utica">
            <h2>{heading}</h2>
            <p className="mt-[0.8em]">{body}</p>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 6], mobile: [2, 6] }}>
            <ButtonLink href={localePath(locale, action.href)} className="btn-stretch btn-reverse">
              {action.label}
            </ButtonLink>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
