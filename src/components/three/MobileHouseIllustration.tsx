"use client";

export function MobileHouseIllustration() {
  return (
    <div
      className="relative flex aspect-[4/3] w-full max-w-md items-center justify-center rounded-3xl border border-white/10 bg-linear-to-b from-[#0D3D24] to-[#1D6A47] p-8 shadow-2xl"
      aria-hidden
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full max-h-[220px] drop-shadow-[0_0_24px_rgba(200,136,42,0.25)]"
      >
        <defs>
          <linearGradient id="roof" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2D8A5F" />
            <stop offset="100%" stopColor="#1D6A47" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <polygon
          points="100,28 158,88 42,88"
          fill="url(#roof)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        <rect
          x="52"
          y="88"
          width="96"
          height="88"
          rx="4"
          fill="#0D3D24"
          stroke="rgba(255,255,255,0.12)"
        />
        <rect
          x="68"
          y="108"
          width="22"
          height="22"
          fill="#C8882A"
          opacity="0.9"
          filter="url(#glow)"
        />
        <rect
          x="110"
          y="108"
          width="22"
          height="22"
          fill="#C8882A"
          opacity="0.75"
          filter="url(#glow)"
        />
        <rect x="88" y="138" width="24" height="38" rx="2" fill="#1D6A47" />
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx={30 + (i % 4) * 48}
            cy={24 + Math.floor(i / 4) * 10}
            r="1.2"
            fill="#E8F5EE"
            opacity={0.4 + (i % 3) * 0.15}
          />
        ))}
      </svg>
    </div>
  );
}
