import Image from 'next/image';
import type { Metadata } from 'next';
import { Fragment } from 'react';

import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { team } from '@/content/team';
import { sizesForArea, type FluidArea } from '@/lib/fluid';

const LAYOUT: { portrait: FluidArea; text: FluidArea }[] = [
  {
    portrait: { desktop: [1, 2, 15, 12], mobile: [1, 2, 13, 10] },
    text: { desktop: [15, 2, 22, 12], mobile: [13, 2, 22, 10] },
  },
  {
    portrait: { desktop: [4, 15, 18, 25], mobile: [24, 2, 36, 10] },
    text: { desktop: [18, 15, 25, 25], mobile: [36, 2, 45, 10] },
  },
];

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'The partners and staff behind Utica.',
  alternates: { canonical: '/our-team' },
};

export default function OurTeamPage() {
  return (
    <>
      <Section height="small" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid>
            <FluidBlock
              debugLabel="team/label"
              area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
            >
              <SectionLabel index="01">Our Team</SectionLabel>
            </FluidBlock>
            <FluidBlock
              debugLabel="team/heading"
              area={{ desktop: [3, 2, 8, 20], mobile: [3, 2, 9, 10] }}
            >
              <SplitText
                as="h1"
                text="Every project is led by a partner, from first sketch to handover."
                className="display"
              />
            </FluidBlock>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="small" theme="white">
        <SectionContent>
          <FluidGrid>
            {team.map((member, index) => {
              const layout = LAYOUT[index] ?? LAYOUT[0]!;

              return (
                <Fragment key={`${member.name}-${index}`}>
                  <FluidBlock
                    debugLabel={`team/${index}/portrait`}
                    area={layout.portrait}
                    className="media"
                  >
                    <Reveal delay={index * 90} className="absolute inset-0">
                      <Image
                        src={member.portrait}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes={sizesForArea(layout.portrait)}
                        className="object-cover"
                        priority={index === 0}
                      />
                    </Reveal>
                  </FluidBlock>

                  <FluidBlock
                    debugLabel={`team/${index}/text`}
                    area={layout.text}
                    className="prose-utica"
                  >
                    <Reveal delay={index * 90 + 60}>
                      <div className="flex items-baseline justify-between gap-4 border-t border-[var(--rule)] pt-4">
                        <Meta muted>{String(index + 1).padStart(2, '0')}</Meta>
                        <Meta muted>{member.role}</Meta>
                      </div>
                      <h2 className="mt-[0.5em] text-[length:calc(1.6rem+0.9*var(--type-step))]">
                        {member.name}
                      </h2>
                      <p className="mt-[0.8em] text-[var(--muted)]">{member.bio}</p>
                    </Reveal>
                  </FluidBlock>
                </Fragment>
              );
            })}
          </FluidGrid>
        </SectionContent>
      </Section>
    </>
  );
}
