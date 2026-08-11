import * as enPages from '@/content/en/pages';
import { projects as enProjects } from '@/content/en/projects';
import * as enSite from '@/content/en/site';
import { team as enTeam } from '@/content/en/team';
import * as kaPages from '@/content/ka/pages';
import { projects as kaProjects } from '@/content/ka/projects';
import * as kaSite from '@/content/ka/site';
import { team as kaTeam } from '@/content/ka/team';
import type { Locale } from '@/i18n/config';

const DICTIONARIES = {
  en: { ...enSite, ...enPages, projects: enProjects, team: enTeam },
  ka: { ...kaSite, ...kaPages, projects: kaProjects, team: kaTeam },
};

export type Content = (typeof DICTIONARIES)['en'];

export function getContent(locale: Locale): Content {
  return DICTIONARIES[locale];
}

export const shared = {
  lockup: 'development',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://montavia.ge',
  phone: '+995 32 200 00 00',
  email: 'hello@montavia.ge',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Twitter', href: 'https://twitter.com/' },
  ],
};

export type { Project, ProjectImage, TeamMember } from '@/content/types';
