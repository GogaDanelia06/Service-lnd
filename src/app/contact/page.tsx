import type { Metadata } from 'next';

import { ContactForm } from '@/components/contact/ContactForm';
import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { contact } from '@/content/pages';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: contact.body,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <Section height="medium" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="contact/label"
            area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
          >
            <SectionLabel index="01">Contact</SectionLabel>
          </FluidBlock>

          <FluidBlock
            debugLabel="contact/heading"
            area={{ desktop: [3, 2, 8, 13], mobile: [3, 2, 9, 10] }}
          >
            <SplitText as="h1" text={contact.heading} className="display" />
          </FluidBlock>

          <FluidBlock
            debugLabel="contact/intro"
            area={{ desktop: [9, 2, 13, 12], mobile: [10, 2, 17, 10] }}
            className="prose-utica"
          >
            <Reveal delay={140}>
              <p className="text-[var(--muted)]">{contact.body}</p>
            </Reveal>
          </FluidBlock>

          <FluidBlock
            debugLabel="contact/details"
            area={{ desktop: [14, 2, 20, 12], mobile: [18, 2, 26, 10] }}
          >
            <Reveal delay={180}>
              <dl className="flex flex-col">
                <Row label="Studio">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </Row>
                <Row label="Email">
                  <a href={`mailto:${site.email}`} className="underline-swipe">
                    {site.email}
                  </a>
                </Row>
                <Row label="Telephone">
                  <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="underline-swipe">
                    {site.phone}
                  </a>
                </Row>
                <Row label="Elsewhere">
                  <span className="flex flex-wrap gap-x-4 gap-y-1">
                    {site.socials.map((social) => (
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
                </Row>
              </dl>
            </Reveal>
          </FluidBlock>

          <FluidBlock
            debugLabel="contact/form"
            area={{ desktop: [3, 14, 24, 26], mobile: [28, 2, 56, 10] }}
          >
            <ContactForm />
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-6 border-t border-[var(--rule)] py-3.5">
      <Meta as="dt" muted className="shrink-0">
        {label}
      </Meta>
      <Meta as="dd" className="text-right">
        {children}
      </Meta>
    </div>
  );
}
