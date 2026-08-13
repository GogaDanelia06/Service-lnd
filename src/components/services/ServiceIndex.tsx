import type { Service } from '@/content';

export function ServiceIndex({ items, label }: { items: Service[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="service-index">
        {items.map((service) => (
          <li key={service.slug}>
            <a href={`#${service.slug}`}>{service.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
