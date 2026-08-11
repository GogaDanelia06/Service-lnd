'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { MobileNav } from '@/components/layout/MobileNav';
import { Wordmark } from '@/components/ui/Wordmark';
import { localePath, type Locale } from '@/i18n/config';
import { useSectionTheme, type SectionTheme } from '@/lib/useSectionTheme';

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
  const { theme, lifted } = useSectionTheme(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const chromeTheme: SectionTheme = menuOpen ? 'black' : theme;

  return (
    <header
      data-theme={chromeTheme}
      className="fixed inset-x-0 top-0 z-40 text-[var(--fg)] transition-colors duration-500 ease-[var(--ease-out-quint)]"
    >
      <div className="site-pad flex items-center justify-between gap-6 py-[var(--header-pad-y)]">
        <Wordmark locale={locale} name={site.name} label={ui.home} />

        <div className="flex items-center gap-10 max-fe:hidden">
          <nav aria-label={ui.nav.primary}>
            <ul className="meta flex items-center gap-8">
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

        <MobileNav locale={locale} nav={nav} ui={ui} pathname={pathname} onOpenChange={setMenuOpen} />
      </div>

      <div
        aria-hidden
        className="site-pad pointer-events-none transition-opacity duration-500"
        style={{ opacity: lifted && !menuOpen ? 1 : 0 }}
      >
        <div className="h-px w-full bg-current opacity-15" />
      </div>
    </header>
  );
}
