import { FluidBlock, FluidGrid } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section height="medium" theme="white" offsetHeader>
      <SectionContent>
        <FluidGrid>
          <FluidBlock
            debugLabel="404"
            area={{ desktop: [1, 2, 6, 16], mobile: [1, 2, 6, 10] }}
            className="prose-utica"
          >
            <h1>This page doesn’t exist.</h1>
            <p className="mt-[0.8em]">
              The link may be out of date, or the page may have moved.
            </p>
            <div className="mt-[2em]">
              <ButtonLink href="/">Back to work</ButtonLink>
            </div>
          </FluidBlock>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
