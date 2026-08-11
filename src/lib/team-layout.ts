import type { FluidArea } from '@/lib/fluid';

export const TEAM_LAYOUT: { portrait: FluidArea; text: FluidArea }[] = [
  {
    portrait: { desktop: [1, 2, 15, 12], mobile: [1, 2, 13, 10] },
    text: { desktop: [15, 2, 22, 12], mobile: [13, 2, 22, 10] },
  },
  {
    portrait: { desktop: [4, 15, 18, 25], mobile: [24, 2, 36, 10] },
    text: { desktop: [18, 15, 25, 25], mobile: [36, 2, 45, 10] },
  },
];
