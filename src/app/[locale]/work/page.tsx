import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaSection } from '@/components/sections/CtaSection';
import { ProjectIndex } from '@/components/work/ProjectIndex';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site, workPage } = getContent(locale);
  return {
    title: workPage.heading,
    description: site.description,
    alternates: { canonical: `/${locale}/work` },
  };
}

export default async function WorkIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { home, projects, workPage } = getContent(locale);

  return (
    <>
      <Section height="small" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid>
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <h1 className="[--fs:2.8]">{workPage.heading}</h1>
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="medium" theme="white">
        <div className="py-[3.3vmax]">
          <ProjectIndex locale={locale} projects={projects} />
        </div>
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
