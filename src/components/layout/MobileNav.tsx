'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { Meta } from '@/components/ui/Meta';
import { nav, site } from '@/content/site';
import { useModalPanel } from '@/lib/useModalPanel';

export function MobileNav({
  pathname,
  onOpenChange,
}: {
  pathname: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useModalPanel({ open, panelRef, onClose: close });

  return (
    <div className="fe:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setOpen(true))}
        className="relative z-30 -mr-3 grid h-11 w-11 place-items-center"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
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
        data-theme="black"
        hidden={!open}
        className="fixed inset-0 z-20 bg-[var(--bg)] text-[var(--fg)]"
      >
        <nav
          aria-label="Primary"
          className="site-pad flex h-full flex-col justify-between py-[var(--header-pad-y)]"
        >
          <ul className="flex flex-1 flex-col content-center justify-center">
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-[var(--rule)]">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className="flex items-baseline gap-4 py-[0.55em]"
                >
                  <Meta muted className="w-8 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </Meta>
                  <span className="display display--tight text-[length:calc(2.4rem+1.4*var(--type-step))]">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-end justify-between gap-4 pb-2">
            <Meta muted>
              {site.address.city}, {site.address.country}
            </Meta>
            <Meta muted>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </Meta>
          </div>
        </nav>
      </div>
    </div>
  );
}
