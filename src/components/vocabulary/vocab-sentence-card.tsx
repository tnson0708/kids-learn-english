"use client";

import { useState } from "react";
import { Volume2, Sparkles } from "lucide-react";
import type { Bilingual } from "@/data/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { speakEnglish, speakVietnamese } from "@/lib/speech";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VocabSentenceCardProps {
  sentence: Bilingual;
  index: number;
}

export function VocabSentenceCard({ sentence, index }: VocabSentenceCardProps) {
  const { language } = useLanguage();
  const [active, setActive] = useState(false);
  const [viActive, setViActive] = useState(false);

  const handleTap = () => {
    speakEnglish(sentence.en);
    setActive(true);
    window.setTimeout(() => setActive(false), 500);
  };

  const handleTapVi = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    speakVietnamese(sentence.vi);
    setViActive(true);
    window.setTimeout(() => setViActive(false), 500);
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleTap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleTap();
      }}
      className={cn(
        "relative flex cursor-pointer flex-col gap-2.5 border-none bg-card p-4 sm:p-5 shadow-sm transition-all duration-150 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] rounded-2xl sm:rounded-3xl",
        active && "ring-4 ring-primary/50"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs sm:text-sm font-black text-primary">
            {index + 1}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-50 rounded-full px-2.5 py-0.5 dark:bg-amber-950/40">
            <Sparkles className="size-3" />
            Sentence
          </span>
        </div>
        <button
          type="button"
          aria-label="Listen English"
          onClick={(e) => {
            e.stopPropagation();
            handleTap();
          }}
          className={cn(
            "flex size-9 sm:size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform hover:scale-105 active:scale-95",
            active && "bg-primary text-primary-foreground animate-bounce"
          )}
        >
          <Volume2 className="size-4 sm:size-5" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-heading text-base sm:text-lg font-black leading-snug text-foreground">
          {sentence.en}
        </p>

        {language === "vi" && (
          <button
            type="button"
            onClick={handleTapVi}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleTapVi(e);
            }}
            className={cn(
              "mt-1 self-start inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95",
              viActive && "bg-primary/20 text-primary"
            )}
          >
            <Volume2 className="size-3.5 shrink-0 text-primary/80" />
            <span>{sentence.vi}</span>
          </button>
        )}
      </div>
    </Card>
  );
}
