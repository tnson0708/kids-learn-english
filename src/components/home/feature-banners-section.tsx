"use client";

import Link from "next/link";
import { Gamepad2, Gift } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { giftItems } from "@/data/gifts";
import { Card } from "@/components/ui/card";
import { GoldCoin } from "@/components/gold-coin";
import { cn } from "@/lib/utils";

const PREVIEW_GIFTS = giftItems.slice(0, 3);

export function FeatureBannersSection() {
  const { t } = useLanguage();
  const { coins } = useReward();

  return (
    <section id="games" className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 pb-8">
      {/* Card 1: Mini Trivia Arena */}
      <div className="clay-card bg-gradient-to-br from-[#ECEFF1] via-[#EDE7F6] to-[#E8EAF6] border-2 border-purple-200/70 p-6 sm:p-7 rounded-[32px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
              🎮
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">{t("quiz_arena_title")}</h3>
              <span className="text-xs font-bold text-purple-700">Chơi vui học nhanh mỗi ngày</span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            {t("quiz_arena_desc")}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="flex -space-x-2 overflow-hidden">
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-amber-200 text-center text-sm leading-8">👦</span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-pink-200 text-center text-sm leading-8">👧</span>
              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-blue-200 text-center text-sm leading-8">🧒</span>
            </div>
            <span className="text-xs font-bold text-gray-500">+1,420 bé đang tham gia</span>
          </div>
        </div>
        <div className="pt-6">
          <Link
            href="/english/quiz"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#283593] hover:bg-[#1A237E] text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{t("quiz_arena_cta")}</span>
            <span>🎯</span>
          </Link>
        </div>
      </div>

      {/* Card 2: Rewards & Badge Showcase */}
      <div id="rewards" className="clay-card bg-gradient-to-br from-[#FFF8E1] via-[#FFF3E0] to-[#FFE0B2] border-2 border-amber-200 p-6 sm:p-7 rounded-[32px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl">
              🎁
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">{t("badges_title")}</h3>
              <span className="text-xs font-bold text-amber-800">Tích lũy đồng xu học chăm</span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-600 leading-relaxed">
            {t("badges_desc")}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-10 h-10 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center text-lg shadow-sm" title="Huy hiệu Chăm Chỉ">
              🏅
            </div>
            <div className="w-10 h-10 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center text-lg shadow-sm" title="Thần Đồng Nhí">
              🎓
            </div>
            <div className="w-10 h-10 rounded-full bg-white/90 border border-amber-200 flex items-center justify-center text-lg shadow-sm" title="Mảnh ghép Đố Vui">
              🧩
            </div>
            <span className="text-xs font-bold text-amber-900">Bé đã mở 3/10 huy hiệu</span>
          </div>
        </div>
        <div className="pt-6">
          <Link
            href="/gifts"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-[#FF9800] hover:brightness-105 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>🪙 {t("badges_cta_prefix")} ({coins} Xu)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
