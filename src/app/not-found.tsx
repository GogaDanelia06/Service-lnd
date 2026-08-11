import Link from 'next/link';

import { fontClass } from '@/app/fonts';
import { defaultLocale } from '@/i18n/config';

import '@/app/globals.css';

export default function RootNotFound() {
  return (
    <html lang="en" className={fontClass}>
      <body>
        <main className="site-pad flex min-h-screen flex-col justify-center gap-6">
          <h1 className="display">404</h1>
          <p className="meta">
            <Link href={`/${defaultLocale}`} className="underline-swipe">
              Montavia — home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
