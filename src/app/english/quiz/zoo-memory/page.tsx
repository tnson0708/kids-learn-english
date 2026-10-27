"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Star } from "lucide-react";
import { buildZooDeck, getPairsForLevel, getStars, type ZooCard } from "@/data/english/zoo-memory";
import { useVoice } from "@/lib/voice-context";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { playCorrectSound, playVictorySound } from "@/lib/sound-effects";
import { ConfettiEffect } from "@/components/english/quiz/confetti-effect";
import { GoldCoin } from "@/components/gold-coin";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Phase = "intro" | "playing" | "complete";

const GRID_CLASSES: Record<number, string> = {
  4: "grid-cols-2 max-w-xs",
  6: "grid-cols-3 max-w-sm",
  8: "grid-cols-4 max-w-md",
  12: "grid-cols-4 max-w-md",
  16: "grid-cols-4 max-w-lg",
  20: "grid-cols-4 sm:grid-cols-5 max-w-xl",
  24: "grid-cols-4 sm:grid-cols-6 max-w-2xl",
};

const FLIP_BACK_DELAY_MS = 1000;
const MATCH_DELAY_MS = 500;
const COINS_PER_LEVEL = 5;

const faceStyle = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
} as const;

export default function ZooMemoryPage() {
  const { t } = useLanguage();
  const { speak } = useVoice();
  const { addQuizCoins } = useReward();

  const [phase, setPhase] = useState<Phase>("intro");
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<ZooCard[]>([]);
  const [openUids, setOpenUids] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [stars, setStars] = useState<1 | 2 | 3>(3);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const startLevel = (nextLevel: number) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLevel(nextLevel);
    setCards(buildZooDeck(nextLevel));
    setOpenUids([]);
    setMatchedIds([]);
    setMoves(0);
    setLocked(false);
    setCoinsEarned(0);
    setPhase("playing");
  };

  const pairs = getPairsForLevel(level);

  const handleFlip = (card: ZooCard) => {
    if (phase !== "playing" || locked) return;
    if (openUids.includes(card.uid) || matchedIds.includes(card.animalId)) return;

    speak(card.word, "en");
    const nextOpen = [...openUids, card.uid];
    setOpenUids(nextOpen);
    if (nextOpen.length < 2) return;

    const nextMoves = moves + 1;
    setMoves(nextMoves);
    setLocked(true);

    const first = cards.find((c) => c.uid === nextOpen[0]);
    const isMatch = first?.animalId === card.animalId;

    if (!isMatch) {
      later(() => {
        setOpenUids([]);
        setLocked(false);
      }, FLIP_BACK_DELAY_MS);
      return;
    }

    later(() => {
      const nextMatched = [...matchedIds, card.animalId];
      setMatchedIds(nextMatched);
      setOpenUids([]);
      setLocked(false);
      playCorrectSound();

      if (nextMatched.length === pairs) {
        later(() => {
          setStars(getStars(nextMoves, pairs));
          setCoinsEarned(addQuizCoins(COINS_PER_LEVEL));
          setPhase("complete");
          playVictorySound();
        }, 700);
      }
    }, MATCH_DELAY_MS);
  };

  const backLink = (
    <Link
      href="/english/quiz"
      className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2.5 text-sm font-extrabold text-foreground shadow-xs transition-all hover:bg-accent hover:shadow-md active:scale-95"
    >
      <ArrowLeft className="size-5 text-primary" />
      <span>{t("quiz_back_to_modes")}</span>
    </Link>
  );

  if (phase === "intro") {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-10 text-center">
        <div className="mb-4 text-7xl" aria-hidden>
          🦁🐘🦒
        </div>
        <h1 className="font-heading text-3xl font-black text-foreground sm:text-4xl">{t("zoo_title")}</h1>
        <p className="mt-3 text-sm font-semibold text-muted-foreground sm:text-base">{t("zoo_intro")}</p>
        <button
          type="button"
          onClick={() => startLevel(1)}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-lg font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
        >
          {t("zoo_start")}
        </button>
        <div className="mt-6">{backLink}</div>
      </div>
    );
  }

  if (phase === "complete") {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <ConfettiEffect active />
        <div className="mb-3 text-6xl" aria-hidden>
          🏆
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
          {t("zoo_level_complete")}
        </h1>
        <p className="mt-1 text-sm font-bold text-muted-foreground">
          {t("zoo_level")} {level} · {pairs * 2} {t("zoo_cards")} · {moves} {t("zoo_moves").toLowerCase()}
        </p>

        <div className="my-4 flex items-center gap-1.5" aria-label={`${stars} stars`}>
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              className={cn(
                "size-12",
                n <= stars ? "fill-amber-400 text-amber-500" : "fill-muted text-muted-foreground/40"
              )}
            />
          ))}
        </div>

        {coinsEarned > 0 && (
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            <GoldCoin className="size-4 shrink-0" />
            <span>
              {t("zoo_coins_earned")} <strong>+{coinsEarned}</strong> {t("gifts_dong")}
            </span>
          </div>
        )}

        <div className="flex w-full max-w-xs flex-col gap-3">
          <button
            type="button"
            onClick={() => startLevel(level + 1)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
          >
            {t("zoo_next_level")} ({getPairsForLevel(level + 1) * 2} {t("zoo_cards")})
          </button>
          <button
            type="button"
            onClick={() => startLevel(level)}
            className="inline-flex items-center justify-center gap-2 rounded-full border bg-background px-6 py-3 font-bold text-foreground transition-all hover:bg-accent active:scale-95"
          >
            <RotateCcw className="size-4" />
            {t("zoo_replay_level")}
          </button>
          {level > 1 && (
            <button
              type="button"
              onClick={() => startLevel(1)}
              className="text-sm font-bold text-muted-foreground underline-offset-2 hover:underline"
            >
              {t("zoo_restart")}
            </button>
          )}
        </div>
      </div>
    );
  }

  const gridClass = GRID_CLASSES[cards.length] ?? GRID_CLASSES[24];
  const progressPercent = Math.round((matchedIds.length / pairs) * 100);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        {backLink}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-extrabold text-primary">
          {t("zoo_level")} {level}
        </div>
      </div>

      <div className="mb-5 w-full">
        <div className="mb-1 flex justify-between text-xs font-bold text-muted-foreground">
          <span>
            {t("zoo_pairs_found")}: {matchedIds.length} / {pairs}
          </span>
          <span>
            {t("zoo_moves")}: {moves}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <Card className="border-none bg-gradient-to-br from-emerald-100 via-lime-50 to-amber-100 p-3 shadow-md sm:p-5 dark:from-emerald-950/50 dark:via-background dark:to-amber-950/30">
        <div className={cn("mx-auto grid w-full gap-2 sm:gap-3", gridClass)}>
          {cards.map((card) => {
            const matched = matchedIds.includes(card.animalId);
            const flipped = matched || openUids.includes(card.uid);
            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleFlip(card)}
                aria-label={flipped ? card.word : "?"}
                aria-pressed={flipped}
                className="relative aspect-square w-full cursor-pointer select-none active:scale-95 [perspective:800px]"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    style={faceStyle}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-400 to-teal-500 text-3xl shadow-md sm:text-5xl"
                  >
                    🐾
                  </div>
                  <div
                    style={{ ...faceStyle, transform: "rotateY(180deg)" }}
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-0.5 rounded-2xl border-2 bg-card shadow-md",
                      matched ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-400/40 dark:bg-emerald-950/40" : "border-amber-300"
                    )}
                  >
                    <span className="text-3xl sm:text-5xl" aria-hidden>
                      {card.emoji}
                    </span>
                    <span className="font-heading text-[10px] font-extrabold text-foreground sm:text-sm">
                      {card.word}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
