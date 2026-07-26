"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Gamepad2, HelpCircle, ImageIcon } from "lucide-react";
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
  ];

  return (
    <div className="flex-1 bg-gradient-to-b from-amber-50 via-background to-background">
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-6 text-center sm:pt-16">
        <Badge className="mb-4 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary">
          {t("hero_badge")}
        </Badge>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t("hero_title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t("hero_subtitle")}
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod) => (
          <Link key={mod.href} href={mod.href} className="group block">
            <Card
              className={`h-full border-none bg-gradient-to-br ${mod.gradient} shadow-md transition-transform duration-150 group-hover:-translate-y-1 group-hover:shadow-lg group-active:translate-y-0`}
            >
              <CardHeader>
                <div className="mb-2 text-5xl" aria-hidden>
                  {mod.emoji}
                </div>
                <Badge className="w-fit rounded-full bg-white/70 text-xs font-bold text-foreground/80">
                  {t(mod.badgeKey)}
                </Badge>
                <CardTitle className="font-heading text-2xl font-extrabold text-foreground">
                  {t(mod.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-foreground/80">{t(mod.descKey)}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-foreground/90">
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
