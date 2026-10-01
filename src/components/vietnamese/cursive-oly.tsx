import {
  FONT_SIZE_PER_LI,
  TAPDO_FONT,
  TAPVIET_FONT,
  describeHeight,
  slotLi,
} from "@/data/vietnamese/cursive-font";
import { cn } from "@/lib/utils";

/** SVG user units per ô li. Kept > 1 so tiny font sizes never hit browser minimum-font clamps. */
export const U = 10;
export const MODEL_RED = "#dc2626";
export const TRACE_GRAY = "#64748b";

interface CursiveOlyGridProps {
  widthLi: number;
  heightLi: number;
  /** A baseline (in li from the top); bold lines repeat every 4 li from here, like a real vở ô ly. */
  baselineLi: number;
  /** Emphasise the bold lines a bit more for paper. */
  variant?: "screen" | "print";
}

/**
 * "Vở 4 ô ly" ruling: a thin line every li, a bold line every 4 li (one big ô), and vertical
 * lines one big ô apart. All in li × U user units.
 */
export function CursiveOlyGrid({ widthLi, heightLi, baselineLi, variant = "screen" }: CursiveOlyGridProps) {
  const thin = variant === "print" ? "#93c5fd" : "#bae6fd";
  const bold = variant === "print" ? "#2563eb" : "#38bdf8";
  const lines: React.ReactNode[] = [];
  for (let y = 0; y <= heightLi; y++) {
    const isBold = (((y - baselineLi) % 4) + 4) % 4 === 0;
    lines.push(
      <line
        key={`h${y}`}
        x1={0}
        x2={widthLi * U}
        y1={y * U}
        y2={y * U}
        stroke={isBold ? bold : thin}
        strokeWidth={isBold ? 0.16 * U : 0.07 * U}
      />
    );
  }
  for (let x = 0; x <= widthLi; x += 4) {
    lines.push(
      <line key={`v${x}`} x1={x * U} x2={x * U} y1={0} y2={heightLi * U} stroke={thin} strokeWidth={0.09 * U} />
    );
  }
  return <g>{lines}</g>;
}

interface CursiveGlyphProps {
  ch: string;
  /** Left edge and baseline, in li. */
  xLi: number;
  baselineLi: number;
  style?: "model" | "trace";
  /** Optional colour override for model letters. */
  color?: string;
}

/** One handwriting letter sitting on a baseline: solid red model or dotted tracing copy. */
export function CursiveGlyph({ ch, xLi, baselineLi, style = "model", color }: CursiveGlyphProps) {
  const isModel = style === "model";
  return (
    <text
      x={xLi * U}
      y={baselineLi * U}
      fontSize={FONT_SIZE_PER_LI * U}
      fill={isModel ? color ?? MODEL_RED : TRACE_GRAY}
      // a hairline outline gives the model letter the bolder look of printed tập viết samples
      stroke={isModel ? color ?? MODEL_RED : "none"}
      strokeWidth={isModel ? 0.06 * U : 0}
      style={{ fontFamily: isModel ? TAPVIET_FONT : TAPDO_FONT }}
    >
      {ch}
    </text>
  );
}

interface CursiveLetterCardProps {
  /** Letters to show side by side, e.g. ["A", "a"]. */
  letters: string[];
  className?: string;
  showHeights?: boolean;
}

/** Big red handwriting sample(s) on an ô ly grid — the "chữ mẫu" a child copies. */
export function CursiveLetterCard({ letters, className, showHeights = true }: CursiveLetterCardProps) {
  const baselineLi = 6; // 5 li ascender + 1 li for capital diacritics
  const heightLi = 10; // 3 li descender + 1 li spare
  const slots = letters.map((ch) => slotLi(ch));
  const contentLi = slots.reduce((a, b) => a + b, 0);
  const widthLi = Math.max(8, 4 * Math.ceil((contentLi + 2) / 4));
  const startX = Math.floor((widthLi - contentLi) / 2 / 2) * 2 + 1;
  const placed = letters.map((ch, i) => ({
    ch,
    at: startX + slots.slice(0, i).reduce((a, b) => a + b, 0),
  }));

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="rounded-2xl border border-sky-200 bg-white overflow-hidden">
        <svg
          viewBox={`0 0 ${widthLi * U} ${heightLi * U}`}
          className="mx-auto block h-[220px] sm:h-[260px] w-auto max-w-full"
          role="img"
          aria-label={`Chữ mẫu viết tay: ${letters.join(" ")}`}
        >
          <rect width={widthLi * U} height={heightLi * U} fill="#ffffff" />
          <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={baselineLi} />
          {placed.map(({ ch, at }) => (
            <CursiveGlyph key={ch} ch={ch} xLi={at} baselineLi={baselineLi} />
          ))}
        </svg>
      </div>
      {showHeights && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          {letters.map((ch) => (
            <li key={ch}>
              Chữ <b className="text-slate-900">{ch}</b> {describeHeight(ch)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
