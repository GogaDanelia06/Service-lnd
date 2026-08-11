import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactRow } from '@/components/contact/ContactRow';
import { ContactForm } from '@/components/contact/ContactForm';
import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
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
        <FluidGrid>
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SectionLabel index="01">{ui.sections.contact}</SectionLabel>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 13], mobile: [2, 10] }}>
            <SplitText as="h1" text={contact.heading} className="display" />
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }} className="prose-utica">
            <Reveal delay={140}>
              <p className="text-[var(--muted)]">{contact.body}</p>
            </Reveal>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }}>
            <Reveal delay={180}>
              <dl className="flex flex-col">
                <ContactRow label={ui.details.studio}>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </ContactRow>
                <ContactRow label={ui.details.email}>
                  <a href={`mailto:${shared.email}`} className="underline-swipe">
                    {shared.email}
                  </a>
                </ContactRow>
                <ContactRow label={ui.details.telephone}>
                  <a href={`tel:${shared.phone.replace(/[^\d+]/g, '')}`} className="underline-swipe">
                    {shared.phone}
                  </a>
                </ContactRow>
                <ContactRow label={ui.details.elsewhere}>
                  <span className="flex flex-wrap gap-x-4 gap-y-1">
                    {shared.socials.map((social: { label: string; href: string }) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline-swipe"
                      >
                        {social.label}
                      </a>
                    ))}
                  </span>
                </ContactRow>
              </dl>
            </Reveal>
          </FluidSpan>

          <FluidSpan span={{ desktop: [14, 26], mobile: [2, 10] }}>
            <ContactForm labels={ui.form} />
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
