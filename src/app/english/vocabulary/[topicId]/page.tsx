"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, MessageSquareQuote, Layers } from "lucide-react";
import { getTopic } from "@/data/english/vocabulary";
import { useLanguage } from "@/lib/language-context";
import { VocabItemCard } from "@/components/english/vocabulary/vocab-item-card";
import { VocabSentenceCard } from "@/components/english/vocabulary/vocab-sentence-card";

type ViewMode = "all" | "words" | "sentences";

export default function VocabularyTopicPage() {
  const params = useParams<{ topicId: string }>();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const topic = getTopic(params.topicId);

  if (!topic) {
    notFound();
  }

  const showWords = viewMode === "all" || viewMode === "words";
  const showSentences = (viewMode === "all" || viewMode === "sentences") && topic.sentences && topic.sentences.length > 0;

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <Link
        href="/english/vocabulary"
        className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2.5 text-sm font-extrabold text-foreground shadow-xs transition-all hover:bg-accent hover:shadow-md active:scale-95 sm:px-5 sm:py-3 sm:text-base"
      >
        <ArrowLeft className="size-5 text-primary sm:size-6" />
        <span>{t("vocabulary_back")}</span>
      </Link>

      <div className={`mb-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${topic.gradient} px-4 py-5 sm:px-6 sm:py-7 text-center shadow-xs`}>
        <span className="text-5xl sm:text-6xl" aria-hidden>
          {topic.emoji}
        </span>
        <h1 className="mt-2 font-heading text-2xl sm:text-3xl font-black text-foreground">
          {t(topic.nameKey)}
        </h1>
        <p className="mt-1 text-xs sm:text-sm font-semibold text-foreground/75">{t("vocabulary_tap_hint")}</p>

        {/* Tab Filter Control */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex rounded-full bg-background/80 p-1.5 backdrop-blur-xs shadow-xs border border-foreground/10">
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-extrabold transition-all ${
                viewMode === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Layers className="size-3.5 sm:size-4" />
              <span>{t("vocab_tab_all")}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("words")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-extrabold transition-all ${
                viewMode === "words"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <BookOpen className="size-3.5 sm:size-4" />
              <span>{t("vocab_tab_words")} ({topic.items.length})</span>
            </button>
            {topic.sentences && topic.sentences.length > 0 && (
              <button
                type="button"
                onClick={() => setViewMode("sentences")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-extrabold transition-all ${
                  viewMode === "sentences"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <MessageSquareQuote className="size-3.5 sm:size-4" />
                <span>{t("vocab_tab_sentences")} ({topic.sentences.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Words Section */}
      {showWords && (
        <section className="mb-8">
          {viewMode === "all" && (
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              <h2 className="font-heading text-lg sm:text-xl font-black text-foreground">
                {t("vocab_tab_words")}
              </h2>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                {topic.items.length}
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
            {topic.items.map((item) => (
              <VocabItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Simple Sentences Section */}
      {showSentences && topic.sentences && (
        <section className="mb-8">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="size-5 text-primary" />
              <h2 className="font-heading text-lg sm:text-xl font-black text-foreground">
                {t("vocab_sentences_title")}
              </h2>
              <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                {topic.sentences.length}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground font-medium">
              {t("vocab_sentences_hint")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {topic.sentences.map((sentence, idx) => (
              <VocabSentenceCard key={idx} sentence={sentence} index={idx} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

