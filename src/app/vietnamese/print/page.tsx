"use client";

import { useState } from "react";
import { Printer } from "lucide-react";
import { VIETNAMESE_LETTERS, type VietnameseCaseMode } from "@/data/vietnamese/alphabet";
import { NGUYEN_AM, PHU_AM } from "@/data/vietnamese/blending";
import { generateMathItems, type MathItem, type MathWorksheetType } from "@/data/vietnamese/math";
import { SingleLetterPracticeSheet } from "@/components/vietnamese/single-letter-practice-sheet";
import { BlendingTable } from "@/components/vietnamese/blending-table";
import { MathWorksheet } from "@/components/vietnamese/math-worksheet";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

type Tab = "chu" | "van" | "toan";

type WorksheetContent =
  | { kind: "chu"; letters: string[]; mode: VietnameseCaseMode; rows: number }
  | { kind: "van"; consonants: string[]; vowels: string[]; toneSyllable?: string }
  | { kind: "toan"; items: MathItem[] };

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "font-heading rounded-lg border px-2 py-0.5 text-sm transition-colors",
        active
          ? "border-vietnamese-accent bg-vietnamese-accent text-white"
          : "border-border bg-card text-foreground hover:border-vietnamese-accent/60"
      )}
    >
      {label}
    </button>
  );
}

export default function VietnamesePrintPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("chu");

  const [chuSelected, setChuSelected] = useState<Set<string>>(new Set(["a", "b", "c", "d", "đ"]));
  const [chuCase, setChuCase] = useState<VietnameseCaseMode>("lowercase");
  const [chuRows, setChuRows] = useState(2);

  const [phuSelected, setPhuSelected] = useState<Set<string>>(new Set(["b", "c", "đ"]));
  const [nguyenSelected, setNguyenSelected] = useState<Set<string>>(new Set(["a", "e", "o"]));
  const [toneSyllable, setToneSyllable] = useState("");

  const [toanType, setToanType] = useState<MathWorksheetType>("dem");
  const [toanRange, setToanRange] = useState(10);
  const [toanCount, setToanCount] = useState(8);

  const [worksheet, setWorksheet] = useState<WorksheetContent | null>(null);

  const toggle = (set: Set<string>, setSet: (s: Set<string>) => void, item: string) => {
    const next = new Set(set);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setSet(next);
  };

  const toneOptions: string[] = [];
  PHU_AM.filter((p) => phuSelected.has(p)).forEach((p) => {
    NGUYEN_AM.filter((n) => nguyenSelected.has(n)).forEach((n) => toneOptions.push(`${p}${n}`));
  });

  const handleGenerate = () => {
    if (tab === "chu") {
      setWorksheet({
        kind: "chu",
        letters: VIETNAMESE_LETTERS.filter((l) => chuSelected.has(l)),
        mode: chuCase,
        rows: chuRows,
      });
    } else if (tab === "van") {
      setWorksheet({
        kind: "van",
        consonants: PHU_AM.filter((p) => phuSelected.has(p)),
        vowels: NGUYEN_AM.filter((n) => nguyenSelected.has(n)),
        toneSyllable: toneSyllable || undefined,
      });
    } else {
      setWorksheet({ kind: "toan", items: generateMathItems(toanType, toanRange, toanCount) });
    }
  };

  const titleKey =
    worksheet?.kind === "chu"
      ? "vi_print_title_chu"
      : worksheet?.kind === "van"
      ? "vi_print_title_van"
      : worksheet?.kind === "toan"
      ? "vi_print_title_toan"
      : "vi_print_title_default";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 md:flex-row print:block print:max-w-none print:px-0 print:py-0">
      {/* Sidebar controls */}
      <div className="flex w-full shrink-0 flex-col gap-5 rounded-3xl border border-border bg-card p-5 print:hidden md:w-72">
        <div>
          <h1 className="font-heading text-xl font-black text-foreground">{t("vi_print_title")}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{t("vi_print_subtitle")}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          {(["chu", "van", "toan"] as const).map((tabKey) => (
            <button
              key={tabKey}
              type="button"
              onClick={() => setTab(tabKey)}
              className={cn(
                "rounded-xl border-l-4 px-3 py-2.5 text-left text-sm font-bold transition-colors",
                tab === tabKey
                  ? "border-vietnamese-accent bg-vietnamese-accent-soft text-vietnamese-accent"
                  : "border-transparent text-muted-foreground hover:bg-muted/60"
              )}
            >
              {t(tabKey === "chu" ? "vi_print_tab_chu" : tabKey === "van" ? "vi_print_tab_van" : "vi_print_tab_toan")}
            </button>
          ))}
        </div>

        {tab === "chu" && (
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground">{t("vi_print_pick_letters")}</label>
              <div className="flex flex-wrap gap-1.5">
                {VIETNAMESE_LETTERS.map((l) => (
                  <Chip key={l} label={l} active={chuSelected.has(l)} onClick={() => toggle(chuSelected, setChuSelected, l)} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setChuSelected(new Set(VIETNAMESE_LETTERS))}
                className="mt-1.5 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                {t("vi_print_select_all_letters")}
              </button>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground" htmlFor="chu-case">
                {t("vi_print_case_style")}
              </label>
              <select
                id="chu-case"
                value={chuCase}
                onChange={(e) => setChuCase(e.target.value as VietnameseCaseMode)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="lowercase">{t("case_lowercase")}</option>
                <option value="uppercase">{t("case_uppercase")}</option>
                <option value="both">{t("case_both")}</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground" htmlFor="chu-rows">
                {t("vi_print_rows_per_letter")}
              </label>
              <input
                id="chu-rows"
                type="number"
                min={1}
                max={4}
                value={chuRows}
                onChange={(e) => setChuRows(Math.min(4, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}

        {tab === "van" && (
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground">{t("vi_consonants_label")}</label>
              <div className="flex flex-wrap gap-1.5">
                {PHU_AM.map((p) => (
                  <Chip key={p} label={p} active={phuSelected.has(p)} onClick={() => toggle(phuSelected, setPhuSelected, p)} />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground">{t("vi_vowels_label")}</label>
              <div className="flex flex-wrap gap-1.5">
                {NGUYEN_AM.map((n) => (
                  <Chip key={n} label={n} active={nguyenSelected.has(n)} onClick={() => toggle(nguyenSelected, setNguyenSelected, n)} />
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground" htmlFor="tone-syllable-print">
                {t("vi_tone_table_label")}
              </label>
              <select
                id="tone-syllable-print"
                value={toneSyllable}
                onChange={(e) => setToneSyllable(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="">{t("vi_tone_table_none")}</option>
                {toneOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {tab === "toan" && (
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-muted-foreground" htmlFor="toan-type">
                {t("vi_math_type_label")}
              </label>
              <select
                id="toan-type"
                value={toanType}
                onChange={(e) => setToanType(e.target.value as MathWorksheetType)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="dem">{t("vi_math_type_count")}</option>
                <option value="cong">{t("vi_math_type_add")}</option>
                <option value="tru">{t("vi_math_type_subtract")}</option>
              </select>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-bold text-muted-foreground" htmlFor="toan-range">
                  {t("vi_math_range_label")}
                </label>
                <select
                  id="toan-range"
                  value={toanRange}
                  onChange={(e) => setToanRange(parseInt(e.target.value, 10))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value={5}>1 – 5</option>
                  <option value={10}>1 – 10</option>
                  <option value={20}>1 – 20</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-bold text-muted-foreground" htmlFor="toan-count">
                  {t("vi_math_count_label")}
                </label>
                <input
                  id="toan-count"
                  type="number"
                  min={4}
                  max={20}
                  value={toanCount}
                  onChange={(e) => setToanCount(Math.min(20, Math.max(4, parseInt(e.target.value, 10) || 4)))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          className="mt-auto rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
        >
          {t("vi_print_generate")}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-foreground px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted/60"
        >
          <Printer className="size-4" />
          {t("vi_print_print_pdf")}
        </button>
      </div>

      {/* Worksheet paper */}
      <div className="flex flex-1 justify-center overflow-x-auto print:overflow-visible">
        <div className="w-full max-w-[794px] rounded-2xl bg-card p-8 shadow-md print:rounded-none print:p-6 print:shadow-none sm:p-10">
          <div className="mb-6 flex items-end justify-between border-b-2 border-foreground pb-2.5">
            <h2 className="font-heading text-2xl font-black text-foreground">{t(titleKey)}</h2>
            <div className="text-right text-xs text-muted-foreground leading-relaxed">
              <div>
                {t("vi_print_name_label")} <span className="inline-block w-28 border-b border-muted-foreground" />
              </div>
              <div>
                {t("vi_print_date_label")} <span className="inline-block w-28 border-b border-muted-foreground" />
              </div>
            </div>
          </div>

          {!worksheet && (
            <p className="py-10 text-center text-sm text-muted-foreground">{t("vi_print_empty_hint")}</p>
          )}

          {worksheet?.kind === "chu" &&
            (worksheet.letters.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">{t("vi_choose_at_least_one_letter")}</p>
            ) : (
              <div className="flex flex-col gap-8">
                {worksheet.letters.map((letterKey, idx) => (
                  <div key={letterKey} className={idx > 0 ? "page-break pt-4" : ""}>
                    <SingleLetterPracticeSheet
                      letter={letterKey}
                      letterCase={worksheet.mode === "uppercase" ? "upper" : worksheet.mode === "both" ? "both" : "lower"}
                      indexNumber={idx + 1}
                    />
                  </div>
                ))}
              </div>
            ))}

          {worksheet?.kind === "van" &&
            (worksheet.consonants.length === 0 || worksheet.vowels.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">{t("vi_choose_at_least_one_each")}</p>
            ) : (
              <BlendingTable
                consonants={worksheet.consonants}
                vowels={worksheet.vowels}
                toneSyllable={worksheet.toneSyllable}
              />
            ))}

          {worksheet?.kind === "toan" && <MathWorksheet items={worksheet.items} />}
        </div>
      </div>
    </div>
  );
}
