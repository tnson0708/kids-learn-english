"use client";

import { useState } from "react";
import { Volume2, Printer, CheckCircle2, Sparkles, RotateCcw, Pencil, ArrowRight } from "lucide-react";
import { speakVietnamese } from "@/lib/speech";
import { playCorrectSound, playWrongSound } from "@/lib/sound-effects";
import { useReward } from "@/lib/reward-context";
import { MATH_NUMBERS_0_10, MATH_NUMBERS_11_20 } from "@/data/math/curriculum";
import { CursiveLetterCard } from "@/components/vietnamese/cursive-oly";
import { SingleNumberPracticeSheet } from "@/components/math/single-number-practice-sheet";
import { NumberPracticeSheet } from "@/components/vietnamese/number-practice-sheet";

const MISSING_SEQUENCES = [
  { id: "seq_1", label: "Đếm xuôi từ 1 đến 6", nums: [1, 2, null, 4, 5, 6], answer: 3, options: [2, 3, 4] },
  { id: "seq_2", label: "Đếm xuôi từ 4 đến 9", nums: [4, 5, 6, null, 8, 9], answer: 7, options: [6, 7, 8] },
  { id: "seq_3", label: "Đếm ngược từ 6 về 1", nums: [6, 5, null, 3, 2, 1], answer: 4, options: [3, 4, 5] },
  { id: "seq_4", label: "Đếm ngược từ 10 về 5", nums: [10, 9, 8, null, 6, 5], answer: 7, options: [9, 7, 6] },
  { id: "seq_5", label: "Số liền trước của 1", nums: [null, 1, 2, 3, 4, 5], answer: 0, options: [0, 2, 3] },
];

export default function MathNumbersPage() {
  const { rewardItem, addQuizCoins } = useReward();

  // Selected number 0-10
  const [selectedNum, setSelectedNum] = useState<number>(1);
  const currentInfo = MATH_NUMBERS_0_10.find((n) => n.num === selectedNum) ?? MATH_NUMBERS_0_10[1];

  // Counting game state
  const [countTarget, setCountTarget] = useState<number>(4);
  const [countEmoji, setCountEmoji] = useState<string>("🍎");
  const [countFeedback, setCountFeedback] = useState<"correct" | "wrong" | null>(null);

  // Missing number sequence state
  const [seqIdx, setSeqIdx] = useState<number>(0);
  const [seqFeedback, setSeqFeedback] = useState<"correct" | "wrong" | null>(null);

  // Print target mode: single number or full 0-10 pack
  const [printMode, setPrintMode] = useState<{ kind: "single"; num: number } | { kind: "all" }>({
    kind: "single",
    num: 1,
  });

  const handleSelectNum = (num: number) => {
    setSelectedNum(num);
    const item = MATH_NUMBERS_0_10.find((n) => n.num === num);
    if (item) {
      speakVietnamese(item.voicePrompt, 0.88);
      rewardItem(`math_num_${num}`, 1, `Học số ${num}`);
    }
  };

  const nextCountingQuestion = () => {
    const emojis = ["🍎", "🍓", "🐣", "⭐", "🎈", "🐟", "🦋", "🍊"];
    const nextN = Math.floor(Math.random() * 11); // 0..10
    const nextE = emojis[Math.floor(Math.random() * emojis.length)];
    setCountTarget(nextN);
    setCountEmoji(nextE);
    setCountFeedback(null);
    speakVietnamese(
      nextN === 0
        ? "Trong khung có mấy đồ vật nhỉ? Bé hãy chọn số thích hợp nhé!"
        : "Bé hãy đếm xem có bao nhiêu hình và chạm vào con số tương ứng nhé!",
      0.9
    );
  };

  const handleCountGuess = (guess: number) => {
    if (guess === countTarget) {
      setCountFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(`Đúng rồi! Có ${countTarget} hình, tương ứng với số ${countTarget}!`, 0.9);
    } else {
      setCountFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa đúng rồi, bé đếm kỹ lại từng hình nhé!", 0.9);
    }
  };

  const currentSeq = MISSING_SEQUENCES[seqIdx];

  const handleSeqGuess = (guess: number) => {
    if (guess === currentSeq.answer) {
      setSeqFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(`Giỏi quá! Số còn thiếu là số ${guess}!`, 0.9);
    } else {
      setSeqFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa đúng rồi, bé nhìn tia số bên trên để tìm nhé!", 0.9);
    }
  };

  const triggerPrintSingle = (num: number) => {
    setPrintMode({ kind: "single", num });
    setTimeout(() => window.print(), 80);
  };

  const triggerPrintAll = () => {
    setPrintMode({ kind: "all" });
    setTimeout(() => window.print(), 80);
  };

  return (
    <>
      {/* 1. ON-SCREEN INTERACTIVE INTERFACE */}
      <div className="min-h-screen bg-[#FFFDF9] pb-16 print:hidden">
        <div className="mx-auto max-w-6xl px-4 pt-6 space-y-10">
          {/* SECTION 1: BẢNG SỐ 0 - 10 & CÁCH VIẾT TRÊN Ô LY */}
          <section className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                  Học phần 1 • Số &amp; Lượng 0 – 10
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  🔢 Nhận Diện Số 0 – 10, Đếm Lượng &amp; Tập Viết Số Ô Ly
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Chạm vào từng số để nghe phát âm, quan sát số lượng trên <b>Khung 10 chấm tròn (Ten-frame)</b> và xem mẫu chữ số viết tay cao 4 li (2 ô).
                </p>
              </div>
              <button
                type="button"
                onClick={triggerPrintAll}
                className="px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0 self-start md:self-auto"
              >
                <Printer className="size-4" />
                <span>In Bộ Phiếu Tập Viết Số 0 – 10</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Cols: Number Grid 0-10 */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {MATH_NUMBERS_0_10.map((item) => {
                    const active = selectedNum === item.num;
                    return (
                      <button
                        key={item.num}
                        type="button"
                        onClick={() => handleSelectNum(item.num)}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-between text-center transition-all hover:scale-105 active:scale-95 ${
                          active
                            ? "bg-emerald-50 border-2 border-emerald-600 shadow-xs"
                            : "bg-slate-50/70 hover:bg-emerald-50/50 border-slate-200"
                        }`}
                      >
                        <span className={`font-tapviet text-[56px] leading-none pt-1 ${item.color}`}>
                          {item.num}
                        </span>
                        <span className="text-lg my-1">{item.emoji}</span>
                        <span className="text-xs font-extrabold text-slate-800">{item.word}</span>
                        <Volume2 className={`size-3.5 mt-1 ${active ? "text-emerald-600" : "text-slate-400"}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Ten-Frame & Object Counter for Selected Number */}
                <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/80 p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-950">
                      🎯 Khung 10 chấm tròn (Ten-frame) của {currentInfo.word} ({currentInfo.num}):
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {currentInfo.num === 0
                        ? "0 chấm tròn (Không có vật nào)"
                        : `${currentInfo.num} chấm tròn = ${currentInfo.num} ${currentInfo.itemName}`}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* 2x5 Ten-frame */}
                    <div className="grid grid-cols-5 gap-2 bg-white p-3 rounded-2xl border-2 border-emerald-600/40 shadow-2xs">
                      {Array.from({ length: 10 }, (_, idx) => {
                        const filled = idx < currentInfo.num;
                        return (
                          <div
                            key={idx}
                            className="size-9 sm:size-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center"
                          >
                            {filled && (
                              <span
                                className={`size-6 sm:size-7 rounded-full shadow-xs transition-transform scale-100 ${
                                  idx < 5 ? "bg-[#FF5722]" : "bg-sky-500"
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Real-world object group */}
                    <div className="flex-1 flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 min-h-[92px]">
                      {currentInfo.num === 0 ? (
                        <div className="text-center text-xs font-bold text-slate-500">
                          <span className="text-3xl block mb-1">🪹</span>
                          Chiếc tổ trống — Không có quả trứng nào (Số 0)
                        </div>
                      ) : (
                        Array.from({ length: currentInfo.num }, (_, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center bg-amber-50/70 border border-amber-200 rounded-xl px-2.5 py-1.5"
                          >
                            <span className="text-2xl">{currentInfo.emoji}</span>
                            <span className="text-[10px] font-black text-amber-900">{i + 1}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Handwriting Ô Ly Card & Print Single Number */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-col gap-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-[#D84315] text-[11px] font-extrabold border border-orange-200">
                      <Pencil className="size-3" /> Mẫu chữ số chuẩn vở ô ly
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-2">
                      <span className="font-heading text-3xl text-[#FF5722]">{currentInfo.num}</span>
                      <span className="text-sm text-slate-600 font-bold">({currentInfo.word})</span>
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakVietnamese(currentInfo.voicePrompt, 0.88)}
                    className="w-9 h-9 rounded-full bg-emerald-100 hover:bg-emerald-200 flex items-center justify-center text-emerald-700 transition-colors"
                    title="Nghe hướng dẫn"
                  >
                    <Volume2 className="size-4" />
                  </button>
                </div>

                {/* Cursive Ô Ly Card */}
                <CursiveLetterCard letters={[String(currentInfo.num)]} showHeights={false} />

                <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-3 text-xs space-y-1.5">
                  <p className="font-extrabold text-amber-950">✨ Mẹo nhớ hình dáng: {currentInfo.rhyme}</p>
                  <p className="text-slate-700 leading-relaxed">
                    <b>Cách viết trên ô ly (cao 4 li = 2 ô vuông):</b> {currentInfo.strokeGuide}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => speakVietnamese(`${currentInfo.word}. ${currentInfo.strokeGuide}`, 0.85)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-colors"
                  >
                    <Volume2 className="size-3.5" />
                    Nghe cách viết
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerPrintSingle(currentInfo.num)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white text-xs font-extrabold transition-colors shadow-xs"
                  >
                    <Printer className="size-3.5" />
                    In vở ô ly tập viết số {currentInfo.num}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: TRÒ CHƠI ĐẾM LƯỢNG & CHỌN SỐ TƯƠNG ỨNG */}
          <section className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                  🎮 Trò chơi thực hành 1
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Đếm Hình &amp; Chọn Chữ Số Tương Ứng (0 – 10)
                </h2>
              </div>
              <button
                type="button"
                onClick={nextCountingQuestion}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-extrabold transition-colors"
              >
                <RotateCcw className="size-3.5" />
                Đổi câu hỏi mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-dashed border-emerald-300 p-5 flex flex-col items-center justify-center min-h-[150px]">
                {countTarget === 0 ? (
                  <p className="text-sm font-bold text-slate-500 italic">
                    🪹 Khung trống trơn — Không có hình nào cả!
                  </p>
                ) : (
                  <div className="grid grid-cols-5 gap-3">
                    {Array.from({ length: countTarget }, (_, i) => (
                      <span
                        key={i}
                        className="text-3xl sm:text-4xl bg-white rounded-xl p-2 shadow-2xs border border-emerald-100 flex items-center justify-center"
                      >
                        {countEmoji}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-6 space-y-3">
                <p className="text-xs sm:text-sm font-bold text-slate-700">
                  Bé đếm được bao nhiêu hình bên trái? Hãy chạm vào số đúng:
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 11 }, (_, n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleCountGuess(n)}
                      className="py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50 font-heading text-xl font-black text-slate-800 transition-all active:scale-95"
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {countFeedback === "correct" && (
                  <div className="flex items-center justify-between rounded-xl bg-emerald-100 border border-emerald-300 px-3.5 py-2 text-xs font-extrabold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-700" />
                      Hoan hô! Có {countTarget} hình, bé chọn đúng số {countTarget} rồi!
                    </span>
                    <button
                      type="button"
                      onClick={nextCountingQuestion}
                      className="px-3 py-1 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
                    >
                      Câu tiếp theo ➔
                    </button>
                  </div>
                )}
                {countFeedback === "wrong" && (
                  <div className="rounded-xl bg-rose-50 border border-rose-200 px-3.5 py-2 text-xs font-bold text-rose-800">
                    Chưa đúng rồi! Bé chỉ tay đếm từng hình từ trái sang phải nhé! 💪
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 3: TIA SỐ 0 - 10 & ĐIỀN SỐ CÒN THIẾU */}
          <section className="bg-white border-2 border-sky-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700">
                  🐸 Trò chơi thực hành 2 • Tia số &amp; Thứ tự số
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Tia Số 0 – 10: Tìm Số Liền Trước, Liền Sau &amp; Số Còn Thiếu
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSeqIdx((i) => (i + 1) % MISSING_SEQUENCES.length);
                  setSeqFeedback(null);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-extrabold transition-colors"
              >
                Đổi dãy số khác <ArrowRight className="size-3.5" />
              </button>
            </div>

            {/* Reference Number Line 0-10 */}
            <div className="rounded-2xl bg-sky-50/70 border border-sky-200 p-3 overflow-x-auto">
              <div className="min-w-[500px] flex items-center justify-between px-4 py-2 relative">
                <div className="absolute left-6 right-6 top-1/2 h-1 bg-sky-400 -translate-y-1/2" />
                {Array.from({ length: 11 }, (_, n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => speakVietnamese(`Số ${n}`, 0.9)}
                    className="relative z-10 size-9 rounded-full bg-white border-2 border-sky-600 font-heading text-base font-black text-sky-900 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-colors shadow-2xs"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Missing Sequence */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-slate-500 block">{currentSeq.label}:</span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {currentSeq.nums.map((val, idx) =>
                    val === null ? (
                      <span
                        key={idx}
                        className="size-12 rounded-2xl border-2 border-dashed border-[#FF5722] bg-orange-50 font-heading text-xl font-black text-[#FF5722] flex items-center justify-center animate-pulse"
                      >
                        ?
                      </span>
                    ) : (
                      <span
                        key={idx}
                        className="size-12 rounded-2xl border border-slate-300 bg-white font-heading text-xl font-black text-slate-800 flex items-center justify-center"
                      >
                        {val}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-2">
                <span className="text-xs font-bold text-slate-600">Chọn số điền vào ô dấu hỏi (?):</span>
                <div className="flex items-center gap-2.5">
                  {currentSeq.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleSeqGuess(opt)}
                      className="size-12 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-heading text-xl font-black shadow-xs transition-transform active:scale-95"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {seqFeedback === "correct" && (
                  <span className="text-xs font-extrabold text-emerald-700">
                    🎉 Chính xác! Số cần điền là {currentSeq.answer}!
                  </span>
                )}
                {seqFeedback === "wrong" && (
                  <span className="text-xs font-bold text-rose-600">
                    Chưa đúng, bé nhìn thứ tự trên tia số nhé!
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 4: LÀM QUEN SỐ 11 ĐẾN 20 (1 CHỤC VÀ ĐƠN VỊ) */}
          <section className="bg-white border border-amber-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold border border-amber-200">
                <Sparkles className="size-3.5" /> Mở rộng phạm vi 20 (Chuẩn bị học kỳ 2 lớp 1)
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                🔟 Làm Quen Các Số Từ 11 Đến 20 (Gồm 1 Chục và Đơn Vị)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Giúp bé hiểu số có 2 chữ số: <b>1 chục (10)</b> đi cùng với các số đơn vị lẻ từ 1 đến 9. Chạm vào từng thẻ để nghe đọc!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {MATH_NUMBERS_11_20.map((item) => (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => {
                    speakVietnamese(
                      `Số ${item.word}. Gồm ${item.tens === 20 ? "hai chục" : `một chục là 10 và ${item.ones} đơn vị`}.`,
                      0.88
                    );
                    rewardItem(`math_num_${item.num}`, 1, `Học số ${item.num}`);
                  }}
                  className="p-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-100/60 flex flex-col items-center text-center gap-1.5 transition-all group"
                >
                  <span className="font-heading text-3xl font-black text-[#D84315]">{item.num}</span>
                  <span className="text-xs font-extrabold text-slate-800">{item.word}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-amber-200 text-amber-900">
                    10 + {item.num - 10} = {item.num}
                  </span>
                  <div className="text-xs tracking-tighter pt-0.5">
                    <span>🔟</span>
                    {item.ones > 0 && (
                      <span className="ml-1">
                        {Array.from({ length: Math.min(item.ones, 5) })
                          .map(() => item.emoji)
                          .join("")}
                        {item.ones > 5 ? `+${item.ones - 5}` : ""}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 2. DEDICATED PRINTABLE A4 AREA */}
      <div className="hidden print:block w-full bg-white text-black">
        {printMode.kind === "single" ? (
          <SingleNumberPracticeSheet num={printMode.num} liMm={2.5} />
        ) : (
          <NumberPracticeSheet range="0-9" liMm={2.5} />
        )}
      </div>
    </>
  );
}
