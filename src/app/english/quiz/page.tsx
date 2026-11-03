"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import type { QuizMode } from "@/data/english/quiz";
import type { TranslationKey } from "@/lib/i18n";

export default function QuizSelectionPage() {
  const { t } = useLanguage();

  const modes: {
    id: QuizMode | "zoo";
    href?: string;
    titleKey: TranslationKey;
    descKey: TranslationKey;
    emoji: string;
    gradient: string;
  }[] = [
    {
      id: "zoo",
      href: "/english/quiz/zoo-memory",
      titleKey: "quiz_mode_zoo",
      descKey: "quiz_desc_zoo",
      emoji: "🦁",
      gradient: "from-emerald-200 via-lime-100 to-amber-200",
    },
    {
      id: "listen",
      titleKey: "quiz_mode_listen",
      descKey: "quiz_desc_listen",
      emoji: "🎧",
      gradient: "from-rose-200 via-pink-100 to-amber-100",
    },
    {
      id: "animals",
      titleKey: "quiz_mode_animals",
      descKey: "quiz_desc_animals",
      emoji: "🐶",
      gradient: "from-amber-200 via-yellow-100 to-orange-200",
    },
    {
      id: "colors",
      titleKey: "quiz_mode_colors",
      descKey: "quiz_desc_colors",
      emoji: "🎨",
      gradient: "from-purple-200 via-pink-100 to-rose-100",
    },
    {
      id: "numbers",
      titleKey: "quiz_mode_numbers",
      descKey: "quiz_desc_numbers",
      emoji: "🔢",
      gradient: "from-emerald-200 via-teal-100 to-cyan-200",
    },
    {
      id: "alphabet",
      titleKey: "quiz_mode_alphabet",
      descKey: "quiz_desc_alphabet",
      emoji: "🔤",
      gradient: "from-sky-200 via-indigo-100 to-blue-200",
    },
    {
      id: "look",
      titleKey: "quiz_mode_look",
      descKey: "quiz_desc_look",
      emoji: "📖",
      gradient: "from-slate-200 via-gray-100 to-zinc-200",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:py-8">
      <div className="mb-5 text-center sm:mb-6">
        <h1 className="font-heading text-xl font-black text-foreground sm:text-3xl">{t("quiz_title")}</h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{t("quiz_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {modes.map((mode) => (
          <Link key={mode.id} href={mode.href ?? `/english/quiz/play?mode=${mode.id}`} className="group block">
            <Card
              className={`h-full flex-row items-center gap-3 rounded-2xl border-none bg-gradient-to-br ${mode.gradient} p-3 shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-active:scale-[0.98]`}
            >
              <span
                className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/70 text-3xl shadow-xs transition-transform group-hover:scale-105"
                aria-hidden
              >
                {mode.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-base font-black leading-tight text-foreground transition-colors group-hover:text-primary">
                  {t(mode.titleKey)}
                </h2>
                <p className="mt-0.5 line-clamp-3 text-xs font-semibold leading-snug text-foreground/75">
                  {t(mode.descKey)}
                </p>
              </div>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs transition-transform group-hover:translate-x-0.5">
                <ChevronRight className="size-5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
