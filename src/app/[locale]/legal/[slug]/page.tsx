import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { getContent } from '@/content';
import { isLocale, locales } from '@/i18n/config';
import { mtavruli } from '@/lib/mtavruli';

type Params = { locale: string; slug: string };

function getPage(locale: string, slug: string) {
  if (!isLocale(locale)) return undefined;
  return getContent(locale).legal.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getContent(locale).legal.map((page) => ({ locale, slug: page.slug })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getPage(locale, slug);
  if (!page) return {};
  return { title: page.title, alternates: { canonical: `/${locale}/legal/${slug}` } };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const page = getPage(locale, slug);
  if (!page) notFound();

  return (
    <Section height="medium" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid className="gap-y-[2.4vmax]">
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <h1 className="[--fs:2.8]">{mtavruli(page.title)}</h1>
          </FluidSpan>

          {page.body.length > 0 ? (
            <FluidSpan span={{ desktop: [2, 16], mobile: [2, 10] }} className="prose-utica">
              {page.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </FluidSpan>
          ) : null}
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
