import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaSection } from '@/components/sections/CtaSection';
import { ProjectIndex } from '@/components/work/ProjectIndex';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';
import { mtavruli } from '@/lib/mtavruli';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { site, home, projects } = getContent(locale);

  return (
    <>
      <Section
        height="hero"
        theme="white"
        background={{ src: home.hero.image, alt: home.hero.alt, overlay: 0, priority: true }}
      >
        <h1 className="sr-only">{site.tagline}</h1>
      </Section>

      <Section height="small" theme="white">
        <SectionContent>
          <FluidGrid>
            <FluidSpan span={{ desktop: [2, 14], mobile: [2, 10] }} className="prose-utica">
              <h2>{mtavruli(home.work.heading)}</h2>
              <p className="mt-[0.8em]">{home.work.body}</p>
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
