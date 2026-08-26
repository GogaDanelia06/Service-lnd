import Link from 'next/link';

import { localePath, type Locale } from '@/i18n/config';

export function FooterLinks({
  locale,
  items,
  label,
}: {
  locale: Locale;
  items: { label: string; href: string }[];
  label: string;
}) {
  return (
    <nav aria-label={label}>
      <ul className="footer-links">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={localePath(locale, item.href)} className="underline-swipe inline-block">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
