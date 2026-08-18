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

import { ParentPinModal } from "@/components/parent-pin-modal";
import { useReward } from "@/lib/reward-context";
import { GoldCoin } from "@/components/gold-coin";
import { Trophy, Check } from "lucide-react";

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
  const { isItemRewarded, rewardItem } = useReward();
  const [open, setOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const gradient = CARD_COLORS[index % CARD_COLORS.length];

  const itemId = `letter_${letter.letter}`;
  const isRewarded = isItemRewarded(itemId);

  const displayLetter =
    caseMode === "lowercase"
      ? letter.letter.toLowerCase()
      : caseMode === "both"
      ? `${letter.letter} ${letter.letter.toLowerCase()}`
      : letter.letter;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(letter.speakAs || letter.letter.toLowerCase());
  };

  const handleParentReward = () => {
    if (!isRewarded) {
      setShowPinModal(true);
    }
  };

  return (
    <>
      <Card
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpen();
        }}
        title={t("alphabet_tap_hint")}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-1 border-none bg-gradient-to-br ${gradient} py-5 shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-md active:translate-y-0 rounded-2xl sm:rounded-3xl`}
      >
        {/* Parent Reward Button / Completed Badge */}
        {isRewarded ? (
          <div
            title="Đã thưởng"
            className="absolute top-2 left-2 rounded-full bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-400 px-2 py-0.5 text-[10px] sm:text-xs font-black text-emerald-700 dark:text-emerald-300 shadow-2xs flex items-center gap-1"
          >
            <Check className="size-3 text-emerald-600 stroke-[3] shrink-0" />
            <span>+5</span>
            <GoldCoin className="size-3.5 shrink-0" />
          </div>
        ) : (
          <button
            type="button"
            onClick={handleParentReward}
            title="Ba Mẹ thưởng chữ cái này / Parent Reward"
            className="absolute top-2 left-2 rounded-full bg-white/95 dark:bg-slate-900/90 border-2 border-amber-300 dark:border-amber-700 px-2 py-0.5 text-[10px] sm:text-xs font-black text-amber-800 dark:text-amber-200 shadow-2xs flex items-center gap-1 transition-all hover:scale-105 hover:bg-white active:scale-95"
          >
            <span>+5</span>
            <GoldCoin className="size-3.5 shrink-0" />
          </button>
        )}

        <button
          type="button"
          onClick={handleSpeak}
          aria-label={t("alphabet_speak")}
          className="absolute top-2 right-2 rounded-full bg-white/85 p-1.5 text-primary shadow-xs transition-all hover:bg-white hover:scale-110 active:scale-90"
        >
          <Volume2 className="size-3.5 sm:size-4" />
        </button>

        <span className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl mt-2">
          {displayLetter}
        </span>
        <span className="text-xs font-semibold text-foreground/60">{letter.ipa}</span>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              {t("alphabet_dialog_title")}: {displayLetter}
            </DialogTitle>
          </DialogHeader>

          <StrokeOrderSvg
            letter={letter}
            caseMode={caseMode}
            autoPlay={open}
            className="mx-auto h-52 w-52 text-primary"
          />

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => speakEnglish(letter.speakAs || letter.letter.toLowerCase())}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground shadow-sm transition-transform hover:bg-primary/90 active:scale-95"
            >
              <Volume2 className="size-4" />
              {t("alphabet_speak")}
            </button>

            {isRewarded ? (
              <div className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 px-4 py-2 text-xs font-extrabold text-emerald-800 dark:text-emerald-200">
                <Check className="size-4 text-emerald-600 stroke-[3]" />
                <span>Đã thưởng +5</span>
                <GoldCoin className="size-4" />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleParentReward}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/60 dark:border-amber-500 px-4 py-2 text-xs font-extrabold text-amber-800 dark:text-amber-200 transition-all hover:bg-amber-100 active:scale-95 shadow-xs"
              >
                <Trophy className="size-4 text-amber-500 fill-amber-400" />
                <span>Ba Mẹ Thưởng +5</span>
                <GoldCoin className="size-4" />
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ParentPinModal
        open={showPinModal}
        onOpenChange={setShowPinModal}
        onSuccess={() => rewardItem(itemId, 5, `Chữ ${letter.letter}`)}
        title={`Thưởng cho bé đọc/viết chữ ${letter.letter}`}
      />
    </>
  );
}
