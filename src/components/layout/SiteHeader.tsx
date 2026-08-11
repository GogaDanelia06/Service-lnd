'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { MobileNav } from '@/components/layout/MobileNav';
import { localePath, type Locale } from '@/i18n/config';

type NavItem = { label: string; href: string };

function isActive(pathname: string, locale: Locale, href: string): boolean {
  const target = localePath(locale, href);
  if (href === '/') return pathname === target || pathname.startsWith(`/${locale}/work`);
  return pathname === target || pathname.startsWith(`${target}/`);
}

export function SiteHeader({
  locale,
  nav,
  site,
  ui,
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
}) {
  const pathname = usePathname();

  return (
    <header data-theme="white" className="absolute inset-x-0 top-0 z-10 bg-[var(--bg)] text-[var(--fg)]">
      <div className="site-pad flex items-center justify-between gap-6 py-[var(--header-pad-y)]">
        <Link
          href={localePath(locale, '/')}
          aria-label={`${site.name} — ${ui.home}`}
          className="relative z-30 font-[family-name:var(--font-heading)] text-[length:var(--logo-size)] leading-[1.4] font-medium"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-6 max-fe:hidden">
          <nav aria-label={ui.nav.primary}>
            <ul className="flex items-center gap-[19px] text-base font-light">
              {nav.map((item) => {
                const active = isActive(pathname, locale, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      aria-current={active ? 'page' : undefined}
                      data-active={active}
                      className="underline-swipe inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <LocaleSwitch locale={locale} label={ui.language} />
        </div>

        <MobileNav locale={locale} nav={nav} ui={ui} pathname={pathname} />
      </div>
    </header>
  );
}
