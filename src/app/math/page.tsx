"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Calculator, Scale, Shapes, Printer, Hash, Lightbulb, Sparkles } from "lucide-react";

export default function MathOverviewPage() {
  const [activeStageId, setActiveStageId] = useState<string | null>(null);

  const handleStageClick = (e: React.MouseEvent<HTMLAnchorElement>, stageId: string) => {
    e.preventDefault();
    setActiveStageId(stageId);
    const element = document.getElementById(stageId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const prepPillars = [
    {
      emoji: "🍎",
      title: "1. Hiểu 'Số' gắn liền với 'Lượng'",
      desc: "Không học vẹt đếm vần 1-2-3, mà hiểu số 5 tương ứng với 5 quả táo, 5 ngón tay hoặc 5 chấm tròn trên khung 10 (Ten-frame).",
      bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
    },
    {
      emoji: "✏️",
      title: "2. Viết chữ số chuẩn Vở Ô Ly (Cao 4 li)",
      desc: "Làm quen với điểm đặt bút, chiều đi nét và độ cao chuẩn 4 li (2 ô vuông) cho các chữ số từ 0 đến 9 trên giấy kẻ ô ly.",
      bg: "bg-amber-50 border-amber-200 text-amber-900",
    },
    {
      emoji: "🗣️",
      title: "3. Ngôn ngữ Toán học tự nhiên",
      desc: "Hiểu các từ khoá trước khi nhìn ký hiệu: Nhiều hơn / Ít hơn, Gộp lại (Cộng) / Bớt đi (Trừ), Trái / Phải / Trên / Dưới.",
      bg: "bg-sky-50 border-sky-200 text-sky-900",
    },
  ];

  const stages = [
    {
      id: "stage1",
      number: "1",
      badge: "Học phần 1 • Nền tảng",
      title: "Số Đếm 0 – 10, Mở Rộng 11 – 20 & Tập Viết Số Ô Ly",
      desc: "Nhận diện mặt số từ 0 đến 10 (làm quen 11–20), đếm tương ứng trên khung 10 chấm tròn (Ten-frame), nghe vè nhớ nét chữ số và in vở ô ly luyện viết từng số.",
      cta: "Học Số Đếm & Tập Viết Số ➔",
      href: "/math/numbers",
      emoji: "🔢",
      icon: Hash,
      gradient: "from-emerald-100 via-teal-50 to-cyan-100",
      accentBorder: "border-emerald-200",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20",
      points: [
        "Nhận biết số 0 (không có vật nào) và các số từ 1 đến 10 qua hình ảnh & giọng đọc",
        "Đếm xuôi (0 → 10), đếm ngược (10 → 0), tìm số liền trước – liền sau trên tia số",
        "Làm quen cấu tạo số 11 – 20 (1 chục và các đơn vị) & in vở ô ly tập viết chữ số cao 4 li",
      ],
    },
    {
      id: "stage2",
      number: "2",
      badge: "Học phần 2 • Tư duy số",
      title: "So Sánh (>, <, =), Sắp Xếp & Tách – Gộp Số",
      desc: "So sánh hai nhóm đồ vật cùng chú cá sấu há miệng (> < =), sắp xếp dãy số và thực hành Sơ đồ Tách – Gộp số (Number Bonds) — bước đệm quan trọng nhất trước khi học Cộng/Trừ.",
      cta: "Luyện So Sánh & Tách Gộp ➔",
      href: "/math/compare",
      emoji: "⚖️",
      icon: Scale,
      gradient: "from-amber-100 via-orange-50 to-yellow-100",
      accentBorder: "border-amber-200",
      btnColor: "bg-[#FF5722] hover:bg-orange-600 shadow-orange-500/20",
      points: [
        "So sánh nhiều hơn, ít hơn, bằng nhau và mẹo nhớ dấu >, <, = (Miệng cá sấu há về số lớn)",
        "Sắp xếp các số theo thứ tự từ bé đến lớn và từ lớn đến bé",
        "Thành thạo cấu tạo Tách – Gộp số trong phạm vi 5 và 10 (Ví dụ: 5 gồm 2 và 3)",
      ],
    },
    {
      id: "stage3",
      number: "3",
      badge: "Học phần 3 • Phép tính",
      title: "Phép Cộng, Phép Trừ Trực Quan & Toán Có Lời Văn (Phạm Vi 10)",
      desc: "Hiểu bản chất Cộng là gộp thêm, Trừ là bớt đi qua hình ảnh trực quan, nhảy trên Tia số 0–10 và tập giải các bài toán có lời văn có giọng đọc hướng dẫn.",
      cta: "Thực Hành Cộng & Trừ ➔",
      href: "/math/arithmetic",
      emoji: "➕",
      icon: Calculator,
      gradient: "from-sky-100 via-blue-50 to-indigo-100",
      accentBorder: "border-sky-200",
      btnColor: "bg-sky-600 hover:bg-sky-700 shadow-sky-500/20",
      points: [
        "Phép cộng & phép trừ trong phạm vi 10 bằng hình ảnh trực quan (gộp thêm / gạch bớt)",
        "Tập đếm bước nhảy của chú ếch trên Tia số 0 – 10 để tính nhẩm nhanh",
        "Làm quen Toán có lời văn bằng hình ảnh & giọng đọc tiếng Việt sinh động",
      ],
    },
    {
      id: "stage4",
      number: "4",
      badge: "Học phần 4 • Không gian & Logic",
      title: "Hình Học, Định Hướng Không Gian, Đo Lường & Quy Luật",
      desc: "Nhận biết hình phẳng (tròn, vuông, tam giác, chữ nhật) và hình khối (khối cầu, khối lập phương), phân biệt vị trí trên-dưới-trái-phải, đo lường trực quan, tìm quy luật và xem đồng hồ.",
      cta: "Khám Phá Hình Học & Tư Duy ➔",
      href: "/math/shapes",
      emoji: "🔺",
      icon: Shapes,
      gradient: "from-purple-100 via-fuchsia-50 to-pink-100",
      accentBorder: "border-purple-200",
      btnColor: "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20",
      points: [
        "Nhận diện 4 hình phẳng & 2 khối cơ bản gắn với đồ vật quen thuộc quanh bé",
        "Định hướng không gian (Trên - Dưới, Trái - Phải, Ở giữa) & Đo lường (Cao - Thấp, Dài - Ngắn, Nặng - Nhẹ)",
        "Tìm quy luật dãy hình (Patterns) và làm quen xem giờ đúng trên mặt đồng hồ",
      ],
    },
    {
      id: "stage5",
      number: "5",
      badge: "Học phần 5 • Thực hành trên giấy",
      title: "Trung Tâm Tạo & In Phiếu Bài Tập Toán A4 Chuẩn Ô Ly",
      desc: "Tạo và in ngay bộ phiếu bài tập Toán A4: Vở ô ly luyện viết chữ số 0–10, phiếu so sánh & tách gộp số, phiếu cộng trừ trực quan và phiếu tư duy hình học.",
      cta: "Tạo & In Phiếu Bài Tập Toán ➔",
      href: "/math/print",
      emoji: "🖨️",
      icon: Printer,
      gradient: "from-rose-100 via-orange-50 to-amber-100",
      accentBorder: "border-rose-200",
      btnColor: "bg-rose-600 hover:bg-rose-700 shadow-rose-500/20",
      points: [
        "In vở luyện viết từng chữ số (0–10) chuẩn dòng kẻ ô ly tiểu học cao 4 li",
        "In phiếu thực hành So sánh (>, <, =), Sơ đồ Tách – Gộp số và Cộng – Trừ có tia số",
        "In phiếu đếm hình, tìm quy luật và đọc giờ đồng hồ để bé rèn tay cầm bút chì 2B",
      ],
    },
  ];

  return (
    <div className="flex-1 bg-[#FFFDF9] pb-12">
      {/* Hero Header */}
      <section className="mx-auto max-w-5xl px-4 pt-6 pb-6 text-center sm:pt-10 sm:pb-8 space-y-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-5 py-1.5 text-xs font-extrabold text-emerald-800 border border-emerald-200 shadow-2xs tracking-wide">
            <Sparkles className="size-3.5 text-emerald-600" />
            CHƯƠNG TRÌNH TOÁN TIỀN TIỂU HỌC (CHO BÉ 5 – 6 TUỔI)
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1E293B] leading-tight">
          Lộ Trình Toán Tư Duy &amp; Chuẩn Bị Vào Lớp 1
        </h1>

        <p className="mx-auto max-w-3xl text-sm sm:text-base font-semibold text-slate-600 leading-relaxed">
          Giúp bé xây dựng nền tảng toán học vững chắc từ trực quan đến trừu tượng:{" "}
          <span className="text-emerald-600 font-bold">Số &amp; Lượng</span> →{" "}
          <span className="text-[#FF5722] font-bold">So sánh &amp; Tách gộp</span> →{" "}
          <span className="text-sky-600 font-bold">Cộng &amp; Trừ</span> →{" "}
          <span className="text-purple-600 font-bold">Hình học &amp; Logic</span>.
        </p>

        {/* 3 Preparation Pillars */}
        <div className="mx-auto max-w-5xl pt-3 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {prepPillars.map((p, idx) => (
              <div key={idx} className={`rounded-2xl border p-4 shadow-2xs ${p.bg}`}>
                <div className="flex items-center gap-2 font-heading text-sm font-black mb-1">
                  <span className="text-xl">{p.emoji}</span>
                  <span>{p.title}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-90 font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Quick Jump */}
        <div className="mx-auto max-w-5xl pt-3">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {stages.map((stg) => {
              const isActive = activeStageId === stg.id;
              return (
                <a
                  key={stg.id}
                  href={`#${stg.id}`}
                  onClick={(e) => handleStageClick(e, stg.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-2xl transition-all text-left cursor-pointer ${
                    isActive
                      ? "bg-emerald-50 border-2 border-emerald-600 shadow-xs"
                      : "bg-white border border-gray-200/80 hover:border-emerald-300 shadow-2xs"
                  }`}
                >
                  <span
                    className={`flex size-7 items-center justify-center rounded-full font-extrabold text-xs shrink-0 ${
                      isActive ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {stg.number}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-gray-500 truncate">{stg.badge}</p>
                    <p className="text-xs font-extrabold text-gray-900 truncate">
                      {stg.emoji} Phần {stg.number}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 Stages Detailed Roadmap */}
      <section className="mx-auto max-w-5xl px-4 space-y-6">
        {stages.map((stg) => (
          <div
            key={stg.id}
            id={stg.id}
            className={`clay-card scroll-mt-6 bg-gradient-to-br ${stg.gradient} border-2 ${stg.accentBorder} p-6 sm:p-8 rounded-[32px] transition-all`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 text-emerald-800 font-extrabold text-xs shadow-xs border border-emerald-200/60">
                    HỌC PHẦN {stg.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/70 text-gray-700 font-bold text-xs border border-gray-200/60">
                    🎯 {stg.badge}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{stg.emoji}</span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
                    {stg.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">
                  {stg.desc}
                </p>

                <div className="space-y-2 pt-1">
                  {stg.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-gray-800">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-stretch lg:items-end h-full pt-2 lg:pt-0">
                <Link
                  href={stg.href}
                  className={`w-full lg:w-auto px-6 py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${stg.btnColor}`}
                >
                  <span>{stg.cta}</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Parent Advice Card */}
      <section className="mx-auto max-w-5xl px-4 pt-8">
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-[28px] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-200/80 flex items-center justify-center text-emerald-900 shrink-0">
            <Lightbulb className="size-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-emerald-950">
              Bí quyết dạy Toán Tiền Tiểu Học cho bé 5 – 6 tuổi:
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-900/85 mt-0.5 leading-relaxed">
              Ba mẹ hãy luôn bắt đầu từ <b>đồ vật thật &amp; hình ảnh trực quan</b> (kẹo, ngón tay, chấm tròn) trước khi yêu cầu bé nhớ phép tính. Khi bé nắm vững <b>Tách – Gộp số trong phạm vi 10</b>, bé sẽ tự khắc cộng trừ cực nhanh mà không cần đếm ngón tay!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
