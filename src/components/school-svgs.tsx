import React from "react";

export function DeskSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Study Desk">
      {/* Desk Wooden Top Tabletop */}
      <polygon points="12,42 88,42 84,52 16,52" fill="#d97706" stroke="#b45309" strokeWidth="2" />
      <rect x="15" y="52" width="70" height="6" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />

      {/* Desk Wooden Legs */}
      <rect x="18" y="58" width="8" height="32" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
      <rect x="74" y="58" width="8" height="32" rx="2" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />

      {/* Side Cabinet Drawer Box */}
      <rect x="52" y="58" width="28" height="24" rx="2" fill="#b45309" stroke="#78350f" strokeWidth="2" />
      {/* Drawer divider line */}
      <line x1="52" y1="70" x2="80" y2="70" stroke="#78350f" strokeWidth="1.5" />
      {/* Drawer Knobs */}
      <circle cx="66" cy="64" r="2" fill="#fef08a" />
      <circle cx="66" cy="76" r="2" fill="#fef08a" />

      {/* Laptop / Open Book on Desk Top */}
      <polygon points="26,34 46,34 42,42 22,42" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      <rect x="28" y="24" width="16" height="10" rx="1" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />

      {/* Pencil Holder Cup with Pencils */}
      <rect x="70" y="32" width="8" height="10" rx="1" fill="#f43f5e" />
      <line x1="72" y1="24" x2="72" y2="32" stroke="#eab308" strokeWidth="2" />
      <line x1="75" y1="22" x2="75" y2="32" stroke="#22c55e" strokeWidth="2" />
    </svg>
  );
}

export const CUSTOM_SCHOOL_SVGS: Record<string, React.FC<{ className?: string }>> = {
  desk: DeskSvg,
};
