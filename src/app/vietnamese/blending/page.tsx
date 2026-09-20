"use client";

import { useMemo, useState } from "react";
import { NGUYEN_AM, PHU_AM } from "@/data/vietnamese/blending";
import { BlendingTable } from "@/components/vietnamese/blending-table";
import { useLanguage } from "@/lib/language-context";
import { useVoice } from "@/lib/voice-context";
import { cn } from "@/lib/utils";

const DEFAULT_CONSONANTS = ["b", "c", "đ"];
const DEFAULT_VOWELS = ["a", "e", "o"];

function ChipGroup({
  items,
  selected,
  onToggle,
}: {
  items: readonly string[];
  selected: Set<string>;
  onToggle: (item: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onToggle(item)}
          className={cn(
            "font-heading rounded-lg border px-2.5 py-1 text-sm transition-colors",
            selected.has(item)
              ? "border-vietnamese-accent bg-vietnamese-accent text-white"
              : "border-border bg-card text-foreground hover:border-vietnamese-accent/60"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default function VietnameseBlendingPage() {
  const { t } = useLanguage();
  const { speak } = useVoice();
  const [consonants, setConsonants] = useState<Set<string>>(new Set(DEFAULT_CONSONANTS));
  const [vowels, setVowels] = useState<Set<string>>(new Set(DEFAULT_VOWELS));
  const [toneSyllable, setToneSyllable] = useState("");

  const toggle = (set: Set<string>, setSet: (s: Set<string>) => void, item: string) => {
    const next = new Set(set);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    setSet(next);
  };

  const selectedConsonants = PHU_AM.filter((c) => consonants.has(c));
  const selectedVowels = NGUYEN_AM.filter((v) => vowels.has(v));

  const toneOptions = useMemo(() => {
    const options: string[] = [];
    selectedConsonants.forEach((c) => {
      selectedVowels.forEach((v) => options.push(`${c}${v}`));
    });
    return options;
  }, [selectedConsonants, selectedVowels]);

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-foreground">{t("vi_blending_title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("vi_blending_subtitle")}</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold text-muted-foreground">{t("vi_consonants_label")}</p>
          <ChipGroup items={PHU_AM} selected={consonants} onToggle={(c) => toggle(consonants, setConsonants, c)} />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-muted-foreground">{t("vi_vowels_label")}</p>
          <ChipGroup items={NGUYEN_AM} selected={vowels} onToggle={(v) => toggle(vowels, setVowels, v)} />
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-xs font-bold text-muted-foreground" htmlFor="tone-syllable">
          {t("vi_tone_table_label")}
        </label>
        <select
          id="tone-syllable"
          value={toneSyllable}
          onChange={(e) => setToneSyllable(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="">{t("vi_tone_table_none")}</option>
          {toneOptions.map((syllable) => (
            <option key={syllable} value={syllable}>
              {syllable}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5 sm:p-8">
        {selectedConsonants.length === 0 || selectedVowels.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{t("vi_choose_at_least_one_each")}</p>
        ) : (
          <BlendingTable
            consonants={selectedConsonants}
            vowels={selectedVowels}
            toneSyllable={toneSyllable || undefined}
            onCellTap={(syllable) => speak(syllable, "vi")}
          />
        )}
      </div>
    </div>
  );
}
