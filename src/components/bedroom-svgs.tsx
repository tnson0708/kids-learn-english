import React from "react";

export function BedSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Bed">
      {/* Wooden Headboard */}
      <rect x="12" y="24" width="10" height="58" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="2" />
      {/* Wooden Footboard */}
      <rect x="78" y="44" width="10" height="38" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="2" />

      {/* Bed Frame Base */}
      <rect x="16" y="58" width="68" height="18" fill="#b45309" stroke="#78350f" strokeWidth="2" />

      {/* Mattress */}
      <rect x="20" y="48" width="62" height="12" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Soft Pillows */}
      <ellipse cx="32" cy="45" rx="8" ry="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />

      {/* Blanket Cover */}
      <path d="M40 48 L78 48 C80 48 82 50 82 54 L82 66 L38 66 Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
    </svg>
  );
}

export function PillowSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Pillow">
      {/* Plump Pillow Body */}
      <rect x="15" y="28" width="70" height="44" rx="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
      {/* Soft Cushion Seam Indentations */}
      <path d="M15 50 Q50 42 85 50" stroke="#0369a1" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      <path d="M50 28 Q44 50 50 72" stroke="#0369a1" strokeWidth="2" fill="none" strokeDasharray="3 3" />

      {/* Cute Little Star Design */}
      <polygon points="50,34 52,40 58,40 53,44 55,50 50,46 45,50 47,44 42,40 48,40" fill="#fef08a" />
    </svg>
  );
}

export function BlanketSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Blanket">
      {/* Folded Soft Quilted Blanket */}
      <rect x="18" y="22" width="64" height="56" rx="8" fill="#ec4899" stroke="#be185d" strokeWidth="3" />
      {/* Fold Layer Top */}
      <path d="M18 40 L82 40 L82 30 C82 25 78 22 72 22 L28 22 C22 22 18 25 18 30 Z" fill="#f472b6" stroke="#be185d" strokeWidth="2" />

      {/* Polka Dots / Quilt Stitch Lines */}
      <circle cx="34" cy="54" r="3" fill="#fef08a" />
      <circle cx="50" cy="54" r="3" fill="#fef08a" />
      <circle cx="66" cy="54" r="3" fill="#fef08a" />
      <circle cx="42" cy="68" r="3" fill="#fef08a" />
      <circle cx="58" cy="68" r="3" fill="#fef08a" />
    </svg>
  );
}

export function WardrobeSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Wardrobe">
      {/* Outer Wooden Closet Body */}
      <rect x="20" y="10" width="60" height="80" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />
      {/* Top Crown Molding Trim */}
      <rect x="18" y="8" width="64" height="6" rx="2" fill="#78350f" />

      {/* Center Door Division Line */}
      <line x1="50" y1="14" x2="50" y2="76" stroke="#78350f" strokeWidth="2" />

      {/* Door Handles */}
      <ellipse cx="44" cy="45" rx="2" ry="6" fill="#fef08a" />
      <ellipse cx="56" cy="45" rx="2" ry="6" fill="#fef08a" />

      {/* Bottom Drawer */}
      <rect x="24" y="76" width="52" height="12" rx="1" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
      <circle cx="50" cy="82" r="2.5" fill="#fef08a" />
    </svg>
  );
}

export function NightstandSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Nightstand">
      {/* Main Nightstand Box */}
      <rect x="22" y="32" width="56" height="50" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="3" />

      {/* Top Drawer */}
      <rect x="26" y="36" width="48" height="20" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
      <circle cx="50" cy="46" r="3" fill="#fef08a" />

      {/* Bottom Drawer */}
      <rect x="26" y="58" width="48" height="20" rx="2" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
      <circle cx="50" cy="68" r="3" fill="#fef08a" />

      {/* Nightstand Legs */}
      <rect x="26" y="82" width="6" height="10" rx="1" fill="#78350f" />
      <rect x="68" y="82" width="6" height="10" rx="1" fill="#78350f" />

      {/* Small Lamp on Top */}
      <polygon points="42,32 58,32 62,18 38,18" fill="#38bdf8" />
      <rect x="48" y="26" width="4" height="6" fill="#94a3b8" />
    </svg>
  );
}

export function PajamasSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Pajamas">
      {/* Top Pajama Shirt */}
      <path
        d="M30 18 L42 24 L58 24 L70 18 L80 32 L68 38 L68 56 L32 56 L32 38 L20 32 Z"
        fill="#38bdf8"
        stroke="#0284c7"
        strokeWidth="2.5"
      />
      {/* Buttons */}
      <circle cx="50" cy="30" r="2" fill="#f8fafc" />
      <circle cx="50" cy="38" r="2" fill="#f8fafc" />
      <circle cx="50" cy="46" r="2" fill="#f8fafc" />

      {/* Bottom Pajama Pants */}
      <path
        d="M32 58 L68 58 L68 88 L52 88 L50 68 L48 68 L46 88 L32 88 Z"
        fill="#0284c7"
        stroke="#0369a1"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export const CUSTOM_BEDROOM_SVGS: Record<string, React.FC<{ className?: string }>> = {
  bed: BedSvg,
  pillow: PillowSvg,
  blanket: BlanketSvg,
  wardrobe: WardrobeSvg,
  nightstand: NightstandSvg,
  pajamas: PajamasSvg,
};
