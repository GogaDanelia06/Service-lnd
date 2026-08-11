import { notFound } from 'next/navigation';

import { Section } from '@/components/fluid/Section';
import { BleedImage } from '@/components/sections/BleedImage';
import { CtaSection } from '@/components/sections/CtaSection';
import { Approach } from '@/components/sections/home/Approach';
import { Practice } from '@/components/sections/home/Practice';
import { Statement } from '@/components/sections/home/Statement';
import { WorkIntro } from '@/components/sections/home/WorkIntro';
import { ProjectIndex } from '@/components/work/ProjectIndex';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { site, facts, stats, home, projects, ui } = getContent(locale);

  return (
    <>
      <Statement
        site={site}
        facts={facts}
        label={ui.sections.work}
        background={{ src: home.hero.image, alt: home.hero.alt }}
      />

      <BleedImage src={home.bleed.image} alt={home.bleed.alt} caption={home.bleed.caption} />

      <Practice practice={home.practice} stats={stats} label={ui.sections.practice} />
      <WorkIntro work={home.work} label={ui.sections.selectedWork} />

      <Section height="small" theme="white">
        <ProjectIndex locale={locale} projects={projects} />
      </Section>

      <Approach items={home.approach} label={ui.sections.approach} />

      <CtaSection
        locale={locale}
        heading={home.cta.heading}
        body={home.cta.body}
        action={home.cta.action}
        label={ui.sections.contact}
      />
    </>
  );
}
