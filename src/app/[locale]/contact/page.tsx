import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContactForm } from '@/components/contact/ContactForm';
import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { SocialIcon } from '@/components/layout/SocialIcon';
import { getContent, shared } from '@/content';
import { isLocale } from '@/i18n/config';
import { mtavruli } from '@/lib/mtavruli';

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
  const { contact, ui } = getContent(locale);

  return (
    <Section height="medium" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid className="gap-y-[2.4vmax]">
          <FluidBlock
            area={{ desktop: [1, 2, 3, 12], mobile: [1, 2, 2, 10] }}
            className="prose-utica self-start"
          >
            <h1 className="[--fs:2.8]">{mtavruli(contact.heading)}</h1>
            <p className="mt-[0.8em]">{contact.body}</p>

            <hr className="rule mt-[3vmax] w-full" />

            <p className="mt-[1.4vmax]">
              <a href={`tel:${shared.phone.replace(/[^\d+]/g, '')}`}>{shared.phone}</a>
              <br />
              <a href={`mailto:${shared.email}`}>{shared.email}</a>
            </p>
            <ul className="social-row mt-[1.4em] flex flex-wrap gap-x-6 gap-y-2">
              {shared.socials.map((social: { label: string; href: string }) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2"
                  >
                    <SocialIcon label={social.label} className="h-[1.05em] w-[1.05em] shrink-0" />
                    <span className="underline-swipe">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </FluidBlock>

          <FluidBlock
            area={{ desktop: [1, 14, 3, 26], mobile: [2, 2, 3, 10] }}
            className="max-fe:mt-[2vmax]"
          >
            <ContactForm labels={ui.form} locale={locale} />
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
