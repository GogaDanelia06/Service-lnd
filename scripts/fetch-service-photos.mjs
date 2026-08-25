#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

const PHOTOS = [
  { key: 'service-design', id: 1076, width: 1600, height: 1120 },
  { key: 'service-construction', id: 1048, width: 1600, height: 1120 },
  { key: 'service-renovation', id: 164, width: 1600, height: 1120 },
  { key: 'service-furniture', id: 42, width: 1600, height: 1120 },
];

const SOURCE_LONG_EDGE = 2600;
const BALANCE_LIMIT = 0.22;

async function greyWorld(buffer) {
  const { channels } = await sharp(buffer).stats();
  const means = channels.slice(0, 3).map((c) => c.mean);
  const target = means.reduce((a, b) => a + b, 0) / 3;
  return means.map((m) =>
    Math.min(1 + BALANCE_LIMIT, Math.max(1 - BALANCE_LIMIT, target / m)),
  );
}

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
  for (const photo of PHOTOS) {
    const source = await download(photo.id);
    const cropped = await sharp(source)
      .resize(photo.width, photo.height, { fit: 'cover', position: sharp.strategy.attention })
      .toBuffer();
    const balance = await greyWorld(cropped);
    const balanced = await sharp(cropped).linear(balance, [0, 0, 0]).toBuffer();
    const buffer = await sharp(balanced)
      .modulate({ saturation: 0.74, brightness: 1.02 })
      .linear([0.99, 1.0, 1.03], [-2, -2, 0])
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toBuffer();
    await writeFile(join(OUT, `${photo.key}.jpg`), buffer);
    console.log(`  ${photo.key.padEnd(24)} #${String(photo.id).padEnd(4)} ${photo.width}x${photo.height}  ${(buffer.length / 1024).toFixed(0)}kB`);
  }
  console.log(`\nWrote ${PHOTOS.length} service photographs. Existing images untouched.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
