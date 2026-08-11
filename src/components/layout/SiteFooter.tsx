import Link from 'next/link';

import { Meta } from '@/components/ui/Meta';
import { shared, type Content } from '@/content';
import { localePath, type Locale } from '@/i18n/config';

export function SiteFooter({ locale, content }: { locale: Locale; content: Content }) {
  const { site, nav, ui } = content;
  const year = new Date().getFullYear();

  return (
    <footer data-theme="black" className="section-shell">
      <div className="site-pad py-[6.6vmax]">
        <div className="grid gap-14 fe:grid-cols-[1.4fr_1fr_1fr] fe:gap-[var(--fe-gap)]">
          <div>
            <p className="display display--tight text-[length:calc(1.8rem+1*var(--type-step))]">
              {site.name}
            </p>
            <Meta muted className="mt-5 block max-w-[34ch]">
              {site.discipline}
            </Meta>
          </div>

          <nav aria-label={ui.nav.footer}>
            <Meta muted className="block">
              {ui.sections.work}
            </Meta>
            <ul className="mt-5 flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={localePath(locale, item.href)} className="underline-swipe meta">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Meta muted className="block">
              {ui.sections.enquiries}
            </Meta>
            <ul className="mt-5 flex flex-col gap-2">
              <li>
                <a href={`mailto:${shared.email}`} className="underline-swipe meta">
                  {shared.email}
                </a>
              </li>
              <li>
                <a href={`tel:${shared.phone.replace(/[^\d+]/g, '')}`} className="underline-swipe meta">
                  {shared.phone}
                </a>
              </li>
              {shared.socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline-swipe meta"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] pt-6">
          <Meta muted>
            © {year} {site.name}. {ui.rights}.
          </Meta>
          <Meta muted>
            {site.address.city}, {site.address.country}
          </Meta>
        </div>
      </div>
    </footer>
  );
}
