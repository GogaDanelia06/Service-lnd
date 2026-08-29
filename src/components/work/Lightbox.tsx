'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { GalleryArrow } from '@/components/work/GalleryArrow';
import type { ProjectImage } from '@/content/types';
import { useModalPanel } from '@/lib/useModalPanel';

export type GalleryLabels = {
  open: string;
  previous: string;
  next: string;
  close: string;
};

export function Lightbox({
  images,
  index,
  labels,
  onClose,
}: {
  images: ProjectImage[];
  index: number;
  labels: GalleryLabels;
  onClose: () => void;
}) {
  const [at, setAt] = useState(index);
  const panelRef = useRef<HTMLDivElement>(null);

  useModalPanel({ open: true, panelRef, onClose });

  const go = useCallback(
    (delta: number) => setAt((prev) => (prev + delta + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [go]);

  const image = images[at];
  if (!image) return null;

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      data-theme="black"
      className="lightbox"
    >
      <button
        type="button"
        aria-label={labels.close}
        onClick={onClose}
        className="lightbox__scrim"
      />

      <figure className="lightbox__stage">
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          sizes="92vw"
          priority
          className="object-contain"
        />
      </figure>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label={labels.previous}
            onClick={() => go(-1)}
            className="lightbox__arrow lightbox__arrow--prev"
          >
            <GalleryArrow direction="prev" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => go(1)}
            className="lightbox__arrow lightbox__arrow--next"
          >
            <GalleryArrow direction="next" />
          </button>
        </>
      ) : null}

      <button type="button" aria-label={labels.close} onClick={onClose} className="lightbox__close">
        <GalleryArrow direction="close" />
      </button>

      <p className="lightbox__count">
        {at + 1} / {images.length}
      </p>
    </div>,
    document.body,
  );
}
