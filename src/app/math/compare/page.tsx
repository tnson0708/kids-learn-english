"use client";

import { useState } from "react";
import { Volume2, Printer, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";
import { speakVietnamese } from "@/lib/speech";
import { playCorrectSound, playWrongSound } from "@/lib/sound-effects";
import { useReward } from "@/lib/reward-context";
import { COMPARE_QUESTIONS, NUMBER_BOND_ITEMS } from "@/data/math/curriculum";
import { CompareAndBondsPracticeSheet } from "@/components/math/math-topic-sheets";

const ORDER_PUZZLES = [
  { id: "ord_1", mode: "asc" as const, label: "Từ bé đến lớn", nums: [7, 2, 5, 1, 9] },
  { id: "ord_2", mode: "desc" as const, label: "Từ lớn đến bé", nums: [3, 8, 1, 6, 10] },
  { id: "ord_3", mode: "asc" as const, label: "Từ bé đến lớn", nums: [6, 4, 8, 2, 0] },
  { id: "ord_4", mode: "desc" as const, label: "Từ lớn đến bé", nums: [5, 9, 2, 7, 4] },
];

export default function MathCompareAndBondsPage() {
  const { addQuizCoins, rewardItem } = useReward();

  // 1. Compare state
  const [cmpIdx, setCmpIdx] = useState(0);
  const [cmpFeedback, setCmpFeedback] = useState<"correct" | "wrong" | null>(null);
  const currentCmp = COMPARE_QUESTIONS[cmpIdx];

  // 2. Number Bond Explorer state (Target number 5..10 and split)
  const [bondTarget, setBondTarget] = useState<number>(5);
  const [bondSplit, setBondSplit] = useState<number>(2);

  // 3. Number Bond Quiz state
  const [nbIdx, setNbIdx] = useState(0);
  const [nbFeedback, setNbFeedback] = useState<"correct" | "wrong" | null>(null);
  const currentNb = NUMBER_BOND_ITEMS[nbIdx];

  // 4. Number Ordering state
  const [ordIdx, setOrdIdx] = useState(0);
  const [pickedNums, setPickedNums] = useState<number[]>([]);
  const [ordWrong, setOrdWrong] = useState(false);
  const currentOrd = ORDER_PUZZLES[ordIdx];
  const expectedOrder = [...currentOrd.nums].sort((a, b) => (currentOrd.mode === "asc" ? a - b : b - a));

  const handleComparePick = (sign: ">" | "<" | "=") => {
    if (sign === currentCmp.answer) {
      setCmpFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(`Đúng rồi! ${currentCmp.explanation}`, 0.9);
    } else {
      setCmpFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa đúng rồi! Nhớ nhé: Miệng cá sấu luôn há to về phía số nhiều hơn!", 0.9);
    }
  };

  const handleNbPick = (val: number) => {
    const expected = currentNb.missing === "whole" ? currentNb.whole : currentNb.partB;
    if (val === expected) {
      setNbFeedback("correct");
      playCorrectSound();
      addQuizCoins(1);
      speakVietnamese(
        `Giỏi lắm! ${currentNb.whole} gồm ${currentNb.partA} và ${currentNb.partB}. Gộp ${currentNb.partA} và ${currentNb.partB} được ${currentNb.whole}!`,
        0.9
      );
    } else {
      setNbFeedback("wrong");
      playWrongSound();
      speakVietnamese("Chưa chính xác, bé đếm lại số hình ở hai giỏ nhé!", 0.9);
    }
  };

  const handlePickOrderNum = (n: number) => {
    if (pickedNums.includes(n)) return;
    const nextExpected = expectedOrder[pickedNums.length];
    if (n === nextExpected) {
      const next = [...pickedNums, n];
      setPickedNums(next);
      setOrdWrong(false);
      playCorrectSound();
      if (next.length === expectedOrder.length) {
        addQuizCoins(1);
        speakVietnamese(`Tuyệt vời! Bé đã sắp xếp đúng thứ tự ${currentOrd.label}: ${next.join(", ")}!`, 0.9);
      }
    } else {
      setOrdWrong(true);
      playWrongSound();
      speakVietnamese(
        currentOrd.mode === "asc"
          ? "Bé hãy chọn số nhỏ nhất trong các số còn lại nhé!"
          : "Bé hãy chọn số lớn nhất trong các số còn lại nhé!",
        0.9
      );
    }
  };

  return (
    <>
      {/* 1. ON-SCREEN INTERACTIVE INTERFACE */}
      <div className="min-h-screen bg-[#FFFDF9] pb-16 print:hidden">
        <div className="mx-auto max-w-6xl px-4 pt-6 space-y-10">
          {/* Header + Print Button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold border border-amber-200">
                Học phần 2 • So Sánh &amp; Cấu Tạo Số (Tách – Gộp)
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                ⚖️ So Sánh (&gt;, &lt;, =), Sắp Xếp &amp; Sơ Đồ Tách – Gộp Số
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Hiểu rõ <b>Nhiều hơn – Ít hơn – Bằng nhau</b> và nắm vững <b>Tách – Gộp số trong phạm vi 10</b> trước khi học Cộng/Trừ.
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0 self-start md:self-auto"
            >
              <Printer className="size-4" />
              <span>In Phiếu So Sánh &amp; Tách Gộp A4</span>
            </button>
          </div>

          {/* SECTION 1: CÁ SẤU HÁ MIỆNG SO SÁNH (>, <, =) */}
          <section className="bg-white border-2 border-amber-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  sign: ">",
                  name: "Dấu Lớn Hơn (>)",
                  desc: "Bên trái nhiều hơn bên phải → Cá sấu há miệng sang bên trái!",
                  example: "5 > 3 (Năm lớn hơn ba)",
                  col: "bg-orange-50 border-orange-200 text-orange-950",
                },
                {
                  sign: "<",
                  name: "Dấu Bé Hơn (<)",
                  desc: "Bên trái ít hơn bên phải → Cá sấu há miệng sang bên phải!",
                  example: "2 < 6 (Hai bé hơn sáu)",
                  col: "bg-sky-50 border-sky-200 text-sky-950",
                },
                {
                  sign: "=",
                  name: "Dấu Bằng (=)",
                  desc: "Hai bên có số lượng bằng nhau!",
                  example: "4 = 4 (Bốn bằng bốn)",
                  col: "bg-emerald-50 border-emerald-200 text-emerald-950",
                },
              ].map((card) => (
                <button
                  key={card.sign}
                  type="button"
                  onClick={() => speakVietnamese(`${card.name}. ${card.desc} Ví dụ: ${card.example}`, 0.88)}
                  className={`p-3.5 rounded-2xl border text-left transition-transform hover:scale-[1.01] ${card.col}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-black">{card.sign}</span>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-white/80">
                      🐊 {card.name}
                    </span>
                  </div>
                  <p className="text-xs font-semibold mt-1.5 opacity-90">{card.desc}</p>
                  <p className="text-xs font-black mt-1">{card.example}</p>
                </button>
              ))}
            </div>

            {/* Interactive Compare Game */}
            <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-extrabold text-amber-950">
                  🐊 Thực hành: Đếm hai bên và chọn dấu &gt;, &lt; hoặc = đúng ({cmpIdx + 1}/{COMPARE_QUESTIONS.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCmpIdx((i) => (i + 1) % COMPARE_QUESTIONS.length);
                    setCmpFeedback(null);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-amber-300 text-xs font-bold text-amber-900 hover:bg-amber-100"
                >
                  Đổi câu khác <ArrowRight className="size-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                {/* Left Group */}
                <div className="md:col-span-4 rounded-2xl bg-white border-2 border-slate-200 p-4 flex flex-col items-center justify-center min-h-[140px] gap-2">
                  <div className="flex flex-wrap justify-center gap-1.5 text-3xl">
                    {Array.from({ length: currentCmp.leftCount }).map((_, i) => (
                      <span key={i}>{currentCmp.leftEmoji}</span>
                    ))}
                  </div>
                  <span className="font-heading text-3xl font-black text-slate-900">
                    {currentCmp.leftCount} <span className="text-sm font-bold text-slate-500">{currentCmp.leftLabel}</span>
                  </span>
                </div>

                {/* Middle Sign Picker */}
                <div className="md:col-span-3 flex flex-col items-center justify-center gap-2">
                  <div className="size-16 rounded-2xl border-2 border-dashed border-[#FF5722] bg-white flex items-center justify-center font-heading text-4xl font-black text-[#FF5722]">
                    {cmpFeedback === "correct" ? currentCmp.answer : "?"}
                  </div>
                  <div className="flex items-center gap-2">
                    {(["<", "=", ">"] as const).map((sign) => (
                      <button
                        key={sign}
                        type="button"
                        onClick={() => handleComparePick(sign)}
                        className="size-12 rounded-2xl bg-[#FF5722] hover:bg-orange-600 text-white font-heading text-2xl font-black shadow-xs transition-transform active:scale-95"
                      >
                        {sign}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Group */}
                <div className="md:col-span-4 rounded-2xl bg-white border-2 border-slate-200 p-4 flex flex-col items-center justify-center min-h-[140px] gap-2">
                  <div className="flex flex-wrap justify-center gap-1.5 text-3xl">
                    {Array.from({ length: currentCmp.rightCount }).map((_, i) => (
                      <span key={i}>{currentCmp.rightEmoji}</span>
                    ))}
                  </div>
                  <span className="font-heading text-3xl font-black text-slate-900">
                    {currentCmp.rightCount} <span className="text-sm font-bold text-slate-500">{currentCmp.rightLabel}</span>
                  </span>
                </div>
              </div>

              {cmpFeedback === "correct" && (
                <div className="flex items-center justify-between rounded-xl bg-emerald-100 border border-emerald-300 px-4 py-2.5 text-xs font-extrabold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-emerald-700" />
                    {currentCmp.explanation}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCmpIdx((i) => (i + 1) % COMPARE_QUESTIONS.length);
                      setCmpFeedback(null);
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 shrink-0"
                  >
                    Tiếp theo ➔
                  </button>
                </div>
              )}
              {cmpFeedback === "wrong" && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-xs font-bold text-rose-800">
                  Chưa đúng rồi! Bé xem bên nào nhiều hơn thì miệng cá sấu sẽ há to về phía bên đó nhé!
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: SƠ ĐỒ TÁCH – GỘP SỐ (NUMBER BONDS) */}
          <section className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                🧩 Trọng tâm Toán lớp 1 • Cấu tạo số (Number Bonds)
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                Tách – Gộp Số Trong Phạm Vi 10
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Khi bé hiểu <b>&ldquo;5 gồm 2 và 3, gộp 2 và 3 được 5&rdquo;</b>, bé sẽ tự động suy ra được <b>2 + 3 = 5</b> và <b>5 - 2 = 3</b>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Interactive Explorer Left (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-950">Chọn số cần tách (5 – 10):</span>
                  <div className="flex gap-1">
                    {[5, 6, 7, 8, 9, 10].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => {
                          setBondTarget(n);
                          setBondSplit(Math.floor(n / 2));
                        }}
                        className={`size-8 rounded-lg font-heading text-sm font-black transition-colors ${
                          bondTarget === n
                            ? "bg-emerald-700 text-white"
                            : "bg-white border border-emerald-200 text-emerald-900"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ways to split buttons */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-700 block">
                    Các cách tách số {bondTarget} thành 2 phần:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from({ length: bondTarget - 1 }, (_, i) => {
                      const part1 = i + 1;
                      const part2 = bondTarget - part1;
                      const active = bondSplit === part1;
                      return (
                        <button
                          key={part1}
                          type="button"
                          onClick={() => {
                            setBondSplit(part1);
                            speakVietnamese(`${bondTarget} gồm ${part1} và ${part2}. Gộp ${part1} và ${part2} được ${bondTarget}.`, 0.9);
                            rewardItem(`bond_${bondTarget}_${part1}`, 1, `Tách số ${bondTarget}`);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                            active
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                              : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
                          }`}
                        >
                          {part1} và {part2}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Visual Two-Color Baskets */}
                <div className="rounded-2xl bg-white border border-emerald-200 p-3.5 text-center space-y-2">
                  <p className="font-heading text-base font-black text-slate-900">
                    <span className="text-amber-600">{bondTarget}</span> gồm{" "}
                    <span className="text-sky-600">{bondSplit}</span> và{" "}
                    <span className="text-emerald-600">{bondTarget - bondSplit}</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl bg-sky-50 border border-sky-200 p-2">
                      <span className="text-xs font-extrabold text-sky-800 block mb-1">Giỏ 1: {bondSplit}</span>
                      <div className="flex flex-wrap justify-center gap-1 text-xl">
                        {Array.from({ length: bondSplit }).map((_, i) => (
                          <span key={i}>🍎</span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2">
                      <span className="text-xs font-extrabold text-emerald-800 block mb-1">
                        Giỏ 2: {bondTarget - bondSplit}
                      </span>
                      <div className="flex flex-wrap justify-center gap-1 text-xl">
                        {Array.from({ length: bondTarget - bondSplit }).map((_, i) => (
                          <span key={i}>🍏</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Number Bond Quiz Right (7 cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                    🎯 Thử thách điền Sơ đồ Tách – Gộp ({nbIdx + 1}/{NUMBER_BOND_ITEMS.length})
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakVietnamese(currentNb.prompt, 0.9)}
                      className="p-2 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200"
                      title="Nghe câu hỏi"
                    >
                      <Volume2 className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNbIdx((i) => (i + 1) % NUMBER_BOND_ITEMS.length);
                        setNbFeedback(null);
                      }}
                      className="px-3 py-1 rounded-full bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      Câu khác ➔
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-700 bg-white rounded-xl p-3 border border-slate-200">
                  💬 {currentNb.prompt}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* SVG Number Bond Diagram */}
                  <div className="sm:col-span-6 flex justify-center bg-white rounded-2xl border border-slate-200 p-3">
                    <svg viewBox="0 0 200 135" className="h-36 w-auto">
                      <line x1="100" y1="42" x2="52" y2="92" stroke="#64748b" strokeWidth="3" />
                      <line x1="100" y1="42" x2="148" y2="92" stroke="#64748b" strokeWidth="3" />

                      {/* Whole circle */}
                      <circle
                        cx="100"
                        cy="30"
                        r="25"
                        fill={currentNb.missing === "whole" ? "#fff7ed" : "#fef3c7"}
                        stroke="#ea580c"
                        strokeWidth="3"
                        strokeDasharray={currentNb.missing === "whole" ? "5,4" : undefined}
                      />
                      <text x="100" y="38" textAnchor="middle" fontSize="24" fontWeight="900" fill="#c2410c">
                        {currentNb.missing === "whole" && nbFeedback !== "correct" ? "?" : currentNb.whole}
                      </text>

                      {/* Part A circle */}
                      <circle cx="52" cy="102" r="25" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
                      <text x="52" y="110" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0369a1">
                        {currentNb.partA}
                      </text>

                      {/* Part B circle */}
                      <circle
                        cx="148"
                        cy="102"
                        r="25"
                        fill={currentNb.missing === "partB" ? "#f0fdf4" : "#dcfce7"}
                        stroke="#16a34a"
                        strokeWidth="3"
                        strokeDasharray={currentNb.missing === "partB" ? "5,4" : undefined}
                      />
                      <text x="148" y="110" textAnchor="middle" fontSize="24" fontWeight="900" fill="#15803d">
                        {currentNb.missing === "partB" && nbFeedback !== "correct" ? "?" : currentNb.partB}
                      </text>
                    </svg>
                  </div>

                  {/* Visual items & Answer choices */}
                  <div className="sm:col-span-6 space-y-3">
                    <div className="rounded-xl bg-white border border-slate-200 p-2.5 text-center">
                      <div className="text-xl flex flex-wrap justify-center gap-1">
                        {Array.from({ length: currentNb.partA }).map((_, i) => (
                          <span key={`a-${i}`} className="p-0.5 rounded bg-sky-50">
                            {currentNb.emoji}
                          </span>
                        ))}
                        <span className="px-1 font-black text-slate-400">|</span>
                        {Array.from({ length: currentNb.partB }).map((_, i) => (
                          <span key={`b-${i}`} className="p-0.5 rounded bg-emerald-50">
                            {currentNb.emoji}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs font-bold text-slate-600">Chọn số điền vào vòng tròn (?):</p>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => handleNbPick(n)}
                          className="py-2 rounded-xl bg-white border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 font-heading text-lg font-black text-slate-800 transition-all active:scale-95"
                        >
                          {n}
                        </button>
                      ))}
                    </div>

                    {nbFeedback === "correct" && (
                      <div className="flex items-center justify-between rounded-xl bg-emerald-100 border border-emerald-300 px-3 py-2 text-xs font-extrabold text-emerald-900">
                        <span>
                          🎉 Đúng rồi! {currentNb.whole} gồm {currentNb.partA} và {currentNb.partB}!
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setNbIdx((i) => (i + 1) % NUMBER_BOND_ITEMS.length);
                            setNbFeedback(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white"
                        >
                          Tiếp ➔
                        </button>
                      </div>
                    )}
                    {nbFeedback === "wrong" && (
                      <p className="text-xs font-bold text-rose-600">
                        Chưa đúng rồi, bé đếm kỹ số hình ở từng bên nhé!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: SẮP XẾP THỨ TỰ SỐ (TỪ BÉ ĐẾN LỚN / TỪ LỚN ĐẾN BÉ) */}
          <section className="bg-white border-2 border-sky-200 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700">
                  📊 Trò chơi thực hành 3 • Sắp xếp thứ tự
                </span>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Sắp Xếp Dãy Số ({currentOrd.label})
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPickedNums([]);
                    setOrdWrong(false);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  <RotateCcw className="size-3.5" /> Làm lại
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOrdIdx((i) => (i + 1) % ORDER_PUZZLES.length);
                    setPickedNums([]);
                    setOrdWrong(false);
                  }}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-extrabold"
                >
                  Đổi bài khác <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Bé hãy chạm lần lượt vào các số bên dưới để xếp theo thứ tự{" "}
              <b className="text-sky-700 uppercase">{currentOrd.label}</b>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Source unordered numbers */}
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <span className="text-xs font-bold text-slate-500 block">Các số cần xếp (Chạm theo thứ tự):</span>
                <div className="flex flex-wrap gap-2.5">
                  {currentOrd.nums.map((n) => {
                    const used = pickedNums.includes(n);
                    return (
                      <button
                        key={n}
                        type="button"
                        disabled={used}
                        onClick={() => handlePickOrderNum(n)}
                        className={`size-13 rounded-2xl font-heading text-2xl font-black transition-all ${
                          used
                            ? "bg-slate-200 text-slate-400 opacity-40 cursor-not-allowed"
                            : "bg-white border-2 border-sky-500 text-sky-900 hover:bg-sky-50 shadow-xs active:scale-95"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target ordered slots */}
              <div className="rounded-2xl bg-sky-50/60 border border-sky-200 p-4 space-y-2">
                <span className="text-xs font-bold text-sky-900 block">
                  Kết quả xếp ({currentOrd.label}):
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {currentOrd.nums.map((_, i) => {
                    const val = pickedNums[i];
                    return (
                      <div
                        key={i}
                        className={`size-13 rounded-2xl flex items-center justify-center font-heading text-2xl font-black ${
                          val !== undefined
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-white border-2 border-dashed border-sky-300 text-sky-300"
                        }`}
                      >
                        {val !== undefined ? val : i + 1}
                      </div>
                    );
                  })}
                </div>
                {ordWrong && (
                  <p className="text-xs font-bold text-rose-600 pt-1">
                    Chưa đúng thứ tự {currentOrd.label} rồi, bé chọn số khác nhé!
                  </p>
                )}
                {pickedNums.length === currentOrd.nums.length && (
                  <p className="text-xs font-extrabold text-emerald-700 pt-1">
                    🎉 Hoan hô! Bé đã sắp xếp hoàn chỉnh!
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 2. DEDICATED PRINTABLE A4 AREA */}
      <div className="hidden print:block w-full bg-white text-black">
        <CompareAndBondsPracticeSheet />
      </div>
    </>
  );
}
