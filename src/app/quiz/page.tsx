"use client";

import Link from "next/link";
import { ArrowRight, Volume2, Eye, Sparkles, Dog, Palette, Hash } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import type { QuizMode } from "@/data/quiz";
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
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">
          {t("quiz_title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("quiz_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Link key={mode.id} href={`/quiz/play?mode=${mode.id}`} className="group block">
              <Card
                className={`flex h-full flex-col justify-between border-none bg-gradient-to-br ${mode.gradient} p-6 shadow-md transition-all duration-200 group-hover:-translate-y-1.5 group-hover:shadow-xl active:scale-98`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-5xl transition-transform group-hover:scale-110" aria-hidden>
                      {mode.emoji}
                    </span>
                    <span className="rounded-full bg-white/70 p-2 text-foreground/80 shadow-xs backdrop-blur-xs">
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <h2 className="mt-5 font-heading text-2xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {t(mode.titleKey)}
                  </h2>
                  <p className="mt-2 text-xs font-semibold text-foreground/75 leading-relaxed">
                    {t(mode.descKey)}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-xs font-extrabold text-primary">{t("quiz_start")}</span>
                  <span className="rounded-full bg-primary p-2 text-primary-foreground transition-transform group-hover:translate-x-1">
                    <ArrowRight className="size-4" />
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
