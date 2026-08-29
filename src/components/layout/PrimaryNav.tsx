'use client';

import Link from 'next/link';
import { useState } from 'react';

import { NavDropdown } from '@/components/layout/NavDropdown';
import type { NavItem } from '@/content';
import { localePath, type Locale } from '@/i18n/config';

function isActive(pathname: string, locale: Locale, href: string): boolean {
  const target = localePath(locale, href);
  if (href === '/') return pathname === target;
  return pathname === target || pathname.startsWith(`${target}/`);
}

export function PrimaryNav({
  locale,
  nav,
  label,
  pathname,
}: {
  locale: Locale;
  nav: NavItem[];
  label: string;
  pathname: string;
}) {
  const [dismissed, setDismissed] = useState<string | null>(null);

  return (
    <nav aria-label={label} className="col-start-1 max-[1130px]:hidden">
      <ul className="flex items-center gap-[17px] text-[length:var(--header-text)] font-semibold">
        {nav.map((item) => {
          const active = isActive(pathname, locale, item.href);
          const children = item.children ?? [];

          return (
            <li
              key={item.href}
              data-dismissed={dismissed === item.href ? '' : undefined}
              onMouseLeave={() => setDismissed(null)}
              className={children.length > 0 ? 'nav-has-dropdown relative' : undefined}
            >
              <Link
                href={localePath(locale, item.href)}
                aria-current={active ? 'page' : undefined}
                data-active={active}
                className="underline-swipe inline-block whitespace-nowrap"
              >
                {item.label}
              </Link>

              {children.length > 0 ? (
                <NavDropdown
                  locale={locale}
                  items={children}
                  pathname={pathname}
                  onNavigate={() => setDismissed(item.href)}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
