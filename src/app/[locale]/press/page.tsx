import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaImageSection } from '@/components/sections/CtaImageSection';
import { Meta, SectionLabel } from '@/components/ui/Meta';
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
  const { press, ui } = getContent(locale);

  return (
    <>
      <Section height="small" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid className="gap-y-[3.2vmax]">
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <SectionLabel index="01">{ui.sections.press}</SectionLabel>
            </FluidSpan>
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <SplitText as="h1" text={press.intro} className="display" />
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="small" theme="white">
        <SectionContent>
          <FluidGrid className="gap-y-[3.2vmax]">
            {press.quotes.map((entry: { quote: string; source: string; year: string }, index: number) => (
              <FluidSpan
                key={entry.quote.slice(0, 32)}
                span={{ desktop: [2, 26], mobile: [2, 10] }}
              >
                <Reveal delay={index * 80}>
                  <figure className="grid gap-6 border-t border-[var(--rule)] pt-6 fe:grid-cols-[10rem_1fr] fe:gap-[var(--fe-gap)]">
                    <div className="flex items-baseline gap-4 fe:flex-col fe:gap-2">
                      <Meta muted>({String(index + 1).padStart(2, '0')})</Meta>
                      <Meta muted>{entry.year}</Meta>
                    </div>

                    <div>
                      <blockquote>
                        <p className="text-[length:calc(1.5rem+1*var(--type-step))] leading-[1.45] font-[family-name:var(--font-heading)] font-medium tracking-[-0.012em]">
                          &ldquo;{entry.quote}&rdquo;
                        </p>
                      </blockquote>
                      <figcaption className="mt-6">
                        <Meta muted>— {entry.source}</Meta>
                      </figcaption>
                    </div>
                  </figure>
                </Reveal>
              </FluidSpan>
            ))}
          </FluidGrid>
        </SectionContent>
      </Section>

      <CtaImageSection
        locale={locale}
        label={ui.sections.contact}
        heading={press.cta.heading}
        action={press.cta.action}
        image={press.cta.image}
        alt={press.cta.alt}
        theme="black"
      />
    </>
  );
}
