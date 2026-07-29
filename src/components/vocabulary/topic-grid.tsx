"use client";

import Link from "next/link";
import { vocabularyTopics } from "@/data/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";

export function TopicGrid({ basePath }: { basePath: string }) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6">
      {vocabularyTopics.map((topic) => (
        <Link key={topic.id} href={`${basePath}/${topic.id}`} className="group block">
          <Card
            className={`h-full border-none bg-gradient-to-br ${topic.gradient} rounded-2xl py-4 px-3 text-center shadow-sm transition-all duration-150 group-hover:-translate-y-1.5 group-hover:shadow-lg group-active:scale-95 sm:rounded-3xl sm:py-7 sm:px-4`}
          >
            <CardContent className="flex flex-col items-center gap-1.5 p-0 sm:gap-3">
              <span className="text-4xl sm:text-6xl transition-transform group-hover:scale-110" aria-hidden>
                {topic.emoji}
              </span>
              <span className="font-heading text-base font-extrabold text-foreground sm:text-xl md:text-2xl">
                {t(topic.nameKey)}
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
