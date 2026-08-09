import { gray, rng } from './random.mjs';
import { windowGrid } from './window-grid.mjs';

export function composeArchitecture({ width, height, seed }) {
  const random = rng(seed);
  const pick = (min, max) => min + random() * (max - min);

  const lightFromLeft = random() > 0.45;
  const skyTop = pick(196, 232);
  const skyBottom = pick(148, 184);
  const horizon = height * pick(0.68, 0.9);

  const planeCount = Math.round(pick(9, 14));
  const planes = [];

  for (let i = 0; i < planeCount; i += 1) {
    const depth = i / (planeCount - 1);
    const w = width * pick(0.12, 0.4);
    const h = height * (0.22 + depth * pick(0.3, 0.66));
    const x = lightFromLeft
      ? width * pick(-0.08, 0.94) - w * 0.3
      : width * pick(0.06, 1.08) - w * 0.7;
    const base = 196 - depth * pick(78, 148);

    planes.push({
      depth,
      x,
      y: horizon - h,
      w,
      h,
      lit: base + pick(24, 46),
      shade: base - pick(30, 62),
      haze: (1 - depth) * pick(0.3, 0.55),
    });
  }

  planes.sort((a, b) => a.depth - b.depth);

  const windows = windowGrid(planes, pick, random, lightFromLeft);

  const shaftX = lightFromLeft ? width * pick(0.04, 0.3) : width * pick(0.7, 0.96);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="${lightFromLeft ? 0.35 : -0.35}" y2="1">
      <stop offset="0" stop-color="${gray(skyTop)}"/>
      <stop offset="1" stop-color="${gray(skyBottom)}"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${gray(skyBottom - 26)}"/>
      <stop offset="1" stop-color="${gray(skyBottom - 78)}"/>
    </linearGradient>
${planes
  .map(
    (p, i) => `    <linearGradient id="p${i}" x1="${lightFromLeft ? 0 : 1}" y1="0" x2="${lightFromLeft ? 1 : 0}" y2="0.35">
      <stop offset="0" stop-color="${gray(p.lit)}"/>
      <stop offset="0.42" stop-color="${gray((p.lit + p.shade) / 2)}"/>
      <stop offset="1" stop-color="${gray(p.shade)}"/>
    </linearGradient>`,
  )
  .join('\n')}
    <linearGradient id="shaft" x1="0" y1="0" x2="0.2" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.78">
      <stop offset="0.45" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.46"/>
    </radialGradient>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" seed="${seed % 977}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <rect x="0" y="${horizon.toFixed(1)}" width="${width}" height="${(height - horizon).toFixed(1)}" fill="url(#ground)"/>

${planes
  .map(
    (p, i) => `  <g>
    <rect x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" width="${p.w.toFixed(1)}" height="${p.h.toFixed(1)}" fill="url(#p${i})"/>
    <rect x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" width="${p.w.toFixed(1)}" height="${p.h.toFixed(1)}" fill="${gray(skyTop)}" opacity="${p.haze.toFixed(3)}"/>
  </g>`,
  )
  .join('\n')}

${windows
  .map(
    (w) =>
      `  <rect x="${w.x.toFixed(1)}" y="${w.y.toFixed(1)}" width="${w.w.toFixed(1)}" height="${w.h.toFixed(1)}" fill="${gray(w.tone)}" opacity="0.88"/>`,
  )
  .join('\n')}

  <polygon points="${shaftX.toFixed(1)},0 ${(shaftX + width * 0.26).toFixed(1)},0 ${(shaftX + width * 0.06).toFixed(1)},${height} ${(shaftX - width * 0.16).toFixed(1)},${height}" fill="url(#shaft)"/>
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>
  <rect width="${width}" height="${height}" filter="url(#grain)"/>
</svg>`;
}
