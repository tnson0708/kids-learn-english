"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, Pencil, Grid, Printer } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function VietnameseOverviewPage() {
  const { t } = useLanguage();
  const [activeStageId, setActiveStageId] = useState<string | null>(null);

  const handleStageClick = (e: React.MouseEvent<HTMLAnchorElement>, stageId: string) => {
    e.preventDefault();
    setActiveStageId(stageId);
    const element = document.getElementById(stageId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stages = [
    {
      id: "stage1",
      number: "1",
      badge: t("vi_stage1_time"),
      titleKey: "vi_stage1_title" as const,
      descKey: "vi_stage1_desc" as const,
      ctaKey: "vi_stage1_cta" as const,
      href: "/vietnamese/alphabet",
      emoji: "🔤",
      icon: Pencil,
      gradient: "from-amber-100 via-orange-50 to-rose-100",
      accentBorder: "border-orange-200",
      btnColor: "bg-[#FF5722] hover:bg-orange-600 shadow-orange-500/20",
      points: [
        "Nhận diện 29 chữ cái (hoa + thường), học phát âm chuẩn âm đọc (bờ, cờ, dờ...)",
        "Làm quen 5 dấu thanh: Huyền (\\), Sắc (/), Hỏi (?), Ngã (~), Nặng (.)",
        "Số đếm 1-10 & nhận biết đồ vật trực quan",
      ],
    },
    {
      id: "stage2",
      number: "2",
      badge: t("vi_stage2_time"),
      titleKey: "vi_stage2_title" as const,
      descKey: "vi_stage2_desc" as const,
      ctaKey: "vi_stage2_cta" as const,
      href: "/vietnamese/blending",
      emoji: "🧩",
      icon: Grid,
      gradient: "from-emerald-100 via-teal-50 to-cyan-100",
      accentBorder: "border-emerald-200",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20",
      points: [
        "Ghép phụ âm đơn + nguyên âm đơn: b+a=ba, m+e=me, l+a=la...",
        "Luyện 5 dấu thanh: ba → bà, bá, bả, bã, bạ (số lượng từ đọc được tăng vọt)",
        "Đọc từ đơn giản 1 âm tiết có nghĩa: ba, mẹ, bà, cá, gà, bò, cỏ...",
      ],
    },
    {
      id: "stage3",
      number: "3",
      badge: t("vi_stage3_time"),
      titleKey: "vi_stage3_title" as const,
      descKey: "vi_stage3_desc" as const,
      ctaKey: "vi_stage3_cta" as const,
      href: "/vietnamese/blending",
      emoji: "💡",
      icon: BookOpen,
      gradient: "from-sky-100 via-blue-50 to-indigo-100",
      accentBorder: "border-sky-200",
      btnColor: "bg-sky-600 hover:bg-sky-700 shadow-sky-500/20",
      points: [
        "Làm quen 11 phụ âm ghép: ch, gi, kh, ng, ngh, nh, ph, qu, th, tr",
        "Nguyên âm ghép & vần nâng cao: oa, oe, uy, iê, uô, ươ...",
        "Tập đọc từ 2 âm tiết & câu ngắn 3-4 từ: bé đi học, nhà em sạch đẹp...",
      ],
    },
    {
      id: "stage4",
      number: "4",
      badge: t("vi_stage4_time"),
      titleKey: "vi_stage4_title" as const,
      descKey: "vi_stage4_desc" as const,
      ctaKey: "vi_stage4_cta" as const,
      href: "/vietnamese/print",
      emoji: "✏️",
      icon: Printer,
      gradient: "from-purple-100 via-fuchsia-50 to-pink-100",
      accentBorder: "border-purple-200",
      btnColor: "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20",
      points: [
        "Luyện viết chữ cái & số chuẩn theo đúng ô ly tập tô",
        "Tạo & in phiếu bài tập tổng hợp (chữ cái, ghép vần, toán cơ bản)",
        "Rèn luyện thói quen ngồi tập trung 15-20 phút (mô phỏng tiết học lớp 1)",
      ],
    },
  ];

  return (
    <div className="flex-1 bg-[#FFFDF9] pb-12">
      {/* Hero Header */}
      <section className="mx-auto max-w-5xl px-4 pt-6 pb-6 text-center sm:pt-10 sm:pb-8 space-y-4">
        <div>
          <span className="inline-block rounded-full bg-[#FFF8E1] px-5 py-1.5 text-xs font-extrabold text-[#D84315] border border-amber-200/80 shadow-2xs tracking-wide">
            ✨ LỘ TRÌNH VÀO LỚP 1 (DÀNH CHO BÉ 5 TUỔI) ✨
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight">
          Lộ Trình Tiếng Việt Chuẩn Bị Vào Lớp 1
        </h1>

        <p className="mx-auto max-w-3xl text-sm sm:text-base font-semibold text-slate-600 leading-relaxed">
          Đồng hành cùng bé 5 tuổi đi từng bước chắc chắn:{" "}
          <span className="text-[#FF5722] font-bold">Âm đọc</span> →{" "}
          <span className="text-[#10B981] font-bold">Ghép vần</span> →{" "}
          <span className="text-[#0288D1] font-bold">Từ &amp; Câu ngắn</span> →{" "}
          <span className="text-[#8B5CF6] font-bold">Ôn luyện tổng hợp</span>.
        </p>

        {/* Timeline Steps Indicator */}
        <div className="mx-auto max-w-4xl pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stages.map((stg) => {
              const isActive = activeStageId === stg.id;
              return (
                <a
                  key={stg.id}
                  href={`#${stg.id}`}
                  onClick={(e) => handleStageClick(e, stg.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-2xl transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-[#FFF8F6] border-2 border-[#FF5722] shadow-xs"
                      : "bg-white border border-gray-200/80 hover:border-amber-300 shadow-2xs"
                  }`}
                >
                  <span
                    className={`flex size-[#1.75rem] items-center justify-center rounded-full font-extrabold text-xs shrink-0 ${
                      isActive
                        ? "bg-[#FF5722] text-white"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {stg.number}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-extrabold truncate ${
                        isActive ? "text-[#E64A19]" : "text-gray-500"
                      }`}
                    >
                      {stg.badge}
                    </p>
                    <p className="text-xs font-bold text-gray-800 truncate">
                      {stg.emoji} Giai đoạn {stg.number}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 Stages Detailed Roadmap */}
      <section className="mx-auto max-w-5xl px-4 space-y-6">
        {stages.map((stg) => (
          <div
            key={stg.id}
            id={stg.id}
            className={`clay-card scroll-mt-6 bg-gradient-to-br ${stg.gradient} border-2 ${stg.accentBorder} p-6 sm:p-8 rounded-[32px] transition-all`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Stage Info Left */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-[#E64A19] font-extrabold text-xs shadow-xs border border-orange-200/60">
                    GIAI ĐOẠN {stg.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/70 text-gray-700 font-bold text-xs border border-gray-200/60">
                    🗓️ {stg.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{stg.emoji}</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
                    {t(stg.titleKey)}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">
                  {t(stg.descKey)}
                </p>

                {/* Key Points Checklist */}
                <div className="space-y-2 pt-1">
                  {stg.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-gray-800">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button Right */}
              <div className="lg:col-span-4 flex flex-col justify-center items-stretch lg:items-end h-full pt-2 lg:pt-0">
                <Link
                  href={stg.href}
                  className={`w-full lg:w-auto px-6 py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${stg.btnColor}`}
                >
                  <span>{t(stg.ctaKey)}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Parent Roadmap Advice */}
      <section className="mx-auto max-w-5xl px-4 pt-8">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-[28px] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-200/80 flex items-center justify-center text-2xl shrink-0">
            💡
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-amber-950">
              Lời khuyên cho ba mẹ cùng bé 5 tuổi:
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-900/80 mt-0.5 leading-relaxed">
              Hãy đi từng bước chắc chắn thay vì dồn ép! Mỗi ngày duy trì 15 - 20 phút học vui vẻ cùng bạn Bibi giúp bé tự tin, hứng thú và tiếp thu Tiếng Việt một cách tự nhiên nhất.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
