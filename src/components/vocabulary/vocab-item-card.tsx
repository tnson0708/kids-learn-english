"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import type { VocabItem } from "@/data/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { speakEnglish, speakVietnamese } from "@/lib/speech";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VocabItemCard({ item }: { item: VocabItem }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(false);
  const [viActive, setViActive] = useState(false);

  const handleTap = () => {
    speakEnglish(item.word.en);
    setActive(true);
    window.setTimeout(() => setActive(false), 400);
  };

  const handleTapVi = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    speakVietnamese(item.word.vi);
    setViActive(true);
    window.setTimeout(() => setViActive(false), 400);
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
        "flex cursor-pointer flex-col items-center justify-center gap-2 border-none bg-card py-6 text-center shadow-sm transition-all duration-150 hover:-translate-y-1 hover:shadow-md active:scale-95",
        active && "ring-4 ring-primary/50"
      )}
    >
      <span className="text-6xl" aria-hidden>
        {item.emoji}
      </span>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-heading text-lg font-extrabold text-foreground">{item.word.en}</span>
        {item.word.ipa && (
          <span className="text-xs text-muted-foreground/80 font-mono">{item.word.ipa}</span>
        )}
      </div>
      {language === "vi" && (
        <button
          onClick={handleTapVi}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleTapVi(e);
          }}
          className={cn(
            "mt-1 flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
            viActive && "bg-primary/20 text-primary"
          )}
        >
          <Volume2 className="size-3" />
          {item.word.vi}
        </button>
      )}
    </Card>
  );
}
