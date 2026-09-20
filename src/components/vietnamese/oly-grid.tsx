import { ASC_TOP, BASELINE, LI, X_TOP } from "@/data/vietnamese/letter-strokes";

interface OlyGridLinesProps {
  /** Width of the grid in glyph units (multiples of LI). */
  width: number;
  /** Height of one writing row in glyph units (normally CELL_H). */
  height: number;
  /** Number of stacked writing rows to draw. */
  rows?: number;
  /** Where the bold "top of capitals" / "baseline" lines and dashed x-height line sit in each row. */
  variant?: "screen" | "print";
}

/**
 * "Vở ô ly" grid: light square cells every li, a darker line on the baseline and on the
 * capital top line, and a dashed guide at the lowercase body height so the child can see
 * where 1-unit letters stop. Meant to sit inside an <svg> whose viewBox uses glyph units.
 */
export function OlyGridLines({ width, height, rows = 1, variant = "screen" }: OlyGridLinesProps) {
  const light = variant === "print" ? "#93c5fd" : "#bae6fd";
  const bold = variant === "print" ? "#1d4ed8" : "#0284c7";
  const guide = variant === "print" ? "#2563eb" : "#38bdf8";
  const totalHeight = height * rows;
  const verticals: React.ReactNode[] = [];
  for (let x = 0; x <= width; x += LI) {
    verticals.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={totalHeight} stroke={light} strokeWidth={0.6} />
    );
  }
  const horizontals: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const offset = r * height;
    for (let y = 0; y <= height; y += LI) {
      // The bottom line of a row is the top line of the next one; draw it once.
      if (y === height && r < rows - 1) continue;
      const yy = offset + y;
      if (y === BASELINE || y === ASC_TOP) {
        horizontals.push(
          <line key={`h${r}-${y}`} x1={0} y1={yy} x2={width} y2={yy} stroke={bold} strokeWidth={y === BASELINE ? 1.8 : 1.2} />
        );
      } else if (y === X_TOP) {
        horizontals.push(
          <line key={`h${r}-${y}`} x1={0} y1={yy} x2={width} y2={yy} stroke={guide} strokeWidth={0.9} strokeDasharray="4,3" />
        );
      } else {
        horizontals.push(
          <line key={`h${r}-${y}`} x1={0} y1={yy} x2={width} y2={yy} stroke={light} strokeWidth={0.6} />
        );
      }
    }
  }
  return (
    <g>
      {verticals}
      {horizontals}
    </g>
  );
}
