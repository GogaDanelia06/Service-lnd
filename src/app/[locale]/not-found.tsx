import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';
import { getContent } from '@/content';
import { defaultLocale, localePath } from '@/i18n/config';

export default function NotFound() {
  const { ui } = getContent(defaultLocale);

  return (
    <Section height="medium" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="404"
            area={{ desktop: [1, 2, 6, 16], mobile: [1, 2, 6, 10] }}
            className="prose-utica"
          >
            <h1 className="display">{ui.notFound}</h1>
            <p className="mt-[0.8em] text-[var(--muted)]">{ui.notFoundBody}</p>
            <div className="mt-[2em]">
              <ButtonLink href={localePath(defaultLocale, '/')} arrow>
                {ui.backToWork}
              </ButtonLink>
            </div>
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
