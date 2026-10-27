import { wordAdvanceLi } from "@/data/vietnamese/cursive-font";
import { CursiveGlyph, CursiveOlyGrid, U } from "@/components/vietnamese/cursive-oly";
import { MATH_NUMBERS_0_10 } from "@/data/math/curriculum";

export interface SingleNumberPracticeSheetProps {
  num: number;
  liMm?: number;
  indexNumber?: number;
  showFooter?: boolean;
  footerText?: string;
  className?: string;
}

type LineKind = "full" | "trace" | "partial" | "blank";

const PRINTABLE_WIDTH_MM = 190;
const GRID_HEIGHT_BUDGET_MM = 200;
const LINE_PITCH_LI = 8;
const FIRST_BASELINE_LI = 6;

function lineKinds(groups: number): LineKind[] {
  const kinds: LineKind[] = ["full"];
  const rest = groups - 1;
  const trace = Math.max(1, Math.round(rest * 0.45));
  const partial = Math.max(rest - trace > 1 ? 1 : 0, Math.round(rest * 0.25));
  for (let i = 0; i < rest; i++) {
    kinds.push(i < trace ? "trace" : i < trace + partial ? "partial" : "blank");
  }
  return kinds.slice(0, groups);
}

/**
 * Full-page A4 "Vở Ô Ly Luyện Viết Chữ Số" for a single number (0–10), matching the
 * primary-school handwriting font (chữ số cao 4 li = 2 ô vuông).
 */
export function SingleNumberPracticeSheet({
  num,
  liMm = 2.5,
  indexNumber,
  showFooter = true,
  footerText = "Bé Tự Học",
  className,
}: SingleNumberPracticeSheetProps) {
  const info = MATH_NUMBERS_0_10.find((n) => n.num === num) ?? MATH_NUMBERS_0_10[1];
  const ch = String(num);
  const idx = indexNumber ?? num + 1;

  const widthLi = 4 * Math.floor(PRINTABLE_WIDTH_MM / (4 * liMm));
  const maxLines = Math.floor((GRID_HEIGHT_BUDGET_MM / liMm - (FIRST_BASELINE_LI - 4) - 4) / LINE_PITCH_LI) + 1;
  const groups = Math.max(4, maxLines);
  const kinds = lineKinds(groups);
  const heightLi = FIRST_BASELINE_LI + LINE_PITCH_LI * (kinds.length - 1) + 4;

  const x0 = 2;
  const slot = Math.max(4, 2 * Math.ceil((wordAdvanceLi(ch) + 2) / 2));
  const demoWidthLi = 8;
  const demoHeightLi = 10;
  const demoBaseline = 6;

  return (
    <div className={`mx-auto w-full max-w-[794px] bg-white text-slate-800 ${className ?? ""}`}>
      {/* Header: Number title + stroke guide + ten-frame dots + model box */}
      <div className="mb-3 flex items-stretch justify-between gap-4">
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-1.5">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-emerald-700">
              Luyện viết chữ số chuẩn ô ly
            </p>
            <h2 className="font-heading text-2xl font-black text-slate-900">
              {idx}. Chữ số {num} ({info.word})
            </h2>
          </div>

          <ul className="text-xs leading-relaxed text-slate-600">
            <li>
              • Chữ số <b className="text-red-600">{num}</b> cao <b>4 li (2 ô vuông)</b>: {info.rhyme}.
            </li>
            <li>• Cách viết: {info.strokeGuide}</li>
          </ul>

          {/* Visual Ten-Frame Dots */}
          <div className="flex items-center gap-3 pt-0.5">
            <span className="text-xs font-bold text-slate-700">Khung 10 chấm tròn:</span>
            <div className="inline-grid grid-cols-5 gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1">
              {Array.from({ length: 10 }, (_, i) => (
                <span
                  key={i}
                  className={`size-3.5 rounded-full border ${
                    i < num
                      ? i < 5
                        ? "border-orange-600 bg-[#FF5722]"
                        : "border-sky-700 bg-sky-500"
                      : "border-slate-300 bg-white"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm">
              {num > 0 ? Array.from({ length: Math.min(num, 10) }).map(() => info.emoji).join(" ") : "🪹 (0 đồ vật)"}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Họ và tên: ...................................... Ngày: ...... / ...... / ......
          </p>
        </div>

        {/* Top-right ô ly model digit */}
        <svg
          viewBox={`0 0 ${demoWidthLi * U} ${demoHeightLi * U}`}
          className="h-32 w-auto shrink-0 rounded-md border border-sky-300 print:h-[34mm]"
          role="img"
          aria-label={`Số mẫu ${ch}`}
        >
          <rect width={demoWidthLi * U} height={demoHeightLi * U} fill="#fff" />
          <CursiveOlyGrid widthLi={demoWidthLi} heightLi={demoHeightLi} baselineLi={demoBaseline} variant="print" />
          <CursiveGlyph
            ch={ch}
            xLi={(demoWidthLi - wordAdvanceLi(ch)) / 2}
            baselineLi={demoBaseline}
          />
        </svg>
      </div>

      {/* Practice grid */}
      <svg
        viewBox={`0 0 ${widthLi * U} ${heightLi * U}`}
        style={{ width: `${widthLi * liMm}mm`, maxWidth: "100%", height: "auto" }}
        className="mx-auto block border border-sky-300"
        role="img"
        aria-label={`Ô ly tập viết chữ số ${ch}`}
      >
        <rect width={widthLi * U} height={heightLi * U} fill="#fff" />
        <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={FIRST_BASELINE_LI} variant="print" />
        {kinds.map((kind, row) => {
          const baselineLi = FIRST_BASELINE_LI + row * LINE_PITCH_LI;
          const count = Math.max(1, Math.floor((widthLi - x0 - wordAdvanceLi(ch)) / slot) + 1);
          return Array.from({ length: count }, (_, k) => {
            const style =
              kind === "full" || k === 0
                ? "model"
                : kind === "trace" || (kind === "partial" && k <= 3)
                ? "trace"
                : null;
            if (!style) return null;
            return (
              <CursiveGlyph
                key={`${row}-${k}`}
                ch={ch}
                xLi={x0 + k * slot}
                baselineLi={baselineLi}
                style={style}
              />
            );
          });
        })}
      </svg>

      {showFooter && (
        <p className="mt-2 text-center font-heading text-sm font-bold tracking-wider text-amber-500">{footerText}</p>
      )}
    </div>
  );
}
