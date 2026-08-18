import React from "react";

export function HeadSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Head">
      {/* Background soft glow circle */}
      <circle cx="50" cy="50" r="44" fill="#fef3c7" stroke="#fde047" strokeWidth="2" />

      {/* Neck */}
      <path d="M42 72 L42 84 Q50 88 58 84 L58 72 Z" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />

      {/* Ears */}
      <circle cx="21" cy="52" r="8" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
      <circle cx="79" cy="52" r="8" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
      <circle cx="21" cy="52" r="4" fill="#fca5a5" />
      <circle cx="79" cy="52" r="4" fill="#fca5a5" />

      {/* Head shape */}
      <ellipse cx="50" cy="50" rx="30" ry="34" fill="#fed7aa" stroke="#fb923c" strokeWidth="2.5" />

      {/* Fluffy cute hair */}
      <path
        d="M20 44 C18 22 32 12 50 12 C68 12 82 22 80 44 C76 34 66 30 58 34 C52 30 44 28 38 34 C30 30 22 36 20 44 Z"
        fill="#7c2d12"
        stroke="#451a03"
        strokeWidth="2"
      />
      {/* Hair tufts */}
      <path d="M40 14 Q50 6 58 14" fill="#7c2d12" stroke="#451a03" strokeWidth="2" />

      {/* Eyebrows */}
      <path d="M34 41 Q40 37 44 41" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 41 Q60 37 66 41" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cute eyes */}
      <circle cx="39" cy="47" r="4" fill="#1e293b" />
      <circle cx="61" cy="47" r="4" fill="#1e293b" />
      {/* Eye highlights */}
      <circle cx="37.5" cy="45.5" r="1.5" fill="#ffffff" />
      <circle cx="59.5" cy="45.5" r="1.5" fill="#ffffff" />

      {/* Cute nose */}
      <path d="M48 53 Q50 56 52 53" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />

      {/* Rosy cheeks */}
      <ellipse cx="32" cy="55" rx="5" ry="3" fill="#f43f5e" opacity="0.4" />
      <ellipse cx="68" cy="55" rx="5" ry="3" fill="#f43f5e" opacity="0.4" />

      {/* Happy smile */}
      <path d="M41 61 Q50 69 59 61" fill="none" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export const CUSTOM_BODY_SVGS: Record<string, React.ComponentType<{ className?: string }>> = {
  head: HeadSvg,
};
