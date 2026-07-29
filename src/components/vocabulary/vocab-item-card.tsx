"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import type { VocabItem } from "@/data/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { speakEnglish, speakVietnamese } from "@/lib/speech";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CUSTOM_VEGETABLE_SVGS } from "@/components/vegetable-svgs";
import { CUSTOM_FRUIT_SVGS } from "@/components/fruit-svgs";
import { CUSTOM_SCHOOL_SVGS } from "@/components/school-svgs";
import { CUSTOM_LIVING_ROOM_SVGS } from "@/components/living-room-svgs";
import { CUSTOM_KITCHEN_SVGS } from "@/components/kitchen-svgs";
import { CUSTOM_BEDROOM_SVGS } from "@/components/bedroom-svgs";
import { NumberBadge } from "./number-badge";

export function VocabItemCard({ item }: { item: VocabItem }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(false);
  const [viActive, setViActive] = useState(false);

  const isNumber = item.id.startsWith("num_");
  const numberVal = isNumber ? parseInt(item.id.replace("num_", ""), 10) : 0;
  const CustomSvg =
    CUSTOM_VEGETABLE_SVGS[item.id] ||
    CUSTOM_FRUIT_SVGS[item.id] ||
    CUSTOM_SCHOOL_SVGS[item.id] ||
    CUSTOM_LIVING_ROOM_SVGS[item.id] ||
    CUSTOM_KITCHEN_SVGS[item.id] ||
    CUSTOM_BEDROOM_SVGS[item.id];

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
        "relative flex cursor-pointer flex-col items-center justify-center gap-1.5 border-none bg-card py-4 px-2 sm:py-6 sm:px-3 text-center shadow-sm transition-all duration-150 hover:-translate-y-1 hover:shadow-md active:scale-95 rounded-2xl sm:rounded-3xl",
        active && "ring-4 ring-primary/50"
      )}
    >
      {isNumber ? (
        <NumberBadge number={numberVal} />
      ) : CustomSvg ? (
        <CustomSvg className="size-12 sm:size-16" />
      ) : (
        <span className="text-4xl sm:text-6xl" aria-hidden>
          {item.emoji}
        </span>
      )}
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-heading text-base sm:text-lg font-extrabold text-foreground">{item.word.en}</span>
        {item.word.ipa && (
          <span className="text-[10px] sm:text-xs text-muted-foreground/80 font-mono">{item.word.ipa}</span>
        )}
      </div>
      {language === "vi" && (
        <button
          onClick={handleTapVi}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleTapVi(e);
          }}
          className={cn(
            "mt-0.5 flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-1 text-[11px] sm:text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95",
            viActive && "bg-primary/20 text-primary"
          )}
        >
          <Volume2 className="size-3.5" />
          {item.word.vi}
        </button>
      )}
    </Card>
  );
}
