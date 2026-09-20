"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { getSubject } from "@/data/subjects";
import { alphabet } from "@/data/english/alphabet";
import { vocabularyTopics } from "@/data/english/vocabulary";
import { qnaCategories } from "@/data/english/qna";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export function CoreSubjectsSection() {
  const { t } = useLanguage();
  const { rewardedItemIds } = useReward();

  const englishDone = countRewardedEnglishItems(rewardedItemIds);
  const englishPercent = Math.min(100, Math.round((englishDone / TOTAL_ENGLISH_ITEMS) * 100));

  return (
    <section id="core-subjects" className="space-y-6 pt-4 pb-8">
      {/* Section Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-amber-100 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#FF5722]">{t("core_subjects_eyebrow")}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
            {t("core_subjects_title")}
          </h2>
        </div>
        <p className="text-sm font-bold text-gray-500 flex items-center gap-1.5">
          <span>{t("core_subjects_hint")}</span>
          <span className="text-[#FF5722]">✨</span>
        </p>
      </div>

      {/* Grid of 4 Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Subject 1: Tiếng Việt (Active & Ready) */}
        <div className="clay-card bg-white border-2 border-orange-100 p-5 flex flex-col justify-between rounded-3xl group">
          <div className="space-y-4">
            <div className="h-32 bg-gradient-to-b from-rose-50 to-orange-100/60 rounded-2xl flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
              {vietnameseSubject.emoji}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-extrabold text-gray-900">{t(vietnameseSubject.labelKey)}</h3>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  {t("core_ready_to_start")}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 line-clamp-2">
                {t(vietnameseSubject.descKey)}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-bold px-2 py-0.5 bg-orange-50 text-[#E64A19] rounded-md border border-orange-100">
                Lộ trình 4 giai đoạn vào lớp 1
              </span>
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-gray-100">
            <Link
              href={vietnameseSubject.href}
              className="w-full py-3 px-4 rounded-xl bg-[#FF5722] hover:bg-orange-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              <span>Học Tiếng Việt</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Subject 2: Toán Học (Preview / Under development) */}
        <div className="clay-card bg-white border-2 border-amber-100 p-5 flex flex-col justify-between rounded-3xl group">
          <div className="space-y-4">
            <div className="h-32 bg-gradient-to-b from-amber-50 to-yellow-100/60 rounded-2xl flex items-center justify-center text-5xl relative group-hover:scale-105 transition-transform duration-300">
              {mathSubject.emoji}
              <span className="absolute top-2.5 right-2.5 text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                {t("soon_badge")}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-extrabold text-gray-900">{t(mathSubject.labelKey)}</h3>
              </div>
              <p className="text-xs font-medium text-gray-500 line-clamp-2">
                {t(mathSubject.descKey)}
              </p>
            </div>
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-2.5 text-[11px] font-semibold text-amber-900 flex items-center gap-2">
              <span>🛠️</span>
              <span>{t("core_locked_note")}</span>
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-gray-100">
            <button
              type="button"
              disabled
              className="w-full py-3 px-4 rounded-xl bg-amber-100/80 text-amber-900 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
            >
              <Lock className="size-4" />
              <span>Xem trước bài học</span>
            </button>
          </div>
        </div>

        {/* Subject 3: Tiếng Anh (Active with Progress) */}
        <div className="clay-card bg-white border-2 border-blue-100 p-5 flex flex-col justify-between rounded-3xl group">
          <div className="space-y-4">
            <div className="h-32 bg-gradient-to-b from-sky-50 to-blue-100/70 rounded-2xl flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
              {englishSubject.emoji}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-extrabold text-gray-900">{t(englishSubject.labelKey)}</h3>
                <span className="text-[11px] font-bold text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                  {englishDone}/{TOTAL_ENGLISH_ITEMS}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 line-clamp-2">
                {t(englishSubject.descKey)}
              </p>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-500">
                <span>{t("core_progress_prefix")}</span>
                <span className="text-sky-600 font-extrabold">{englishPercent}%</span>
              </div>
              <div className="w-full bg-sky-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full transition-all" style={{ width: `${englishPercent}%` }} />
              </div>
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-gray-100">
            <Link
              href={englishSubject.href}
              className="w-full py-3 px-4 rounded-xl bg-[#29B6F6] hover:bg-[#0288D1] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-400/20 active:scale-95 transition-all"
            >
              <span>Vào Học Tiếng Anh</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Subject 4: Vẽ & Sáng Tạo (Ready to start) */}
        <div className="clay-card bg-white border-2 border-purple-100 p-5 flex flex-col justify-between rounded-3xl group">
          <div className="space-y-4">
            <div className="h-32 bg-gradient-to-b from-purple-50 to-purple-100/60 rounded-2xl flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
              {artSubject.emoji}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-extrabold text-gray-900">{t(artSubject.labelKey)}</h3>
                <span className="text-[11px] font-bold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                  {t("core_ready_to_start")}
                </span>
              </div>
              <p className="text-xs font-medium text-gray-500 line-clamp-2">
                {t(artSubject.descKey)}
              </p>
            </div>
            <div className="bg-purple-50/60 border border-purple-200/60 rounded-xl p-2.5 text-[11px] font-semibold text-purple-900 flex items-center gap-2">
              <span>🖍️</span>
              <span>Thêm hoạt động vẽ & sáng tạo sẽ ra mắt tiếp theo</span>
            </div>
          </div>
          <div className="pt-5 mt-4 border-t border-gray-100">
            <Link
              href={artSubject.href}
              className="w-full py-3 px-4 rounded-xl bg-art-accent hover:opacity-90 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-500/20 active:scale-95 transition-all"
            >
              <span>Vào Góc Vẽ</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
