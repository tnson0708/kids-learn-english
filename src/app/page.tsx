"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Gamepad2, Gift, HelpCircle, ImageIcon } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { t } = useLanguage();

  const modules = [
    {
      href: "/alphabet",
      icon: BookOpen,
      titleKey: "mod_alphabet_title" as const,
      badgeKey: "mod_alphabet_badge" as const,
      descKey: "mod_alphabet_desc" as const,
      gradient: "from-sky-200 via-cyan-100 to-blue-200",
      emoji: "🔤",
    },
    {
      href: "/vocabulary",
      icon: ImageIcon,
      titleKey: "mod_vocabulary_title" as const,
      badgeKey: "mod_vocabulary_badge" as const,
      descKey: "mod_vocabulary_desc" as const,
      gradient: "from-lime-200 via-emerald-100 to-green-200",
      emoji: "🍎",
    },
    {
      href: "/qna",
      icon: HelpCircle,
      titleKey: "mod_qna_title" as const,
      badgeKey: "mod_qna_badge" as const,
      descKey: "mod_qna_desc" as const,
      gradient: "from-fuchsia-200 via-purple-100 to-indigo-200",
      emoji: "💬",
    },
    {
      href: "/quiz",
      icon: Gamepad2,
      titleKey: "mod_quiz_title" as const,
      badgeKey: "mod_quiz_badge" as const,
      descKey: "mod_quiz_desc" as const,
      gradient: "from-amber-200 via-orange-100 to-rose-200",
      emoji: "🎯",
    },
    {
      href: "/gifts",
      icon: Gift,
      titleKey: "mod_gifts_title" as const,
      badgeKey: "mod_gifts_badge" as const,
      descKey: "mod_gifts_desc" as const,
      gradient: "from-purple-200 via-pink-100 to-rose-200",
      emoji: "🎁",
    },
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-amber-50 via-background to-background">
      <section className="mx-auto max-w-5xl px-4 pt-6 pb-4 text-center sm:pt-14 sm:pb-6">
        <Badge className="mb-3 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-extrabold text-primary sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
          {t("hero_badge")}
        </Badge>
        <h1 className="font-heading text-2xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {t("hero_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs font-semibold text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
          {t("hero_subtitle")}
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href} className="group block">
            <Card
              className={`h-full border-none bg-gradient-to-br ${mod.gradient} shadow-md transition-all duration-150 group-hover:-translate-y-1 group-hover:shadow-lg group-active:scale-95 p-4 sm:p-5`}
            >
              <CardHeader className="p-0 mb-3">
                <div className="mb-1 text-4xl sm:text-5xl transition-transform group-hover:scale-110" aria-hidden>
                  {mod.emoji}
                </div>
                <Badge className="w-fit rounded-full bg-white/80 text-[10px] sm:text-xs font-bold text-foreground/80">
                  {t(mod.badgeKey)}
                </Badge>
                <CardTitle className="font-heading text-xl sm:text-2xl font-black text-foreground mt-1">
                  {t(mod.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-xs sm:text-sm font-semibold text-foreground/80 leading-relaxed">{t(mod.descKey)}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-foreground/90">
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
