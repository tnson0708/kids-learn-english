"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import type { AlphabetLetter } from "@/data/alphabet";
import { speakEnglish } from "@/lib/speech";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StrokeOrderSvg } from "@/components/alphabet/stroke-order-svg";

const CARD_COLORS = [
  "from-rose-200 to-orange-100",
  "from-amber-200 to-yellow-100",
  "from-lime-200 to-emerald-100",
  "from-sky-200 to-cyan-100",
  "from-indigo-200 to-blue-100",
  "from-fuchsia-200 to-purple-100",
];

interface LetterCardProps {
  letter: AlphabetLetter;
  index: number;
  caseMode?: "uppercase" | "lowercase" | "both";
}

export function LetterCard({ letter, index, caseMode = "lowercase" }: LetterCardProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const gradient = CARD_COLORS[index % CARD_COLORS.length];

  const displayLetter =
    caseMode === "lowercase"
      ? letter.letter.toLowerCase()
      : caseMode === "both"
      ? `${letter.letter} ${letter.letter.toLowerCase()}`
      : letter.letter;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(letter.speakAs || letter.letter.toLowerCase());
  };

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        title={t("alphabet_tap_hint")}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-1 border-none bg-gradient-to-br ${gradient} py-5 shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-md active:translate-y-0`}
      >
        <button
          type="button"
          onClick={handleSpeak}
          aria-label={t("alphabet_speak")}
          className="absolute top-2 right-2 rounded-full bg-white/70 p-1.5 text-foreground/70 transition-colors hover:bg-white hover:text-primary active:scale-90"
        >
          <Volume2 className="size-4" />
        </button>
        <span className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">
          {displayLetter}
        </span>
        <span className="text-xs font-semibold text-foreground/60">{letter.ipa}</span>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              {t("alphabet_dialog_title")}: {displayLetter}
            </DialogTitle>
          </DialogHeader>
          <StrokeOrderSvg
            letter={letter}
            caseMode={caseMode}
            autoPlay={open}
            className="mx-auto h-56 w-56 text-primary"
          />
          <button
            type="button"
            onClick={() => speakEnglish(letter.speakAs || letter.letter.toLowerCase())}
            className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-xs transition-transform active:scale-95"
          >
            <Volume2 className="size-4" />
            {t("alphabet_speak")}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
