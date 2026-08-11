import { describe, expect, it } from 'vitest';

import { getContent } from '@/content';
import { locales } from '@/i18n/config';

type Shape = string | Shape[] | { [key: string]: Shape };

function shapeOf(value: unknown, path = ''): Record<string, string> {
  const out: Record<string, string> = {};

  if (typeof value === 'string') {
    out[path] = 'string';
    return out;
  }
  if (Array.isArray(value)) {
    out[path] = `array:${value.length}`;
    value.forEach((item, i) => Object.assign(out, shapeOf(item, `${path}[${i}]`)));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const [key, inner] of Object.entries(value as Record<string, Shape>)) {
      Object.assign(out, shapeOf(inner, path ? `${path}.${key}` : key));
    }
  }
  return out;
}

const LATIN = /[A-Za-z]{3,}/;
const BRAND = /Montavia/g;
const STRUCTURAL = new Set([
  'slug',
  'src',
  'image',
  'thumbnail',
  'hero',
  'portrait',
  'href',
  'span',
  'index',
]);

describe('dictionaries', () => {
  const shapes = Object.fromEntries(locales.map((l) => [l, shapeOf(getContent(l))]));

  it.each(locales)('%s has the same keys and array lengths as en', (locale) => {
    expect(Object.keys(shapes[locale]!).sort()).toEqual(Object.keys(shapes.en!).sort());
    expect(shapes[locale]).toEqual(shapes.en);
  });

  it('ka has no untranslated Latin copy', () => {
    const leaks: string[] = [];

    const walk = (value: unknown, path: string, key: string) => {
      if (STRUCTURAL.has(key)) return;
      if (typeof value === 'string') {
        if (LATIN.test(value.replace(BRAND, ''))) leaks.push(`${path}: ${value.slice(0, 60)}`);
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((item, i) => walk(item, `${path}[${i}]`, key));
        return;
      }
      if (value && typeof value === 'object') {
        for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k, k);
      }
    };

    walk(getContent('ka'), '', '');
    expect(leaks).toEqual([]);
  });
});
