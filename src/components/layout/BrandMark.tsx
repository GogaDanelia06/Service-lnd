export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden focusable="false" className={className} fill="currentColor">
      <rect x="0" y="0" width="8" height="32" />
      <rect x="11" y="0" width="21" height="10" />
      <rect x="11" y="13" width="8" height="19" />
      <rect x="24" y="13" width="8" height="19" />
    </svg>
  );
}
