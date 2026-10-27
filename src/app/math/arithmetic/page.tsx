"use client";

import { useState } from "react";
import { Volume2, Printer, CheckCircle2, RotateCcw, ArrowRight, Plus, Minus } from "lucide-react";
import { speakVietnamese } from "@/lib/speech";
import { playCorrectSound, playWrongSound } from "@/lib/sound-effects";
import { useReward } from "@/lib/reward-context";
import { VISUAL_WORD_PROBLEMS } from "@/data/math/curriculum";
import { ArithmeticPracticeSheet } from "@/components/math/math-topic-sheets";

export default function MathArithmeticPage() {
  const { addQuizCoins } = useReward();

  // Playground state
  const [op, setOp] = useState<"+" | "-">("+");
  const [numA, setNumA] = useState<number>(3);
  const [numB, setNumB] = useState<number>(2);
  const [emoji, setEmoji] = useState<string>("🍎");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  // Word problem state
  const [wpIdx, setWpIdx] = useState<number>(0);
  const [wpFeedback, setWpFeedback] = useState<"correct" | "wrong" | null>(null);
  const currentWp = VISUAL_WORD_PROBLEMS[wpIdx];

  const expectedAnswer = op === "+" ? numA + numB : numA - numB;

  const generateNewEquation = (nextOp: "+" | "-" = op) => {
    const emojis = ["🍎", "🍓", "🐣", "⭐", "🎈", "🐟", "🍊", "🦋"];
    const pickedEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    if (nextOp === "+") {
      const a = 1 + Math.floor(Math.random() * 8); // 1..8
      const b = 1 + Math.floor(Math.random() * (10 - a)); // a+b <= 10
      setNumA(a);
      setNumB(b);
      setOp("+");
      setEmoji(pickedEmoji);
      setFeedback(null);
      speakVietnamese(`${a} cộng ${b} bằng mấy?`, 0.9);
    } else {
      const a = 2 + Math.floor(Math.random() * 9); // 2..10
      const b = 1 + Math.floor(Math.random() * a); // 1..a (result >= 0)
      setNumA(a);
      setNumB(b);
      setOp("-");
      setEmoji(pickedEmoji);
      setFeedback(null);
      speakVietnamese(`${a} trừ ${b} bằng mấy?`, 0.9);
    }
  };

  const handleAnswerPick = (guess: number) => {
    if (guess === expectedAnswer) {
      setFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(
        op === "+"
          ? `Giỏi quá! ${numA} cộng ${numB} bằng ${expectedAnswer}!`
          : `Chính xác! ${numA} trừ ${numB} bằng ${expectedAnswer}!`,
        0.9
      );
    } else {
      setFeedback("wrong");
      playWrongSound();
      speakVietnamese(
        op === "+"
          ? "Chưa đúng rồi! Bé đếm gộp tất cả các hình hoặc nhìn bước nhảy của chú ếch trên tia số nhé!"
          : "Chưa đúng rồi! Bé đếm số hình không bị gạch chéo hoặc nhảy lùi trên tia số nhé!",
        0.9
      );
    }
  };

  const handleWpPick = (guess: number) => {
    if (guess === currentWp.answer) {
      setWpFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(`Hoan hô! ${currentWp.explanation}`, 0.9);
    } else {
      setWpFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa đúng rồi, bé bấm nút loa nghe lại câu chuyện và đếm hình minh họa nhé!", 0.9);
    }
  };

  return (
    <>
      {/* 1. ON-SCREEN INTERACTIVE INTERFACE */}
      <div className="min-h-screen bg-[#FFFDF9] pb-16 print:hidden">
        <div className="mx-auto max-w-6xl px-4 pt-6 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold border border-sky-200">
                Học phần 3 • Phép Cộng &amp; Phép Trừ Trong Phạm Vi 10
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                ➕➖ Cộng – Trừ Trực Quan, Tia Số &amp; Toán Có Lời Văn
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Phép Cộng (<b>+</b>) là <b>gộp thêm vào</b>, Phép Trừ (<b>-</b>) là <b>bớt đi</b>. Cùng đếm hình và nhảy trên tia số 0 – 10!
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0 self-start md:self-auto"
            >
              <Printer className="size-4" />
              <span>In Phiếu Cộng &amp; Trừ A4</span>
            </button>
          </div>

          {/* SECTION 1: BÀN TÍNH HÌNH ẢNH & TIA SỐ CHÚ ẾCH NHẢY */}
          <section className="bg-white border-2 border-sky-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Switch + / - */}
              <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => generateNewEquation("+")}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                    op === "+"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <Plus className="size-4" />
                  Phép Cộng (Gộp thêm)
                </button>
                <button
                  type="button"
                  onClick={() => generateNewEquation("-")}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                    op === "-"
                      ? "bg-[#FF5722] text-white shadow-xs"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  <Minus className="size-4" />
                  Phép Trừ (Bớt đi)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    speakVietnamese(
                      op === "+"
                        ? `${numA} cộng ${numB} bằng mấy? Gộp ${numA} hình và ${numB} hình lại.`
                        : `${numA} trừ ${numB} bằng mấy? Có ${numA} hình, bớt đi ${numB} hình.`,
                      0.9
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-extrabold"
                >
                  <Volume2 className="size-4" />
                  Nghe phép tính
                </button>
                <button
                  type="button"
                  onClick={() => generateNewEquation(op)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold"
                >
                  <RotateCcw className="size-3.5" />
                  Đổi phép tính mới
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Visual Counters & Big Equation (6 cols) */}
              <div className="lg:col-span-6 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-4 text-center">
                {/* Big Equation Display */}
                <div className="flex items-center justify-center gap-3 font-heading text-4xl sm:text-5xl font-black">
                  <span className="text-sky-700">{numA}</span>
                  <span className={op === "+" ? "text-emerald-600" : "text-[#FF5722]"}>{op}</span>
                  <span className="text-amber-600">{numB}</span>
                  <span className="text-slate-400">=</span>
                  <span
                    className={`min-w-[64px] px-3 py-1 rounded-2xl border-2 ${
                      feedback === "correct"
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-[#FF5722] border-dashed border-[#FF5722]"
                    }`}
                  >
                    {feedback === "correct" ? expectedAnswer : "?"}
                  </span>
                </div>

                {/* Visual Objects Representation */}
                <div className="rounded-2xl bg-white border border-slate-200 p-4 min-h-[120px] flex flex-col items-center justify-center gap-2">
                  {op === "+" ? (
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <div className="flex flex-wrap gap-1.5 rounded-xl bg-sky-50 border border-sky-200 p-2.5">
                        {Array.from({ length: numA }).map((_, i) => (
                          <span key={`a-${i}`} className="text-3xl">
                            {emoji}
                          </span>
                        ))}
                      </div>
                      <span className="font-heading text-2xl font-black text-emerald-600">+</span>
                      <div className="flex flex-wrap gap-1.5 rounded-xl bg-amber-50 border border-amber-200 p-2.5">
                        {Array.from({ length: numB }).map((_, i) => (
                          <span key={`b-${i}`} className="text-3xl">
                            {emoji}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {Array.from({ length: numA }).map((_, i) => {
                        const crossedOut = i >= numA - numB;
                        return (
                          <div
                            key={i}
                            className={`relative rounded-xl p-2 border text-3xl ${
                              crossedOut
                                ? "bg-rose-50/60 border-rose-200 opacity-50"
                                : "bg-emerald-50 border-emerald-200"
                            }`}
                          >
                            <span>{emoji}</span>
                            {crossedOut && (
                              <span className="absolute inset-0 flex items-center justify-center text-red-600 font-black text-3xl">
                                ✕
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <p className="text-xs font-bold text-slate-500">
                    {op === "+"
                      ? `Đếm gộp ${numA} hình bên trái và ${numB} hình bên phải`
                      : `Có ${numA} hình, gạch bớt đi ${numB} hình (dấu ✕), đếm số hình còn lại`}
                  </p>
                </div>
              </div>

              {/* Frog Jump Number Line + Keypad (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                {/* SVG Number Line with Frog Jumps */}
                <div className="rounded-2xl bg-sky-50/60 border border-sky-200 p-4 space-y-1">
                  <span className="text-xs font-extrabold text-sky-950 block">
                    🐸 Tia số 0 – 10: Xuất phát từ số <b>{numA}</b>, nhảy {op === "+" ? "tiến sang phải" : "lùi sang trái"}{" "}
                    <b>{numB}</b> bước:
                  </span>
                  <svg viewBox="0 0 560 90" className="w-full h-auto">
                    {/* Horizontal axis */}
                    <line x1="25" y1="62" x2="535" y2="62" stroke="#0284c7" strokeWidth="3" />

                    {/* Jump arcs from numA */}
                    {Array.from({ length: numB }, (_, step) => {
                      const fromN = op === "+" ? numA + step : numA - step;
                      const toN = op === "+" ? fromN + 1 : fromN - 1;
                      const x1 = 30 + fromN * 50;
                      const x2 = 30 + toN * 50;
                      const midX = (x1 + x2) / 2;
                      return (
                        <path
                          key={step}
                          d={`M ${x1} 58 Q ${midX} 22 ${x2} 58`}
                          fill="none"
                          stroke={op === "+" ? "#16a34a" : "#ea580c"}
                          strokeWidth="2.5"
                          strokeDasharray="4,3"
                        />
                      );
                    })}

                    {/* Frog icon at start numA */}
                    <text x={30 + numA * 50} y="24" textAnchor="middle" fontSize="18">
                      🐸
                    </text>

                    {/* Tick marks & numbers 0..10 */}
                    {Array.from({ length: 11 }, (_, n) => {
                      const x = 30 + n * 50;
                      const isStart = n === numA;
                      const isEnd = feedback === "correct" && n === expectedAnswer;
                      return (
                        <g key={n}>
                          <circle
                            cx={x}
                            cy="62"
                            r={isStart || isEnd ? 8 : 4.5}
                            fill={isEnd ? "#16a34a" : isStart ? "#0284c7" : "#ffffff"}
                            stroke="#0284c7"
                            strokeWidth="2.5"
                          />
                          <text
                            x={x}
                            y="84"
                            textAnchor="middle"
                            fontSize="14"
                            fontWeight="900"
                            fill={isEnd ? "#15803d" : isStart ? "#0369a1" : "#334155"}
                          >
                            {n}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Keypad 0..10 */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Chạm vào số kết quả của {numA} {op} {numB}:
                  </span>
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 11 }, (_, n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => handleAnswerPick(n)}
                        className="py-2.5 rounded-xl border-2 border-slate-200 bg-white hover:border-sky-600 hover:bg-sky-50 font-heading text-xl font-black text-slate-800 transition-all active:scale-95 shadow-2xs"
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {feedback === "correct" && (
                  <div className="flex items-center justify-between rounded-xl bg-emerald-100 border border-emerald-300 px-4 py-2.5 text-xs font-extrabold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-700" />
                      Chính xác! {numA} {op} {numB} = {expectedAnswer}!
                    </span>
                    <button
                      type="button"
                      onClick={() => generateNewEquation(op)}
                      className="px-3 py-1 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
                    >
                      Phép tính tiếp ➔
                    </button>
                  </div>
                )}
                {feedback === "wrong" && (
                  <p className="text-xs font-bold text-rose-600">
                    Chưa đúng rồi, bé nhìn chú ếch nhảy trên tia số xem dừng ở số mấy nhé!
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 2: TOÁN CÓ LỜI VĂN BẰNG HÌNH ẢNH & GIỌNG ĐỌC */}
          <section className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#D84315]">
                  📖 Làm quen Toán có lời văn lớp 1
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Nghe Kể Chuyện Toán Học &amp; Giải Bài Toán ({wpIdx + 1}/{VISUAL_WORD_PROBLEMS.length})
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakVietnamese(`${currentWp.story} ${currentWp.question}`, 0.88)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 hover:bg-orange-200 text-[#D84315] text-xs font-extrabold"
                >
                  <Volume2 className="size-4" />
                  Nghe đọc đề bài
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWpIdx((i) => (i + 1) % VISUAL_WORD_PROBLEMS.length);
                    setWpFeedback(null);
                  }}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold"
                >
                  Bài toán khác <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-7 rounded-2xl bg-amber-50/60 border border-amber-200 p-4 space-y-3">
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">{currentWp.story}</p>
                <p className="text-sm font-extrabold text-[#D84315]">❓ {currentWp.question}</p>

                {/* Visual Story Illustration */}
                <div className="rounded-xl bg-white border border-amber-200 p-3 flex flex-wrap items-center justify-center gap-2 text-3xl">
                  {currentWp.op === "+" ? (
                    <>
                      <span className="px-2 py-1 rounded-lg bg-sky-50">
                        {Array.from({ length: currentWp.a }).map(() => currentWp.emoji).join(" ")}
                      </span>
                      <span className="font-heading text-xl font-black text-emerald-600">+ thêm</span>
                      <span className="px-2 py-1 rounded-lg bg-emerald-50">
                        {Array.from({ length: currentWp.b }).map(() => currentWp.emoji).join(" ")}
                      </span>
                    </>
                  ) : (
                    <>
                      {Array.from({ length: currentWp.a }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i >= currentWp.a - currentWp.b
                              ? "line-through opacity-40 decoration-red-600"
                              : ""
                          }
                        >
                          {currentWp.emoji}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="md:col-span-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-center">
                  <span className="text-xs font-bold text-slate-500 block">Phép tính tương ứng:</span>
                  <span className="font-heading text-3xl font-black text-slate-900">
                    {currentWp.a} {currentWp.op} {currentWp.b} ={" "}
                    <span className="text-[#FF5722]">{wpFeedback === "correct" ? currentWp.answer : "?"}</span>
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-700 block">Chọn đáp án đúng:</span>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleWpPick(n)}
                      className="py-2 rounded-xl border-2 border-slate-200 bg-white hover:border-[#FF5722] hover:bg-orange-50 font-heading text-lg font-black text-slate-800 transition-all"
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {wpFeedback === "correct" && (
                  <div className="rounded-xl bg-emerald-100 border border-emerald-300 px-3.5 py-2 text-xs font-extrabold text-emerald-900">
                    🎉 {currentWp.explanation}
                  </div>
                )}
                {wpFeedback === "wrong" && (
                  <p className="text-xs font-bold text-rose-600">
                    Chưa đúng rồi! Bé đếm hình minh họa bên trái nhé!
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 2. DEDICATED PRINTABLE A4 AREA */}
      <div className="hidden print:block w-full bg-white text-black">
        <ArithmeticPracticeSheet range={10} />
      </div>
    </>
  );
}
