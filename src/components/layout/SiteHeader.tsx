'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { MobileNav } from '@/components/layout/MobileNav';
import { nav, site } from '@/content/site';
import { useSectionTheme, type SectionTheme } from '@/lib/useSectionTheme';

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/' || pathname.startsWith('/work');
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
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
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="relative z-30 font-[family-name:var(--font-heading)] text-[length:var(--logo-size)] leading-[1.4] font-medium tracking-[-0.02em]"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="max-fe:hidden">
          <ul className="meta flex items-center gap-8">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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

        <MobileNav pathname={pathname} onOpenChange={setMenuOpen} />
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
