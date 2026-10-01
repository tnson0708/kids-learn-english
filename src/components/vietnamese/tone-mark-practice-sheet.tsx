import { wordAdvanceLi } from "@/data/vietnamese/cursive-font";
import { BA_HINTS, TONES, applyTone, toneVowelIndex, type ToneInfo } from "@/data/vietnamese/tones";
import { CursiveGlyph, CursiveOlyGrid, U } from "@/components/vietnamese/cursive-oly";

interface ToneMarkPracticeSheetProps {
  /** Toneless syllable, e.g. "ba". */
  base?: string;
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
/** Listening exercise order: every tone twice, mixed so neighbours differ. */
const QUIZ_ORDER = [2, 5, 1, 3, 0, 4, 4, 1, 5, 0, 3, 2];

const slotFor = (word: string) => 2 * Math.ceil((wordAdvanceLi(word) + 2) / 2);

type Line =
  | { kind: "tone"; word: string }
  | { kind: "sequence"; words: string[] }
  | { kind: "free"; word: string };

export function SheetHeader({
  title,
  subtitle,
  note,
  accentClass = "text-purple-700",
}: {
  title: string;
  subtitle: string;
  note: string;
  accentClass?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4 border-b-2 border-slate-800 pb-2">
      <div>
        <p className={`font-heading text-xs font-bold uppercase tracking-widest ${accentClass}`}>{subtitle}</p>
        <h2 className="font-heading text-2xl font-black text-slate-900">{title}</h2>
        <p className="text-xs text-slate-600">{note}</p>
      </div>
      <div className="shrink-0 text-right text-xs leading-relaxed text-slate-500">
        <p>Họ và tên: ................................</p>
        <p>Ngày: ...... / ...... / ......</p>
      </div>
    </div>
  );
}

/** Small ô ly box holding one red model word — used for the tone reference strip. */
function ModelWordBox({ word }: { word: string }) {
  const widthLi = 8;
  const heightLi = 9;
  const x = Math.max(0.5, (widthLi - wordAdvanceLi(word)) / 2);
  return (
    <svg viewBox={`0 0 ${widthLi * U} ${heightLi * U}`} className="block h-auto w-full">
      <rect width={widthLi * U} height={heightLi * U} fill="#fff" />
      <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={6} variant="print" />
      <CursiveGlyph ch={word} xLi={x} baselineLi={6} />
    </svg>
  );
}

/**
 * Two-page "5 dấu thanh" handwriting worksheet built on the primary-school handwriting font:
 *  1. Tập tô — a reference strip (ba · bà · bá · bả · bã · bạ), one tracing line per tone,
 *     then mixed lines to trace the whole family and write it alone.
 *  2. Nghe & viết dấu — 12 dotted toneless syllables with boxes above/below the vowel; the
 *     child listens (or looks at the picture) and writes the right tone mark. Answer key at foot.
 */
export function ToneMarkPracticeSheet({ base = "ba", liMm = 2.5, previewOnly = false }: ToneMarkPracticeSheetProps) {
  const words = TONES.map((t) => applyTone(base, t));
  const vowel = [...base.normalize("NFC")][toneVowelIndex(base)];
  const widthLi = 4 * Math.floor(PRINTABLE_WIDTH_MM / (4 * liMm));
  const maxLines = Math.max(
    TONES.length,
    Math.floor((GRID_HEIGHT_BUDGET_MM / liMm - FIRST_BASELINE_LI - 4) / LINE_PITCH_LI) + 1
  );
  const extra = maxLines - TONES.length;
  const lines: Line[] = [
    ...words.map((word) => ({ kind: "tone" as const, word })),
    ...Array.from({ length: extra }, (_, i): Line =>
      i < Math.ceil(extra / 2) ? { kind: "sequence", words } : { kind: "free", word: words[(i * 2 + 1) % words.length] }
    ),
  ];
  const heightLi = FIRST_BASELINE_LI + LINE_PITCH_LI * (lines.length - 1) + 4;

  const renderLine = (line: Line, row: number) => {
    const baselineLi = FIRST_BASELINE_LI + row * LINE_PITCH_LI;
    const out: React.ReactNode[] = [];
    if (line.kind === "sequence") {
      // whole family in order, dotted; wraps by repeating until the line is full
      let x = X0;
      for (let k = 0; ; k++) {
        const w = line.words[k % line.words.length];
        if (x + wordAdvanceLi(w) > widthLi - 0.5) break;
        out.push(<CursiveGlyph key={k} ch={w} xLi={x} baselineLi={baselineLi} style="trace" />);
        x += slotFor(w);
      }
      return out;
    }
    const slot = slotFor(line.word);
    const count = Math.max(1, Math.floor((widthLi - X0 - wordAdvanceLi(line.word) - 0.5) / slot) + 1);
    for (let k = 0; k < count; k++) {
      const style = k === 0 ? "model" : line.kind === "tone" || k <= 1 ? "trace" : null;
      if (style) out.push(<CursiveGlyph key={k} ch={line.word} xLi={X0 + k * slot} baselineLi={baselineLi} style={style} />);
    }
    return out;
  };

  // --- page 2: listening exercise ---
  const chars = [...base.normalize("NFC")];
  const vi = toneVowelIndex(base);
  const vowelX = wordAdvanceLi(chars.slice(0, vi).join("")) + wordAdvanceLi(chars[vi]) * 0.45;
  const cardW = 10;
  const cardH = 9;
  const cardBaseline = 6;
  const wordX = Math.max(1, (cardW - wordAdvanceLi(base)) / 2);
  const quiz: ToneInfo[] = QUIZ_ORDER.map((i) => TONES[i]);
  const showHints = base === "ba";

  return (
    <div className="mx-auto w-full max-w-[794px] bg-white text-slate-800">
      {/* PAGE 1 — Tập tô 5 dấu thanh */}
      <section>
        <SheetHeader
          subtitle="Luyện viết 5 dấu thanh"
          title={`Tập tô: ${words.join(" · ")}`}
          note="Nhìn chữ mẫu màu đỏ, tô theo nét chấm. Viết chữ trước, đánh dấu thanh sau cùng."
        />
        <div className="mb-3 grid grid-cols-6 gap-2">
          {TONES.map((t, i) => (
            <div key={t.id} className="flex flex-col items-center gap-0.5 text-center">
              <div className="w-full overflow-hidden rounded border border-sky-300">
                <ModelWordBox word={words[i]} />
              </div>
              <span className="text-[11px] font-bold leading-tight text-slate-800">{t.name}</span>
              <span className="text-[10px] leading-tight text-slate-500">
                {t.position === "none" ? "không dấu" : `${t.position === "below" ? "dưới" : "trên"} chữ ${vowel}`}
              </span>
            </div>
          ))}
        </div>
        <svg
          viewBox={`0 0 ${widthLi * U} ${heightLi * U}`}
          style={{ width: `${widthLi * liMm}mm`, maxWidth: "100%", height: "auto" }}
          className="mx-auto block border border-sky-300"
          role="img"
          aria-label={`Ô ly tập tô ${words.join(", ")}`}
        >
          <rect width={widthLi * U} height={heightLi * U} fill="#fff" />
          <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={FIRST_BASELINE_LI} variant="print" />
          {lines.map(renderLine)}
        </svg>
        <p className="mt-2 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
      </section>

      {/* PAGE 2 — Nghe và viết dấu thanh */}
      {!previewOnly && (
        <section className="page-break pt-2">
          <SheetHeader
            subtitle="Luyện viết 5 dấu thanh"
            title="Nghe và viết dấu thanh"
            note={
              showHints
                ? `Bé tô chữ chấm, nhìn hình (hoặc nghe ba mẹ đọc) rồi viết dấu thanh vào ô trên hoặc dưới chữ ${vowel}.`
                : "Ba mẹ đọc từng số, bé tô chữ chấm rồi viết dấu thanh nghe được vào ô trên hoặc dưới."
            }
          />
          <div className="grid grid-cols-4 gap-2.5">
            {quiz.map((t, i) => (
              <div key={i} className="flex flex-col gap-1 rounded-lg border-2 border-slate-300 p-2 break-inside-avoid">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex size-6 items-center justify-center rounded-full bg-purple-100 text-purple-800">
                    {i + 1}
                  </span>
                  {showHints && (
                    <span className="flex items-center gap-1">
                      <span className="text-lg leading-none">{BA_HINTS[t.id].emoji}</span>
                      <span className="text-[11px] text-slate-500">{BA_HINTS[t.id].meaning.replace(/\S*b\S*/, "…")}</span>
                    </span>
                  )}
                </div>
                <svg viewBox={`0 0 ${cardW * U} ${cardH * U}`} className="block h-auto w-full">
                  <rect width={cardW * U} height={cardH * U} fill="#fff" />
                  <CursiveOlyGrid widthLi={cardW} heightLi={cardH} baselineLi={cardBaseline} variant="print" />
                  <CursiveGlyph ch={base} xLi={wordX} baselineLi={cardBaseline} style="trace" />
                  {/* answer boxes: above the vowel for ` ´ ˀ ~, below for the dot of dấu nặng */}
                  <rect
                    x={(wordX + vowelX - 1.1) * U}
                    y={(cardBaseline - 4.6) * U}
                    width={2.2 * U}
                    height={2.2 * U}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth={0.12 * U}
                    strokeDasharray={`${0.35 * U},${0.25 * U}`}
                    rx={0.3 * U}
                  />
                  <rect
                    x={(wordX + vowelX - 0.9) * U}
                    y={(cardBaseline + 0.4) * U}
                    width={1.8 * U}
                    height={1.6 * U}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth={0.12 * U}
                    strokeDasharray={`${0.35 * U},${0.25 * U}`}
                    rx={0.3 * U}
                  />
                </svg>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-slate-400">
            Đáp án cho ba mẹ: {quiz.map((t, i) => `${i + 1}. ${applyTone(base, t)}`).join("  ·  ")}
          </p>
          <p className="mt-1 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
        </section>
      )}
    </div>
  );
}
