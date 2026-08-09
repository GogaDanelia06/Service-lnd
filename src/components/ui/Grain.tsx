const NOISE = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="180" height="180" filter="url(#n)"/></svg>`;

const SRC = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE)}")`;

export function Grain() {
  return <div aria-hidden className="grain" style={{ '--grain-src': SRC } as React.CSSProperties} />;
}
