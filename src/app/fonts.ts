import { Archivo, IBM_Plex_Mono, Noto_Sans_Georgian, Poppins } from 'next/font/google';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-archivo',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const georgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-georgian',
  display: 'swap',
});

export const fontClass = [
  archivo.variable,
  poppins.variable,
  plexMono.variable,
  georgian.variable,
].join(' ');
