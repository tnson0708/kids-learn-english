"use client";

import { useState } from "react";
import { Volume2, Sparkles, HelpCircle } from "lucide-react";
import type { QnaQuestion } from "@/data/qna";
import { useLanguage } from "@/lib/language-context";
import { speakEnglish, speakVietnamese } from "@/lib/speech";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function QnaQuestionCard({ item }: { item: QnaQuestion }) {
  const { language } = useLanguage();
  const [asking, setAsking] = useState(false);
  const [viActive, setViActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAskQuestion = () => {
    speakEnglish(item.question.en);
    setAsking(true);
    window.setTimeout(() => setAsking(false), 800);
  };

  const handleSpeakVi = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakVietnamese(text);
    setViActive(true);
    window.setTimeout(() => setViActive(false), 400);
  };

  const handleSpeakAnswerEn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.sampleAnswer) {
      speakEnglish(item.sampleAnswer.en);
    }
  };

  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-between border-none bg-card p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        asking && "ring-4 ring-primary/50"
      )}
    >
      <div className="flex w-full flex-col items-center gap-3">
        <span className="text-6xl" aria-hidden>
          {item.emoji}
        </span>

        {/* English Question */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAskQuestion}
            className="group inline-flex items-center gap-2 text-left"
          >
            <span className="font-heading text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
              {item.question.en}
            </span>
            <span className="rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <Volume2 className="size-4" />
            </span>
          </button>
        </div>

        {/* Vietnamese Translation with TTS */}
        {language === "vi" && (
          <button
            type="button"
            onClick={(e) => handleSpeakVi(e, item.question.vi)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              viActive && "bg-primary/20 text-primary"
            )}
          >
            <Volume2 className="size-3" />
            <span>{item.question.vi}</span>
          </button>
        )}
      </div>

      {/* Sample Answer Section */}
      {item.sampleAnswer && (
        <div className="mt-5 w-full border-t border-border/50 pt-4">
          {!showAnswer ? (
            <button
              type="button"
              onClick={() => {
                setShowAnswer(true);
                if (item.sampleAnswer) speakEnglish(item.sampleAnswer.en);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-primary/40 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary/10 hover:scale-105 active:scale-95"
            >
              <HelpCircle className="size-3.5" />
              <span>Gợi ý câu trả lời / Sample Answer</span>
            </button>
          ) : (
            <div className="flex flex-col items-center gap-1 rounded-2xl bg-amber-500/10 p-3 text-amber-900 dark:text-amber-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-0.5">
                <Sparkles className="size-3.5" />
                <span>Gợi ý trả lời:</span>
              </div>
              <button
                type="button"
                onClick={handleSpeakAnswerEn}
                className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-foreground hover:text-primary transition-colors"
              >
                <span>&quot;{item.sampleAnswer.en}&quot;</span>
                <Volume2 className="size-3.5 text-primary" />
              </button>
              {language === "vi" && (
                <span className="text-xs font-medium text-muted-foreground">
                  ({item.sampleAnswer.vi})
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
