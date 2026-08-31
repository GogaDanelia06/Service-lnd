import * as enPages from '@/content/en/pages';
import { legal as enLegal } from '@/content/en/legal/index';
import { projects as enProjects } from '@/content/en/projects';
import { services as enServices } from '@/content/en/services';
import * as enSite from '@/content/en/site';
import { team as enTeam } from '@/content/en/team';
import * as kaPages from '@/content/ka/pages';
import { legal as kaLegal } from '@/content/ka/legal/index';
import { projects as kaProjects } from '@/content/ka/projects';
import { services as kaServices } from '@/content/ka/services';
import * as kaSite from '@/content/ka/site';
import { team as kaTeam } from '@/content/ka/team';
import type { Locale } from '@/i18n/config';

const DICTIONARIES = {
  en: {
    ...enSite,
    ...enPages,
    legal: enLegal,
    projects: enProjects,
    services: enServices,
    team: enTeam,
  },
  ka: {
    ...kaSite,
    ...kaPages,
    legal: kaLegal,
    projects: kaProjects,
    services: kaServices,
    team: kaTeam,
  },
};

export type Content = (typeof DICTIONARIES)['en'];

export function getContent(locale: Locale): Content {
  return DICTIONARIES[locale];
}

export const shared = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://montavia.ge',
  phone: '+995 32 200 00 00',
  email: 'hello@montavia.ge',
  socials: [
    { label: 'WhatsApp', href: 'https://wa.me/995322000000' },
    { label: 'Facebook', href: 'https://facebook.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
  ],
};

export type {
  LegalPage,
  NavItem,
  Project,
  ProjectImage,
  Service,
  TeamMember,
} from '@/content/types';
