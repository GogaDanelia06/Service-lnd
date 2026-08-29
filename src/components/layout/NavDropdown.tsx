import Link from 'next/link';

import type { NavItem } from '@/content';
import { localePath, type Locale } from '@/i18n/config';

export function NavDropdown({
  locale,
  items,
  pathname,
}: {
  locale: Locale;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div data-theme="white" className="nav-dropdown absolute left-0 top-full z-20">
      <ul className="nav-dropdown__panel">
        {items.map((item) => {
          const target = localePath(locale, item.href);
          const active = pathname === target || pathname.startsWith(`${target}/`);

          return (
            <li key={item.href}>
              <Link
                href={target}
                aria-current={active ? 'page' : undefined}
                data-active={active}
                className="nav-dropdown__link"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
