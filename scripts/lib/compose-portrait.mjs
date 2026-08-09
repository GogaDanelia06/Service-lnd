import { gray, rng } from './random.mjs';

export function composePortrait({ width, height, seed }) {
  const random = rng(seed);
  const pick = (min, max) => min + random() * (max - min);

  const lightFromLeft = random() > 0.5;
  const wall = pick(186, 214);
  const skin = pick(128, 168);
  const cloth = pick(52, 96);
  const cx = width * pick(0.46, 0.54);
  const headR = width * pick(0.155, 0.185);
  const headY = height * pick(0.3, 0.35);
  const shoulderY = headY + headR * pick(1.5, 1.75);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="wall" x1="${lightFromLeft ? 0 : 1}" y1="0" x2="${lightFromLeft ? 1 : 0}" y2="0.85">
      <stop offset="0" stop-color="${gray(wall + 16)}"/>
      <stop offset="1" stop-color="${gray(wall - 58)}"/>
    </linearGradient>
    <linearGradient id="skin" x1="${lightFromLeft ? 0.1 : 0.9}" y1="0.1" x2="${lightFromLeft ? 0.95 : 0.05}" y2="0.9">
      <stop offset="0" stop-color="${gray(skin + 42)}"/>
      <stop offset="0.55" stop-color="${gray(skin)}"/>
      <stop offset="1" stop-color="${gray(skin - 56)}"/>
    </linearGradient>
    <linearGradient id="cloth" x1="${lightFromLeft ? 0.1 : 0.9}" y1="0" x2="${lightFromLeft ? 0.95 : 0.05}" y2="1">
      <stop offset="0" stop-color="${gray(cloth + 40)}"/>
      <stop offset="1" stop-color="${gray(cloth - 24)}"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="${(width * 0.005).toFixed(2)}"/></filter>
    <radialGradient id="pv" cx="0.5" cy="0.42" r="0.8">
      <stop offset="0.4" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.38"/>
    </radialGradient>
    <filter id="pgrain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" seed="${seed % 883}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.065"/></feComponentTransfer>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#wall)"/>

  <g filter="url(#soft)">
    <path d="M ${(cx - width * 0.42).toFixed(1)} ${height}
             C ${(cx - width * 0.38).toFixed(1)} ${(shoulderY + height * 0.16).toFixed(1)},
               ${(cx - width * 0.26).toFixed(1)} ${shoulderY.toFixed(1)},
               ${cx.toFixed(1)} ${shoulderY.toFixed(1)}
             C ${(cx + width * 0.26).toFixed(1)} ${shoulderY.toFixed(1)},
               ${(cx + width * 0.38).toFixed(1)} ${(shoulderY + height * 0.16).toFixed(1)},
               ${(cx + width * 0.42).toFixed(1)} ${height}
             Z" fill="url(#cloth)"/>
    <rect x="${(cx - headR * 0.42).toFixed(1)}" y="${(headY + headR * 0.7).toFixed(1)}" width="${(headR * 0.84).toFixed(1)}" height="${(headR * 1.1).toFixed(1)}" fill="url(#skin)"/>
    <ellipse cx="${cx.toFixed(1)}" cy="${headY.toFixed(1)}" rx="${(headR * 0.86).toFixed(1)}" ry="${headR.toFixed(1)}" fill="url(#skin)"/>
  </g>

  <rect width="${width}" height="${height}" fill="url(#pv)"/>
  <rect width="${width}" height="${height}" filter="url(#pgrain)"/>
</svg>`;
}
