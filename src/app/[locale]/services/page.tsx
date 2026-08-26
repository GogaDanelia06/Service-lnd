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

  const { home, services } = getContent(locale);
  const detailed = services.items.filter((service) => service.list.length > 0);
  const closing = services.items.filter((service) => service.list.length === 0);

  return (
    <>
      <ServiceGroup items={detailed} heading={services.heading} />

      {closing.map((service) => (
        <Section key={service.slug} id={service.slug} height="small" theme="white">
          <SectionContent>
            <FluidGrid className="gap-y-[2.6vmax]">
              <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                <hr className="rule" />
              </FluidSpan>

              <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                <h2 className="sr-only">{service.title}</h2>
                <p className="closing-statement">{service.body}</p>
              </FluidSpan>

              <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                <hr className="rule" />
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
