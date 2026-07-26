"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getQnaCategory } from "@/data/qna";
import { useLanguage } from "@/lib/language-context";
import { QnaQuestionCard } from "@/components/qna/qna-question-card";

export default function QnaTopicPage() {
  const params = useParams<{ topicId: string }>();
  const { t, language } = useLanguage();
  const category = getQnaCategory(params.topicId);

  if (!category) {
    notFound();
  }

  const title = language === "vi" ? category.titleVi : category.titleEn;
  const description = language === "vi" ? category.descriptionVi : category.descriptionEn;

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
      <Link
        href="/qna"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("qna_back")}
      </Link>

      <div className={`mb-6 rounded-3xl bg-gradient-to-br ${category.gradient} px-6 py-6 text-center`}>
        <span className="text-5xl" aria-hidden>
          {category.emoji}
        </span>
        <h1 className="mt-1 font-heading text-2xl font-extrabold text-foreground">
          {title}
        </h1>
        <p className="mt-1 text-sm font-medium text-foreground/75">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {category.questions.map((q) => (
          <QnaQuestionCard key={q.id} item={q} />
        ))}
      </div>
    </div>
  );
}
