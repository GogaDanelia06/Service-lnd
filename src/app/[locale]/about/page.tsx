import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaImageSection } from '@/components/sections/CtaImageSection';
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
  const { about } = getContent(locale);

  return (
    <>
      <Section height="medium" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid className="gap-y-[2.4vmax]">
            <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }}>
              <h2>{about.heading}</h2>
            </FluidSpan>

            <FluidSpan span={{ desktop: [12, 26], mobile: [2, 10] }} className="prose-utica">
              {about.body.map((paragraph: string) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <CtaImageSection
        locale={locale}
        heading={about.cta.heading}
        action={about.cta.action}
        image={about.cta.image}
        alt={about.cta.alt}
      />
    </>
  );
}
