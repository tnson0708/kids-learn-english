"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";

export function FeatureBannersSection() {
  const { t } = useLanguage();
  const { coins } = useReward();

  return (
    <section id="games" className="grid grid-cols-1 gap-4 pt-1 pb-4 md:grid-cols-2">
      {/* Card 1: Mini Trivia Arena */}
      <div className="clay-card flex flex-col justify-between gap-3 rounded-2xl! border-2 border-purple-200/70 bg-gradient-to-br from-[#ECEFF1] via-[#EDE7F6] to-[#E8EAF6] p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
            🎮
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-extrabold leading-tight text-gray-900">{t("quiz_arena_title")}</h3>
            <span className="text-xs font-bold text-purple-700">Chơi vui học nhanh mỗi ngày</span>
          </div>
        </div>
        <p className="line-clamp-2 text-xs font-medium leading-relaxed text-gray-600 sm:text-sm">
          {t("quiz_arena_desc")}
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex shrink-0 -space-x-2 overflow-hidden">
              <span className="inline-block h-7 w-7 rounded-full bg-amber-200 text-center text-xs leading-7 ring-2 ring-white">👦</span>
              <span className="inline-block h-7 w-7 rounded-full bg-pink-200 text-center text-xs leading-7 ring-2 ring-white">👧</span>
              <span className="inline-block h-7 w-7 rounded-full bg-blue-200 text-center text-xs leading-7 ring-2 ring-white">🧒</span>
            </div>
            <span className="truncate text-xs font-bold text-gray-500">+1,420 bé đang tham gia</span>
          </div>
          <Link
            href="/english/quiz"
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#283593] px-4 py-2 text-sm font-extrabold text-white shadow-md transition-all hover:bg-[#1A237E] active:scale-95"
          >
            <span>{t("quiz_arena_cta")}</span>
            <span>🎯</span>
          </Link>
        </div>
      </div>

      {/* Card 2: Rewards & Badge Showcase */}
      <div
        id="rewards"
        className="clay-card flex flex-col justify-between gap-3 rounded-2xl! border-2 border-amber-200 bg-gradient-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#FFE0B2] p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
            🎁
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-extrabold leading-tight text-gray-900">{t("badges_title")}</h3>
            <span className="text-xs font-bold text-amber-800">Tích lũy đồng xu học chăm</span>
          </div>
        </div>
        <p className="line-clamp-2 text-xs font-medium leading-relaxed text-gray-600 sm:text-sm">
          {t("badges_desc")}
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex shrink-0 gap-1.5">
              <div className="flex size-8 items-center justify-center rounded-full border border-amber-200 bg-white/90 text-base shadow-sm" title="Huy hiệu Chăm Chỉ">
                🏅
              </div>
              <div className="flex size-8 items-center justify-center rounded-full border border-amber-200 bg-white/90 text-base shadow-sm" title="Thần Đồng Nhí">
                🎓
              </div>
              <div className="flex size-8 items-center justify-center rounded-full border border-amber-200 bg-white/90 text-base shadow-sm" title="Mảnh ghép Đố Vui">
                🧩
              </div>
            </div>
            <span className="truncate text-xs font-bold text-amber-900">Bé đã mở 3/10 huy hiệu</span>
          </div>
          <Link
            href="/gifts"
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#FF9800] px-4 py-2 text-sm font-extrabold text-white shadow-md transition-all hover:brightness-105 active:scale-95"
          >
            <span>🪙 {t("badges_cta_prefix")} ({coins} Xu)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
