import Image from 'next/image';

import { Section } from '@/components/fluid/Section';
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
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
