const PATHS = {
  prev: 'M15 4l-8 8 8 8',
  next: 'M9 4l8 8-8 8',
  close: 'M5 5l14 14M19 5L5 19',
};

export function GalleryArrow({ direction }: { direction: keyof typeof PATHS }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[direction]} />
    </svg>
  );
}
