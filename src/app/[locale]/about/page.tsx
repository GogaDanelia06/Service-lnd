import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaImageSection } from '@/components/sections/CtaImageSection';
import { StatRow } from '@/components/sections/StatRow';
import { SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { about, ui } = getContent(locale);
  return {
    title: ui.sections.about,
    description: about.body[0],
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { about, ui } = getContent(locale);

  return (
    <>
      <Section height="medium" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid>
            <FluidBlock
              debugLabel="about/label"
              area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
            >
              <SectionLabel index="01">{ui.sections.about}</SectionLabel>
            </FluidBlock>

            <FluidBlock
              debugLabel="about/heading"
              area={{ desktop: [3, 2, 9, 20], mobile: [3, 2, 11, 10] }}
            >
              <SplitText as="h1" text={about.heading} className="display" />
            </FluidBlock>

            <FluidBlock
              debugLabel="about/body"
              area={{ desktop: [11, 14, 22, 26], mobile: [13, 2, 34, 10] }}
              className="prose-utica"
            >
              <Reveal delay={140}>
                {about.body.map((paragraph: string) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </Reveal>
            </FluidBlock>

            <FluidBlock
              debugLabel="about/image"
              area={{ desktop: [11, 2, 24, 13], mobile: [36, 2, 48, 10] }}
            >
              <Reveal className="h-full">
                <div className="media h-full">
                  <Image
                    src={about.image.src}
                    alt={about.image.alt}
                    fill
                    sizes="(max-width: 767px) 88vw, 45vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </FluidBlock>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="small" theme="white">
        <SectionContent>
          <FluidGrid>
            <FluidBlock
              debugLabel="about/stats-label"
              area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
            >
              <SectionLabel index="02">{ui.byTheNumbers}</SectionLabel>
            </FluidBlock>
            <FluidBlock
              debugLabel="about/stats"
              area={{ desktop: [3, 2, 8, 26], mobile: [3, 2, 22, 10] }}
            >
              <StatRow stats={getContent(locale).stats} />
            </FluidBlock>
          </FluidGrid>
        </SectionContent>
      </Section>

      <CtaImageSection
        locale={locale}
        label={ui.sections.contact}
        heading={about.cta.heading}
        action={about.cta.action}
        image={about.cta.image}
        alt={about.cta.alt}
      />
    </>
  );
}
