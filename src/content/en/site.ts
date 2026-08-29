export const site = {
  name: 'Montavia',
  tagline: 'Montavia is an architecture firm based in Tbilisi, Georgia.',
  discipline: 'Architecture & Urbanism',
  founded: '2011',
  description:
    'Montavia is an architecture firm based in Tbilisi, Georgia, working across environmental retrofits, new neighbourhoods and public space.',
  address: { street: '45 Aghmashenebeli Avenue', city: 'Tbilisi', country: 'Georgia' },
};

export const facts = [
  { label: 'Studio', value: 'Tbilisi, GE' },
  { label: 'Founded', value: '2011' },
  { label: 'Practice', value: 'Architecture · Landscape · Urbanism' },
];

export const stats = [
  { value: '24', label: 'Built projects' },
  { value: '06', label: 'Countries' },
  { value: '12', label: 'People' },
  { value: '11', label: 'Years' },
];

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', children: [{ label: 'Portfolio', href: '/work' }] },
  { label: 'Contact', href: '/contact' },
];

export const ui = {
  skip: 'Skip to content',
  home: 'home',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  language: 'Language',
  getStarted: 'Get Started',
  nextProject: 'Next project',
  backToWork: 'Back to work',
  notFound: 'This page doesn’t exist.',
  notFoundBody: 'The link may be out of date, or the page may have moved.',
  colophon: 'Design and build',
  rights: 'All rights reserved. Montavia',
  nav: { primary: 'Primary', footer: 'Footer' },
  byTheNumbers: 'By the numbers',
  details: {
    studio: 'Studio',
    email: 'Email',
    telephone: 'Telephone',
    elsewhere: 'Elsewhere',
  },
  sections: {
    legal: 'Legal',

    work: 'Work',
    practice: 'Practice',
    selectedWork: 'Selected Work',
    approach: 'Approach',
    about: 'About',
    team: 'Team',
    press: 'Press',
    contact: 'Contact',
    services: 'Services',
    studio: 'Studio',
    enquiries: 'Enquiries',
  },
  gallery: {
    open: 'View larger',
    previous: 'Previous image',
    next: 'Next image',
    close: 'Close',
  },
  spec: {
    client: 'Client',
    location: 'Location',
    programme: 'Programme',
    area: 'Area',
    completed: 'Completed',
    status: 'Status',
  },
  form: {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Message',
    send: 'Submit',
    sending: 'Sending…',
    sent: 'Message sent',
    company: 'Company',
    required: 'required',
    thanks: 'Thank you — we’ll be in touch shortly.',
    checkFields: 'Please check the highlighted fields.',
    deliveryFailed: 'Something went wrong sending that. Please email us directly.',
    errors: {
      firstName: 'Required',
      lastName: 'Required',
      email: 'Enter a valid email address',
      phone: 'Enter a phone number',
      messageShort: 'At least 10 characters',
      tooLong: 'Too long',
    },
  },
};
