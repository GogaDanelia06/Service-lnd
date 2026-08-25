import Image from 'next/image';
import { Fragment } from 'react';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import type { Service } from '@/content';

export function ServiceGroup({ items, includedLabel }: { items: Service[]; includedLabel: string }) {
  return (
    <Section height="medium" theme="white">
      <SectionContent>
        <FluidGrid className="gap-y-[2vmax]">
          {items.map((service, index) => (
            <Fragment key={service.slug}>
              {index > 0 ? (
                <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                  <hr className="rule" />
                </FluidSpan>
              ) : null}

              <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                <h2 id={service.slug} className="[--fs:2.2] scroll-mt-[6vmax]">
                  {service.title}
                </h2>
              </FluidSpan>

              <FluidSpan span={{ desktop: [2, 17], mobile: [2, 10] }}>
                <div className="service-figure">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 767px) 88vw, 58vw"
                    className="object-cover"
                  />
                </div>
                <p className="service-figure__body">{service.body}</p>
              </FluidSpan>

              <FluidSpan span={{ desktop: [18, 26], mobile: [2, 10] }}>
                <p className="service-included">{includedLabel}</p>
                <ul className="service-list">
                  {service.list.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </FluidSpan>
            </Fragment>
          ))}
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
