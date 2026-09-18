export default function LewyMark({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Lewy, a friendly rounded assistant character wearing a gold neckerchief"
    >
      <defs>
        <radialGradient id="lewyBodyGrad" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#382D52" />
          <stop offset="100%" stopColor="#241B38" />
        </radialGradient>
        <linearGradient id="lewyGemGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4C669" />
          <stop offset="100%" stopColor="#C77F1F" />
        </linearGradient>
      </defs>

      <ellipse cx="60" cy="106" rx="30" ry="6" fill="#0A0712" opacity="0.4" />

      <line x1="60" y1="18" x2="60" y2="8" stroke="#4A3D66" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="7" r="6" fill="url(#lewyGemGrad)" />

      <path
        d="M60 20
           C86 20 100 40 100 64
           C100 90 82 102 60 102
           C38 102 20 90 20 64
           C20 40 34 20 60 20 Z"
        fill="url(#lewyBodyGrad)"
        stroke="#4A3D66"
        strokeWidth="1.5"
      />

      <path d="M22 68 C12 68 10 80 18 84" stroke="#382D52" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M98 68 C108 68 110 78 104 83" stroke="#382D52" strokeWidth="9" fill="none" strokeLinecap="round" />

      <path d="M38 56 Q60 68 82 56 L82 62 Q60 76 38 62 Z" fill="#E8A63D" />
      <circle cx="60" cy="66" r="5" fill="#C77F1F" />

      <ellipse cx="38" cy="66" rx="7" ry="4.5" fill="#C6712F" opacity="0.35" />
      <ellipse cx="82" cy="66" rx="7" ry="4.5" fill="#C6712F" opacity="0.35" />

      <g>
        <ellipse cx="46" cy="54" rx="6" ry="7.5" fill="#F6F1E7" />
        <ellipse cx="74" cy="54" rx="6" ry="7.5" fill="#F6F1E7" />
        <circle cx="47.5" cy="56" r="3.2" fill="#1F1830" />
        <circle cx="75.5" cy="56" r="3.2" fill="#1F1830" />
        <circle cx="49" cy="53.5" r="1.1" fill="#F6F1E7" />
        <circle cx="77" cy="53.5" r="1.1" fill="#F6F1E7" />
      </g>

      <path d="M50 74 Q60 82 70 74" stroke="#F6F1E7" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
