import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaImageSection } from '@/components/sections/CtaImageSection';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';

type Quote = { quote: string; source: string; year: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site, ui } = getContent(locale);
  return {
    title: ui.sections.press,
    description: site.description,
    alternates: { canonical: `/${locale}/press` },
  };
}

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { press } = getContent(locale);

  return (
    <>
      <Section height="medium" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid className="gap-y-[2.4vmax]">
            <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }}>
              <h1 className="[--fs:2.8]">{press.heading}</h1>
            </FluidSpan>

            <FluidSpan
              span={{ desktop: [12, 26], mobile: [2, 10] }}
              className="prose-utica flex flex-col gap-[2.7rem]"
            >
              {press.quotes.map((entry: Quote) => (
                <figure key={entry.quote.slice(0, 32)}>
                  <blockquote>
                    <p className="lead">&ldquo;{entry.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-[1.8em]">&ndash; {entry.source}</figcaption>
                </figure>
              ))}
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <CtaImageSection
        locale={locale}
        heading={press.cta.heading}
        action={press.cta.action}
        image={press.cta.image}
        alt={press.cta.alt}
        theme="black"
      />
    </>
  );
}
