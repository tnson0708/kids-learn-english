"use client";

import { useState } from "react";
import { Printer, Hash, Scale, Calculator, Shapes, Layers } from "lucide-react";
import { SingleNumberPracticeSheet } from "@/components/math/single-number-practice-sheet";
import { NumberPracticeSheet, type NumberRange } from "@/components/vietnamese/number-practice-sheet";
import {
  CompareAndBondsPracticeSheet,
  ArithmeticPracticeSheet,
  ShapesAndLogicPracticeSheet,
} from "@/components/math/math-topic-sheets";
import { cn } from "@/lib/utils";

type MathSheetTab = "single_num" | "all_nums" | "compare_bonds" | "arithmetic" | "shapes_logic";

export default function MathPrintCenterPage() {
  const [tab, setTab] = useState<MathSheetTab>("single_num");
  const [selectedNum, setSelectedNum] = useState<number | "all">(1);
  const [numRange, setNumRange] = useState<NumberRange>("0-9");
  const [liMm, setLiMm] = useState<2.5 | 4>(2.5);
  const [arithRange, setArithRange] = useState<5 | 10>(10);

  const tabs: { id: MathSheetTab; label: string; desc: string; icon: typeof Hash }[] = [
    {
      id: "single_num",
      label: "1. Vở ô ly luyện viết từng số (0–10)",
      desc: "1 trang A4/số: khung 10 chấm, mẫu đỏ, nét chấm mờ & dòng tự viết",
      icon: Hash,
    },
    {
      id: "all_nums",
      label: "2. Phiếu tổng hợp số & đếm chấm",
      desc: "Tô dãy số 0–9 hoặc 1–10 kèm bài tập đếm chấm & điền số còn thiếu",
      icon: Layers,
    },
    {
      id: "compare_bonds",
      label: "3. Phiếu So sánh (>, <, =) & Tách gộp",
      desc: "Đếm hình điền dấu >, <, =, sơ đồ Tách – Gộp số & sắp xếp dãy số",
      icon: Scale,
    },
    {
      id: "arithmetic",
      label: "4. Phiếu Cộng & Trừ trực quan",
      desc: "Cộng trừ bằng hình ảnh, tia số chú ếch 0–10 và phép tính ô ly",
      icon: Calculator,
    },
    {
      id: "shapes_logic",
      label: "5. Phiếu Hình học, Quy luật & Đồng hồ",
      desc: "Đếm hình phẳng, khoanh quy luật tiếp theo & đọc giờ đúng",
      icon: Shapes,
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 md:flex-row print:block print:max-w-none print:px-0 print:py-0">
      {/* Sidebar Controls (Hidden when printing) */}
      <div className="flex w-full shrink-0 flex-col gap-5 rounded-3xl border border-border bg-card p-5 print:hidden md:w-80">
        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-800">
            In A4 Chuẩn Tiểu Học
          </span>
          <h1 className="font-heading text-xl font-black text-foreground mt-1">
            Trung Tâm In Phiếu Toán
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Chọn mẫu phiếu bài tập bên dưới, xem trước và bấm <b>In / Lưu PDF</b> trên giấy A4 cho bé luyện tay cầm bút chì 2B.
          </p>
        </div>

        {/* Sheet Type Selector */}
        <div className="flex flex-col gap-1.5">
          {tabs.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "rounded-2xl border-l-4 p-3 text-left transition-all",
                  active
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-2xs"
                    : "border-transparent bg-muted/40 text-muted-foreground hover:bg-muted/80"
                )}
              >
                <div className="flex items-center gap-2 text-xs font-extrabold">
                  <Icon className="size-4 shrink-0 text-emerald-700" />
                  <span>{item.label}</span>
                </div>
                <p className="mt-0.5 text-[11px] opacity-80 pl-6">{item.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Custom Options per Tab */}
        {tab === "single_num" && (
          <div className="space-y-3 rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-xs">
            <div>
              <label className="font-extrabold text-slate-800 block mb-1.5">
                Chọn chữ số cần in:
              </label>
              <div className="grid grid-cols-6 gap-1.5">
                {Array.from({ length: 11 }, (_, n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSelectedNum(n)}
                    className={cn(
                      "py-1.5 rounded-lg font-heading text-sm font-black border transition-colors",
                      selectedNum === n
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-800 border-slate-300 hover:border-emerald-400"
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setSelectedNum("all")}
                className={cn(
                  "mt-2 w-full py-1.5 rounded-lg font-bold border text-xs transition-colors",
                  selectedNum === "all"
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                )}
              >
                In trọn bộ 11 trang (Số 0 đến Số 10)
              </button>
            </div>

            <div>
              <label className="font-extrabold text-slate-800 block mb-1">
                Kích thước ô ly trên giấy:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { val: 2.5 as const, label: "2,5 mm (Chuẩn lớp 1)" },
                  { val: 4 as const, label: "4 mm (Ô to mầm non)" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => setLiMm(opt.val)}
                    className={cn(
                      "py-1.5 px-2 rounded-lg font-bold border text-[11px]",
                      liMm === opt.val
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-slate-700 border-slate-300"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "all_nums" && (
          <div className="space-y-3 rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-xs">
            <div>
              <label className="font-extrabold text-slate-800 block mb-1.5">Dãy số cần luyện:</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["0-9", "1-10"] as NumberRange[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setNumRange(r)}
                    className={cn(
                      "py-1.5 rounded-lg font-bold border",
                      numRange === r
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-slate-700 border-slate-300"
                    )}
                  >
                    Dãy số {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "arithmetic" && (
          <div className="space-y-3 rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-xs">
            <div>
              <label className="font-extrabold text-slate-800 block mb-1.5">Phạm vi phép tính:</label>
              <div className="grid grid-cols-2 gap-1.5">
                {([5, 10] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setArithRange(r)}
                    className={cn(
                      "py-1.5 rounded-lg font-bold border",
                      arithRange === r
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-slate-700 border-slate-300"
                    )}
                  >
                    Phạm vi {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => window.print()}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-3.5 text-sm font-extrabold text-white shadow-md transition-all active:scale-95"
        >
          <Printer className="size-4" />
          In Phiếu Bài Tập / Lưu PDF
        </button>
      </div>

      {/* Worksheet Preview & Printable A4 Paper Area */}
      <div className="flex flex-1 justify-center overflow-x-auto print:overflow-visible">
        <div className="w-full max-w-[794px] rounded-2xl bg-white p-6 shadow-md print:rounded-none print:p-0 print:shadow-none sm:p-8">
          {tab === "single_num" &&
            (selectedNum === "all" ? (
              <div className="space-y-8 print:space-y-0">
                {Array.from({ length: 11 }, (_, n) => (
                  <div key={n} className={n > 0 ? "page-break pt-4 print:pt-0" : ""}>
                    <SingleNumberPracticeSheet num={n} liMm={liMm} indexNumber={n + 1} />
                  </div>
                ))}
              </div>
            ) : (
              <SingleNumberPracticeSheet num={selectedNum} liMm={liMm} indexNumber={selectedNum + 1} />
            ))}

          {tab === "all_nums" && <NumberPracticeSheet range={numRange} liMm={liMm} />}

          {tab === "compare_bonds" && <CompareAndBondsPracticeSheet />}

          {tab === "arithmetic" && <ArithmeticPracticeSheet range={arithRange} />}

          {tab === "shapes_logic" && <ShapesAndLogicPracticeSheet />}
        </div>
      </div>
    </div>
  );
}
