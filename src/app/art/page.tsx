"use client";

import Link from "next/link";
import { ArrowRight, Lock, Palette } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ArtOverviewPage() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-gradient-to-b from-purple-50 via-background to-background">
      <section className="mx-auto max-w-5xl px-4 pt-6 pb-4 text-center sm:pt-10 sm:pb-6">
        <Badge className="mb-3 rounded-full bg-art-accent-soft px-3.5 py-1 text-xs font-extrabold text-art-accent sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
          🎨 {t("subject_art")}
        </Badge>
        <h1 className="font-heading text-2xl font-black tracking-tight text-foreground sm:text-4xl">
          {t("art_home_title")}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-xs font-semibold text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
          {t("art_home_subtitle")}
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2 sm:gap-5">
        <Link href="/art/coloring-page" className="group block">
          <Card className="h-full border-none bg-gradient-to-br from-purple-200 via-fuchsia-100 to-indigo-200 shadow-md transition-all duration-150 group-hover:-translate-y-1 group-hover:shadow-lg group-active:scale-95 p-4 sm:p-5">
            <CardHeader className="p-0 mb-3">
              <div className="mb-1 text-4xl sm:text-5xl transition-transform group-hover:scale-110" aria-hidden>
                🖼️
              </div>
              <Badge className="w-fit rounded-full bg-white/80 text-[10px] sm:text-xs font-bold text-foreground/80">
                {t("art_home_coloring_badge")}
              </Badge>
              <CardTitle className="font-heading text-xl sm:text-2xl font-black text-foreground mt-1">
                {t("art_home_coloring_title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-xs sm:text-sm font-semibold text-foreground/80 leading-relaxed">
                {t("art_home_coloring_desc")}
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-foreground/90">
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="h-full border-2 border-purple-100 bg-white p-4 opacity-90 sm:p-5">
          <CardHeader className="p-0 mb-3">
            <div className="mb-1 text-4xl sm:text-5xl" aria-hidden>
              <Palette className="size-10 text-purple-300 sm:size-12" />
            </div>
            <Badge className="w-fit rounded-full bg-purple-50 text-[10px] sm:text-xs font-bold text-purple-800 border border-purple-200">
              {t("soon_badge")}
            </Badge>
            <CardTitle className="font-heading text-xl sm:text-2xl font-black text-foreground mt-1">
              {t("art_home_more_soon_title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs sm:text-sm font-semibold text-foreground/80 leading-relaxed">
              {t("art_home_more_soon_desc")}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted-foreground">
              <Lock className="size-3.5" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
