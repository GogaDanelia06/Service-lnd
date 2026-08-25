import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';
import { localePath, type Locale } from '@/i18n/config';

type Action = { label: string; href: string };

export function CtaImageSection({
  locale,
  heading,
  action,
  image,
  alt = '',
  theme = 'dark',
}: {
  locale: Locale;
  heading: string;
  action: Action;
  image: string;
  alt?: string;
  theme?: 'dark' | 'black';
}) {
  return (
    <Section
      height="custom"
      customHeightSteps={10}
      theme={theme}
      background={{ src: image, alt, overlay: 0.15 }}
    >
      <SectionContent>
        <FluidGrid className="gap-y-[2.4vmax]">
          <FluidSpan span={{ desktop: [2, 14], mobile: [2, 10] }}>
            <h2>{heading}</h2>
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
