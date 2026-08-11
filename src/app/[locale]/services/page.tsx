import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaSection } from '@/components/sections/CtaSection';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';

type Approach = { title: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site, ui } = getContent(locale);
  return {
    title: ui.sections.services,
    description: site.description,
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { home, ui } = getContent(locale);

  return (
    <>
      <Section height="medium" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid className="gap-y-[2.4vmax]">
            <FluidSpan span={{ desktop: [2, 20], mobile: [2, 10] }}>
              <h1>{home.practice.heading}</h1>
            </FluidSpan>

            <FluidSpan span={{ desktop: [2, 14], mobile: [2, 10] }} className="prose-utica">
              <p>{home.practice.body}</p>
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="medium" theme="white">
        <SectionContent>
          <FluidGrid className="gap-y-[2.4vmax]">
            <FluidSpan span={{ desktop: [2, 20], mobile: [2, 10] }}>
              <h2>{ui.sections.approach}</h2>
            </FluidSpan>

            {home.approach.map((entry: Approach) => (
              <FluidSpan
                key={entry.title}
                span={{ desktop: [2, 12], mobile: [2, 10] }}
                className="prose-utica"
              >
                <h3>{entry.title}</h3>
                <p className="mt-[0.8em]">{entry.body}</p>
              </FluidSpan>
            ))}
          </FluidGrid>
        </SectionContent>
      </Section>

      <CtaSection
        locale={locale}
        heading={home.cta.heading}
        body={home.cta.body}
        action={home.cta.action}
      />
    </>
  );
}
