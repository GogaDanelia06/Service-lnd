import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { shared, type Content } from '@/content';
import type { Locale } from '@/i18n/config';

export function SiteFooter({ content }: { locale: Locale; content: Content }) {
  const { site } = content;

  return (
    <Section as="footer" height="small" theme="white">
      <SectionContent>
        <FluidGrid className="gap-y-[1.6vmax]">
          <FluidSpan span={{ desktop: [2, 20], mobile: [2, 10] }}>
            <h3>{site.name}</h3>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 8], mobile: [2, 10] }} className="prose-utica">
            <p>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.country}
            </p>
          </FluidSpan>

          <FluidSpan span={{ desktop: [9, 21], mobile: [2, 10] }} className="prose-utica">
            <p>
              <a href={`tel:${shared.phone.replace(/[^\d+]/g, '')}`}>{shared.phone}</a>
              <br />
              <a href={`mailto:${shared.email}`}>{shared.email}</a>
            </p>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
