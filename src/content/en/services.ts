import type { Service } from '@/content/types';

const items: Service[] = [
  {
    slug: 'design',
    image: '/images/service-design.jpg',
    title: 'Design',
    body: 'Architectural and interior design brings together the functional planning of a space, its design language and its technical solutions. The process runs from developing the concept through detailed design, visualisation and the preparation of full working documentation. It lays the groundwork a project needs to be realised properly.',
    list: [
      'Architectural design',
      'Interior design',
      'Exterior design',
      'Landscape design',
      '3D visualisation and renders',
      'Working and detailed design documentation',
    ],
  },
  {
    slug: 'construction',
    image: '/images/service-construction.jpg',
    title: 'Construction',
    body: 'The full cycle of construction work — from design decisions through to built reality. It covers the planning, coordination and execution of the construction process, held to the relevant technical standards and quality-control requirements.',
    list: [
      'Groundworks and structural work',
      'Walls and partitions',
      'Roofing and façade work',
      'Thermal and waterproof insulation',
      'Internal construction work',
      'Engineering systems installation',
      'Site and landscape works',
      'Construction management and quality control',
    ],
  },
  {
    slug: 'renovation',
    image: '/images/service-renovation.jpg',
    title: 'Renovation',
    body: 'Premium-class renovation — the complete set of works, from preparing the space to the final finish. Every stage is carried out to a high standard, with particular attention to quality, the right choice of materials and precision of execution. The result brings a refined visual outcome together with functional completeness.',
    list: [
      'From black- or white-frame shell to a finished space',
      'Preparation and installation work',
      'Electrical and plumbing work',
      'Floors, walls and ceilings',
      'Ceramic, stone and other material installation',
      'Decorative and bespoke interior solutions',
      'Lighting and interior element installation',
      'Final finishes',
    ],
  },
  {
    slug: 'furniture',
    image: '/images/service-furniture.jpg',
    title: 'Furniture and Interior Fit-Out',
    body: 'Complete interior fit-out — the selection, manufacture, delivery and installation of furniture and interior elements. The service covers making furniture to a bespoke design as well as sourcing and selecting ready-made pieces. Every choice answers to the design and the functional requirements of the project.',
    list: [
      'Furniture selection and fit-out',
      'Bespoke furniture manufacture',
      'Sourcing and ordering ready-made furniture',
      'Sourcing equivalents of the furniture and interior elements shown in the render, or making them bespoke',
      'Delivery and installation of furniture and other interior elements',
    ],
  },
  {
    slug: 'one-team',
    image: '',
    title: 'One Team',
    body: 'End-to-end management — one team, one line of responsibility, from concept to final delivery. A team with wide-ranging experience keeps coordination efficient, the work consistent and the standard of execution high. For the client that means simpler communication, full transparency over the process, and as little friction as possible.',
    list: [],
  },
];

export const services = { heading: 'Services', items };
