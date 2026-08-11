import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactForm } from '@/components/contact/ContactForm';
import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { getContent, shared } from '@/content';
import { isLocale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { contact, ui } = getContent(locale);
  return {
    title: ui.sections.contact,
    description: contact.body,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { contact, site, ui } = getContent(locale);

  return (
    <Section height="medium" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid className="gap-y-[2.4vmax]">
          <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }} className="prose-utica">
            <h2>{contact.heading}</h2>
            <p className="mt-[0.8em]">{contact.body}</p>
          </FluidSpan>

          <FluidSpan span={{ desktop: [14, 26], mobile: [2, 10] }}>
            <ContactForm labels={ui.form} locale={locale} />
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 8], mobile: [2, 10] }}>
            <hr className="rule w-full" />
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }} className="prose-utica">
            <p>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </p>
            <p>
              <a href={`tel:${shared.phone.replace(/[^\d+]/g, '')}`}>{shared.phone}</a>
              <br />
              <a href={`mailto:${shared.email}`}>{shared.email}</a>
            </p>
            <ul className="mt-[1.4em] flex flex-wrap gap-x-5 gap-y-2">
              {shared.socials.map((social: { label: string; href: string }) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline-swipe inline-block"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
