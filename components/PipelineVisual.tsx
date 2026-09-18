export default function PipelineVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
      <div
        aria-hidden
        className="lewy-breathe absolute h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "conic-gradient(from 90deg, #7C5CFF, #2DD9C6, #FFB86B, #7C5CFF)" }}
      />
      <svg viewBox="0 0 420 460" className="relative w-full max-w-sm" role="img" aria-label="A customer message flowing through Lewy into confirmed revenue">
        <defs>
          <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C5CFF" />
            <stop offset="55%" stopColor="#2DD9C6" />
            <stop offset="100%" stopColor="#FFB86B" />
          </linearGradient>
        </defs>

        {/* connecting spine */}
        <path
          d="M210 90 C 210 150, 210 150, 210 210 C 210 270, 210 270, 210 330"
          stroke="url(#pipeGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          className="pipeline-flow"
        />

        {/* incoming message bubble */}
        <g>
          <rect x="90" y="40" width="130" height="46" rx="16" fill="#131922" stroke="#232B36" />
          <circle cx="112" cy="63" r="4" fill="#7C5CFF" />
          <rect x="126" y="55" width="80" height="6" rx="3" fill="#232B36" />
          <rect x="126" y="67" width="56" height="6" rx="3" fill="#232B36" />
        </g>

        {/* Lewy node */}
        <circle cx="210" cy="210" r="34" fill="#131922" stroke="#2DD9C6" strokeWidth="1.5" />
        <circle cx="210" cy="210" r="10" fill="#2DD9C6" />
        <text x="210" y="264" textAnchor="middle" className="fill-muted" style={{ fontSize: "11px" }}>
          qualified &amp; routed
        </text>

        {/* revenue card */}
        <g>
          <rect x="120" y="330" width="180" height="70" rx="18" fill="#131922" stroke="#FFB86B" strokeOpacity="0.4" />
          <text x="145" y="358" className="fill-current" style={{ fontSize: "11px", fill: "#8891A3" }}>
            Revenue recovered
          </text>
          <text x="145" y="382" style={{ fontSize: "20px", fontWeight: 600, fill: "#FFB86B" }}>
            KES 48,200
          </text>
        </g>
      </svg>
    </div>
  );
}
