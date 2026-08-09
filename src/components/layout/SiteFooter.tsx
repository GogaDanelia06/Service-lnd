import Link from 'next/link';

import { Meta } from '@/components/ui/Meta';
import { nav, site } from '@/content/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-theme="black" className="section-shell">
      <div className="site-pad py-[6.6vmax]">
        <div className="grid gap-14 fe:grid-cols-[1.4fr_1fr_1fr_1fr] fe:gap-[var(--fe-gap)]">
          <div>
            <Link
              href="/"
              className="display display--tight block text-[length:clamp(3rem,7vw,7rem)]"
            >
              {site.name}
            </Link>
            <Meta muted className="mt-6 block max-w-[26ch]">
              {site.discipline} — established {site.founded}
            </Meta>
          </div>

          <FooterColumn title="Studio">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-swipe">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a href={`mailto:${site.email}`} className="underline-swipe">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="underline-swipe">
                {site.phone}
              </a>
            </li>
            <li className="pt-3 text-[var(--muted)]">{site.address.street}</li>
            <li className="text-[var(--muted)]">
              {site.address.city}, {site.address.country}
            </li>
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-swipe"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--rule)] pt-6">
          <Meta muted>
            © {year} {site.name}
          </Meta>
          <Meta muted>
            {site.address.city} · 55.6761° N, 12.5683° E
          </Meta>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Meta muted className="block border-t border-[var(--rule)] pt-4">
        {title}
      </Meta>
      <ul className="meta mt-5 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}
