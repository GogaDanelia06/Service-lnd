import { Meta } from '@/components/ui/Meta';
import { Reveal } from '@/components/ui/Reveal';
import { stats } from '@/content/site';

export function StatRow() {
  return (
    <dl className="grid grid-cols-2 gap-x-[var(--fe-gap)] gap-y-10 fe:grid-cols-4">
      {stats.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 70} as="div">
          <div className="border-t border-[var(--rule)] pt-4">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="numeral block text-[length:calc(3.2rem+2.2*var(--type-step))] leading-none">
                {stat.value}
              </span>
              <Meta muted className="mt-3 block">
                {stat.label}
              </Meta>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
