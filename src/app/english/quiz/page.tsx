"use client";

import Link from "next/link";
import { ArrowRight, Volume2, Eye, Sparkles, Dog, Palette, Hash } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import type { QuizMode } from "@/data/english/quiz";
import type { TranslationKey } from "@/lib/i18n";

export default function QuizSelectionPage() {
  const { t } = useLanguage();

  const modes: {
    id: QuizMode;
    titleKey: TranslationKey;
    descKey: TranslationKey;
    emoji: string;
    icon: typeof Volume2;
    gradient: string;
  }[] = [
    {
      id: "listen",
      titleKey: "quiz_mode_listen",
      descKey: "quiz_desc_listen",
      emoji: "🎧",
      icon: Volume2,
      gradient: "from-rose-200 via-pink-100 to-amber-100",
    },
    {
      id: "animals",
      titleKey: "quiz_mode_animals",
      descKey: "quiz_desc_animals",
      emoji: "🐶",
      icon: Dog,
      gradient: "from-amber-200 via-yellow-100 to-orange-200",
    },
    {
      id: "colors",
      titleKey: "quiz_mode_colors",
      descKey: "quiz_desc_colors",
      emoji: "🎨",
      icon: Palette,
      gradient: "from-purple-200 via-pink-100 to-rose-100",
    },
    {
      id: "numbers",
      titleKey: "quiz_mode_numbers",
      descKey: "quiz_desc_numbers",
      emoji: "🔢",
      icon: Hash,
      gradient: "from-emerald-200 via-teal-100 to-cyan-200",
    },
    {
      id: "alphabet",
      titleKey: "quiz_mode_alphabet",
      descKey: "quiz_desc_alphabet",
      emoji: "🔤",
      icon: Sparkles,
      gradient: "from-sky-200 via-indigo-100 to-blue-200",
    },
    {
      id: "look",
      titleKey: "quiz_mode_look",
      descKey: "quiz_desc_look",
      emoji: "📖",
      icon: Eye,
      gradient: "from-slate-200 via-gray-100 to-zinc-200",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <div className="mb-6 text-center sm:mb-8">
        <h1 className="font-heading text-2xl font-black text-foreground sm:text-4xl">
          {t("quiz_title")}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:mt-2 sm:text-base">{t("quiz_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Link key={mode.id} href={`/english/quiz/play?mode=${mode.id}`} className="group block">
              <Card
                className={`flex h-full flex-col justify-between rounded-2xl border-none bg-gradient-to-br ${mode.gradient} p-4 shadow-md transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-xl group-active:scale-95 sm:rounded-3xl sm:p-7`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl sm:text-6xl transition-transform group-hover:scale-110" aria-hidden>
                      {mode.emoji}
                    </span>
                    <span className="rounded-full bg-white/80 p-2 sm:p-3 text-foreground/80 shadow-xs backdrop-blur-xs">
                      <Icon className="size-5 sm:size-6 text-primary" />
                    </span>
                  </div>

                  <h2 className="mt-3 font-heading text-xl font-black text-foreground group-hover:text-primary transition-colors sm:mt-6 sm:text-3xl">
                    {t(mode.titleKey)}
                  </h2>
                  <p className="mt-1 text-xs font-bold text-foreground/80 leading-relaxed sm:mt-2.5 sm:text-sm">
                    {t(mode.descKey)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 sm:mt-7 sm:pt-5">
                  <span className="text-xs font-black text-primary sm:text-base">{t("quiz_start")}</span>
                  <span className="rounded-full bg-primary p-2 sm:p-2.5 text-primary-foreground shadow-xs transition-transform group-hover:translate-x-1">
                    <ArrowRight className="size-4 sm:size-5" />
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
