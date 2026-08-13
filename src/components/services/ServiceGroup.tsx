import { Fragment } from 'react';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import type { Service } from '@/content';

export function ServiceGroup({ items }: { items: Service[] }) {
  return (
    <Section height="medium" theme="white">
      <SectionContent>
        <FluidGrid className="gap-y-[2.4vmax]">
          {items.map((service, index) => (
            <Fragment key={service.slug}>
              {index > 0 ? (
                <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
                  <hr className="rule" />
                </FluidSpan>
              ) : null}

              <FluidSpan span={{ desktop: [2, 12], mobile: [2, 10] }}>
                <h2 id={service.slug} className="service-title [--fs:2.2]">
                  {service.title}
                </h2>
              </FluidSpan>

              <FluidSpan span={{ desktop: [12, 26], mobile: [2, 10] }} className="prose-utica">
                <p>{service.body}</p>
                <ul className="capability-list">
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
