"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTopic } from "@/data/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { VocabItemCard } from "@/components/vocabulary/vocab-item-card";
import { notFound } from "next/navigation";

export default function VocabularyTopicPage() {
  const params = useParams<{ topicId: string }>();
  const { t } = useLanguage();
  const topic = getTopic(params.topicId);

  if (!topic) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <Link
        href="/vocabulary"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("vocabulary_back")}
      </Link>

      <div className={`mb-6 rounded-3xl bg-gradient-to-br ${topic.gradient} px-6 py-6 text-center`}>
        <span className="text-5xl" aria-hidden>
          {topic.emoji}
        </span>
        <h1 className="mt-1 font-heading text-2xl font-extrabold text-foreground">
          {t(topic.nameKey)}
        </h1>
        <p className="mt-1 text-sm font-medium text-foreground/70">{t("vocabulary_tap_hint")}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {topic.items.map((item) => (
          <VocabItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
