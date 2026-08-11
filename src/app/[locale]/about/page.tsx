import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
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
  const { about, ui, stats } = getContent(locale);

  return (
    <>
      <Section height="medium" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid className="gap-y-[3.2vmax]">
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <SectionLabel index="01">{ui.sections.about}</SectionLabel>
            </FluidSpan>

            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <SplitText as="h1" text={about.heading} className="display" />
            </FluidSpan>

            <FluidSpan span={{ desktop: [2, 13], mobile: [2, 10] }}>
              <Reveal>
                <div className="media aspect-[4/3]">
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
            </FluidSpan>

            <FluidSpan span={{ desktop: [14, 26], mobile: [2, 10] }} className="prose-utica">
              <Reveal delay={140}>
                {about.body.map((paragraph: string) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </Reveal>
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="small" theme="tint">
        <SectionContent>
          <FluidGrid className="gap-y-[2.4vmax]">
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <SectionLabel index="02">{ui.byTheNumbers}</SectionLabel>
            </FluidSpan>
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <StatRow stats={stats} />
            </FluidSpan>
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
