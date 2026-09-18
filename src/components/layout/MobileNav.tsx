'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import type { NavItem } from '@/content';
import { localePath, type Locale } from '@/i18n/config';
import { useModalPanel } from '@/lib/useModalPanel';

export function MobileNav({
  locale,
  nav,
  ui,
  pathname,
}: {
  locale: Locale;
  nav: NavItem[];
  ui: { openMenu: string; closeMenu: string; language: string; nav: { primary: string } };
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const items = nav.flatMap((item) => [item, ...(item.children ?? [])]);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Any link click closes the menu, including links to the page already open
  // (the pathname effect above only fires when the route changes).
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest('a[href]')) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open]);

  useModalPanel({ open, panelRef, onClose: close, focusPanel: true });

  return (
    <div className="min-[1130px]:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
        className="relative z-30 -mr-3 grid h-11 w-11 place-items-center"
        // The header can be white over a dark hero; the open panel is always white.
        style={open ? { color: 'var(--color-ink)' } : undefined}
      >
        <span className="sr-only">{open ? ui.closeMenu : ui.openMenu}</span>
        <span aria-hidden className="relative block h-[13px] w-[26px]">
          <span
            className="absolute top-0 left-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-out-quint)]"
            style={{ transform: open ? 'translateY(6px) rotate(45deg)' : undefined }}
          />
          <span
            className="absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300 ease-[var(--ease-out-quint)]"
            style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : undefined }}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        data-theme="white"
        hidden={!open}
        tabIndex={-1}
        className="fixed inset-0 z-20 overflow-y-auto outline-none overscroll-contain bg-[var(--bg)] text-[var(--fg)]"
      >
        <nav
          aria-label={ui.nav.primary}
          className="site-pad flex min-h-full flex-col justify-between pt-[var(--header-height)] pb-[var(--header-pad-y)]"
        >
          <ul className="flex flex-1 flex-col content-center justify-center">
            {items.map((item) => (
              <li key={item.href} className="border-b border-[var(--rule)]">
                <Link
                  href={localePath(locale, item.href)}
                  aria-current={pathname === localePath(locale, item.href) ? 'page' : undefined}
                  className="flex items-baseline gap-4 py-[0.55em] [@media(max-height:500px)]:py-[0.35em]"
                >
                  <span className="display text-[length:calc(2.2rem+1.2*var(--type-step))] [@media(max-height:500px)]:text-[1.6rem]">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="pb-2">
            <LocaleSwitch locale={locale} label={ui.language} />
          </div>
        </nav>
      </div>
    </div>
  );
}
