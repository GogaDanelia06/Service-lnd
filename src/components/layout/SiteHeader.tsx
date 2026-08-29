'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { Logo } from '@/components/layout/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { PrimaryNav } from '@/components/layout/PrimaryNav';
import { SocialIcon } from '@/components/layout/SocialIcon';
import type { NavItem } from '@/content';
import { localePath, type Locale } from '@/i18n/config';

type Social = { label: string; href: string };

export function SiteHeader({
  locale,
  nav,
  site,
  ui,
  socials = [],
}: {
  locale: Locale;
  nav: NavItem[];
  site: { name: string };
  ui: {
    home: string;
    language: string;
    openMenu: string;
    closeMenu: string;
    nav: { primary: string; footer: string };
  };
  socials?: Social[];
}) {
  const pathname = usePathname();
  const linked = socials.filter((item) => item.href);

  return (
    <header
      data-theme="white"
      className="absolute inset-x-0 top-0 z-10 flex min-h-[var(--header-height)] items-center text-[var(--fg)]"
    >
      <div className="site-pad grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 py-[var(--header-pad-y)]">
        <PrimaryNav locale={locale} nav={nav} label={ui.nav.primary} pathname={pathname} />

        <Link
          href={localePath(locale, '/')}
          aria-label={`${site.name} — ${ui.home}`}
          className="col-start-2 relative z-30 flex items-center"
        >
          <Logo className="h-[var(--logo-height)] w-auto text-[var(--color-ink)]" />
        </Link>

        <div className="col-start-3 flex items-center justify-end gap-5">
          <div className="flex items-center gap-6 text-[length:var(--header-text)] max-[1130px]:hidden">
            {linked.length > 0 ? (
              <ul className="flex items-center gap-4">
                {linked.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.label}
                      className="block opacity-80 transition-opacity hover:opacity-100"
                    >
                      <SocialIcon
                        label={item.label}
                        className="h-[calc(var(--header-text)*1.15)] w-[calc(var(--header-text)*1.15)]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <LocaleSwitch locale={locale} label={ui.language} />
          </div>

          <MobileNav locale={locale} nav={nav} ui={ui} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
