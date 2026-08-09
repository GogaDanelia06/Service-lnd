import { describe, expect, it } from 'vitest';

import {
  areaStyle,
  desktopWidthFraction,
  FE_COLUMNS,
  sizesForArea,
  toGridArea,
  type FluidArea,
} from './fluid';

describe('toGridArea', () => {
  it('serialises Fluid Engine line numbers', () => {
    expect(toGridArea([1, 2, 6, 20])).toBe('1 / 2 / 6 / 20');
  });
});

describe('areaStyle', () => {
  it('emits both breakpoints', () => {
    const style = areaStyle({ desktop: [1, 2, 6, 20], mobile: [1, 2, 5, 10] }) as Record<
      string,
      string
    >;

    expect(style['--area-desktop']).toBe('1 / 2 / 6 / 20');
    expect(style['--area-mobile']).toBe('1 / 2 / 5 / 10');
  });

  it('falls back to the desktop placement when no mobile area is given', () => {
    const style = areaStyle({ desktop: [1, 2, 3, 8] }) as Record<string, string>;
    expect(style['--area-mobile']).toBe('1 / 2 / 3 / 8');
  });

  it('rejects a desktop column that overruns the 24-column grid', () => {

    expect(() => areaStyle({ desktop: [1, 2, 3, 27] }, 'test')).toThrow(/24-column grid/);
  });

  it('rejects a mobile placement transcribed against the desktop grid', () => {
    expect(() => areaStyle({ desktop: [1, 2, 3, 20], mobile: [1, 2, 3, 20] }, 'test')).toThrow(
      /8-column grid/,
    );
  });

  it('rejects inverted rows', () => {
    expect(() => areaStyle({ desktop: [5, 2, 5, 8] }, 'test')).toThrow(/invalid rows/);
  });
});

describe('desktopWidthFraction', () => {
  it('matches the reference layout: the hero spans 18 of 24 columns', () => {
    expect(desktopWidthFraction([1, 2, 6, 20])).toBeCloseTo(18 / FE_COLUMNS.desktop);
  });

  it('a half-width block reads as 0.5', () => {
    expect(desktopWidthFraction([1, 2, 7, 14])).toBe(0.5);
  });
});

describe('sizesForArea', () => {
  it('never asks for more pixels than the block can show', () => {
    const half: FluidArea = { desktop: [1, 2, 7, 14], mobile: [1, 2, 8, 10] };
    expect(sizesForArea(half)).toBe('(max-width: 767px) 88vw, 46vw');
  });

  it('caps at the viewport width', () => {
    const full: FluidArea = { desktop: [1, 2, 3, 26], mobile: [1, 2, 3, 10] };
    expect(sizesForArea(full)).toBe('(max-width: 767px) 88vw, 92vw');
  });
});
