export const home = {
  hero: {
    image: '/images/hero-home.jpg',
    alt: 'A brutalist concrete tower against open sky',
    caption: 'Copenhagen — 2024',
  },
  practice: {
    heading: 'Our practice spans environmental retrofits of existing buildings and the complete planning of new neighbourhoods.',
    body: 'While the work is aesthetically diverse, the projects are linked by one question: what kind of relationships does this place make possible? We answer it in plan before we answer it in elevation.',
  },
  work: {
    heading: 'Selected Work',
    body: 'Four projects, 2022–2024.',
  },
  approach: [
    {
      title: 'Keep what stands',
      body: 'The greenest structure is almost always the one already on site. We start every project by asking what can be kept, and we need a good reason to answer “nothing”.',
    },
    {
      title: 'Design the in-between',
      body: 'Rooms are the easy part. The corridor, the threshold, the courtyard and the stair are where a building decides who meets whom, and how often.',
    },
    {
      title: 'Leave room for later',
      body: 'A plan that fixes everything ages badly. We fix the things that are expensive to change and leave the rest to the next forty years.',
    },
  ],
  cta: {
    heading: 'Let’s Work Together',
    body: 'We’re always looking for new opportunities and are comfortable working internationally. Get in touch and one of our project managers will contact you about beginning the proposal process.',
    action: { label: 'Start a conversation', href: '/contact' },
  },
} as const;

export const about = {
  heading: 'We think of architecture not as one practice but as several interlocking ones.',
  body: [
    'Landscape cannot be separated from structure, ecology cannot be separated from the building programme, and the quality of the relationships a place produces is the measure we keep coming back to. Aesthetic movements arrive and leave. These principles have not.',
    'As partners we work for honesty and clarity. Our first job is to understand what a client actually needs, not to arrive with an answer already drawn. We value plain language, prototypes over presentations, decisions made on time, and the occasional long conversation over a meal.',
    'The studio is deliberately small. Every project is led by a partner from first sketch to handover, and we take on only as much work as we can give that attention to.',
  ],
  image: { src: '/images/about-studio.jpg', alt: 'The studio: long windows over the work tables' },
  cta: {
    heading: 'Let’s Work Together',
    action: { label: 'Start a conversation', href: '/contact' },
    image: '/images/cta-about.jpg',
  },
} as const;

export const press = {
  heading: 'Press',
  quotes: [
    {
      quote:
        'Their buildings tend to set up an expectation and then quietly overturn it, which is how they arrive at a sense of weightlessness without ever announcing it.',
      source: 'Press Source',
      year: '2024',
    },
    {
      quote:
        'Utica belong to a new class of studio practising something closer to placemaking than building — a total design position that takes in structure, landscape, ecology and the social life of a site as one problem.',
      source: 'Press Source',
      year: '2023',
    },
    {
      quote:
        'Three of my favourite projects of the year came from the same small studio. Deep research, an unusual amount of wit, and a willingness to leave things unfinished where finishing would have been the lesser choice.',
      source: 'Press Source',
      year: '2023',
    },
  ],
  cta: {
    heading: 'Let’s Work Together',
    action: { label: 'Start a conversation', href: '/contact' },
    image: '/images/cta-press.jpg',
  },
} as const;

export const contact = {
  heading: 'Let’s Work Together',
  body: 'Further case studies available upon request. Please provide some information on your project or goals and we’ll move the conversation on from there.',
} as const;
