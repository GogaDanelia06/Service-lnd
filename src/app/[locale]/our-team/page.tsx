import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { getContent } from '@/content';
import type { TeamMember } from '@/content/types';
import { isLocale } from '@/i18n/config';
import { TEAM_LAYOUT as LAYOUT } from '@/lib/team-layout';
import { sizesForArea } from '@/lib/fluid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { site, ui } = getContent(locale);
  return {
    title: ui.sections.team,
    description: site.description,
    alternates: { canonical: `/${locale}/our-team` },
  };
}

export default async function OurTeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { team, teamPage, ui } = getContent(locale);

  return (
    <>
      <Section height="small" theme="white" offsetHeader>
        <SectionContent>
          <FluidGrid>
            <FluidBlock
              debugLabel="team/label"
              area={{ desktop: [1, 2, 2, 8], mobile: [1, 2, 2, 10] }}
            >
              <SectionLabel index="01">{ui.sections.team}</SectionLabel>
            </FluidBlock>
            <FluidBlock
              debugLabel="team/heading"
              area={{ desktop: [3, 2, 8, 20], mobile: [3, 2, 9, 10] }}
            >
              <SplitText
                as="h1"
                text={teamPage.heading}
                className="display"
              />
            </FluidBlock>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="small" theme="white">
        <SectionContent>
          <FluidGrid>
            {team.map((member: TeamMember, index: number) => {
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
