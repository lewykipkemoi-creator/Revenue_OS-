export default function LewyMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="Lewy">
      <defs>
        <linearGradient id="lewyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C5CFF" />
          <stop offset="55%" stopColor="#2DD9C6" />
          <stop offset="100%" stopColor="#FFB86B" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="#131922" stroke="url(#lewyGrad)" strokeWidth="2.5" />
      <circle cx="36" cy="46" r="6" fill="#E8ECF1" />
      <circle cx="64" cy="46" r="6" fill="#E8ECF1" />
      <path d="M32 64 Q50 78 68 64" stroke="#E8ECF1" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
