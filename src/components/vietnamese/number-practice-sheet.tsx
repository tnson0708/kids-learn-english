import { wordAdvanceLi } from "@/data/vietnamese/cursive-font";
import { CursiveGlyph, CursiveOlyGrid, MODEL_RED, U } from "@/components/vietnamese/cursive-oly";
import { SheetHeader } from "@/components/vietnamese/tone-mark-practice-sheet";

export type NumberRange = "1-10" | "0-9";

export const NUMBER_NAMES = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"];

export function numbersInRange(range: NumberRange): number[] {
  return range === "0-9" ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

interface NumberPracticeSheetProps {
  range?: NumberRange;
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
/** Counting cards order (indices into the range) — mixed so neighbours differ. */
const COUNT_ORDER = [2, 6, 0, 8, 4, 9, 1, 5, 3, 7];
/** Which positions are left blank on the "điền số còn thiếu" lines. */
const MISSING_UP = [2, 4, 7];
const MISSING_DOWN = [1, 5, 8];

const ACCENT = "text-emerald-700";

/** Dots laid out in rows of five, like a ten-frame, so they are easy to count. */
function DotGroup({ count }: { count: number }) {
  if (count === 0) return <span className="text-[11px] italic text-slate-400">không có chấm nào</span>;
  return (
    <div className="grid grid-cols-5 gap-1">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={`size-3 rounded-full ${i < 5 ? "bg-[#FF5722]" : "bg-sky-600"}`} />
      ))}
    </div>
  );
}

/**
 * Number handwriting worksheet with the primary-school handwriting font (chữ số cao 4 li = 2 ô):
 *  - tracing pages: a model strip, then one ô ly line per number — red model, dotted copies,
 *    then empty space to write alone;
 *  - last page: count the dots and write the number, then fill in missing numbers (up and down).
 * Answer key at the foot of the last page.
 */
export function NumberPracticeSheet({ range = "1-10", liMm = 2.5, previewOnly = false }: NumberPracticeSheetProps) {
  const numbers = numbersInRange(range);
  const widthLi = 4 * Math.floor(PRINTABLE_WIDTH_MM / (4 * liMm));
  const linesPerPage = Math.max(
    3,
    Math.floor((GRID_HEIGHT_BUDGET_MM / liMm - FIRST_BASELINE_LI - 4) / LINE_PITCH_LI) + 1
  );
  const pages: number[][] = [];
  for (let i = 0; i < numbers.length; i += linesPerPage) pages.push(numbers.slice(i, i + linesPerPage));

  const renderNumberLine = (n: number, row: number) => {
    const word = String(n);
    const baselineLi = FIRST_BASELINE_LI + row * LINE_PITCH_LI;
    const slot = 2 * Math.ceil((wordAdvanceLi(word) + 2) / 2);
    const count = Math.max(1, Math.floor((widthLi - X0 - wordAdvanceLi(word) - 0.5) / slot) + 1);
    const traced = Math.max(2, Math.round((count - 1) * 0.6));
    return Array.from({ length: count }, (_, k) =>
      k === 0 ? (
        <CursiveGlyph key={k} ch={word} xLi={X0} baselineLi={baselineLi} />
      ) : k <= traced ? (
        <CursiveGlyph key={k} ch={word} xLi={X0 + k * slot} baselineLi={baselineLi} style="trace" />
      ) : null
    );
  };

  // Model strip shown at the top of page 1
  const stripH = 9;
  const stripSlot = (widthLi - 2) / numbers.length;

  // "Điền số còn thiếu" lines
  const seqSlot = Math.floor((widthLi - X0) / numbers.length);
  const seqBaseline = FIRST_BASELINE_LI + 4;
  const seqHeight = seqBaseline + 2;
  const sequences = [
    { values: numbers, missing: MISSING_UP },
    { values: [...numbers].reverse(), missing: MISSING_DOWN },
  ];

  const countCards = COUNT_ORDER.map((i) => numbers[i]);
  const answerKey = [
    `Đếm chấm: ${countCards.map((n, i) => `${i + 1}→${n}`).join(", ")}`,
    `Số còn thiếu: ${sequences.map((s) => s.missing.map((m) => s.values[m]).join(", ")).join(" | ")}`,
  ].join("  ·  ");

  return (
    <div className="mx-auto w-full max-w-[794px] bg-white text-slate-800">
      {(previewOnly ? pages.slice(0, 1) : pages).map((chunk, pageIdx) => {
        const heightLi = FIRST_BASELINE_LI + LINE_PITCH_LI * (chunk.length - 1) + 4;
        return (
          <section key={pageIdx} className={pageIdx > 0 ? "page-break pt-2" : ""}>
            <SheetHeader
              accentClass={ACCENT}
              subtitle="Luyện viết chữ số"
              title={pages.length > 1 ? `Tập tô số ${range} (trang ${pageIdx + 1}/${pages.length})` : `Tập tô số ${range}`}
              note="Chữ số cao 4 li (2 ô). Nhìn số mẫu màu đỏ, tô theo nét chấm, rồi tự viết vào chỗ trống."
            />
            {pageIdx === 0 && (
              <svg
                viewBox={`0 0 ${widthLi * U} ${stripH * U}`}
                style={{ width: `${widthLi * liMm}mm`, maxWidth: "100%", height: "auto" }}
                className="mx-auto mb-3 block rounded border border-sky-300"
                role="img"
                aria-label={`Số mẫu ${numbers.join(", ")}`}
              >
                <rect width={widthLi * U} height={stripH * U} fill="#fff" />
                <CursiveOlyGrid widthLi={widthLi} heightLi={stripH} baselineLi={6} variant="print" />
                {numbers.map((n, i) => {
                  const cx = 1 + stripSlot * (i + 0.5);
                  return (
                    <g key={n}>
                      <CursiveGlyph ch={String(n)} xLi={cx - wordAdvanceLi(String(n)) / 2} baselineLi={6} />
                      <text
                        x={cx * U}
                        y={8.2 * U}
                        fontSize={1.3 * U}
                        textAnchor="middle"
                        fill="#334155"
                        fontWeight={700}
                        fontFamily="var(--font-sans), sans-serif"
                      >
                        {NUMBER_NAMES[n]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
            <svg
              viewBox={`0 0 ${widthLi * U} ${heightLi * U}`}
              style={{ width: `${widthLi * liMm}mm`, maxWidth: "100%", height: "auto" }}
              className="mx-auto block border border-sky-300"
              role="img"
              aria-label={`Ô ly tập tô số ${chunk.join(", ")}`}
            >
              <rect width={widthLi * U} height={heightLi * U} fill="#fff" />
              <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={FIRST_BASELINE_LI} variant="print" />
              {chunk.map(renderNumberLine)}
            </svg>
            <p className="mt-2 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
          </section>
        );
      })}

      {/* LAST PAGE — đếm chấm & điền số */}
      {!previewOnly && (
        <section className="page-break pt-2">
          <SheetHeader
            accentClass={ACCENT}
            subtitle="Luyện viết chữ số"
            title="Đếm và viết số"
            note="Bé đếm số chấm tròn rồi viết số vào ô ly bên cạnh. Sau đó điền số còn thiếu vào ô trống."
          />
          <div className="grid grid-cols-2 gap-2.5">
            {countCards.map((n, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 rounded-lg border-2 border-slate-300 px-3 py-1.5 break-inside-avoid"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                  {i + 1}
                </span>
                <div className="flex flex-1 justify-center">
                  <DotGroup count={n} />
                </div>
                <svg viewBox={`0 0 ${8 * U} ${8 * U}`} className="h-[22mm] w-auto shrink-0 rounded border border-sky-300">
                  <rect width={8 * U} height={8 * U} fill="#fff" />
                  <CursiveOlyGrid widthLi={8} heightLi={8} baselineLi={6} variant="print" />
                </svg>
              </div>
            ))}
          </div>

          <h3 className="mt-4 mb-1.5 font-heading text-base font-black text-slate-900">Điền số còn thiếu</h3>
          <div className="flex flex-col gap-2">
            {sequences.map((seq, si) => (
              <svg
                key={si}
                viewBox={`0 0 ${widthLi * U} ${seqHeight * U}`}
                style={{ width: `${widthLi * liMm}mm`, maxWidth: "100%", height: "auto" }}
                className="mx-auto block border border-sky-300"
                role="img"
                aria-label="Dãy số có ô trống"
              >
                <rect width={widthLi * U} height={seqHeight * U} fill="#fff" />
                <CursiveOlyGrid widthLi={widthLi} heightLi={seqHeight} baselineLi={FIRST_BASELINE_LI} variant="print" />
                {seq.values.map((n, k) => {
                  const x = X0 + k * seqSlot;
                  const baseline = seqBaseline;
                  if (seq.missing.includes(k)) {
                    return (
                      <rect
                        key={k}
                        x={(x - 0.5) * U}
                        y={(baseline - 4.6) * U}
                        width={(seqSlot - 0.6) * U}
                        height={5.2 * U}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth={0.14 * U}
                        strokeDasharray={`${0.4 * U},${0.3 * U}`}
                        rx={0.4 * U}
                      />
                    );
                  }
                  return <CursiveGlyph key={k} ch={String(n)} xLi={x} baselineLi={baseline} color={MODEL_RED} />;
                })}
                <text
                  x={X0 * U}
                  y={3.2 * U}
                  fontSize={1.6 * U}
                  fill="#047857"
                  fontWeight={700}
                  fontFamily="var(--font-sans), sans-serif"
                >
                  {si === 0 ? "Đếm xuôi:" : "Đếm ngược:"}
                </text>
              </svg>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-slate-400">Đáp án cho ba mẹ — {answerKey}</p>
          <p className="mt-1 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
        </section>
      )}
    </div>
  );
}
