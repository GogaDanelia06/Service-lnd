import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, Poppins } from 'next/font/google';

import './globals.css';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Grain } from '@/components/ui/Grain';
import { site } from '@/content/site';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ArchitecturalService',
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${poppins.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Grain />

        <script
          type="application/ld+json"

          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
