"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { getSubject } from "@/data/subjects";
import { alphabet } from "@/data/english/alphabet";
import { vocabularyTopics } from "@/data/english/vocabulary";
import { qnaCategories } from "@/data/english/qna";
import { cn } from "@/lib/utils";

const englishSubject = getSubject("english")!;
const vietnameseSubject = getSubject("vietnamese")!;
const mathSubject = getSubject("math")!;
const artSubject = getSubject("art")!;

const TOTAL_ENGLISH_ITEMS =
  alphabet.length +
  vocabularyTopics.reduce((sum, topic) => sum + topic.items.length, 0) +
  qnaCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

function countRewardedEnglishItems(rewardedItemIds: string[]): number {
  return rewardedItemIds.filter(
    (id) => id.startsWith("letter_") || id.startsWith("word_") || id.startsWith("qna_") || id.startsWith("sentence_")
  ).length;
}

interface SubjectCardProps {
  emoji: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  borderClass: string;
  tileClass: string;
  ctaClass: string;
  badge: ReactNode;
  info: ReactNode;
}

function SubjectCard({
  emoji,
  title,
  description,
  href,
  ctaLabel,
  borderClass,
  tileClass,
  ctaClass,
  badge,
  info,
}: SubjectCardProps) {
  return (
    <div className={cn("clay-card group flex flex-col gap-3 rounded-2xl! border-2 bg-white p-4", borderClass)}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b text-3xl transition-transform duration-300 group-hover:scale-105",
            tileClass
          )}
          aria-hidden
        >
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold leading-tight text-gray-900">{title}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs font-medium text-gray-500">{description}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {badge}
        {info}
      </div>

      <Link
        href={href}
        className={cn(
          "mt-auto flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold text-white shadow-md transition-all active:scale-95",
          ctaClass
        )}
      >
        <span>{ctaLabel}</span>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export function CoreSubjectsSection() {
  const { t } = useLanguage();
  const { rewardedItemIds } = useReward();

  const englishDone = countRewardedEnglishItems(rewardedItemIds);
  const englishPercent = Math.min(100, Math.round((englishDone / TOTAL_ENGLISH_ITEMS) * 100));

  const readyBadge = (className: string) => (
    <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-bold", className)}>
      {t("core_ready_to_start")}
    </span>
  );

  return (
    <section id="core-subjects" className="space-y-4 pt-2 pb-4">
      <div className="flex flex-col justify-between gap-1 border-b border-amber-100 pb-3 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#FF5722]">{t("core_subjects_eyebrow")}</span>
          <h2 className="mt-0.5 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            {t("core_subjects_title")}
          </h2>
        </div>
        <p className="flex items-center gap-1.5 text-xs font-bold text-gray-500 sm:text-sm">
          <span>{t("core_subjects_hint")}</span>
          <span className="text-[#FF5722]">✨</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SubjectCard
          emoji={vietnameseSubject.emoji}
          title={t(vietnameseSubject.labelKey)}
          description={t(vietnameseSubject.descKey)}
          href={vietnameseSubject.href}
          ctaLabel="Học Tiếng Việt"
          borderClass="border-orange-100"
          tileClass="from-rose-50 to-orange-100/60"
          ctaClass="bg-[#FF5722] shadow-orange-500/20 hover:bg-orange-600"
          badge={readyBadge("border-emerald-200 bg-emerald-50 text-emerald-600")}
          info={
            <span className="inline-block rounded-md border border-orange-100 bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-[#E64A19]">
              Lộ trình 4 giai đoạn vào lớp 1
            </span>
          }
        />

        <SubjectCard
          emoji={mathSubject.emoji}
          title={t(mathSubject.labelKey)}
          description={t(mathSubject.descKey)}
          href={mathSubject.href}
          ctaLabel="Học Toán Ngay"
          borderClass="border-emerald-100"
          tileClass="from-emerald-50 to-teal-100/60"
          ctaClass="bg-emerald-600 shadow-emerald-500/20 hover:bg-emerald-700"
          badge={readyBadge("border-emerald-200 bg-emerald-50 text-emerald-600")}
          info={
            <span className="inline-block rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              Số đếm · So sánh · Tách gộp · Cộng trừ
            </span>
          }
        />

        <SubjectCard
          emoji={englishSubject.emoji}
          title={t(englishSubject.labelKey)}
          description={t(englishSubject.descKey)}
          href={englishSubject.href}
          ctaLabel="Vào Học Tiếng Anh"
          borderClass="border-blue-100"
          tileClass="from-sky-50 to-blue-100/70"
          ctaClass="bg-[#29B6F6] shadow-sky-400/20 hover:bg-[#0288D1]"
          badge={
            <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-600">
              {englishDone}/{TOTAL_ENGLISH_ITEMS}
            </span>
          }
          info={
            <div className="w-full space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-500">
                <span>{t("core_progress_prefix")}</span>
                <span className="font-extrabold text-sky-600">{englishPercent}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-sky-100">
                <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${englishPercent}%` }} />
              </div>
            </div>
          }
        />

        <SubjectCard
          emoji={artSubject.emoji}
          title={t(artSubject.labelKey)}
          description={t(artSubject.descKey)}
          href={artSubject.href}
          ctaLabel="Vào Góc Vẽ"
          borderClass="border-purple-100"
          tileClass="from-purple-50 to-purple-100/60"
          ctaClass="bg-art-accent shadow-purple-500/20 hover:opacity-90"
          badge={readyBadge("border-purple-200 bg-purple-50 text-purple-600")}
          info={
            <div className="flex w-full items-center gap-2 rounded-lg border border-purple-200/60 bg-purple-50/60 px-2 py-1.5 text-[11px] font-semibold text-purple-900">
              <span>🖍️</span>
              <span>Thêm hoạt động vẽ & sáng tạo sẽ ra mắt tiếp theo</span>
            </div>
          }
        />
      </div>
    </section>
  );
}
