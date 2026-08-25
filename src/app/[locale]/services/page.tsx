import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { CtaSection } from '@/components/sections/CtaSection';
import { ServiceGroup } from '@/components/services/ServiceGroup';
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

  const { home, services, ui } = getContent(locale);
  const detailed = services.items.filter((service) => service.list.length > 0);
  const closing = services.items.filter((service) => service.list.length === 0);

  return (
    <>
      <Section height="small" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid>
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <h1 className="[--fs:2.8] text-center">{services.heading}</h1>
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <ServiceGroup items={detailed} includedLabel={ui.sections.included} />

      {closing.map((service) => (
        <Section key={service.slug} height="small" theme="white">
          <SectionContent>
            <FluidGrid>
              <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                <div data-theme="black" className="panel-statement">
                  <h2 id={service.slug} className="[--fs:2.2] scroll-mt-[6vmax]">
                    {service.title}
                  </h2>
                  <p className="panel-statement__body">{service.body}</p>
                </div>
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
