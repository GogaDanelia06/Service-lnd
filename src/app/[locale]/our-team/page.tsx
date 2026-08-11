import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';
import { getContent } from '@/content';
import type { TeamMember } from '@/content/types';
import { isLocale } from '@/i18n/config';
import { TEAM_SPANS } from '@/lib/team-layout';
import { sizesForColumn } from '@/lib/fluid';

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
          <FluidGrid className="gap-y-[3.2vmax]">
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <SectionLabel index="01">{ui.sections.team}</SectionLabel>
            </FluidSpan>
            <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
              <SplitText as="h1" text={teamPage.heading} className="display" />
            </FluidSpan>
          </FluidGrid>
        </SectionContent>
      </Section>

      <Section height="small" theme="white">
        <SectionContent>
          <FluidGrid className="gap-y-[4vmax]">
            {team.map((member: TeamMember, index: number) => {
              const span = TEAM_SPANS[index % TEAM_SPANS.length]!;

              return (
                <FluidSpan key={`${member.name}-${index}`} span={span}>
                  <Reveal delay={index * 90}>
                    <div className="media aspect-[4/5]">
                      <Image
                        src={member.portrait}
                        alt={`${member.name}, ${member.role}`}
                        fill
                        sizes={sizesForColumn(span)}
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                    <div className="prose-utica mt-6">
                      <div className="flex items-baseline justify-between gap-4 border-t border-[var(--rule)] pt-4">
                        <Meta muted>{String(index + 1).padStart(2, '0')}</Meta>
                        <Meta muted>{member.role}</Meta>
                      </div>
                      <h2 className="mt-[0.5em] text-[length:calc(1.6rem+0.9*var(--type-step))]">
                        {member.name}
                      </h2>
                      <p className="mt-[0.8em] text-[var(--muted)]">{member.bio}</p>
                    </div>
                  </Reveal>
                </FluidSpan>
              );
            })}
          </FluidGrid>
        </SectionContent>
      </Section>
    </>
  );
}
