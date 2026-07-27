import React from "react";

export function DurianSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Durian">
      {/* Stem */}
      <path d="M46 12 Q50 4 56 6 L54 18 Z" fill="#451a03" stroke="#27272a" strokeWidth="1.5" />
      {/* Spiky outer shell */}
      <path
        d="M20 50 C18 30 35 16 50 16 C65 16 82 30 80 50 C82 70 65 86 50 86 C35 86 18 70 20 50 Z"
        fill="#854d0e"
        stroke="#713f12"
        strokeWidth="3"
      />
      {/* Spikes around border */}
      <path
        d="M22 35 L12 32 L26 42 L12 48 L25 56 L12 62 L26 70 M78 35 L88 32 L74 42 L88 48 L75 56 L88 62 L74 70"
        stroke="#a16207"
        strokeWidth="3"
        fill="#ca8a04"
        strokeLinejoin="round"
      />
      <path
        d="M32 20 L28 10 L40 22 L45 8 L52 20 L60 8 L65 22 M32 82 L28 92 L40 80 L45 94 L52 82 L60 94 L65 80"
        stroke="#a16207"
        strokeWidth="3"
        fill="#ca8a04"
        strokeLinejoin="round"
      />
      {/* Golden yellow pulp flesh inside */}
      <ellipse cx="50" cy="51" rx="22" ry="26" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
      <path d="M42 38 C38 45 42 62 45 68 C52 70 58 65 56 50 C55 40 46 36 42 38 Z" fill="#facc15" />
    </svg>
  );
}

export function PapayaSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Papaya">
      {/* Stem */}
      <path d="M18 20 L24 16 L28 22 Z" fill="#15803d" />
      {/* Papaya cut half shape */}
      <path
        d="M22 24 C36 15 70 22 84 45 C94 62 82 86 62 88 C40 90 22 72 20 50 C18 36 18 28 22 24 Z"
        fill="#ea580c"
        stroke="#c2410c"
        strokeWidth="3"
      />
      {/* Inner orange pulp cavity */}
      <path
        d="M30 32 C42 26 65 32 75 48 C82 60 72 78 58 78 C42 80 28 66 28 50 Z"
        fill="#f97316"
      />
      {/* Center seed cavity */}
      <ellipse cx="52" cy="54" rx="16" ry="14" fill="#7c2d12" />
      {/* Black round seeds */}
      <circle cx="45" cy="50" r="2.5" fill="#18181b" />
      <circle cx="52" cy="48" r="2.5" fill="#18181b" />
      <circle cx="58" cy="52" r="2.5" fill="#18181b" />
      <circle cx="48" cy="56" r="2.5" fill="#18181b" />
      <circle cx="55" cy="58" r="2.5" fill="#18181b" />
      <circle cx="42" cy="54" r="2" fill="#18181b" />
    </svg>
  );
}

export function DragonFruitSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Dragon Fruit">
      {/* Outer magenta pink body */}
      <path
        d="M50 14 C75 14 85 35 85 55 C85 75 70 88 50 88 C30 88 15 75 15 55 C15 35 25 14 50 14 Z"
        fill="#ec4899"
        stroke="#db2777"
        strokeWidth="3"
      />
      {/* Green leaf scales tips */}
      <path d="M44 14 C48 2 54 2 58 14" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M18 36 C8 30 8 24 22 28" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M82 36 C92 30 92 24 78 28" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M16 60 C4 62 4 68 18 64" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M84 60 C96 62 96 68 82 64" fill="#22c55e" stroke="#15803d" strokeWidth="2" />

      {/* Cross section white pulp */}
      <ellipse cx="50" cy="53" rx="25" ry="26" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      {/* Black speckle seeds */}
      <circle cx="40" cy="42" r="1.5" fill="#09090b" />
      <circle cx="58" cy="40" r="1.5" fill="#09090b" />
      <circle cx="48" cy="48" r="1.5" fill="#09090b" />
      <circle cx="36" cy="56" r="1.5" fill="#09090b" />
      <circle cx="52" cy="58" r="1.5" fill="#09090b" />
      <circle cx="62" cy="52" r="1.5" fill="#09090b" />
      <circle cx="44" cy="66" r="1.5" fill="#09090b" />
      <circle cx="56" cy="68" r="1.5" fill="#09090b" />
    </svg>
  );
}

export function MangosteenSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Mangosteen">
      {/* Green calyx crown top */}
      <path d="M50 10 L54 22 L46 22 Z" fill="#15803d" />
      <circle cx="38" cy="24" r="8" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <circle cx="62" cy="24" r="8" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <circle cx="50" cy="20" r="9" fill="#16a34a" stroke="#15803d" strokeWidth="2" />

      {/* Deep purple round shell */}
      <circle cx="50" cy="56" r="32" fill="#581c87" stroke="#3b0764" strokeWidth="3" />

      {/* White juicy pulp segments visible in cut half */}
      <circle cx="50" cy="56" r="22" fill="#4c1d95" />
      {/* White lobes */}
      <path d="M50 56 L38 42 C44 38 56 38 62 42 Z" fill="#f8fafc" />
      <path d="M50 56 L64 46 C70 54 68 64 60 70 Z" fill="#f8fafc" />
      <path d="M50 56 L56 72 C46 75 38 70 34 62 Z" fill="#f8fafc" />
      <path d="M50 56 L34 58 C32 48 38 42 42 40 Z" fill="#f8fafc" />
    </svg>
  );
}

export function LycheeSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Lychee">
      {/* Green stem */}
      <path d="M35 15 C45 20 55 12 65 18" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Pair of lychees */}
      <g>
        <circle cx="38" cy="52" r="22" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />
        {/* Bumpy texture dots */}
        <circle cx="28" cy="42" r="2" fill="#ef4444" />
        <circle cx="46" cy="44" r="2" fill="#ef4444" />
        <circle cx="34" cy="56" r="2" fill="#ef4444" />
        <circle cx="44" cy="62" r="2" fill="#ef4444" />
        <circle cx="26" cy="58" r="2" fill="#ef4444" />
      </g>
      {/* Peeled open lychee showing translucent white fruit */}
      <g>
        <circle cx="64" cy="58" r="22" fill="#b91c1c" stroke="#991b1b" strokeWidth="2.5" />
        <ellipse cx="64" cy="58" rx="15" ry="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <ellipse cx="64" cy="58" rx="7" ry="9" fill="#451a03" />
      </g>
    </svg>
  );
}

export function RambutanSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Rambutan">
      {/* Hair spines */}
      <path
        d="M20 30 Q10 20 18 35 M20 50 Q6 50 18 55 M24 70 Q10 80 25 72 M40 82 Q38 96 46 84 M60 82 Q65 96 64 80 M78 70 Q90 80 76 68 M80 50 Q94 50 82 46 M78 30 Q90 20 74 34 M60 20 Q65 6 56 22 M40 20 Q35 6 44 22"
        stroke="#22c55e"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Main red body */}
      <circle cx="50" cy="50" r="28" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
      <circle cx="42" cy="40" r="4" fill="#ef4444" />
      <circle cx="56" cy="44" r="5" fill="#ef4444" />
    </svg>
  );
}

export function PassionFruitSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Passion Fruit">
      {/* Stem */}
      <path d="M48 12 L52 12 L51 20 L49 20 Z" fill="#15803d" />
      {/* Dark purple round shell */}
      <circle cx="50" cy="54" r="32" fill="#4c1d95" stroke="#3b0764" strokeWidth="3" />
      {/* Yellow pulpy center cavity */}
      <circle cx="50" cy="54" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
      {/* Dark seeds with orange jelly sacs */}
      <circle cx="42" cy="46" r="4" fill="#15803d" stroke="#ca8a04" strokeWidth="1" />
      <circle cx="42" cy="46" r="2" fill="#09090b" />

      <circle cx="56" cy="44" r="4" fill="#15803d" stroke="#ca8a04" strokeWidth="1" />
      <circle cx="56" cy="44" r="2" fill="#09090b" />

      <circle cx="48" cy="56" r="4.5" fill="#15803d" stroke="#ca8a04" strokeWidth="1" />
      <circle cx="48" cy="56" r="2.5" fill="#09090b" />

      <circle cx="38" cy="60" r="3.5" fill="#15803d" stroke="#ca8a04" strokeWidth="1" />
      <circle cx="38" cy="60" r="1.8" fill="#09090b" />

      <circle cx="58" cy="62" r="4" fill="#15803d" stroke="#ca8a04" strokeWidth="1" />
      <circle cx="58" cy="62" r="2" fill="#09090b" />
    </svg>
  );
}

export const CUSTOM_FRUIT_SVGS: Record<string, React.FC<{ className?: string }>> = {
  durian: DurianSvg,
  papaya: PapayaSvg,
  dragon_fruit: DragonFruitSvg,
  mangosteen: MangosteenSvg,
  lychee: LycheeSvg,
  rambutan: RambutanSvg,
  passion_fruit: PassionFruitSvg,
};
