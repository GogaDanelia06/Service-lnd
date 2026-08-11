export const FE_COLUMNS = { desktop: 24, mobile: 8 } as const;

export type GridArea = readonly [
  rowStart: number,
  colStart: number,
  rowEnd: number,
  colEnd: number,
];

export type FluidArea = {
  desktop: GridArea;
  mobile?: GridArea;
};

export type ColumnSpan = readonly [start: number, end: number];

export type FluidColumn = {
  desktop: ColumnSpan;
  mobile?: ColumnSpan;
};

export function columnStyle(span: FluidColumn): React.CSSProperties {
  const mobile = span.mobile ?? span.desktop;
  return {
    '--col-desktop': `${span.desktop[0]} / ${span.desktop[1]}`,
    '--col-mobile': `${mobile[0]} / ${mobile[1]}`,
  } as React.CSSProperties;
}

export function sizesForColumn(span: FluidColumn): string {
  const d = Math.min(100, Math.ceil(((span.desktop[1] - span.desktop[0]) / FE_COLUMNS.desktop) * 92));
  const m = span.mobile
    ? Math.min(100, Math.ceil(((span.mobile[1] - span.mobile[0]) / FE_COLUMNS.mobile) * 88))
    : 88;
  return `(max-width: 767px) ${m}vw, ${d}vw`;
}

const LINE_MIN = 1;

function assertArea(area: GridArea, columns: number, label: string): void {
  const [rowStart, colStart, rowEnd, colEnd] = area;

  if (rowStart < LINE_MIN || rowEnd <= rowStart) {
    throw new Error(`${label}: invalid rows ${rowStart}→${rowEnd}`);
  }

  const maxLine = columns + 2;
  if (colStart < LINE_MIN || colEnd > maxLine || colEnd <= colStart) {
    throw new Error(
      `${label}: columns ${colStart}→${colEnd} fall outside the ${columns}-column grid (1…${maxLine})`,
    );
  }
}

export function toGridArea(area: GridArea): string {
  return area.join(' / ');
}

export function areaStyle(area: FluidArea, label = 'fluid block'): React.CSSProperties {
  const mobile = area.mobile ?? area.desktop;

  if (process.env.NODE_ENV !== 'production') {
    assertArea(area.desktop, FE_COLUMNS.desktop, `${label} (desktop)`);
    assertArea(mobile, FE_COLUMNS.mobile, `${label} (mobile)`);
  }

  return {
    '--area-desktop': toGridArea(area.desktop),
    '--area-mobile': toGridArea(mobile),
  } as React.CSSProperties;
}

export function desktopWidthFraction(area: GridArea): number {
  const [, colStart, , colEnd] = area;
  return (colEnd - colStart) / FE_COLUMNS.desktop;
}

export function sizesForArea(area: FluidArea): string {
  const desktopVw = Math.min(100, Math.ceil(desktopWidthFraction(area.desktop) * 92));
  const mobileVw = area.mobile
    ? Math.min(100, Math.ceil(((area.mobile[3] - area.mobile[1]) / FE_COLUMNS.mobile) * 88))
    : 88;
  return `(max-width: 767px) ${mobileVw}vw, ${desktopVw}vw`;
}
