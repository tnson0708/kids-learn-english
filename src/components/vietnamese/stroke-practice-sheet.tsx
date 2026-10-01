import { BASIC_STROKE_GROUPS, pathStart, type BasicStroke } from "@/data/vietnamese/basic-strokes";
import { CursiveOlyGrid, MODEL_RED, TRACE_GRAY, U } from "@/components/vietnamese/cursive-oly";
import { SheetHeader } from "@/components/vietnamese/tone-mark-practice-sheet";

interface StrokePracticeSheetProps {
  /** Ids of the stroke groups to include (0..4). */
  groupIds: number[];
  /** Physical size of one ô li when printed. */
  liMm?: number;
  /** Render only the first page (for the on-screen preview). */
  previewOnly?: boolean;
}

const PRINTABLE_WIDTH_MM = 190;
const GRID_HEIGHT_BUDGET_MM = 205;
const FIRST_BASELINE_LI = 6;
const LINE_PITCH_LI = 8;
const X0 = 2;
const ACCENT = "text-[#D84315]";

type Line = { stroke: BasicStroke; kind: "full" | "review" };

/** One basic stroke drawn on the ô ly grid: solid red model with a đặt bút dot, or dashed copy. */
function StrokeMark({
  stroke,
  xLi,
  baselineLi,
  style,
}: {
  stroke: BasicStroke;
  xLi: number;
  baselineLi: number;
  style: "model" | "trace";
}) {
  const model = style === "model";
  const start = pathStart(stroke.path);
  return (
    <g transform={`translate(${xLi * U} ${baselineLi * U}) scale(${U})`}>
      <path
        d={stroke.path}
        fill="none"
        stroke={model ? MODEL_RED : TRACE_GRAY}
        strokeWidth={model ? 0.22 : 0.16}
        strokeDasharray={model ? undefined : "0.01 0.26"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {model && <circle cx={start.x} cy={start.y} r={0.2} fill="#111827" />}
    </g>
  );
}

const slotFor = (s: BasicStroke) => 2 * Math.ceil((s.width + 2) / 2);

/** How many A4 pages the sheet will print, for the dialog badge. */
export function strokeSheetPageCount(groupIds: number[], liMm = 2.5): number {
  const strokes = BASIC_STROKE_GROUPS.filter((g) => groupIds.includes(g.id)).flatMap((g) => g.strokes);
  const perPage = linesPerPage(liMm);
  return Math.max(1, Math.ceil(strokes.length / perPage));
}

function linesPerPage(liMm: number) {
  return Math.max(3, Math.floor((GRID_HEIGHT_BUDGET_MM / liMm - FIRST_BASELINE_LI - 4) / LINE_PITCH_LI) + 1);
}

/**
 * "5 nhóm nét cơ bản" worksheet in the same style as the letter/tone/number sheets:
 * a reference strip of the chosen groups, then one ô ly line per stroke — red model with a black
 * "đặt bút" dot, dotted copies to trace, and free space at the end. Spare lines on the last page
 * are filled with review lines (model + 2 copies + free space).
 */
export function StrokePracticeSheet({ groupIds, liMm = 2.5, previewOnly = false }: StrokePracticeSheetProps) {
  const groups = BASIC_STROKE_GROUPS.filter((g) => groupIds.includes(g.id));
  const strokes = groups.flatMap((g) => g.strokes);
  const widthLi = 4 * Math.floor(PRINTABLE_WIDTH_MM / (4 * liMm));
  const perPage = linesPerPage(liMm);

  const pages: Line[][] = [];
  for (let i = 0; i < Math.max(1, strokes.length); i += perPage) {
    pages.push(strokes.slice(i, i + perPage).map((stroke) => ({ stroke, kind: "full" as const })));
  }
  const last = pages[pages.length - 1];
  for (let k = 0; last.length < perPage && strokes.length > 0; k++) {
    last.push({ stroke: strokes[k % strokes.length], kind: "review" });
  }

  const renderLine = ({ stroke, kind }: Line, row: number) => {
    const baselineLi = FIRST_BASELINE_LI + row * LINE_PITCH_LI;
    const slot = slotFor(stroke);
    const count = Math.max(1, Math.floor((widthLi - X0 - stroke.width - 1) / slot) + 1);
    const traced = kind === "full" ? Math.max(2, Math.round((count - 1) * 0.7)) : 2;
    return (
      <g key={row}>
        {Array.from({ length: Math.min(count, traced + 1) }, (_, k) => (
          <StrokeMark
            key={k}
            stroke={stroke}
            xLi={X0 + k * slot}
            baselineLi={baselineLi}
            style={k === 0 ? "model" : "trace"}
          />
        ))}
        <text
          x={(widthLi - 0.6) * U}
          y={(baselineLi - 4.4) * U}
          fontSize={1.25 * U}
          textAnchor="end"
          fill="#64748b"
          fontWeight={700}
          fontFamily="var(--font-sans), sans-serif"
        >
          {stroke.name}
        </text>
      </g>
    );
  };

  return (
    <div className="mx-auto w-full max-w-[794px] bg-white text-slate-800">
      {(previewOnly ? pages.slice(0, 1) : pages).map((lines, pageIdx) => {
        const heightLi = FIRST_BASELINE_LI + LINE_PITCH_LI * (lines.length - 1) + 4;
        return (
          <section key={pageIdx} className={pageIdx > 0 ? "page-break pt-2" : ""}>
            <SheetHeader
              accentClass={ACCENT}
              subtitle="Luyện viết nét cơ bản"
              title={
                pages.length > 1
                  ? `Tập tô ${groups.length === 5 ? "5 nhóm nét" : groups.map((g) => g.name.toLowerCase()).join(", ")} (trang ${pageIdx + 1}/${pages.length})`
                  : `Tập tô ${groups.length === 5 ? "5 nhóm nét cơ bản" : groups.map((g) => g.name.toLowerCase()).join(", ")}`
              }
              note="Đặt bút ở chấm đen của nét mẫu đỏ, tô theo nét chấm, rồi tự viết vào chỗ trống. Nét cao 2 li, nét khuyết cao 5 li."
            />
            {pageIdx === 0 && (
              <div className="mb-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}>
                {groups.map((g) => {
                  const w = Math.max(8, g.strokes.reduce((a, s) => a + slotFor(s), 0) + 1);
                  const h = 10;
                  return (
                    <div key={g.id} className="flex flex-col items-center gap-0.5 text-center">
                      <div className="w-full overflow-hidden rounded border border-sky-300">
                        <svg viewBox={`0 0 ${w * U} ${h * U}`} className="block h-[22mm] w-full">
                          <rect width={w * U} height={h * U} fill="#fff" />
                          <CursiveOlyGrid widthLi={w} heightLi={h} baselineLi={6} variant="print" />
                          {g.strokes.map((s, si) => (
                            <StrokeMark
                              key={s.id}
                              stroke={s}
                              xLi={1.5 + g.strokes.slice(0, si).reduce((a, p) => a + slotFor(p), 0)}
                              baselineLi={6}
                              style="model"
                            />
                          ))}
                        </svg>
                      </div>
                      <span className="text-[11px] font-bold leading-tight text-slate-800">{g.name}</span>
                      <span className="text-[10px] leading-tight text-slate-500">
                        {g.strokes.map((s) => s.name.replace(/^Nét /, "")).join(" · ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <svg
              viewBox={`0 0 ${widthLi * U} ${heightLi * U}`}
              style={{ width: `${widthLi * liMm}mm`, maxWidth: "100%", height: "auto" }}
              className="mx-auto block border border-sky-300"
              role="img"
              aria-label="Ô ly tập tô nét cơ bản"
            >
              <rect width={widthLi * U} height={heightLi * U} fill="#fff" />
              <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={FIRST_BASELINE_LI} variant="print" />
              {lines.map(renderLine)}
            </svg>
            <p className="mt-2 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
          </section>
        );
      })}
    </div>
  );
}
