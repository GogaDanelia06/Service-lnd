export const site = {
  name: 'Utica',
  tagline: 'Utica is an architecture firm based in Copenhagen, Denmark.',
  discipline: 'Architecture & Urbanism',
  founded: '2011',
  description:
    'Utica is an architecture firm based in Copenhagen, Denmark, working across environmental retrofits, new neighbourhoods and public space.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://utica.example.com',
  locale: 'en_GB',
  address: {
    street: '123 Demo Street',
    city: 'Copenhagen',
    country: 'Denmark',
  },
  phone: '(555) 555-5555',
  email: 'email@example.com',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'Are.na', href: 'https://are.na/' },
  ],
} as const;

export const facts = [
  { label: 'Studio', value: 'Copenhagen, DK' },
  { label: 'Founded', value: '2011' },
  { label: 'Practice', value: 'Architecture · Landscape · Urbanism' },
] as const;

export const stats = [
  { value: '24', label: 'Built projects' },
  { value: '06', label: 'Countries' },
  { value: '12', label: 'People' },
  { value: '11', label: 'Years' },
] as const;

export const nav = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Team', href: '/our-team' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
] as const;

export type NavItem = (typeof nav)[number];
