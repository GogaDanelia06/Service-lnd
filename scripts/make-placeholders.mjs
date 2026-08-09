#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

import { composeArchitecture } from './lib/compose-architecture.mjs';
import { composePortrait } from './lib/compose-portrait.mjs';
import { hash } from './lib/random.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

const IMAGES = [
  { key: 'hero-home', width: 2400, height: 1500 },
  { key: 'about-studio', width: 2000, height: 1500 },
  { key: 'cta-about', width: 2400, height: 1500 },
  { key: 'cta-press', width: 2400, height: 1500 },
  { key: 'team-one', width: 1200, height: 1500, portrait: true },
  { key: 'team-two', width: 1200, height: 1500, portrait: true },
  ...['one', 'two', 'three', 'four'].flatMap((n) => [
    { key: `project-${n}-thumb`, width: 1600, height: 1200 },
    { key: `project-${n}-hero`, width: 2400, height: 1500 },
    { key: `project-${n}-01`, width: 1600, height: 1200 },
    { key: `project-${n}-02`, width: 1600, height: 1200 },
    { key: `project-${n}-03`, width: 2400, height: 1350 },
  ]),
];

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const image of IMAGES) {
    const seed = hash(image.key);
    const svg = (image.portrait ? composePortrait : composeArchitecture)({ ...image, seed });

    const buffer = await sharp(Buffer.from(svg))

      .blur(0.9)
      .linear(1.16, -22)
      .modulate({ brightness: 0.98 })
      .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toBuffer();

    await writeFile(join(OUT, `${image.key}.jpg`), buffer);
    process.stdout.write(
      `  ${image.key}.jpg  ${image.width}x${image.height}  ${(buffer.length / 1024).toFixed(0)}kB\n`,
    );
  }

  console.log(`\nWrote ${IMAGES.length} placeholders to public/images/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
