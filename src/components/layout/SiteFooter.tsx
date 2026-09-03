import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { FooterLinks } from '@/components/layout/FooterLinks';
import { LogoVertical } from '@/components/layout/LogoVertical';
import { SocialIcon } from '@/components/layout/SocialIcon';
import { shared, type Content } from '@/content';
import type { Locale } from '@/i18n/config';

export function SiteFooter({ locale, content }: { locale: Locale; content: Content }) {
  const { site, ui, nav, legal } = content;
  const legalLinks = legal.map((page) => ({ label: page.label, href: `/legal/${page.slug}` }));
  const siteMap = nav.flatMap((item) => [item, ...(item.children ?? [])]);

  return (
    <Section as="footer" height="small" theme="white">
      <SectionContent>
        <FluidGrid className="gap-y-[2.4vmax]">
          <FluidSpan span={{ desktop: [2, 8], mobile: [2, 10] }}>
            <h3>
              <span className="sr-only">{site.name}</span>
              <LogoVertical className="h-[var(--footer-logo)] w-auto" />
            </h3>
          </FluidSpan>

          <FluidSpan span={{ desktop: [8, 14], mobile: [2, 10] }}>
            <FooterLinks locale={locale} items={siteMap} label={ui.nav.footer} />
          </FluidSpan>

          <FluidSpan span={{ desktop: [14, 20], mobile: [2, 10] }}>
            <FooterLinks locale={locale} items={legalLinks} label={ui.sections.legal} />
          </FluidSpan>

          <FluidSpan span={{ desktop: [20, 26], mobile: [2, 10] }}>
            <ul className="footer-links">
              <li>
                <a
                  href={`tel:${shared.phone.replace(/[^\d+]/g, '')}`}
                  className="underline-swipe inline-block"
                >
                  {shared.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${shared.email}`} className="underline-swipe inline-block">
                  {shared.email}
                </a>
              </li>
              {shared.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex w-fit items-center gap-2"
                  >
                    <SocialIcon label={social.label} className="h-[1.05em] w-[1.05em] shrink-0" />
                    <span className="underline-swipe">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }} className="mt-[2vmax]">
            <hr className="rule" />
            <p className="mt-[2vmax] text-center text-[0.85rem] leading-[1.6] text-[var(--muted)]">
              © {new Date().getFullYear()} {ui.rights}
            </p>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
