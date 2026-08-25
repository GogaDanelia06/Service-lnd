'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

import { Section } from '@/components/fluid/Section';
import { GalleryArrow } from '@/components/work/GalleryArrow';
import { Lightbox, type GalleryLabels } from '@/components/work/Lightbox';
import type { ProjectImage } from '@/content/types';

export function ProjectGallery({
  images,
  labels,
}: {
  images: ProjectImage[];
  labels: GalleryLabels;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBySlide = useCallback((delta: number) => {
    const track = trackRef.current;
    const slides = track ? Array.from(track.children) : [];
    const first = slides[0];
    if (!track || !first) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first.getBoundingClientRect().width + gap;
    const at = Math.round(track.scrollLeft / step);
    const target = slides[Math.min(slides.length - 1, Math.max(0, at + delta))];
    if (!target) return;

    const left =
      target.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left, behavior: 'smooth' });
  }, []);

  if (images.length === 0) return null;

  return (
    <Section height="small" theme="white">
      <div className="site-pad gallery">
        <ul ref={trackRef} className="gallery__track">
          {images.map((image, index) => (
            <li key={image.src} className="gallery__slide">
              <button
                type="button"
                onClick={() => setOpenAt(index)}
                aria-label={`${labels.open} — ${image.alt}`}
                className="gallery__figure"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 84vw, 46vw"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>

        {images.length > 1 ? (
          <div className="gallery__controls">
            <button
              type="button"
              aria-label={labels.previous}
              onClick={() => scrollBySlide(-1)}
              className="gallery__arrow"
            >
              <GalleryArrow direction="prev" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => scrollBySlide(1)}
              className="gallery__arrow"
            >
              <GalleryArrow direction="next" />
            </button>
          </div>
        ) : null}
      </div>

      {openAt !== null ? (
        <Lightbox
          images={images}
          index={openAt}
          labels={labels}
          onClose={() => setOpenAt(null)}
        />
      ) : null}
    </Section>
  );
}
