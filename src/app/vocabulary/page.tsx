"use client";

import { useLanguage } from "@/lib/language-context";
import { TopicGrid } from "@/components/vocabulary/topic-grid";

export default function VocabularyPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-3xl font-extrabold text-foreground">
          {t("vocabulary_title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("vocabulary_subtitle")}</p>
      </div>

      <TopicGrid basePath="/vocabulary" />
    </div>
  );
}
