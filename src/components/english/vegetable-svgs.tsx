import React from "react";

export function RadishSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="White Radish">
      {/* Green leaves */}
      <path d="M45 35 C35 20 20 20 18 32 C28 32 40 38 45 42" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
      <path d="M50 35 C50 15 35 10 32 24 C40 26 46 32 50 40" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M55 35 C65 20 80 20 82 32 C72 32 60 38 55 42" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />

      {/* Main white daikon body */}
      <path
        d="M32 42 C30 55 38 75 48 95 C50 99 52 99 54 95 C64 75 72 55 70 42 C68 36 34 36 32 42 Z"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="3"
      />
      {/* Soft shading & root lines */}
      <path d="M40 55 Q50 58 60 55" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M42 68 Q50 70 58 68" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M45 80 Q50 82 55 80" stroke="#cbd5e1" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Root tip */}
      <path d="M51 95 Q50 99 49 100" stroke="#94a3b8" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SquashSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Squash">
      {/* Stem */}
      <path d="M46 25 Q50 12 56 16 L54 28 Z" fill="#15803d" stroke="#166534" strokeWidth="2" />

      {/* Main squash body lobes */}
      <ellipse cx="50" cy="58" rx="40" ry="28" fill="#f97316" stroke="#ea580c" strokeWidth="3" />
      <ellipse cx="50" cy="58" rx="28" ry="27" fill="#fb923c" stroke="#ea580c" strokeWidth="2" />
      <ellipse cx="50" cy="58" rx="14" ry="26" fill="#fdba74" stroke="#ea580c" strokeWidth="1.5" />
    </svg>
  );
}

export function LuffaSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Luffa Sponge Gourd">
      {/* Stem/Cap */}
      <path d="M22 25 Q20 16 26 14 L30 24 Z" fill="#15803d" stroke="#166534" strokeWidth="2" />
      {/* Long curved green luffa body */}
      <path
        d="M26 24 C40 28 65 40 78 62 C85 73 82 85 72 88 C60 90 48 76 38 60 C26 42 22 30 26 24 Z"
        fill="#22c55e"
        stroke="#15803d"
        strokeWidth="3"
      />
      {/* Characteristic luffa vertical ridge stripes */}
      <path
        d="M28 28 C42 32 65 45 74 65 C80 75 76 82 70 84"
        stroke="#4ade80"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M25 32 C35 38 55 52 64 70"
        stroke="#16a34a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Flower remnant tip */}
      <circle cx="76" cy="86" r="3" fill="#facc15" />
    </svg>
  );
}

export function BitterMelonSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Bitter Melon">
      {/* Stem */}
      <path d="M20 22 Q18 12 24 10 L28 20 Z" fill="#166534" />
      {/* Bumpy oblong body */}
      <path
        d="M25 20 C42 25 70 45 80 68 C86 80 76 88 66 84 C48 78 30 55 20 36 C16 28 20 22 25 20 Z"
        fill="#16a34a"
        stroke="#14532d"
        strokeWidth="3"
      />
      {/* Characteristic bumps */}
      <circle cx="35" cy="35" r="3.5" fill="#4ade80" />
      <circle cx="48" cy="46" r="4" fill="#4ade80" />
      <circle cx="62" cy="58" r="4" fill="#4ade80" />
      <circle cx="72" cy="70" r="3.5" fill="#4ade80" />
      <circle cx="42" cy="40" r="3" fill="#86efac" />
      <circle cx="56" cy="52" r="3.5" fill="#86efac" />
      <circle cx="68" cy="64" r="3" fill="#86efac" />
    </svg>
  );
}

export function BottleGourdSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Bottle Gourd">
      {/* Stem */}
      <path d="M46 16 L54 16 L52 24 L48 24 Z" fill="#15803d" />
      {/* Hourglass bottle gourd body */}
      <path
        d="M40 24 C40 24 60 24 60 24 C65 35 60 45 54 50 C68 56 75 70 72 82 C68 94 32 94 28 82 C25 70 32 56 46 50 C40 45 35 35 40 24 Z"
        fill="#86efac"
        stroke="#16a34a"
        strokeWidth="3"
      />
      {/* Soft highlight */}
      <path d="M42 30 C40 35 42 42 46 46" stroke="#bbf7d0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M36 62 C34 72 40 82 48 86" stroke="#bbf7d0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function MalabarSpinachSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Malabar Spinach">
      {/* Red/purple vine stem */}
      <path d="M20 85 C35 70 45 50 80 20" stroke="#9d174d" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Heart-shaped thick green leaves */}
      <path
        d="M35 60 C20 40 40 25 50 42 C60 25 80 40 65 60 C55 72 45 72 35 60 Z"
        fill="#16a34a"
        stroke="#14532d"
        strokeWidth="2.5"
      />
      <path
        d="M18 75 C8 60 22 48 30 60 C38 48 52 60 40 75 C32 82 25 82 18 75 Z"
        fill="#22c55e"
        stroke="#15803d"
        strokeWidth="2"
      />
      {/* Leaf veins */}
      <path d="M50 42 L50 64" stroke="#86efac" strokeWidth="2" />
      <path d="M30 60 L30 74" stroke="#bbf7d0" strokeWidth="1.5" />
    </svg>
  );
}

export const CUSTOM_VEGETABLE_SVGS: Record<string, React.FC<{ className?: string }>> = {
  radish: RadishSvg,
  squash: SquashSvg,
  luffa: LuffaSvg,
  bitter_melon: BitterMelonSvg,
  bottle_gourd: BottleGourdSvg,
  malabar_spinach: MalabarSpinachSvg,
};
