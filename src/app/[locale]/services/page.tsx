import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { BleedImage } from '@/components/sections/BleedImage';
import { CtaSection } from '@/components/sections/CtaSection';
import { ServiceGroup } from '@/components/services/ServiceGroup';
import { ServiceIndex } from '@/components/services/ServiceIndex';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { services, site } = getContent(locale);
  return {
    title: services.heading,
    description: site.description,
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { home, services } = getContent(locale);
  const detailed = services.items.filter((service) => service.list.length > 0);
  const closing = services.items.filter((service) => service.list.length === 0);
  const split = Math.ceil(detailed.length / 2);

  return (
    <>
      <Section height="small" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid className="gap-y-[2.4vmax]">
            <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }}>
              <h1 className="[--fs:2.8]">{services.heading}</h1>
            </FluidSpan>

            <FluidSpan span={{ desktop: [14, 26], mobile: [2, 10] }} className="max-fe:mt-[1.2vmax]">
              <ServiceIndex items={services.items} label={services.heading} />
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <ServiceGroup items={detailed.slice(0, split)} />

      <BleedImage src={home.bleed.image} alt={home.bleed.alt} height="62vh" />

      <ServiceGroup items={detailed.slice(split)} />

      {closing.map((service) => (
        <Section key={service.slug} height="small" theme="white">
          <SectionContent>
            <FluidGrid className="gap-y-[1.6vmax]">
              <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                <hr className="rule" />
              </FluidSpan>

              <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }}>
                <h2 id={service.slug} className="service-title [--fs:2.2]">
                  {service.title}
                </h2>
              </FluidSpan>

              <FluidSpan span={{ desktop: [12, 26], mobile: [2, 10] }} className="prose-utica">
                <p className="lead">{service.body}</p>
              </FluidSpan>
            </FluidGrid>
          </SectionContent>
        </Section>
      ))}

      <CtaSection
        locale={locale}
        heading={home.cta.heading}
        body={home.cta.body}
        action={home.cta.action}
      />
    </>
  );
}
