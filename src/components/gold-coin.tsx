"use client";

export function GoldCoin({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer gold coin circle with shadow */}
      <circle cx="12" cy="12" r="9.5" fill="url(#gold_coin_grad)" stroke="#D97706" strokeWidth="1.2" />
      {/* Inner gold ring */}
      <circle cx="12" cy="12" r="7.2" fill="none" stroke="#FDE047" strokeWidth="0.8" />
      {/* Center symbol */}
      <text
        x="12"
        y="15.2"
        fontSize="9.5"
        fontWeight="900"
        fill="#78350F"
        textAnchor="middle"
        fontFamily="var(--font-heading), sans-serif"
      >
        ₫
      </text>
      {/* Highlight sparkle */}
      <circle cx="9" cy="8" r="1.5" fill="#FFFFFF" fillOpacity="0.6" />
      <defs>
        <linearGradient id="gold_coin_grad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="35%" stopColor="#FACC15" />
          <stop offset="70%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>
    </svg>
  );
}
