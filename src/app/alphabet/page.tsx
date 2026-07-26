"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { alphabet } from "@/data/alphabet";
import { LetterCard } from "@/components/alphabet/letter-card";
import { cn } from "@/lib/utils";

export default function AlphabetPage() {
  const { t } = useLanguage();
  const [caseMode, setCaseMode] = useState<"uppercase" | "lowercase" | "both">("lowercase");

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          {t("alphabet_title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("alphabet_subtitle")}</p>

        {/* Case Toggle Control */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex rounded-full bg-muted/80 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setCaseMode("uppercase")}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all sm:text-sm",
                caseMode === "uppercase"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("case_uppercase")}
            </button>
            <button
              type="button"
              onClick={() => setCaseMode("lowercase")}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all sm:text-sm",
                caseMode === "lowercase"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("case_lowercase")}
            </button>
            <button
              type="button"
              onClick={() => setCaseMode("both")}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all sm:text-sm",
                caseMode === "both"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t("case_both")}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {alphabet.map((letter, i) => (
          <LetterCard key={letter.letter} letter={letter} index={i} caseMode={caseMode} />
        ))}
      </div>
    </div>
  );
}
