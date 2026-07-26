"use client";

import Link from "next/link";
import { vocabularyTopics } from "@/data/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";

export function TopicGrid({ basePath }: { basePath: string }) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {vocabularyTopics.map((topic) => (
        <Link key={topic.id} href={`${basePath}/${topic.id}`} className="group block">
          <Card
            className={`h-full border-none bg-gradient-to-br ${topic.gradient} py-6 text-center shadow-sm transition-transform duration-150 group-hover:-translate-y-1 group-hover:shadow-md group-active:translate-y-0`}
          >
            <CardContent className="flex flex-col items-center gap-2">
              <span className="text-5xl" aria-hidden>
                {topic.emoji}
              </span>
              <span className="font-heading text-lg font-extrabold text-foreground">
                {t(topic.nameKey)}
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
