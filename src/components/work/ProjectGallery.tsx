import Image from 'next/image';

import { Section } from '@/components/fluid/Section';
import { Meta } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import type { ProjectImage } from '@/content/types';

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  return (
    <Section height="small" theme="white">
      <div className="site-pad grid gap-[var(--fe-gap)] fe:grid-cols-2">
        {images.map((image, index) => (
          <Reveal
            key={image.src}
            delay={(index % 2) * 90}
            className={image.span === 'full' ? 'fe:col-span-2' : undefined}
          >
            <figure>
              <div
                className="media"
                style={{ aspectRatio: image.span === 'full' ? '16 / 9' : '4 / 3' }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={image.span === 'full' ? '92vw' : '(max-width: 767px) 88vw, 46vw'}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <Meta muted>{image.alt}</Meta>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
