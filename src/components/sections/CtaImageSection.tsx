import Image from 'next/image';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { localePath, type Locale } from '@/i18n/config';

type Action = { label: string; href: string };

export function CtaImageSection({
  locale,
  heading,
  action,
  image,
  alt = '',
  theme = 'dark',
  label,
}: {
  locale: Locale;
  label: string;
  heading: string;
  action: Action;
  image: string;
  alt?: string;
  theme?: 'dark' | 'black';
}) {
  return (
    <Section height="custom" customHeightSteps={6} theme={theme} className="overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <SectionContent>
        <FluidGrid className="gap-y-[2.6vmax]">
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SectionLabel index="05">{label}</SectionLabel>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SplitText as="h2" text={heading} className="display" />
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <Reveal delay={160}>
              <ButtonLink href={localePath(locale, action.href)}>{action.label}</ButtonLink>
            </Reveal>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
