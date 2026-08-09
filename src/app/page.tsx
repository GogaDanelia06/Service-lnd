import { Section } from '@/components/fluid/Section';
import { BleedImage } from '@/components/sections/BleedImage';
import { CtaSection } from '@/components/sections/CtaSection';
import { Approach } from '@/components/sections/home/Approach';
import { Practice } from '@/components/sections/home/Practice';
import { Statement } from '@/components/sections/home/Statement';
import { WorkIntro } from '@/components/sections/home/WorkIntro';
import { ProjectIndex } from '@/components/work/ProjectIndex';
import { home } from '@/content/pages';
import { projects } from '@/content/projects';

export default function WorkPage() {
  return (
    <>
      <Statement />

      <BleedImage
        src={home.hero.image}
        alt={home.hero.alt}
        caption={home.hero.caption}
        priority
      />

      <Practice />
      <WorkIntro />

      <Section height="small" theme="white">
        <ProjectIndex projects={projects} />
      </Section>

      <Approach />

      <CtaSection heading={home.cta.heading} body={home.cta.body} action={home.cta.action} />
    </>
  );
}
