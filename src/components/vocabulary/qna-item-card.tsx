"use client";

import { useState } from "react";
import { MessageCircleQuestion, Volume2 } from "lucide-react";
import type { VocabItem, VocabTopic } from "@/data/vocabulary";
import { getItemQuestions } from "@/data/vocabulary";
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

export function QnaItemCard({ topic, item }: { topic: VocabTopic; item: VocabItem }) {
  const { language, t } = useLanguage();
  const questions = getItemQuestions(topic, item);
  const [questionIndex, setQuestionIndex] = useState<number | null>(null);
  const [asking, setAsking] = useState(false);
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
    const nextIndex = questionIndex === null ? 0 : (questionIndex + 1) % questions.length;
    setQuestionIndex(nextIndex);
    setAsking(true);
    speakEnglish(questions[nextIndex].en);
    window.setTimeout(() => setAsking(false), 800);
  };

  const handleTapVi = (e: React.MouseEvent | React.KeyboardEvent, text: string) => {
    e.stopPropagation();
    speakVietnamese(text);
    setViActive(true);
    window.setTimeout(() => setViActive(false), 400);
  };

  const current = questionIndex !== null ? questions[questionIndex] : null;

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
        asking && "ring-4 ring-primary/50"
      )}
    >
      {isNumber ? (
        <NumberBadge number={numberVal} />
      ) : CustomSvg ? (
        <CustomSvg className="size-16" />
      ) : (
        <span className="text-6xl" aria-hidden>
          {item.emoji}
        </span>
      )}

      {current ? (
        <div className="flex min-h-12 flex-col items-center gap-0.5 px-2">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
            <MessageCircleQuestion className="size-3.5" />
            {asking && t("qna_listening")}
          </span>
          <span className="text-sm font-bold text-foreground text-center">{current.en}</span>
          {language === "vi" && (
            <button
              onClick={(e) => handleTapVi(e, current.vi)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleTapVi(e, current.vi);
              }}
              className={cn(
                "mt-0.5 flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                viActive && "bg-primary/20 text-primary"
              )}
            >
              <Volume2 className="size-3 shrink-0" />
              <span className="text-center">{current.vi}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-muted-foreground">{item.word.en}</span>
          {item.word.ipa && (
            <span className="text-[10px] text-muted-foreground/70 font-mono">{item.word.ipa}</span>
          )}
        </div>
      )}
    </Card>
  );
}
