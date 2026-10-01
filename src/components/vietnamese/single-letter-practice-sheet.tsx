import { upperForm } from "@/data/vietnamese/alphabet";
import { advanceLi, describeHeight, slotLi } from "@/data/vietnamese/cursive-font";
import type { LetterCase } from "@/data/vietnamese/letter-strokes";
import { CursiveGlyph, CursiveOlyGrid, U } from "@/components/vietnamese/cursive-oly";

export type SheetCase = LetterCase | "both";

export interface SingleLetterPracticeSheetProps {
  /** Lowercase key of the letter, e.g. "a", "ă", "đ". */
  letter: string;
  letterCase?: SheetCase;
  title?: string;
  subTitle?: string;
  indexNumber?: number;
  /** Physical size of one ô li when printed. */
  liMm?: number;
  showFooter?: boolean;
  footerText?: string;
  className?: string;
}

type LineKind = "full" | "trace" | "partial" | "blank";

const PRINTABLE_WIDTH_MM = 190;
const GRID_HEIGHT_BUDGET_MM = 205;
const LINE_PITCH_LI = 8; // 5 li above + 3 li below the baseline
const FIRST_BASELINE_LI = 6;

/** Split n lines into: full red line → dotted lines → partly dotted → copy-by-yourself. */
function lineKinds(groups: number): LineKind[] {
  const kinds: LineKind[] = ["full"];
  const rest = groups - 1;
  const trace = Math.max(1, Math.round(rest * 0.45));
  const partial = Math.max(rest - trace > 1 ? 1 : 0, Math.round(rest * 0.25));
  for (let i = 0; i < rest; i++) kinds.push(i < trace ? "trace" : i < trace + partial ? "partial" : "blank");
  return kinds.slice(0, groups);
}

/**
 * Vietnamese "vở ô ly" handwriting worksheet for one letter, drawn with the primary-school
 * handwriting font: red model letters, dotted tracing copies, then space to write alone.
 * Sized in real millimetres so a 2.5 mm ô li prints as 2.5 mm on A4.
 */
export function SingleLetterPracticeSheet({
  letter,
  letterCase = "lower",
  title = "Luyện viết chữ cái",
  subTitle,
  indexNumber = 1,
  liMm = 2.5,
  showFooter = true,
  footerText = "Bé Tự Học",
  className,
}: SingleLetterPracticeSheetProps) {
  const upper = upperForm(letter);
  const forms = letterCase === "upper" ? [upper] : letterCase === "lower" ? [letter] : [upper, letter];
  const displaySubTitle = subTitle || `${indexNumber}. Chữ ${forms.join(" ")}`;

  const widthLi = 4 * Math.floor(PRINTABLE_WIDTH_MM / (4 * liMm));
  const maxLines = Math.floor((GRID_HEIGHT_BUDGET_MM / liMm - (FIRST_BASELINE_LI - 4) - 4) / LINE_PITCH_LI) + 1;
  const groups = Math.max(2, Math.floor(maxLines / forms.length));
  const kinds = lineKinds(groups);

  const lines = kinds.flatMap((kind) => forms.map((ch) => ({ kind, ch })));
  const heightLi = FIRST_BASELINE_LI + LINE_PITCH_LI * (lines.length - 1) + 4;

  const x0 = 2;
  const demoBaseline = 6;
  const demoSlots = forms.map((ch) => slotLi(ch));
  const demoWidthLi = Math.max(8, 4 * Math.ceil((demoSlots.reduce((a, b) => a + b, 0) + 2) / 4));
  const demoHeightLi = 10;

  return (
    <div className={`mx-auto w-full max-w-[794px] bg-white text-slate-800 ${className ?? ""}`}>
      {/* Header: titles on the left, a large red model letter on the right */}
      <div className="mb-3 flex items-stretch justify-between gap-4">
        <div className="flex min-w-0 flex-col justify-between gap-1.5">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-sky-700">{title}</p>
            <h2 className="font-heading text-2xl font-black text-slate-900">{displaySubTitle}</h2>
          </div>
          <ul className="text-xs leading-relaxed text-slate-600">
            {forms.map((ch) => (
              <li key={ch}>
                • Chữ <b className="text-red-600">{ch}</b> {describeHeight(ch)}.
              </li>
            ))}
            <li>• Nhìn chữ mẫu màu đỏ, tô theo nét chấm, rồi tự viết vào chỗ trống.</li>
          </ul>
          <p className="text-xs text-slate-500">
            Họ và tên: ...................................... Ngày: ...... / ...... / ......
          </p>
        </div>
        <svg
          viewBox={`0 0 ${demoWidthLi * U} ${demoHeightLi * U}`}
          className="h-32 w-auto shrink-0 rounded-md border border-sky-300 print:h-[34mm]"
          role="img"
          aria-label={`Chữ mẫu ${forms.join(" ")}`}
        >
          <rect width={demoWidthLi * U} height={demoHeightLi * U} fill="#fff" />
          <CursiveOlyGrid widthLi={demoWidthLi} heightLi={demoHeightLi} baselineLi={demoBaseline} variant="print" />
          {forms.map((ch, i) => (
            <CursiveGlyph
              key={ch}
              ch={ch}
              xLi={1 + demoSlots.slice(0, i).reduce((a, b) => a + b, 0)}
              baselineLi={demoBaseline}
            />
          ))}
        </svg>
      </div>

      {/* Practice grid */}
      <svg
        viewBox={`0 0 ${widthLi * U} ${heightLi * U}`}
        style={{ width: `${widthLi * liMm}mm`, maxWidth: "100%", height: "auto" }}
        className="mx-auto block border border-sky-300"
        role="img"
        aria-label={`Ô ly tập viết chữ ${forms.join(" ")}`}
      >
        <rect width={widthLi * U} height={heightLi * U} fill="#fff" />
        <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={FIRST_BASELINE_LI} variant="print" />
        {lines.map(({ kind, ch }, row) => {
          const baselineLi = FIRST_BASELINE_LI + row * LINE_PITCH_LI;
          const slot = slotLi(ch);
          const count = Math.max(1, Math.floor((widthLi - x0 - advanceLi(ch)) / slot) + 1);
          return Array.from({ length: count }, (_, k) => {
            const style =
              kind === "full" || k === 0
                ? "model"
                : kind === "trace" || (kind === "partial" && k <= 2)
                ? "trace"
                : null;
            if (!style) return null;
            return <CursiveGlyph key={`${row}-${k}`} ch={ch} xLi={x0 + k * slot} baselineLi={baselineLi} style={style} />;
          });
        })}
      </svg>

      {showFooter && (
        <p className="mt-2 text-center font-heading text-sm font-bold tracking-wider text-amber-500">{footerText}</p>
      )}
    </div>
  );
}
