"use client";

import { useState } from "react";
import { Volume2, Printer, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { speakVietnamese } from "@/lib/speech";
import { playCorrectSound, playWrongSound } from "@/lib/sound-effects";
import { useReward } from "@/lib/reward-context";
import {
  SHAPES_DATA,
  SPATIAL_QUESTIONS,
  MEASUREMENT_QUESTIONS,
  PATTERN_QUESTIONS,
  CLOCK_ACTIVITIES,
} from "@/data/math/curriculum";
import { ShapesAndLogicPracticeSheet } from "@/components/math/math-topic-sheets";

function ShapeVector({ id, color }: { id: string; color: string }) {
  if (id === "circle") {
    return (
      <svg viewBox="0 0 100 100" className="size-24">
        <circle cx="50" cy="50" r="38" fill={`${color}22`} stroke={color} strokeWidth="5" />
      </svg>
    );
  }
  if (id === "square") {
    return (
      <svg viewBox="0 0 100 100" className="size-24">
        <rect x="16" y="16" width="68" height="68" rx="4" fill={`${color}22`} stroke={color} strokeWidth="5" />
      </svg>
    );
  }
  if (id === "triangle") {
    return (
      <svg viewBox="0 0 100 100" className="size-24">
        <polygon points="50,14 14,84 86,84" fill={`${color}22`} stroke={color} strokeWidth="5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "rectangle") {
    return (
      <svg viewBox="0 0 100 100" className="size-24">
        <rect x="10" y="26" width="80" height="48" rx="4" fill={`${color}22`} stroke={color} strokeWidth="5" />
      </svg>
    );
  }
  if (id === "sphere") {
    return (
      <svg viewBox="0 0 100 100" className="size-24">
        <circle cx="50" cy="50" r="38" fill={`${color}28`} stroke={color} strokeWidth="4.5" />
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="4,3" />
        <circle cx="36" cy="34" r="6" fill="#ffffff" opacity="0.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="size-24">
      <polygon points="32,20 82,20 68,36 18,36" fill={`${color}35`} stroke={color} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="18" y="36" width="50" height="46" fill={`${color}20`} stroke={color} strokeWidth="3.5" />
      <polygon points="68,36 82,20 82,66 68,82" fill={`${color}45`} stroke={color} strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function MathShapesAndLogicPage() {
  const { rewardItem, addQuizCoins } = useReward();

  // Selected shape
  const [selectedShapeId, setSelectedShapeId] = useState<string>("circle");
  const currentShape = SHAPES_DATA.find((s) => s.id === selectedShapeId) ?? SHAPES_DATA[0];

  // Spatial quiz state
  const [spIdx, setSpIdx] = useState(0);
  const [spFeedback, setSpFeedback] = useState<"correct" | "wrong" | null>(null);
  const currentSp = SPATIAL_QUESTIONS[spIdx];

  // Measurement quiz state
  const [msIdx, setMsIdx] = useState(0);
  const [msFeedback, setMsFeedback] = useState<"correct" | "wrong" | null>(null);
  const currentMs = MEASUREMENT_QUESTIONS[msIdx];

  // Pattern quiz state
  const [patIdx, setPatIdx] = useState(0);
  const [patFeedback, setPatFeedback] = useState<"correct" | "wrong" | null>(null);
  const currentPat = PATTERN_QUESTIONS[patIdx];

  // Clock state
  const [clockIdx, setClockIdx] = useState(0);
  const currentClock = CLOCK_ACTIVITIES[clockIdx];

  const handleShapeSelect = (id: string) => {
    setSelectedShapeId(id);
    const sh = SHAPES_DATA.find((s) => s.id === id);
    if (sh) {
      speakVietnamese(sh.voicePrompt, 0.88);
      rewardItem(`math_shape_${id}`, 1, `Học ${sh.name}`);
    }
  };

  const handleSpatialPick = (pos: string) => {
    if (pos === currentSp.correctPos) {
      setSpFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(`Đúng rồi! ${currentSp.explanation}`, 0.9);
    } else {
      setSpFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa đúng rồi, bé quan sát kỹ vị trí nhé!", 0.9);
    }
  };

  const handleMeasurementPick = (choice: "A" | "B") => {
    if (choice === currentMs.correct) {
      setMsFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(`Chính xác! ${currentMs.explanation}`, 0.9);
    } else {
      setMsFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa đúng rồi, bé nhìn kỹ kích thước của hai bên nhé!", 0.9);
    }
  };

  const handlePatternPick = (opt: string) => {
    if (opt === currentPat.answer) {
      setPatFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese("Hoan hô! Bé đã tìm đúng quy luật rồi!", 0.9);
    } else {
      setPatFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa đúng quy luật rồi, bé đọc lại thứ tự lặp lại từ đầu dãy nhé!", 0.9);
    }
  };

  // Analog clock hour hand coordinates
  const hourAngle = ((currentClock.hour % 12) * 30 - 90) * (Math.PI / 180);
  const hx = 60 + 25 * Math.cos(hourAngle);
  const hy = 60 + 25 * Math.sin(hourAngle);

  return (
    <>
      {/* 1. ON-SCREEN INTERACTIVE INTERFACE */}
      <div className="min-h-screen bg-[#FFFDF9] pb-16 print:hidden">
        <div className="mx-auto max-w-6xl px-4 pt-6 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold border border-purple-200">
                Học phần 4 • Hình Học, Không Gian, Đo Lường &amp; Tư Duy Logic
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                🔺 Hình Học, Định Hướng Không Gian, Quy Luật &amp; Đồng Hồ
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Phát triển tư duy trực quan cho bé 5 – 6 tuổi: nhận diện hình phẳng &amp; khối, phân biệt trái – phải – trên – dưới, tìm quy luật và xem giờ đúng.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0 self-start md:self-auto"
            >
              <Printer className="size-4" />
              <span>In Phiếu Hình Học &amp; Tư Duy A4</span>
            </button>
          </div>

          {/* SECTION 1: HÌNH PHẲNG (2D) & HÌNH KHỐI (3D) */}
          <section className="bg-white border-2 border-purple-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700">
                📐 Làm quen Hình học cơ bản
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Nhận Biết Hình Phẳng (2D) &amp; Hình Khối (3D) Quanh Bé
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SHAPES_DATA.map((sh) => {
                const active = sh.id === selectedShapeId;
                return (
                  <button
                    key={sh.id}
                    type="button"
                    onClick={() => handleShapeSelect(sh.id)}
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all hover:scale-105 ${
                      active ? `${sh.bgClass} border-2 shadow-xs` : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <ShapeVector id={sh.id} color={sh.color} />
                    <span className="font-heading text-sm font-black text-slate-900">{sh.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                      {sh.kind === "2d" ? "Hình phẳng" : "Hình khối"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Shape Detail Card */}
            <div className={`rounded-2xl border p-4 sm:p-5 ${currentShape.bgClass} flex flex-col md:flex-row items-center justify-between gap-4`}>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-xl font-black text-slate-900">{currentShape.name}</h3>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {currentShape.sidesInfo}
                  </span>
                  <button
                    type="button"
                    onClick={() => speakVietnamese(currentShape.voicePrompt, 0.88)}
                    className="p-1.5 rounded-full bg-white text-slate-700 hover:bg-slate-100"
                  >
                    <Volume2 className="size-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700">{currentShape.description}</p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {currentShape.realLifeExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white border border-slate-200 px-3 py-2 flex flex-col items-center text-center min-w-[90px]"
                  >
                    <span className="text-2xl">{ex.emoji}</span>
                    <span className="text-[11px] font-bold text-slate-700 mt-1">{ex.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: ĐỊNH HƯỚNG KHÔNG GIAN & ĐO LƯỜNG TRỰC QUAN */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spatial Orientation Card */}
            <section className="bg-white border-2 border-sky-200 rounded-3xl p-5 shadow-2xs flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700">
                    🧭 Định hướng không gian ({spIdx + 1}/{SPATIAL_QUESTIONS.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSpIdx((i) => (i + 1) % SPATIAL_QUESTIONS.length);
                      setSpFeedback(null);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold"
                  >
                    Đổi câu <ArrowRight className="size-3.5" />
                  </button>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">{currentSp.concept}</h2>
                <button
                  type="button"
                  onClick={() => speakVietnamese(currentSp.prompt, 0.9)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D84315]"
                >
                  <Volume2 className="size-4" />
                  <span>❓ {currentSp.prompt}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {currentSp.items.map((item) => (
                  <button
                    key={item.pos}
                    type="button"
                    onClick={() => handleSpatialPick(item.pos)}
                    className="p-3.5 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:border-sky-500 hover:bg-sky-50 flex flex-col items-center text-center gap-1.5 transition-all"
                  >
                    <span className="text-4xl">{item.emoji}</span>
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                  </button>
                ))}
              </div>

              {spFeedback === "correct" && (
                <div className="rounded-xl bg-emerald-100 border border-emerald-300 px-3.5 py-2 text-xs font-extrabold text-emerald-900">
                  🎉 {currentSp.explanation}
                </div>
              )}
              {spFeedback === "wrong" && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2 text-xs font-bold text-rose-800">
                  Chưa đúng vị trí rồi, bé thử chọn lại nhé!
                </div>
              )}
            </section>

            {/* Measurement Comparison Card */}
            <section className="bg-white border-2 border-emerald-200 rounded-3xl p-5 shadow-2xs flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                    📏 Đo lường trực quan ({msIdx + 1}/{MEASUREMENT_QUESTIONS.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setMsIdx((i) => (i + 1) % MEASUREMENT_QUESTIONS.length);
                      setMsFeedback(null);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold"
                  >
                    Đổi câu <ArrowRight className="size-3.5" />
                  </button>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900">{currentMs.category}</h2>
                <button
                  type="button"
                  onClick={() => speakVietnamese(currentMs.prompt, 0.9)}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D84315]"
                >
                  <Volume2 className="size-4" />
                  <span>❓ {currentMs.prompt}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(["A", "B"] as const).map((key) => {
                  const opt = key === "A" ? currentMs.optionA : currentMs.optionB;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleMeasurementPick(key)}
                      className="p-4 rounded-2xl border-2 border-slate-200 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50 flex flex-col items-center justify-end min-h-[125px] gap-1.5 transition-all"
                    >
                      <span className={opt.sizeClass}>{opt.emoji}</span>
                      <span className="text-xs font-extrabold text-slate-900">{opt.label}</span>
                      <span className="text-[11px] text-slate-500">{opt.detail}</span>
                    </button>
                  );
                })}
              </div>

              {msFeedback === "correct" && (
                <div className="rounded-xl bg-emerald-100 border border-emerald-300 px-3.5 py-2 text-xs font-extrabold text-emerald-900">
                  🎉 {currentMs.explanation}
                </div>
              )}
              {msFeedback === "wrong" && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2 text-xs font-bold text-rose-800">
                  Chưa đúng rồi, bé nhìn kỹ hai hình để so sánh nhé!
                </div>
              )}
            </section>
          </div>

          {/* SECTION 3: TÌM QUY LUẬT DÃY HÌNH (PATTERNS) */}
          <section className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  🧠 Tư duy Logic • Tìm quy luật ({patIdx + 1}/{PATTERN_QUESTIONS.length})
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">{currentPat.ruleName}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPatIdx((i) => (i + 1) % PATTERN_QUESTIONS.length);
                  setPatFeedback(null);
                }}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold"
              >
                Quy luật tiếp theo <ArrowRight className="size-3.5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-700">{currentPat.prompt}</p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-amber-50/50 border border-amber-200 p-4">
              <div className="flex flex-wrap items-center gap-2.5">
                {currentPat.sequence.map((item, idx) => (
                  <span
                    key={idx}
                    className="size-13 rounded-2xl bg-white border border-amber-200 flex items-center justify-center text-2xl font-heading font-black shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
                <span className="size-13 rounded-2xl border-2 border-dashed border-[#FF5722] bg-white flex items-center justify-center text-2xl font-heading font-black text-[#FF5722]">
                  {patFeedback === "correct" ? currentPat.answer : "?"}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-slate-600">Chọn hình đúng:</span>
                {currentPat.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handlePatternPick(opt)}
                    className="size-13 rounded-2xl bg-white border-2 border-slate-300 hover:border-[#FF5722] hover:bg-orange-50 flex items-center justify-center text-2xl font-heading font-black transition-transform active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {patFeedback === "correct" && (
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                <CheckCircle2 className="size-4" />
                Chính xác! Bé nhận ra quy luật rất nhanh!
              </div>
            )}
            {patFeedback === "wrong" && (
              <p className="text-xs font-bold text-rose-600">
                Chưa đúng rồi, bé đọc to các hình từ trái sang phải để nhận ra quy luật lặp lại nhé!
              </p>
            )}
          </section>

          {/* SECTION 4: LÀM QUEN ĐỒNG HỒ & XEM GIỜ ĐÚNG */}
          <section className="bg-white border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                <Clock className="size-3.5" /> Thời gian &amp; Sinh hoạt hằng ngày
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Làm Quen Mặt Đồng Hồ &amp; Xem Giờ Đúng (Kim Dài Chỉ Số 12)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Khi <b>kim dài (kim phút màu xanh) chỉ đúng số 12</b>, thì <b>kim ngắn (kim giờ màu đỏ) chỉ vào số nào là bấy nhiêu giờ đúng</b>!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Interactive Analog Clock SVG (5 cols) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center rounded-2xl bg-indigo-50/50 border border-indigo-200 p-4">
                <svg viewBox="0 0 120 120" className="size-48">
                  <circle cx="60" cy="60" r="54" fill="#ffffff" stroke="#4f46e5" strokeWidth="4" />
                  {Array.from({ length: 12 }, (_, i) => {
                    const num = i + 1;
                    const a = ((num % 12) * 30 - 90) * (Math.PI / 180);
                    return (
                      <text
                        key={num}
                        x={60 + 42 * Math.cos(a)}
                        y={64 + 42 * Math.sin(a)}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="900"
                        fill={num === currentClock.hour ? "#dc2626" : "#1e293b"}
                      >
                        {num}
                      </text>
                    );
                  })}
                  {/* Minute hand pointing to 12 */}
                  <line x1="60" y1="60" x2="60" y2="20" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                  {/* Hour hand */}
                  <line x1="60" y1="60" x2={hx} y2={hy} stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="60" cy="60" r="4" fill="#0f172a" />
                </svg>
                <span className="mt-2 font-heading text-xl font-black text-indigo-950">
                  {currentClock.label} ({currentClock.period})
                </span>
              </div>

              {/* Daily Time Activities (7 cols) */}
              <div className="md:col-span-7 space-y-3">
                <span className="text-xs font-bold text-slate-600 block">
                  Chạm vào các mốc giờ trong ngày của bé để xem kim đồng hồ quay và nghe thuyết minh:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CLOCK_ACTIVITIES.map((act, idx) => {
                    const active = idx === clockIdx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setClockIdx(idx);
                          speakVietnamese(
                            `${act.label} ${act.period}. Kim ngắn chỉ số ${act.hour}, kim dài chỉ số 12. ${act.activity}.`,
                            0.88
                          );
                          rewardItem(`math_clock_${idx}`, 1, `Xem đồng hồ ${act.label}`);
                        }}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                          active
                            ? "bg-indigo-50 border-2 border-indigo-600 shadow-xs"
                            : "bg-slate-50 border-slate-200 hover:bg-indigo-50/40"
                        }`}
                      >
                        <span className="text-3xl">{act.emoji}</span>
                        <div>
                          <span className="font-heading text-sm font-black text-indigo-950 block">
                            {act.label} • {act.period}
                          </span>
                          <span className="text-xs text-slate-600 font-medium">{act.activity}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 2. DEDICATED PRINTABLE A4 AREA */}
      <div className="hidden print:block w-full bg-white text-black">
        <ShapesAndLogicPracticeSheet />
      </div>
    </>
  );
}
