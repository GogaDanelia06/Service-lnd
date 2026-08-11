import { FluidGrid, FluidSpan } from '@/components/fluid/FluidGrid';
import { Section, SectionContent } from '@/components/fluid/Section';
import { Meta, SectionLabel } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';

type Item = { title: string; body: string };

export function Approach({ items, label }: { items: Item[]; label: string }) {
  return (
    <Section height="medium" theme="white">
      <SectionContent>
        <FluidGrid className="gap-y-[2.6vmax]">
          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <SectionLabel index="04">{label}</SectionLabel>
          </FluidSpan>

          <FluidSpan span={{ desktop: [2, 26], mobile: [2, 10] }}>
            <div className="grid gap-x-[var(--fe-gap)] gap-y-[3vmax] fe:grid-cols-3">
              {items.map((item, index) => (
                <div key={item.title} className="prose-utica">
                  <Reveal delay={index * 110}>
                    <div className="border-t border-[var(--rule)] pt-5">
                      <Meta muted>{String(index + 1).padStart(2, '0')}</Meta>
                      <h3 className="mt-4 text-[length:calc(1.5rem+0.8*var(--type-step))] leading-[1.3]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-[var(--muted)]">{item.body}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </FluidSpan>
        </FluidGrid>
      </SectionContent>
    </Section>
  );
}
