import React from "react";

export function CoffeeTableSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Coffee Table">
      {/* Tabletop */}
      <ellipse cx="50" cy="46" rx="42" ry="16" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
      <ellipse cx="50" cy="44" rx="38" ry="13" fill="#d97706" />

      {/* Tea set on table */}
      <rect x="42" y="36" width="16" height="8" rx="2" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <circle cx="62" cy="40" r="3" fill="#38bdf8" />

      {/* Table Legs */}
      <rect x="22" y="56" width="6" height="28" rx="2" fill="#78350f" />
      <rect x="72" y="56" width="6" height="28" rx="2" fill="#78350f" />
      <rect x="47" y="58" width="6" height="24" rx="2" fill="#92400e" />
    </svg>
  );
}

export function ElectricFanSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Electric Fan">
      {/* Base */}
      <ellipse cx="50" cy="86" rx="22" ry="6" fill="#64748b" stroke="#334155" strokeWidth="2" />
      {/* Stand Pole */}
      <rect x="47" y="44" width="6" height="40" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />

      {/* Outer Cage Guard */}
      <circle cx="50" cy="30" r="26" fill="#f1f5f9" stroke="#475569" strokeWidth="2.5" />
      {/* Cage Spoke lines */}
      <line x1="50" y1="4" x2="50" y2="56" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="24" y1="30" x2="76" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="32" y1="12" x2="68" y2="48" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="32" y1="48" x2="68" y2="12" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Fan Blades (3 blue blades) */}
      <path d="M50 30 C42 16 35 24 50 30 Z" fill="#0284c7" />
      <path d="M50 30 C64 38 56 46 50 30 Z" fill="#0284c7" />
      <path d="M50 30 C36 40 40 50 50 30 Z" fill="#0284c7" />

      {/* Center cap */}
      <circle cx="50" cy="30" r="5" fill="#0369a1" stroke="#0284c7" strokeWidth="1" />
    </svg>
  );
}

export function AirConditionerSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Air Conditioner">
      {/* Main AC Unit Body */}
      <rect x="10" y="24" width="80" height="34" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
      {/* Front Panel Accent Strip */}
      <rect x="10" y="44" width="80" height="4" fill="#e2e8f0" />
      {/* Digital Temp Display */}
      <rect x="70" y="32" width="14" height="8" rx="1" fill="#0f172a" />
      <text x="77" y="38" fontSize="6" fontWeight="bold" fill="#22c55e" textAnchor="middle">24°</text>

      {/* Bottom Air Vent Flap */}
      <rect x="16" y="52" width="68" height="3" rx="1" fill="#94a3b8" />

      {/* Cool Airflow Stream Lines */}
      <path d="M25 62 Q20 74 18 85" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      <path d="M50 62 Q50 75 50 86" stroke="#38bdf8" strokeWidth="2.5" fill="none" strokeDasharray="3 3" />
      <path d="M75 62 Q80 74 82 85" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="3 3" />
    </svg>
  );
}

export function CarpetSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Carpet Rug">
      {/* Outer Fringe Threads top and bottom */}
      <path d="M18 16 L18 20 M26 16 L26 20 M34 16 L34 20 M42 16 L42 20 M50 16 L50 20 M58 16 L58 20 M66 16 L66 20 M74 16 L74 20 M82 16 L82 20" stroke="#d97706" strokeWidth="2" />
      <path d="M18 80 L18 84 M26 80 L26 84 M34 80 L34 84 M42 80 L42 84 M50 80 L50 84 M58 80 L58 84 M66 80 L66 84 M74 80 L74 84 M82 80 L82 84" stroke="#d97706" strokeWidth="2" />

      {/* Main Rug Body */}
      <rect x="15" y="20" width="70" height="60" rx="3" fill="#be123c" stroke="#9f1239" strokeWidth="2.5" />
      {/* Inner Decorative Border */}
      <rect x="22" y="27" width="56" height="46" rx="2" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="4 2" />

      {/* Center Diamond Pattern */}
      <polygon points="50,34 66,50 50,66 34,50" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      <polygon points="50,42 58,50 50,58 42,50" fill="#0284c7" />
    </svg>
  );
}

export function RemoteControlSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Remote Control">
      {/* Main Remote Body */}
      <rect x="30" y="10" width="40" height="80" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="3" />

      {/* Red Power Button */}
      <circle cx="42" cy="22" r="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
      {/* Mute / Aux Buttons */}
      <circle cx="58" cy="22" r="3" fill="#64748b" />

      {/* Circular Directional D-Pad Navigation Wheel */}
      <circle cx="50" cy="46" r="14" fill="#334155" stroke="#475569" strokeWidth="2" />
      <circle cx="50" cy="46" r="5" fill="#38bdf8" />

      {/* Number keypad buttons */}
      <rect x="38" y="66" width="6" height="4" rx="1" fill="#64748b" />
      <rect x="47" y="66" width="6" height="4" rx="1" fill="#64748b" />
      <rect x="56" y="66" width="6" height="4" rx="1" fill="#64748b" />

      <rect x="38" y="74" width="6" height="4" rx="1" fill="#64748b" />
      <rect x="47" y="74" width="6" height="4" rx="1" fill="#64748b" />
      <rect x="56" y="74" width="6" height="4" rx="1" fill="#64748b" />
    </svg>
  );
}

export function FloorLampSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Floor Lamp">
      {/* Base */}
      <ellipse cx="50" cy="88" rx="20" ry="5" fill="#475569" stroke="#1e293b" strokeWidth="2" />
      {/* Pole */}
      <rect x="48" y="32" width="4" height="56" fill="#94a3b8" />

      {/* Lampshade */}
      <polygon points="34,36 66,36 74,16 26,16" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
      {/* Soft warm light glow */}
      <polygon points="26,36 74,36 88,90 12,90" fill="#fef08a" opacity="0.25" />
    </svg>
  );
}

export function FishTankSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Fish Tank">
      {/* Glass Tank Frame */}
      <rect x="12" y="24" width="76" height="60" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" opacity="0.9" />
      {/* Water Fill */}
      <rect x="15" y="32" width="70" height="49" rx="2" fill="#38bdf8" opacity="0.6" />
      {/* Seaweed / Plants */}
      <path d="M24 78 Q20 54 28 40" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M76 78 Q80 58 72 44" stroke="#22c55e" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* Orange Little Fish */}
      <path d="M40 50 C48 44 56 46 60 52 C56 58 48 60 40 54 L34 58 L36 52 L34 46 Z" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
      <circle cx="54" cy="50" r="1.5" fill="#0f172a" />

      {/* Air Bubbles */}
      <circle cx="28" cy="38" r="2" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1" />
      <circle cx="30" cy="46" r="3" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="1" />
    </svg>
  );
}

export function HammockSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Hammock">
      {/* Hanging Support Ropes */}
      <line x1="8" y1="20" x2="22" y2="44" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
      <line x1="92" y1="20" x2="78" y2="44" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />

      {/* Curving Woven Hammock Net Netting */}
      <path
        d="M22 44 C34 76 66 76 78 44 C66 66 34 66 22 44 Z"
        fill="#0284c7"
        stroke="#0369a1"
        strokeWidth="2.5"
      />
      {/* Mesh stripes */}
      <path d="M30 48 Q50 70 70 48" stroke="#38bdf8" strokeWidth="2" fill="none" />
      <path d="M35 54 Q50 68 65 54" stroke="#e0f2fe" strokeWidth="1.5" fill="none" />

      {/* Soft Pillow inside Hammock */}
      <ellipse cx="32" cy="50" rx="7" ry="5" fill="#f43f5e" />
    </svg>
  );
}

export function RobotVacuumSvg({ className = "size-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Robot Vacuum">
      {/* Outer Round Disc Body */}
      <circle cx="50" cy="50" r="36" fill="#1e293b" stroke="#0f172a" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="32" fill="#334155" />

      {/* Front Bumper Strip */}
      <path d="M18 42 C24 20 76 20 82 42" stroke="#64748b" strokeWidth="3" fill="none" />

      {/* Top Laser LiDAR Sensor Turret */}
      <circle cx="50" cy="36" r="9" fill="#0f172a" stroke="#475569" strokeWidth="2" />
      <circle cx="50" cy="36" r="4" fill="#ef4444" />

      {/* Power Button */}
      <circle cx="50" cy="64" r="4" fill="#22c55e" />

      {/* Side Sweeping Brush Whisker spin lines */}
      <line x1="22" y1="62" x2="12" y2="72" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      <line x1="78" y1="62" x2="88" y2="72" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export const CUSTOM_LIVING_ROOM_SVGS: Record<string, React.FC<{ className?: string }>> = {
  table: CoffeeTableSvg,
  fan: ElectricFanSvg,
  air_conditioner: AirConditionerSvg,
  carpet: CarpetSvg,
  remote_control: RemoteControlSvg,
  lamp: FloorLampSvg,
  fish_tank: FishTankSvg,
  hammock: HammockSvg,
  robot_vacuum: RobotVacuumSvg,
};

