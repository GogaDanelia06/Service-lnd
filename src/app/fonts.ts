import { Noto_Sans_Georgian, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const georgian = Noto_Sans_Georgian({
  subsets: ['georgian'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-georgian',
  display: 'swap',
});

export const fontClass = [poppins.variable, georgian.variable].join(' ');
