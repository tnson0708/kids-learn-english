"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Volume2, Star, Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { generateQuizRound, type QuizQuestionItem, type QuizMode } from "@/data/quiz";
import { speakEnglish } from "@/lib/speech";
import { playCorrectSound, playWrongSound, playVictorySound } from "@/lib/sound-effects";
import { ConfettiEffect } from "@/components/quiz/confetti-effect";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function QuizGameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();

  const mode = (searchParams.get("mode") as QuizMode) || "listen";

  const [questions, setQuestions] = useState<QuizQuestionItem[]>(() =>
    generateQuizRound(mode, 10)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongOptions, setWrongOptions] = useState<string[]>([]);
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [shakingOptionId, setShakingOptionId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const startNewRound = useCallback(() => {
    const round = generateQuizRound(mode, 10);
    setQuestions(round);
    setCurrentIndex(0);
    setStars(0);
    setSelectedOptionId(null);
    setIsCorrect(null);
    setWrongOptions([]);
    setIsFirstAttempt(true);
    setCompleted(false);
    setShowConfetti(false);
  }, [mode]);

  const currentQ = questions[currentIndex];

  // Auto-play TTS prompt when question changes
  useEffect(() => {
    if (!currentQ || completed) return;
    const timer = setTimeout(() => {
      speakEnglish(currentQ.promptSpeak);
    }, 400);
    return () => clearTimeout(timer);
  }, [currentIndex, currentQ, completed]);

  const handleReplayPrompt = () => {
    if (currentQ) {
      speakEnglish(currentQ.promptSpeak);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQ || isCorrect === true || wrongOptions.includes(optionId)) return;

    const opt = currentQ.options.find((o) => o.id === optionId);
    if (!opt) return;

    setSelectedOptionId(optionId);

    if (opt.isCorrect) {
      setIsCorrect(true);
      setShowConfetti(true);
      playCorrectSound();

      if (isFirstAttempt) {
        setStars((s) => s + 1);
      }
      if (opt.speakText) {
        speakEnglish(opt.speakText);
      }

      // Move to next question after 1.2s delay
      setTimeout(() => {
        setShowConfetti(false);
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((idx) => idx + 1);
          setSelectedOptionId(null);
          setIsCorrect(null);
          setWrongOptions([]);
          setIsFirstAttempt(true);
        } else {
          setCompleted(true);
          playVictorySound();
        }
      }, 1200);
    } else {
      setIsCorrect(false);
      setIsFirstAttempt(false);
      playWrongSound();
      setWrongOptions((prev) => [...prev, optionId]);
      setShakingOptionId(optionId);

      setTimeout(() => {
        setShakingOptionId(null);
      }, 500);
    }
  };

  if (!currentQ && !completed) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-muted-foreground">
        Loading Quiz...
      </div>
    );
  }

  if (completed) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <ConfettiEffect active count={60} />
        <div className="rounded-full bg-amber-500/10 p-6 text-amber-500 mb-4 animate-bounce">
          <Trophy className="size-16" />
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
          {t("quiz_victory_title")}
        </h1>
        <p className="mt-2 text-muted-foreground">{t("quiz_stars_earned")}:</p>

        <div className="my-6 inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-6 py-3 text-2xl font-extrabold text-amber-600 dark:text-amber-400">
          <Star className="size-8 fill-amber-400 text-amber-500" />
          <span>{stars} / {questions.length} Stars</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <button
            type="button"
            onClick={startNewRound}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
          >
            <RotateCcw className="size-5" />
            <span>{t("quiz_play_again")}</span>
          </button>
          <button
            type="button"
            onClick={() => router.push("/quiz")}
            className="inline-flex items-center justify-center gap-2 rounded-full border bg-background px-6 py-3 font-bold text-foreground transition-all hover:bg-accent active:scale-95"
          >
            <span>{t("quiz_back_to_modes")}</span>
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
      <ConfettiEffect active={showConfetti} />
      {/* Header bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span>{t("quiz_back_to_modes")}</span>
        </Link>

        {/* Stars counter */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-sm font-extrabold text-amber-600 dark:text-amber-400">
          <Star className="size-4 fill-amber-400 text-amber-500" />
          <span>{stars}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 w-full">
        <div className="mb-1 flex justify-between text-xs font-bold text-muted-foreground">
          <span>{t("quiz_question_count")} {currentIndex + 1} / {questions.length}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card Header */}
      <Card className="mb-6 flex flex-col items-center justify-center border-none bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 text-center shadow-md">
        {currentQ.promptEmoji && (
          <span className="mb-3 text-7xl" aria-hidden>
            {currentQ.promptEmoji}
          </span>
        )}

        {currentQ.promptText && (
          <h2 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">
            {currentQ.promptText}
          </h2>
        )}

        {currentQ.promptIpa && (
          <span className="mt-1 text-sm font-semibold text-muted-foreground">
            {currentQ.promptIpa}
          </span>
        )}

        {/* Audio Replay Button */}
        <button
          type="button"
          onClick={handleReplayPrompt}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-extrabold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95"
          title={t("quiz_replay_audio")}
        >
          <Volume2 className="size-5" />
          <span>{t("quiz_replay_audio")}</span>
        </button>
      </Card>

      {/* Feedback Messages */}
      {isCorrect === true && (
        <div className="mb-4 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/15 p-3 text-emerald-700 dark:text-emerald-300 font-extrabold text-base animate-bounce">
          <CheckCircle2 className="size-5" />
          <span>{t("quiz_correct_title")}</span>
        </div>
      )}

      {isCorrect === false && (
        <div className="mb-4 flex items-center justify-center gap-2 rounded-2xl bg-rose-500/15 p-3 text-rose-700 dark:text-rose-300 font-extrabold text-base">
          <XCircle className="size-5" />
          <span>{t("quiz_wrong_title")}</span>
        </div>
      )}

      {/* 4 Answer Choice Options Grid */}
      <div className="grid grid-cols-2 gap-4">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isWrong = wrongOptions.includes(opt.id);
          const isRight = isSelected && isCorrect === true;
          const isShaking = shakingOptionId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isWrong || isCorrect === true}
              onClick={() => handleSelectOption(opt.id)}
              className={cn(
                "relative flex h-32 flex-col items-center justify-center gap-2 rounded-3xl border-2 bg-card p-4 text-center shadow-xs transition-all duration-150 active:scale-95",
                !isWrong && !isRight && "border-border hover:border-primary/50 hover:bg-accent/50 hover:shadow-md",
                isRight && "border-emerald-500 bg-emerald-500/10 ring-4 ring-emerald-500/30 text-emerald-700 dark:text-emerald-300 scale-105",
                isWrong && "border-rose-400 bg-rose-500/10 opacity-50 cursor-not-allowed",
                isShaking && "animate-shake border-rose-500 ring-4 ring-rose-500/30"
              )}
            >
              {opt.emoji && (
                <span className="text-4xl sm:text-5xl" aria-hidden>
                  {opt.emoji}
                </span>
              )}
              <span className="font-heading text-lg font-extrabold text-foreground sm:text-xl">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function QuizPlayPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Quiz...</div>}>
      <QuizGameContent />
    </Suspense>
  );
}
