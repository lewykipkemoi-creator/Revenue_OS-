export default function PipelineVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm reveal-up">
      <svg viewBox="0 0 340 460" className="w-full" role="img" aria-label="A phone showing a WhatsApp-style chat turning into a confirmed sale">
        <defs>
          <linearGradient id="phoneBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241B38" />
            <stop offset="100%" stopColor="#1A1329" />
          </linearGradient>
        </defs>

        {/* phone body */}
        <rect x="20" y="10" width="300" height="440" rx="34" fill="#0F0A18" />
        <rect x="30" y="24" width="280" height="412" rx="24" fill="url(#phoneBg)" />

        {/* chat header */}
        <circle cx="56" cy="52" r="14" fill="#3A2F52" />
        <rect x="76" y="45" width="90" height="7" rx="3.5" fill="#4A3D66" />
        <rect x="76" y="57" width="56" height="6" rx="3" fill="#3A2F52" />

        {/* incoming message */}
        <rect x="46" y="86" width="180" height="52" rx="16" fill="#2A2140" />
        <rect x="60" y="100" width="140" height="7" rx="3.5" fill="#4A3D66" />
        <rect x="60" y="114" width="96" height="7" rx="3.5" fill="#4A3D66" />

        {/* Lewy's reply bubble, gold-tinted to show it's the AI's confident answer */}
        <rect x="94" y="150" width="180" height="66" rx="16" fill="#3A2F1E" stroke="#E8A63D" strokeOpacity="0.5" />
        <rect x="108" y="164" width="120" height="7" rx="3.5" fill="#E8A63D" opacity="0.85" />
        <rect x="108" y="178" width="150" height="7" rx="3.5" fill="#E8A63D" opacity="0.6" />
        <rect x="108" y="192" width="90" height="7" rx="3.5" fill="#E8A63D" opacity="0.6" />

        {/* divider */}
        <line x1="46" y1="242" x2="274" y2="242" stroke="#3A2F52" strokeDasharray="3 5" />

        {/* receipt card — the moment of revenue */}
        <rect x="46" y="264" width="228" height="150" rx="18" fill="#1A1329" stroke="#3A2F52" />
        <rect x="66" y="284" width="90" height="8" rx="4" fill="#A296C4" />
        <rect x="66" y="304" width="130" height="7" rx="3.5" fill="#3A2F52" />
        <rect x="66" y="318" width="100" height="7" rx="3.5" fill="#3A2F52" />
        <line x1="66" y1="340" x2="254" y2="340" stroke="#3A2F52" />
        <text x="66" y="368" style={{ fontSize: "13px", fill: "#A296C4" }}>Order confirmed</text>
        <text x="66" y="394" style={{ fontSize: "22px", fontWeight: 600, fill: "#C6712F" }}>KES 2,400</text>
      </svg>
    </div>
  );
}
