"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Pause, Play, RotateCcw, Star, Timer } from "lucide-react";
import {
  buildZooDeck,
  getCoinReward,
  getPairsForLevel,
  getStars,
  getTimeLimitForLevel,
  EMPTY_BEST_LEVELS,
  loadBestLevels,
  saveBestLevels,
  ZOO_DIFFICULTIES,
  type ZooBestLevels,
  type ZooCard,
  type ZooDifficulty,
} from "@/data/english/zoo-memory";
import { useVoice } from "@/lib/voice-context";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { useIsWide } from "@/lib/use-is-wide";
import { playCorrectSound, playVictorySound, playWrongSound } from "@/lib/sound-effects";
import { ConfettiEffect } from "@/components/english/quiz/confetti-effect";
import { GoldCoin } from "@/components/gold-coin";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Phase = "intro" | "playing" | "complete" | "timeout";

const COLUMNS_NARROW: Record<number, number> = { 4: 2, 6: 3, 8: 4, 12: 4, 16: 4, 20: 4, 24: 4 };
const COLUMNS_WIDE: Record<number, number> = { 4: 2, 6: 3, 8: 4, 12: 4, 16: 4, 20: 5, 24: 6 };

// Board sizing: cards stay compact and the whole board fits in the viewport,
// so a timed round never needs scrolling.
const MAX_CARD_REM = 7;
const CARD_GAP_REM = 0.5;
const BOARD_PADDING_REM = 0.5;
const MIN_BOARD_REM = 16;
// Viewport height taken by the site header, game header and stats around the board.
const RESERVED_HEIGHT_NARROW_REM = 18;
const RESERVED_HEIGHT_WIDE_REM = 19;

const getColumns = (count: number, wide: boolean) =>
  (wide ? COLUMNS_WIDE : COLUMNS_NARROW)[count] ?? (wide ? 6 : 4);

const FLIP_BACK_DELAY_MS = 1000;
const MATCH_DELAY_MS = 500;
const MATCH_BONUS_SECONDS = 2;
const BONUS_FLASH_MS = 1000;

const DIFFICULTY_EMOJI: Record<ZooDifficulty, string> = {
  easy: "🐢",
  normal: "🐰",
  hard: "🐆",
};

const faceStyle = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
} as const;

export default function ZooMemoryPage() {
  const { t } = useLanguage();
  const { speak } = useVoice();
  const { addQuizCoins } = useReward();
  const isWide = useIsWide();

  const [phase, setPhase] = useState<Phase>("intro");
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState<ZooDifficulty>("normal");
  const [cards, setCards] = useState<ZooCard[]>([]);
  const [openUids, setOpenUids] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [stars, setStars] = useState<1 | 2 | 3>(3);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [bestLevels, setBestLevels] = useState<ZooBestLevels>(EMPTY_BEST_LEVELS);
  const [newRecord, setNewRecord] = useState(false);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const loadBest = setTimeout(() => setBestLevels(loadBestLevels()), 0);
    return () => {
      clearTimeout(loadBest);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const pairs = getPairsForLevel(level);
  const timeLimit = getTimeLimitForLevel(level, difficulty);
  const allMatched = matchedIds.length === pairs;

  useEffect(() => {
    if (phase !== "playing" || allMatched || paused) return;
    const tick = setTimeout(() => {
      if (timeLeft > 1) {
        setTimeLeft(timeLeft - 1);
        return;
      }
      timers.current.forEach(clearTimeout);
      timers.current = [];
      setTimeLeft(0);
      setOpenUids([]);
      setLocked(false);
      setShowBonus(false);
      setPhase("timeout");
      playWrongSound();
    }, 1000);
    return () => clearTimeout(tick);
  }, [phase, allMatched, paused, timeLeft]);

  useEffect(() => {
    if (phase !== "playing" || !allMatched) return;
    const done = setTimeout(() => {
      setStars(getStars(moves, pairs));
      setCoinsEarned(addQuizCoins(getCoinReward(difficulty, timeLeft, timeLimit)));
      if (level > bestLevels[difficulty]) {
        const nextBest = { ...bestLevels, [difficulty]: level };
        setBestLevels(nextBest);
        saveBestLevels(nextBest);
        setNewRecord(true);
      }
      setPhase("complete");
      playVictorySound();
    }, 700);
    return () => clearTimeout(done);
  }, [phase, allMatched, moves, pairs, level, difficulty, bestLevels, timeLeft, timeLimit, addQuizCoins]);

  useEffect(() => {
    if (phase !== "playing") return;
    const pauseWhenHidden = () => {
      if (document.hidden) setPaused(true);
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, [phase]);

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
    setTimeLeft(getTimeLimitForLevel(nextLevel, difficulty));
    setPaused(false);
    setShowBonus(false);
    setNewRecord(false);
    setPhase("playing");
  };

  const handleFlip = (card: ZooCard) => {
    if (phase !== "playing" || locked || paused) return;
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
      setTimeLeft((s) => Math.min(timeLimit, s + MATCH_BONUS_SECONDS));
      setShowBonus(true);
      later(() => setShowBonus(false), BONUS_FLASH_MS);
      playCorrectSound();
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

        <div className="mt-6 w-full">
          <p className="mb-2 text-sm font-extrabold text-foreground">{t("zoo_pick_difficulty")}</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3" role="radiogroup" aria-label={t("zoo_pick_difficulty")}>
            {ZOO_DIFFICULTIES.map((d) => {
              const selected = d === difficulty;
              return (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-2xl border-2 px-2 py-3 transition-all active:scale-95",
                    selected
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:bg-accent"
                  )}
                >
                  <span className="text-3xl" aria-hidden>
                    {DIFFICULTY_EMOJI[d]}
                  </span>
                  <span className="font-heading text-base font-extrabold text-foreground">
                    {t(`zoo_diff_${d}`)}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {t(`zoo_diff_${d}_desc`)}
                  </span>
                  <span className="mt-0.5 text-xs font-bold tabular-nums text-primary">
                    ⏱ {getTimeLimitForLevel(1, d)} {t("zoo_seconds")}
                  </span>
                  {bestLevels[d] > 0 && (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      🏆 {t("zoo_level")} {bestLevels[d]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => startLevel(1)}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-lg font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
        >
          {t("zoo_start")}
        </button>
        <div className="mt-6">{backLink}</div>
      </div>
    );
  }

  if (phase === "timeout") {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mb-3 text-6xl" aria-hidden>
          ⏰
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">{t("zoo_time_up")}</h1>
        <p className="mt-2 text-sm font-bold text-muted-foreground">
          {t("zoo_level")} {level} · {matchedIds.length} / {pairs} {t("zoo_pairs_found").toLowerCase()}
        </p>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">{t("zoo_time_up_hint")}</p>

        <div className="mt-6 flex w-full max-w-xs flex-col gap-3">
          <button
            type="button"
            onClick={() => startLevel(level)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
          >
            <RotateCcw className="size-4" />
            {t("zoo_try_again")}
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
          <button
            type="button"
            onClick={() => setPhase("intro")}
            className="text-sm font-bold text-muted-foreground underline-offset-2 hover:underline"
          >
            {t("zoo_change_difficulty")}
          </button>
          <div className="mt-2 flex justify-center">{backLink}</div>
        </div>
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
        {newRecord && (
          <div className="mt-2 inline-flex animate-bounce items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-black text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            🏆 {t("zoo_new_record")}
          </div>
        )}
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
          <button
            type="button"
            onClick={() => setPhase("intro")}
            className="text-sm font-bold text-muted-foreground underline-offset-2 hover:underline"
          >
            {t("zoo_change_difficulty")}
          </button>
        </div>
      </div>
    );
  }

  const columns = getColumns(cards.length, isWide);
  const rows = Math.ceil(cards.length / columns);
  const reservedHeight = isWide ? RESERVED_HEIGHT_WIDE_REM : RESERVED_HEIGHT_NARROW_REM;
  const boardWidth = `min(calc((100dvh - ${reservedHeight}rem) * ${columns} / ${rows}), ${
    columns * MAX_CARD_REM + (columns - 1) * CARD_GAP_REM
  }rem)`;
  const boardCardWidth = `min(100%, max(${MIN_BOARD_REM}rem, calc(${boardWidth} + ${2 * BOARD_PADDING_REM}rem)))`;
  const timePercent = Math.round((timeLeft / timeLimit) * 100);
  const timeLow = timeLeft <= Math.max(5, Math.round(timeLimit * 0.2));

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-3 py-3 sm:px-4 sm:py-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link
          href="/english/quiz"
          aria-label={t("quiz_back_to_modes")}
          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm font-extrabold text-foreground shadow-xs transition-all hover:bg-accent active:scale-95"
        >
          <ArrowLeft className="size-4 text-primary" />
          <span className="hidden sm:inline">{t("quiz_back_to_modes")}</span>
        </Link>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPaused(true)}
            disabled={paused || allMatched}
            aria-label={t("zoo_pause")}
            className="inline-flex size-8 items-center justify-center rounded-full border bg-card text-foreground shadow-xs transition-all hover:bg-accent active:scale-95 disabled:opacity-50"
          >
            <Pause className="size-4" />
          </button>
          <div
            role="timer"
            aria-label={`${t("zoo_time_left")}: ${timeLeft} ${t("zoo_seconds")}`}
            className={cn(
              "relative inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-extrabold tabular-nums",
              timeLow ? "animate-pulse bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
            )}
          >
            <Timer className="size-4" />
            {timeLeft}
            {t("zoo_seconds")}
            {showBonus && (
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-5 right-2 animate-bounce text-xs font-black text-emerald-600 dark:text-emerald-400"
              >
                +{MATCH_BONUS_SECONDS}
                {t("zoo_seconds")}
              </span>
            )}
          </div>
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary">
            {t("zoo_level")} {level}
          </div>
        </div>
      </div>

      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-linear",
            timeLow ? "bg-red-500" : "bg-amber-400"
          )}
          style={{ width: `${timePercent}%` }}
        />
      </div>

      <div className="mb-3 flex justify-between text-xs font-bold text-muted-foreground">
        <span>
          🐾 {t("zoo_pairs_found")}: {matchedIds.length} / {pairs}
        </span>
        <span>
          {t("zoo_moves")}: {moves}
        </span>
      </div>

      <Card
        className="relative mx-auto border-none bg-gradient-to-br from-emerald-100 via-lime-50 to-amber-100 shadow-md dark:from-emerald-950/50 dark:via-background dark:to-amber-950/30"
        style={{ width: boardCardWidth, padding: `${BOARD_PADDING_REM}rem` }}
      >
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: `${CARD_GAP_REM}rem`,
          }}
        >
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
                className="relative aspect-square w-full cursor-pointer select-none [container-type:inline-size] active:scale-95 [perspective:800px]"
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
                    className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-400 to-teal-500 text-[38cqw] leading-none shadow-sm"
                  >
                    🐾
                  </div>
                  <div
                    style={{ ...faceStyle, transform: "rotateY(180deg)" }}
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] rounded-xl border-2 bg-card shadow-sm",
                      matched ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400/50 dark:bg-emerald-950/40" : "border-amber-300"
                    )}
                  >
                    <span className="text-[40cqw] leading-none" aria-hidden>
                      {card.emoji}
                    </span>
                    <span className="font-heading text-[clamp(9px,14cqw,15px)] font-extrabold leading-none text-foreground">
                      {card.word}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {paused && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[inherit] bg-card">
            <div className="text-5xl" aria-hidden>
              ⏸️
            </div>
            <p className="font-heading text-xl font-extrabold text-foreground">{t("zoo_paused")}</p>
            <button
              type="button"
              onClick={() => setPaused(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-base font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
            >
              <Play className="size-5" />
              {t("zoo_resume")}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
