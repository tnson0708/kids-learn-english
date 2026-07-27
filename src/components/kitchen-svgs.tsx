import React from "react";

export function DishwasherSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Dishwasher">
      {/* Cabinet Body */}
      <rect x="15" y="12" width="70" height="76" rx="6" fill="#cbd5e1" stroke="#475569" strokeWidth="3" />
      {/* Control Panel Top */}
      <rect x="15" y="12" width="70" height="14" rx="4" fill="#1e293b" />
      {/* LED Buttons */}
      <circle cx="26" cy="19" r="2.5" fill="#ef4444" />
      <circle cx="34" cy="19" r="2.5" fill="#22c55e" />
      <rect x="62" y="16" width="16" height="6" rx="1" fill="#0284c7" />

      {/* Glass Door Window */}
      <rect x="22" y="32" width="56" height="48" rx="4" fill="#0f172a" stroke="#64748b" strokeWidth="2" />

      {/* Racks & Dishes inside */}
      <line x1="26" y1="46" x2="74" y2="46" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="34" cy="42" r="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="46" cy="42" r="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="58" cy="42" r="5" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Bottom Rack & Glasses */}
      <line x1="26" y1="68" x2="74" y2="68" stroke="#94a3b8" strokeWidth="2" />
      <rect x="32" y="56" width="8" height="12" rx="1" fill="#e0f2fe" opacity="0.8" />
      <rect x="46" y="56" width="8" height="12" rx="1" fill="#e0f2fe" opacity="0.8" />
      <rect x="60" y="56" width="8" height="12" rx="1" fill="#e0f2fe" opacity="0.8" />
    </svg>
  );
}

export function FridgeSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Refrigerator">
      {/* Outer Metallic Fridge Shell */}
      <rect x="20" y="10" width="60" height="80" rx="6" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
      {/* Top Freezer Door */}
      <rect x="23" y="13" width="54" height="28" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
      {/* Bottom Refrigerator Door */}
      <rect x="23" y="44" width="54" height="43" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />

      {/* Metallic Door Handles */}
      <rect x="28" y="24" width="3" height="12" rx="1" fill="#475569" />
      <rect x="28" y="52" width="3" height="20" rx="1" fill="#475569" />

      {/* Water / Ice Dispenser Unit */}
      <rect x="52" y="54" width="16" height="18" rx="2" fill="#1e293b" />
      <path d="M60 62 L60 68" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WaterPurifierSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Water Purifier">
      {/* Main Machine Body */}
      <rect x="25" y="12" width="50" height="76" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
      {/* Black Glass Front Panel */}
      <rect x="30" y="18" width="40" height="44" rx="4" fill="#0f172a" />

      {/* LED Touch Display / Water Drop Icon */}
      <path d="M50 24 C46 30 44 34 50 38 C56 34 54 30 50 24 Z" fill="#38bdf8" />
      <circle cx="50" cy="46" r="3" fill="#22c55e" />

      {/* Water Spout & Cup */}
      <rect x="47" y="62" width="6" height="8" rx="1" fill="#64748b" />
      {/* Water Stream */}
      <line x1="50" y1="70" x2="50" y2="76" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" />

      {/* Water Cup / Glass */}
      <path d="M44 76 L56 76 L54 86 L46 86 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
    </svg>
  );
}

export const CUSTOM_KITCHEN_SVGS: Record<string, React.FC<{ className?: string }>> = {
  dishwasher: DishwasherSvg,
  fridge: FridgeSvg,
  water_purifier: WaterPurifierSvg,
};
