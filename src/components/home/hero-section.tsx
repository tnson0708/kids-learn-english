"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/lib/i18n";

const AGE_GROUP_KEY = "ela_kids_age_group";
const AGE_GROUPS: { id: string; labelKey: TranslationKey; active?: boolean }[] = [
  { id: "prek", labelKey: "age_group_prek", active: true },
  { id: "grade1", labelKey: "age_group_grade1", active: false },
  { id: "grade2", labelKey: "age_group_grade2", active: false },
];

export function HeroSection() {
  const { t } = useLanguage();
  const [ageGroup, setAgeGroup] = useState("prek");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AGE_GROUP_KEY);
      if (saved) setAgeGroup(saved);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleAgeGroupChange = (id: string) => {
    setAgeGroup(id);
    try {
      localStorage.setItem(AGE_GROUP_KEY, id);
    } catch {
      // Ignore localStorage errors
    }
  };

  const selectedGroup = AGE_GROUPS.find((g) => g.id === ageGroup);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pt-1 pb-2">
      {/* Left Description */}
      <div className="lg:col-span-7 space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-200 text-[#D84315] font-extrabold text-xs tracking-wide">
          <span>✨</span>
          <span>{t("home_learn_and_laugh_badge")}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
          {t("home_welcome_prefix")} <span className="text-[#E64A19]">{t("app_name")}</span> 🚀
        </h1>

        <p className="text-sm sm:text-base font-medium text-gray-600 max-w-2xl leading-relaxed">
          Nền tảng học tập tương tác cho bé từ <strong className="text-gray-900 font-bold">Tiền tiểu học</strong> trở lên — Tự tin học bảng chữ cái, đánh vần ghép chữ, tập đếm & từ vựng mỗi ngày!
        </p>

        {/* Grade Selector Pills */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("home_age_label")}</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {AGE_GROUPS.map((group) => {
              const isSelected = ageGroup === group.id;
              if (group.active) {
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => handleAgeGroupChange(group.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl font-extrabold text-sm transition-all shadow-md active:scale-95",
                      isSelected
                        ? "bg-[#E64A19] text-white shadow-orange-500/25"
                        : "bg-white border-2 border-amber-200 text-gray-700 hover:border-amber-400"
                    )}
                  >
                    {t(group.labelKey)}
                  </button>
                );
              }
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => handleAgeGroupChange(group.id)}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-dashed border-amber-200 text-gray-500 font-bold text-sm hover:border-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>{t(group.labelKey)}</span>
                </button>
              );
            })}
          </div>

          {selectedGroup && !selectedGroup.active && (
            <div className="mt-2.5 rounded-2xl border border-amber-300 bg-amber-50 p-2.5 text-xs font-medium text-amber-800 dark:border-amber-700 dark:bg-amber-950/60 dark:text-amber-200">
              ✨ {t("home_grade_notice")}
            </div>
          )}
        </div>
      </div>

      {/* Right Mascot Companion Card */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="clay-card bg-gradient-to-br from-[#FFE8D6] via-[#FFF3E0] to-[#FFE0B2] p-4 rounded-3xl border-2 border-orange-200/60 relative overflow-hidden flex flex-row items-center gap-3 text-left lg:flex-col lg:gap-0 lg:text-center">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl"></div>
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-orange-300/30 rounded-full blur-2xl"></div>
          <div className="relative shrink-0 lg:mb-2">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/90 shadow-lg shadow-amber-900/10 flex items-center justify-center text-4xl lg:text-5xl p-1 border-4 border-white transform hover:scale-105 transition-transform duration-300" aria-hidden>
              🦁
            </div>
            <span className="absolute bottom-0 right-0 text-xl animate-bounce">👋</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm border border-orange-200 px-4 py-1.5 rounded-full shadow-md text-amber-950 font-extrabold text-sm mb-1">
            {t("home_mascot_speech")}
          </div>
          <p className="hidden lg:block text-xs text-amber-900/70 font-semibold max-w-xs mt-1">
            Cùng bạn Sư Tử Bibi khám phá kho chữ cái và bảng đố vui hấp dẫn hôm nay nhé!
          </p>
        </div>
      </div>
    </section>
  );
}
