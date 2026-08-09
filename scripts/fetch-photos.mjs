#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');
const KEEP_COLOR = process.argv.includes('--color');

const PHOTOS = [

  { key: 'hero-home', id: 101, width: 2400, height: 1500 },
  { key: 'about-studio', id: 192, width: 2000, height: 1500 },
  { key: 'cta-about', id: 181, width: 2400, height: 1500 },
  { key: 'cta-press', id: 214, width: 2400, height: 1500 },

  { key: 'project-one-thumb', id: 57, width: 1600, height: 1200 },
  { key: 'project-two-thumb', id: 144, width: 1200, height: 1600 },
  { key: 'project-three-thumb', id: 193, width: 1600, height: 1200 },
  { key: 'project-four-thumb', id: 61, width: 1200, height: 1600 },

  { key: 'project-one-hero', id: 32, width: 2400, height: 1500 },
  { key: 'project-two-hero', id: 68, width: 2400, height: 1500 },
  { key: 'project-three-hero', id: 134, width: 2400, height: 1500 },
  { key: 'project-four-hero', id: 88, width: 2400, height: 1500 },

  { key: 'project-one-01', id: 208, width: 1600, height: 1200 },
  { key: 'project-one-02', id: 210, width: 1600, height: 1200 },
  { key: 'project-one-03', id: 49, width: 2400, height: 1350 },
  { key: 'project-two-01', id: 77, width: 1600, height: 1200 },
  { key: 'project-two-02', id: 84, width: 1600, height: 1200 },
  { key: 'project-two-03', id: 47, width: 2400, height: 1350 },
  { key: 'project-three-01', id: 78, width: 1600, height: 1200 },
  { key: 'project-three-02', id: 212, width: 1600, height: 1200 },
  { key: 'project-three-03', id: 43, width: 2400, height: 1350 },
  { key: 'project-four-01', id: 162, width: 1600, height: 1200 },
  { key: 'project-four-02', id: 195, width: 1600, height: 1200 },
  { key: 'project-four-03', id: 122, width: 2400, height: 1350 },

  { key: 'team-one', id: 91, width: 1200, height: 1500 },
  { key: 'team-two', id: 65, width: 1200, height: 1500 },
];

const SOURCE_LONG_EDGE = 2600;

async function download(id) {
  const meta = await (await fetch(`https://picsum.photos/id/${id}/info`)).json();
  const ratio = meta.width / meta.height;
  const w = Math.min(SOURCE_LONG_EDGE, meta.width);
  const h = Math.round(w / ratio);

  const res = await fetch(`https://picsum.photos/id/${id}/${w}/${h}`);
  if (!res.ok) throw new Error(`picsum ${id} responded ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log(`Fetching ${PHOTOS.length} photographs${KEEP_COLOR ? ' (colour)' : ' (monochrome)'}…\n`);

  for (const photo of PHOTOS) {
    const source = await download(photo.id);

    let pipeline = sharp(source).resize(photo.width, photo.height, {
      fit: 'cover',

      position: sharp.strategy.attention,
    });

    if (!KEEP_COLOR) {

      pipeline = pipeline.grayscale().linear(1.06, -6).modulate({ brightness: 1.01 });
    }

    const buffer = await pipeline
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toBuffer();

    await writeFile(join(OUT, `${photo.key}.jpg`), buffer);
    console.log(
      `  ${photo.key.padEnd(22)} #${String(photo.id).padEnd(4)} ${photo.width}x${photo.height}  ${(buffer.length / 1024).toFixed(0)}kB`,
    );
  }

  console.log(`\nWrote ${PHOTOS.length} photographs to public/images/`);
  console.log('Source: Lorem Picsum (Unsplash License — free commercial use, no attribution).');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
