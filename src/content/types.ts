export type ProjectImage = {
  src: string;
  alt: string;
  span: 'full' | 'half';
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  thumbnail: string;
  hero: string;
  year: string;
  location: string;
  type: string;
  client: string;
  programme: string;
  area: string;
  status: string;
  body: string[];
  gallery: ProjectImage[];
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  portrait: string;
};
