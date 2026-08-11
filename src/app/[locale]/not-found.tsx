import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';
import { getContent } from '@/content';
import { defaultLocale, localePath } from '@/i18n/config';

export default function NotFound() {
  const { ui } = getContent(defaultLocale);

  return (
    <Section height="medium" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid className="gap-y-[2.6vmax]">
          <FluidSpan span={{ desktop: [2, 16], mobile: [2, 10] }} className="prose-utica">
            <h1 className="display">{ui.notFound}</h1>
            <p className="mt-[0.8em] text-[var(--muted)]">{ui.notFoundBody}</p>
            <div className="mt-[2em]">
              <ButtonLink href={localePath(defaultLocale, '/')}>
                {ui.backToWork}
              </ButtonLink>
            </div>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
