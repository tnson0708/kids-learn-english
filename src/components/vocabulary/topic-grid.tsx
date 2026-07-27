"use client";

import Link from "next/link";
import { vocabularyTopics } from "@/data/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";

export function TopicGrid({ basePath }: { basePath: string }) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
      {vocabularyTopics.map((topic) => (
        <Link key={topic.id} href={`${basePath}/${topic.id}`} className="group block">
          <Card
            className={`h-full border-none bg-gradient-to-br ${topic.gradient} rounded-3xl py-7 px-4 text-center shadow-sm transition-all duration-150 group-hover:-translate-y-1.5 group-hover:shadow-lg group-active:scale-95 sm:py-8`}
          >
            <CardContent className="flex flex-col items-center gap-3 p-0">
              <span className="text-5xl sm:text-6xl transition-transform group-hover:scale-110" aria-hidden>
                {topic.emoji}
              </span>
              <span className="font-heading text-lg font-black text-foreground sm:text-xl md:text-2xl">
                {t(topic.nameKey)}
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
