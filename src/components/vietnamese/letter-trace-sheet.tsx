import {
  CELL_H,
  CELL_W,
  GLYPH_OFFSET_Y,
  LI,
  getLetterGlyph,
  strokeStartPoint,
  type LetterCase,
} from "@/data/vietnamese/letter-strokes";
import type { VietnameseCaseMode } from "@/data/vietnamese/alphabet";
import { OlyGridLines } from "@/components/vietnamese/oly-grid";

/** Physical size of one ô li on paper. 2.5 mm matches a lớp 1 notebook; 4 mm is easier for preschoolers. */
export type OlyLiMm = 2.5 | 4;

export interface TraceRow {
  letter: string;
  letterCase: LetterCase;
}

/** Printable width of the sheet (A4 210 mm minus the @page margins in globals.css). */
export const SHEET_WIDTH_MM = 192;
/** Height budget for header + footer on one A4 page, used to work out rows per page. */
const PAGE_CONTENT_HEIGHT_MM = 297 - 12 - 30;

export function sheetLayout(liMm: OlyLiMm) {
  const cellsPerRow = Math.floor(SHEET_WIDTH_MM / (6 * liMm));
  const gridColumns = cellsPerRow * 6;
  const rowHeightMm = 10 * liMm;
  const rowsPerPage = Math.max(1, Math.floor(PAGE_CONTENT_HEIGHT_MM / rowHeightMm));
  return { cellsPerRow, gridColumns, rowHeightMm, rowsPerPage, widthMm: gridColumns * liMm };
}

/** Expands letters × case mode × repeats into the ordered list of ruled rows to print. */
export function buildTraceRows(
  letters: string[],
  mode: VietnameseCaseMode,
  rowsPerLetter: number
): TraceRow[] {
  const cases: LetterCase[] = mode === "both" ? ["upper", "lower"] : mode === "uppercase" ? ["upper"] : ["lower"];
  const rows: TraceRow[] = [];
  for (const letter of letters) {
    for (const letterCase of cases) {
      for (let r = 0; r < rowsPerLetter; r++) rows.push({ letter, letterCase });
    }
  }
  return rows;
}

export function paginateRows<T>(rows: T[], rowsPerPage: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < rows.length; i += rowsPerPage) pages.push(rows.slice(i, i + rowsPerPage));
  return pages;
}

function GlyphCell({
  row,
  x,
  variant,
}: {
  row: TraceRow;
  x: number;
  variant: "sample" | "trace";
}) {
  const glyph = getLetterGlyph(row.letter, row.letterCase);
  if (!glyph) return null;
  return (
    <g transform={`translate(${x}, ${GLYPH_OFFSET_Y})`}>
      {glyph.strokes.map((d, i) =>
        variant === "sample" ? (
          <path key={i} d={d} fill="none" stroke="#dc2626" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5,5"
          />
        )
      )}
      {variant === "sample" &&
        glyph.strokes.map((d, i) => {
          const { x: sx, y: sy } = strokeStartPoint(d);
          return (
            <g key={`n${i}`}>
              <circle cx={sx} cy={sy} r={6} fill="#ffffff" stroke="#dc2626" strokeWidth={1.4} />
              <text x={sx} y={sy + 2.8} fontSize={8} fontWeight={800} textAnchor="middle" fill="#dc2626" fontFamily="Nunito, Arial, sans-serif">
                {i + 1}
              </text>
            </g>
          );
        })}
    </g>
  );
}

interface LetterTraceSheetProps {
  rows: TraceRow[];
  liMm: OlyLiMm;
  /** Share of the cells after the sample that get a dotted letter to trace; the rest stay empty for free writing. */
  traceRatio?: number;
  /** true = exact millimetre sizing for paper; false = scale to the container for on-screen preview. */
  forPrint?: boolean;
  className?: string;
}

/**
 * One block of ruled ô ly rows sized in real millimetres for printing. Each row: a solid red
 * model letter with numbered stroke starts, a run of dotted letters to trace over, then empty
 * cells for the child to write on their own. The same stroke data drives the on-screen guide,
 * so what the child traces is exactly what they were shown.
 */
export function LetterTraceSheet({ rows, liMm, traceRatio = 0.6, forPrint = false, className }: LetterTraceSheetProps) {
  const { cellsPerRow, gridColumns, widthMm, rowHeightMm } = sheetLayout(liMm);
  const width = gridColumns * LI;
  const height = rows.length * CELL_H;
  const traceCells = Math.max(1, Math.round((cellsPerRow - 1) * traceRatio));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={
        forPrint
          ? { width: `${widthMm}mm`, height: `${rows.length * rowHeightMm}mm` }
          : { width: "100%", height: "auto" }
      }
      preserveAspectRatio="xMinYMin meet"
    >
      <rect width={width} height={height} fill="#ffffff" />
      <OlyGridLines width={width} height={CELL_H} rows={rows.length} variant="print" />
      {rows.map((row, r) => (
        <g key={r} transform={`translate(0, ${r * CELL_H})`}>
          <GlyphCell row={row} x={0} variant="sample" />
          {Array.from({ length: traceCells }).map((_, c) => (
            <GlyphCell key={c} row={row} x={(c + 1) * CELL_W} variant="trace" />
          ))}
        </g>
      ))}
    </svg>
  );
}
