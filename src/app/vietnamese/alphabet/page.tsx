"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Volume2,
  Printer,
  FileDown,
  Eye,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  HelpCircle,
  X,
  PlayCircle,
  Scissors,
  ArrowDownCircle,
  Lightbulb,
  Clock,
  Pencil,
  Check,
} from "lucide-react";
import { speakVietnamese } from "@/lib/speech";
import { letterForms, type VietnameseCaseMode } from "@/data/vietnamese/alphabet";
import type { LetterCase } from "@/data/vietnamese/letter-strokes";
import { LetterStrokeGuide } from "@/components/vietnamese/letter-stroke-guide";
import { type OlyLiMm } from "@/components/vietnamese/letter-trace-sheet";
import {
  SingleLetterPracticeSheet,
  type SheetCase,
} from "@/components/vietnamese/single-letter-practice-sheet";
import { CursiveLetterCard } from "@/components/vietnamese/cursive-oly";
import { ToneMarkPracticeSheet } from "@/components/vietnamese/tone-mark-practice-sheet";
import { TONE_BASE_SYLLABLES } from "@/data/vietnamese/tones";
import { NumberPracticeSheet, type NumberRange } from "@/components/vietnamese/number-practice-sheet";
import { StrokePracticeSheet, strokeSheetPageCount } from "@/components/vietnamese/stroke-practice-sheet";

// --- DATA STRUCTURES ---

const STROKE_GROUPS = [
  {
    id: 0,
    name: "1. Nét Thẳng",
    badge: "Nhóm 1 • Nét Thẳng Đứng & Ngang",
    voiceText: "Nét thẳng. Đặt bút từ trên kéo thẳng đứng xuống dưới theo chiều mũi tên.",
    guide: "Đặt bút từ đường kẻ 3, rê thẳng đứng xuống đường kẻ 1, không run tay.",
    path: "M 100 40 L 100 160",
    ghostPath: "M 100 40 L 100 160",
    start: { x: 100, y: 40 },
    arrowPoints: "100,115 92,95 108,95",
    arrowTransform: "",
    arrowLabelPos: { x: 100, y: 130 },
    arrowLabel: "Rê thẳng từ trên xuống",
    textPos: { x: 100, y: 26, label: "1. Đặt bút từ trên" },
    iconSymbol: "|",
    strokeChar: "|",
    iconBg: "bg-sky-100 text-sky-700",
    desc: "Thẳng đứng (từ trên xuống), nét ngang",
  },
  {
    id: 1,
    name: "2. Nét Xiên & Giằng",
    badge: "Nhóm 2 • Nét Xiên Phải & Xiên Trái",
    voiceText: "Nét xiên. Đặt bút nghiêng từ trên xuống theo hướng xiên phải.",
    guide: "Đặt bút từ góc trên, lia nghiêng một góc 45 độ xuống chân đường kẻ 1.",
    path: "M 60 40 L 140 160",
    ghostPath: "M 60 40 L 140 160",
    start: { x: 60, y: 40 },
    arrowPoints: "100,100 92,90 108,90",
    arrowTransform: "rotate(146 100 100)",
    arrowLabelPos: { x: 100, y: 122 },
    arrowLabel: "Rê xiên 45 độ sang phải",
    textPos: { x: 60, y: 26, label: "1. Đặt bút góc trên" },
    iconSymbol: "\\",
    strokeChar: "\\",
    iconBg: "bg-orange-100 text-orange-700",
    desc: "Xiên phải, xiên trái, nét giằng ngang",
  },
  {
    id: 2,
    name: "3. Nét Cong (Cong Kín)",
    badge: "Nhóm 3 • Nét Cong Kín (O)",
    voiceText: "Nét cong kín. Đặt bút dưới đường kẻ ba, lia sang trái viết nét cong tròn khép kín như quả trứng gà.",
    guide: "Đặt bút dưới đường kẻ 3, lia sang trái viết nét cong tròn khép kín.",
    path: "M 100 40 C 60 40 50 70 50 100 C 50 130 60 160 100 160 C 140 160 150 130 150 100 C 150 70 140 40 100 40",
    ghostPath: "M 100 40 C 60 40 50 70 50 100 C 50 130 60 160 100 160 C 140 160 150 130 150 100 C 150 70 140 40 100 40",
    start: { x: 100, y: 40 },
    arrowPoints: "50,115 42,95 58,95",
    arrowTransform: "",
    arrowLabelPos: { x: 40, y: 130 },
    arrowLabel: "Rê ngược chiều kim đồng hồ",
    textPos: { x: 100, y: 26, label: "1. Đặt bút tại đây" },
    iconSymbol: "O",
    strokeChar: "o",
    iconBg: "bg-[#FF5722] text-white",
    desc: "Cong hở phải, hở trái, cong kín (O)",
  },
  {
    id: 3,
    name: "4. Nét Móc",
    badge: "Nhóm 4 • Nét Móc Ngược (như chữ i, u)",
    voiceText: "Nét móc ngược. Kéo thẳng đứng rồi lượn cong hất nhẹ lên phía trên.",
    guide: "Kéo thẳng từ trên xuống, chạm dòng kẻ dưới thì lượn cong hất nhẹ sang phải.",
    path: "M 80 50 L 80 140 C 80 160 110 160 125 140",
    ghostPath: "M 80 50 L 80 140 C 80 160 110 160 125 140",
    start: { x: 80, y: 50 },
    arrowPoints: "100,100 92,90 108,90",
    arrowTransform: "rotate(-45 125 140)",
    arrowLabelPos: { x: 100, y: 172 },
    arrowLabel: "Hất nhẹ sang phải",
    textPos: { x: 80, y: 34, label: "1. Kéo thẳng xuống" },
    iconSymbol: "ʃ",
    strokeChar: "ʃ",
    iconBg: "bg-emerald-100 text-emerald-800",
    desc: "Móc xuôi, móc ngược, móc 2 đầu",
  },
  {
    id: 4,
    name: "5. Nét Khuyết",
    badge: "Nhóm 5 • Nét Khuyết Trên (như b, h, k)",
    voiceText: "Nét khuyết trên. Đặt bút giữa ô ly, đưa xiên lên rồi uốn cong kéo thẳng xuống.",
    guide: "Lia nét xiên lên trên, uốn tròn đầu khuyết rồi kéo thẳng đứng xuống chân ly.",
    path: "M 70 140 L 130 60 C 140 40 110 40 100 65 L 100 160",
    ghostPath: "M 70 140 L 130 60 C 140 40 110 40 100 65 L 100 160",
    start: { x: 70, y: 140 },
    arrowPoints: "100,100 92,90 108,90",
    arrowTransform: "rotate(-36 100 100)",
    arrowLabelPos: { x: 130, y: 30 },
    arrowLabel: "Uốn tròn đầu khuyết",
    textPos: { x: 70, y: 156, label: "1. Bắt đầu từ nét xiên" },
    iconSymbol: "γ",
    strokeChar: "γ",
    iconBg: "bg-purple-100 text-purple-800",
    desc: "Khuyết trên (b, h, k), khuyết dưới (g, y)",
  },
];

const LETTERS_29 = [
  { letter: "A a", sound: "A" },
  { letter: "Ă ă", sound: "Ă" },
  { letter: "Â â", sound: "Â" },
  { letter: "B b", sound: "Bờ" },
  { letter: "C c", sound: "Cờ" },
  { letter: "D d", sound: "Dờ" },
  { letter: "Đ đ", sound: "Đờ" },
  { letter: "E e", sound: "E" },
  { letter: "Ê ê", sound: "Ê" },
  { letter: "G g", sound: "Gờ" },
  { letter: "H h", sound: "Hờ" },
  { letter: "I i", sound: "I" },
  { letter: "K k", sound: "Ca" },
  { letter: "L l", sound: "Lờ" },
  { letter: "M m", sound: "Mờ" },
  { letter: "N n", sound: "Nờ" },
  { letter: "O o", sound: "O" },
  { letter: "Ô ô", sound: "Ô" },
  { letter: "Ơ ơ", sound: "Ơ" },
  { letter: "P p", sound: "Pờ" },
  { letter: "Q q", sound: "Quy" },
  { letter: "R r", sound: "Rờ" },
  { letter: "S s", sound: "Sờ" },
  { letter: "T t", sound: "Tờ" },
  { letter: "U u", sound: "U" },
  { letter: "Ư ư", sound: "Ư" },
  { letter: "V v", sound: "Vờ" },
  { letter: "X x", sound: "Xờ" },
  { letter: "Y y", sound: "Y" },
];

const TONE_MARKS_BA = [
  {
    tone: "Thanh Ngang",
    syllable: "Ba",
    meaning: "Người Ba / Bố",
    desc: "Ba dắt tay con đi dạo",
    prompt: "Ba. Người ba dắt tay con!",
    emoji: "👨‍👧",
    badgeBg: "bg-slate-100 text-slate-700",
    textCol: "text-sky-700",
    btnHover: "hover:bg-sky-50 text-sky-700",
  },
  {
    tone: "Dấu Huyền (\\)",
    syllable: "Bà",
    meaning: "Bà Ngoại / Bà Nội",
    desc: "Bà kể chuyện cổ tích xưa",
    prompt: "Bà. Bà hiền từ của bé!",
    emoji: "👵",
    badgeBg: "bg-orange-100 text-orange-800",
    textCol: "text-[#FF5722]",
    btnHover: "hover:bg-orange-50 text-[#FF5722]",
  },
  {
    tone: "Dấu Sắc (/)",
    syllable: "Bá",
    meaning: "Bác lớn tuổi",
    desc: "Cách gọi kính trọng người bác",
    prompt: "Bá. Bác lớn tuổi trong nhà!",
    emoji: "🧑‍🦳",
    badgeBg: "bg-emerald-100 text-emerald-800",
    textCol: "text-emerald-700",
    btnHover: "hover:bg-emerald-50 text-emerald-700",
  },
  {
    tone: "Dấu Hỏi (?)",
    syllable: "Bả",
    meaning: "Mồi Bả Câu Cá",
    desc: "Mồi thính thơm thả xuống hồ",
    prompt: "Bả. Dấu hỏi móc câu uốn cong!",
    emoji: "🎣",
    badgeBg: "bg-purple-100 text-purple-700",
    textCol: "text-slate-800",
    btnHover: "hover:bg-purple-50 text-slate-800",
  },
  {
    tone: "Dấu Ngã (~)",
    syllable: "Bã",
    meaning: "Bã Mía Ngọt",
    desc: "Bã mía sau khi ép nước",
    prompt: "Bã. Dấu ngã lượn sóng nhấp nhô!",
    emoji: "🎋",
    badgeBg: "bg-amber-100 text-amber-800",
    textCol: "text-amber-900",
    btnHover: "hover:bg-amber-50 text-amber-900",
  },
  {
    tone: "Dấu Nặng (.)",
    syllable: "Bạ",
    meaning: "Sổ Học Bạ",
    desc: "Quyển sổ ghi kết quả học tập",
    prompt: "Bạ. Dấu nặng là một chấm nhỏ dưới chân chữ!",
    emoji: "📒",
    badgeBg: "bg-slate-200 text-slate-800",
    textCol: "text-slate-900",
    btnHover: "hover:bg-slate-100 text-slate-900",
  },
];

const NUMBERS_10 = [
  { num: 1, text: "Một", dots: 1, prompt: "Số một. Một chấm tròn đỏ!", isPrimary: true },
  { num: 2, text: "Hai", dots: 2, prompt: "Số hai. Hai chấm tròn đỏ!", isPrimary: true },
  { num: 3, text: "Ba", dots: 3, prompt: "Số ba. Ba chấm tròn đỏ!", isPrimary: true },
  { num: 4, text: "Bốn", dots: 4, prompt: "Số bốn. Bốn chấm tròn đỏ!", isPrimary: true },
  { num: 5, text: "Năm", dots: 5, prompt: "Số năm. Năm chấm tròn đỏ!", isPrimary: true },
  { num: 6, text: "Sáu", dots: 6, prompt: "Số sáu. Sáu chấm tròn xanh!", isPrimary: false },
  { num: 7, text: "Bảy", dots: 7, prompt: "Số bảy. Bảy chấm tròn xanh!", isPrimary: false },
  { num: 8, text: "Tám", dots: 8, prompt: "Số tám. Tám chấm tròn xanh!", isPrimary: false },
  { num: 9, text: "Chín", dots: 9, prompt: "Số chín. Chín chấm tròn xanh!", isPrimary: false },
  { num: 10, text: "Mười", dots: 10, prompt: "Số mười. Mười chấm tròn xanh!", isPrimary: false },
];

type PrintTarget = {
  id: "net" | "chucai" | "dauthanh" | "sodem";
  title: string;
  subtitle: string;
  pages: number;
} | null;

/**
 * Parsed letter data for 29 Vietnamese letters (Uppercase + Lowercase).
 * `key` is the lowercase form used to look up stroke data in letter-strokes.ts.
 */
const PARSED_LETTERS_29 = LETTERS_29.map((item) => {
  const parts = item.letter.split(" ");
  const lower = parts[1] || parts[0] || item.letter;
  return {
    key: lower,
    upper: parts[0] || item.letter,
    lower,
    sound: item.sound,
  };
});

const CASE_MODE_OPTIONS: { value: VietnameseCaseMode; label: string; sample: string }[] = [
  { value: "both", label: "Cả hai", sample: "Aa" },
  { value: "uppercase", label: "Chữ hoa", sample: "A" },
  { value: "lowercase", label: "Chữ thường", sample: "a" },
];

const CASE_MODE_LABEL: Record<VietnameseCaseMode, string> = {
  both: "Chữ Hoa + Chữ Thường",
  uppercase: "Chữ In Hoa",
  lowercase: "Chữ Viết Thường",
};

export default function VietnameseStage1Page() {
  const [currentStrokeIdx, setCurrentStrokeIdx] = useState<number>(0); // Default Nét Thẳng (id: 0)
  const [activePrintTarget, setActivePrintTarget] = useState<PrintTarget>(null);

  // Selected stroke IDs for Section 1 printing (e.g. Set containing stroke group IDs 0..4)
  const [selectedStrokePrintIds, setSelectedStrokePrintIds] = useState<Set<number>>(
    new Set([0, 1, 2, 3, 4])
  );

  // Section 2 (29 Chữ Cái): on-screen board case mode + the letter whose stroke guide is open
  const [boardCaseMode, setBoardCaseMode] = useState<VietnameseCaseMode>("both");
  const [selectedLetterIdx, setSelectedLetterIdx] = useState<number>(0);
  const [guideCase, setGuideCase] = useState<LetterCase>("lower");

  // Section 2 printing: case mode, which letter(s), and physical ô li size
  const [letterCaseMode, setLetterCaseMode] = useState<VietnameseCaseMode>("both");
  const [selectedLetterPrintIdx, setSelectedLetterPrintIdx] = useState<number | "all">("all");
  const [olyLiMm, setOlyLiMm] = useState<OlyLiMm>(2.5);
  // Section 3 printing: which toneless syllable to practise the 5 tone marks on
  const [toneBase, setToneBase] = useState<string>("ba");
  // Section 4 printing: which numbers to practise
  const [numberRange, setNumberRange] = useState<NumberRange>("1-10");

  // Audio helper (speech audio without visual toast banner)
  const triggerVoicePrompt = (text: string) => {
    speakVietnamese(text, 0.85);
  };

  const handlePrintTarget = (target: PrintTarget) => {
    setActivePrintTarget(target);
  };

  const selectLetterTargetForPrint = (
    idx: number | "all" = "all",
    caseMode: VietnameseCaseMode = letterCaseMode
  ) => {
    setSelectedLetterPrintIdx(idx);
    setLetterCaseMode(caseMode);
    const isAll = idx === "all";
    const title = isAll
      ? "Bộ Bài Tập Ô Ly 29 Chữ Cái Tiếng Việt"
      : `Phiếu Tập Viết Ô Ly - Chữ ${PARSED_LETTERS_29[idx].upper} ${PARSED_LETTERS_29[idx].lower}`;
    const subtitle = `Tập tô ${CASE_MODE_LABEL[caseMode]} trên giấy kẻ ô ly (chữ mẫu đỏ, nét chấm mờ, ô trống tự viết)`;

    handlePrintTarget({
      id: "chucai",
      title,
      subtitle,
      pages: 1, // recomputed from the paginated rows at render time
    });
  };

  const selectLetterOnBoard = (idx: number) => {
    setSelectedLetterIdx(idx);
    triggerVoicePrompt(PARSED_LETTERS_29[idx].sound);
  };

  const speakHowToWrite = () => {
    const item = PARSED_LETTERS_29[selectedLetterIdx];
    triggerVoicePrompt(
      `Chữ ${item.sound} ${guideCase === "upper" ? "in hoa" : "viết thường"}. Bé nhìn số thứ tự các nét và viết theo chiều mũi tên nhé!`
    );
  };

  const toggleStrokePrintId = (id: number) => {
    setSelectedStrokePrintIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectOnlyCurrentStrokeForPrint = (id: number) => {
    setSelectedStrokePrintIds(new Set([id]));
    handlePrintTarget({
      id: "net",
      title: `Phiếu Bài Tập Ô Ly - ${STROKE_GROUPS[id].name}`,
      subtitle: "Nét mẫu đỏ có chấm đặt bút, nét chấm để tô, chỗ trống tự viết",
      pages: 1,
    });
  };

  const selectAllStrokesForPrint = () => {
    setSelectedStrokePrintIds(new Set([0, 1, 2, 3, 4]));
    handlePrintTarget({
      id: "net",
      title: "Phiếu Tập Tô 5 Nhóm Nét Cơ Bản",
      subtitle: "Thẳng, xiên, cong, móc, khuyết — nét mẫu đỏ có chấm đặt bút, nét chấm để tô",
      pages: 1,
    });
  };

  const executePrint = () => {
    if (!activePrintTarget) return;
    window.print();
  };

  // Section 2 print sheet: one A4 page per letter, drawn with the handwriting font
  const sheetCase: SheetCase =
    letterCaseMode === "uppercase" ? "upper" : letterCaseMode === "lowercase" ? "lower" : "both";
  const letterPrintIdxs =
    selectedLetterPrintIdx === "all" ? PARSED_LETTERS_29.map((_, i) => i) : [selectedLetterPrintIdx];
  const selectedLetter = PARSED_LETTERS_29[selectedLetterIdx];
  // When the board only shows one case, the guide follows it
  const effectiveGuideCase: LetterCase =
    boardCaseMode === "uppercase" ? "upper" : boardCaseMode === "lowercase" ? "lower" : guideCase;

  const currentStrokeData = STROKE_GROUPS[currentStrokeIdx];

  // Section 1 printing: chosen stroke groups, drawn on the same ô ly grid as the other sheets
  const strokePrintIds = [...selectedStrokePrintIds].sort((a, b) => a - b);

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* 1. NORMAL ON-SCREEN PAGE INTERFACE (Hidden when printing) */}
      {/* ---------------------------------------------------- */}
      <div className="min-h-screen bg-[#FFFDF9] text-[#1E293B] pb-16 print:hidden">


        <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 space-y-12">
          {/* Stage 1 Top Hero Header */}
          <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-[#D84315] font-extrabold text-xs border border-amber-200">
                  GIAI ĐOẠN 1 (THÁNG 1 - 3)
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1">
                  <CheckCircle2 className="size-3.5" /> Chuẩn Khung 4 Ô Ly Bộ GD&amp;ĐT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Giai Đoạn 1: Nền Tảng Tiếng Việt (Chuẩn Bị Vào Lớp 1)
              </h1>
              <p className="mt-1 text-sm sm:text-base font-medium text-slate-600">
                Nhận diện 29 chữ cái, chuẩn hóa âm đọc, 5 nhóm nét cơ bản, 5 dấu thanh &amp; tập đếm số 1-10.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  triggerVoicePrompt(
                    "Chào ba mẹ và bé! Hãy nghe phát âm mẫu rồi tập viết trên giấy thật nhé!"
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 shadow-2xs"
              >
                <Volume2 className="size-4 text-sky-600" />
                <span>Giọng Cô Giáo (Chuẩn Bắc/Nam)</span>
              </button>
            </div>
          </section>

          {/* SECTION 1: LUYỆN 5 NHÓM NÉT CƠ BẢN */}
          <section className="scroll-mt-24 space-y-5" id="section-net">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-100 text-[#D84315] text-xs font-bold border border-orange-200/60">
                  <span>Mục 1</span>
                  <span>•</span>
                  <span>Xem Hướng Đi Bút &amp; Nghe Tên Nét</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  <span>✏️</span> 1. Luyện 5 Nhóm Nét Cơ Bản
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Màn hình chỉ chiếu mẫu động để bé hiểu thứ tự nét và chiều rê bút. Bé quan sát xong sẽ đặt bút viết trực tiếp vào phiếu bài tập giấy in.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => selectOnlyCurrentStrokeForPrint(currentStrokeIdx)}
                  className="px-4 py-2 rounded-full bg-orange-100 hover:bg-orange-200 text-[#D84315] font-extrabold text-xs flex items-center gap-1.5 transition-colors border border-orange-200"
                >
                  <Printer className="size-4" />
                  <span>In Nét Đang Xem</span>
                </button>
                <button
                  type="button"
                  onClick={selectAllStrokesForPrint}
                  className="px-4 py-2 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Printer className="size-4" />
                  <span>In Cả 5 Nét (Ô Ly)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 5 Stroke Group Navigation Tabs (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                  Chọn nhóm nét bé muốn tra cứu:
                </span>
                {STROKE_GROUPS.map((grp) => {
                  const isActive = currentStrokeIdx === grp.id;
                  return (
                    <button
                      key={grp.id}
                      type="button"
                      onClick={() => {
                        setCurrentStrokeIdx(grp.id);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between group ${
                        isActive
                          ? "bg-orange-50/60 border-2 border-[#FF5722] shadow-xs"
                          : "bg-white hover:bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0 ${grp.iconBg}`}
                        >
                          {grp.iconSymbol}
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-sm font-extrabold block truncate ${
                              isActive ? "text-[#E64A19]" : "text-slate-900 group-hover:text-[#FF5722]"
                            }`}
                          >
                            {grp.name}
                          </span>
                          <span className="text-xs text-slate-500 truncate block">{grp.desc}</span>
                        </div>
                      </div>
                      {isActive ? (
                        <Eye className="size-5 text-[#FF5722] shrink-0" />
                      ) : (
                        <PlayCircle className="size-5 text-slate-400 group-hover:text-[#FF5722] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Animation Box (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between items-center relative overflow-hidden min-h-[380px]">
                {/* Grid Background Pattern */}
                <div className="absolute inset-0 opacity-25 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-oly-v2" width="28" height="28" patternUnits="userSpaceOnUse">
                        <rect width="28" height="28" fill="none" />
                        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#93c5fd" strokeWidth="0.75" />
                        <path d="M 0 14 L 28 14 M 14 0 L 14 28" fill="none" stroke="#dbeafe" strokeDasharray="2,2" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-oly-v2)" />
                  </svg>
                </div>

                {/* Header of Animation Box */}
                <div className="w-full flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#D84315] text-xs font-extrabold">
                      {currentStrokeData.badge}
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">Chuẩn 2 li</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerVoicePrompt(currentStrokeData.voiceText)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-100 flex items-center justify-center text-sky-700 transition-colors"
                    title="Nghe đọc mẫu"
                  >
                    <Volume2 className="size-4" />
                  </button>
                </div>

                {/* Dynamic SVG Demonstrating Stroke Direction & Starting Point */}
                <div className="relative w-64 h-64 my-auto flex items-center justify-center z-10">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Guide Reference lines */}
                    <line x1="20" y1="40" x2="180" y2="40" stroke="#f87171" strokeWidth="1.2" strokeDasharray="3,3" />
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#60a5fa" strokeWidth="1" />
                    <line x1="20" y1="160" x2="180" y2="160" stroke="#f87171" strokeWidth="1.8" />

                    {/* Base Ghost Track */}
                    <path
                      d={currentStrokeData.ghostPath}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />

                    {/* Animated Running Stroke */}
                    <path
                      d={currentStrokeData.path}
                      fill="none"
                      stroke="#FF5722"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-pen-stroke"
                    />

                    {/* Start Point: Static Red Dot */}
                    <circle
                      cx={currentStrokeData.start.x}
                      cy={currentStrokeData.start.y}
                      r="6.5"
                      fill="#dc2626"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <text
                      x={currentStrokeData.textPos.x}
                      y={currentStrokeData.textPos.y}
                      fill="#dc2626"
                      fontSize="11"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {currentStrokeData.textPos.label}
                    </text>
                  </svg>
                </div>

                {/* Explanation & Pedagogical instruction */}
                <div className="w-full bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl z-10 flex items-center justify-between text-xs text-emerald-900">
                  <span className="flex items-center gap-1.5 font-bold">
                    <ArrowDownCircle className="size-4 text-emerald-700 shrink-0" />
                    <span>{currentStrokeData.guide}</span>
                  </span>
                </div>
              </div>

              {/* Ergonomics Card: Cầm bút 3 ngón (3 cols) */}
              <div className="lg:col-span-3 bg-[#FFFDF5] border border-amber-200/80 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2 text-[#D84315] font-extrabold text-sm mb-2">
                    <Pencil className="size-4" />
                    <span>Cầm Bút 3 Ngón Tay Chuẩn</span>
                  </div>

                  <div className="w-full bg-orange-100/50 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1 mb-3 border border-orange-200/60">
                    <span className="text-3xl">✍️</span>
                    <span className="text-xs font-extrabold text-[#582200]">
                      Ngón Cái + Trỏ + Giữa
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Cách đầu ngòi bút <strong>2.5 cm</strong>
                    </span>
                  </div>

                  <ul className="text-xs space-y-2 text-slate-700">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Ngón cái &amp; ngón trỏ:</strong> Giữ 2 bên thân bút nhẹ nhàng, không bóp chặt.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Ngón giữa:</strong> Đỡ bên dưới thân bút làm điểm tựa mềm mại.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Tư thế:</strong> Lưng thẳng, ngực không tì vào mép bàn, mắt cách vở 25-30cm.
                      </span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handlePrintTarget({
                      id: "net",
                      title: "Poster Hướng Dẫn Cầm Bút & Tư Thế Ngồi",
                      subtitle: "Khổ A4 in màu dán góc bàn học của bé",
                      pages: 1,
                    })
                  }
                  className="w-full py-2 px-3 rounded-full bg-white hover:bg-orange-50 text-[#FF5722] font-bold text-xs text-center border border-orange-200 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <FileDown className="size-3.5" />
                  <span>In Poster A4 Dán Bàn Học</span>
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: NHẬN DIỆN 29 CHỮ CÁI */}
          <section className="scroll-mt-24 space-y-5" id="section-chucai">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200/60">
                  <span>Mục 2</span>
                  <span>•</span>
                  <span>Tra Cứu Phát Âm Chuẩn 29 Chữ Cái</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  <span>🅰️</span> 2. Nhận Diện, Phát Âm &amp; Cách Viết 29 Chữ Cái
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Bé chạm vào ô chữ để nghe cô giáo phát âm và xem cách viết từng nét trên ô ly, rồi mới đặt bút chì nắn nót vào vở.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {/* Uppercase / lowercase / both toggle for the board */}
                <div
                  role="radiogroup"
                  aria-label="Kiểu chữ hiển thị"
                  className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 p-1"
                >
                  {CASE_MODE_OPTIONS.map((opt) => {
                    const active = boardCaseMode === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setBoardCaseMode(opt.value)}
                        className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
                          active ? "bg-white text-[#E64A19] shadow-xs border border-orange-200" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <span className="font-heading text-sm leading-none">{opt.sample}</span>
                        <span className="hidden sm:inline">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => selectLetterTargetForPrint("all", letterCaseMode)}
                  className="px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Printer className="size-4" />
                  <span>In Phiếu 29 Chữ Cái (Ô Ly)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* 29 Letters Sound Board Grid (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-2xs">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
                  {PARSED_LETTERS_29.map((item, idx) => {
                    const isActive = selectedLetterIdx === idx;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => selectLetterOnBoard(idx)}
                        aria-pressed={isActive}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-between text-center group hover:scale-105 active:scale-95 transition-all shadow-2xs gap-1.5 ${
                          isActive
                            ? "bg-orange-50 border-2 border-[#FF5722]"
                            : "bg-slate-50/70 hover:bg-orange-50/80 border-slate-200/80"
                        }`}
                      >
                        <span className="font-tapviet text-[52px] sm:text-[60px] leading-none pt-3 text-red-600 whitespace-nowrap">
                          {letterForms(item.key, boardCaseMode).join(" ")}
                        </span>
                        <Volume2
                          className={`size-4 transition-colors ${
                            isActive ? "text-[#FF5722]" : "text-slate-400 group-hover:text-[#FF5722]"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stroke-order guide for the selected letter (5 cols) */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-2xs flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-[#D84315] text-[11px] font-extrabold border border-orange-200/60">
                      <Pencil className="size-3" /> Cách viết chữ
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-2">
                      <span className="font-heading text-3xl text-[#FF5722]">
                        {selectedLetter.upper} {selectedLetter.lower}
                      </span>
                      <span className="text-sm text-slate-500 font-bold">đọc là &ldquo;{selectedLetter.sound}&rdquo;</span>
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerVoicePrompt(selectedLetter.sound)}
                    className="w-9 h-9 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center text-sky-700 transition-colors shrink-0"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="size-4" />
                  </button>
                </div>

                {boardCaseMode === "both" && (
                  <div className="inline-flex self-start items-center rounded-full bg-slate-100 border border-slate-200 p-1">
                    {(["upper", "lower"] as LetterCase[]).map((c) => {
                      const active = effectiveGuideCase === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setGuideCase(c)}
                          className={`px-3 py-1 rounded-full text-xs font-extrabold transition-colors ${
                            active ? "bg-white text-[#E64A19] shadow-xs border border-orange-200" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <span className="font-heading text-sm mr-1">{c === "upper" ? selectedLetter.upper : selectedLetter.lower}</span>
                          {c === "upper" ? "Chữ hoa" : "Chữ thường"}
                        </button>
                      );
                    })}
                  </div>
                )}

                <CursiveLetterCard
                  letters={
                    boardCaseMode === "both"
                      ? [selectedLetter.upper, selectedLetter.lower]
                      : [effectiveGuideCase === "upper" ? selectedLetter.upper : selectedLetter.lower]
                  }
                />

                <details className="group rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2">
                  <summary className="cursor-pointer text-xs font-bold text-slate-600 select-none">
                    Xem hoạt hình thứ tự nét (chữ in)
                  </summary>
                  <LetterStrokeGuide
                    key={`${selectedLetter.key}-${effectiveGuideCase}`}
                    letter={selectedLetter.key}
                    letterCase={effectiveGuideCase}
                    className="mt-2"
                  />
                </details>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={speakHowToWrite}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-colors"
                  >
                    <Volume2 className="size-3.5" />
                    Nghe hướng dẫn
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      selectLetterTargetForPrint(
                        selectedLetterIdx,
                        boardCaseMode === "both" ? (effectiveGuideCase === "upper" ? "uppercase" : "lowercase") : boardCaseMode
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 hover:bg-orange-200 text-[#D84315] text-xs font-extrabold transition-colors border border-orange-200"
                  >
                    <Printer className="size-3.5" />
                    In phiếu tập viết chữ {effectiveGuideCase === "upper" ? selectedLetter.upper : selectedLetter.lower}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: KHÁM PHÁ 5 DẤU THANH */}
          <section className="scroll-mt-24 space-y-5" id="section-dauthanh">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200/60">
                  <span>Mục 3</span>
                  <span>•</span>
                  <span>Nghe Cao Độ &amp; Đối Chiếu Nghĩa Từ Mẫu</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  <span>🎶</span> 3. Khám Phá 5 Dấu Thanh Kỳ Diệu (Ví dụ: Từ BA)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Cùng một tiếng &ldquo;BA&rdquo;, khi thêm dấu thanh khác nhau sẽ thay đổi hoàn toàn ý nghĩa. Bé nghe tra cứu đối chiếu trước khi làm bài trên{" "}
                  <strong>&ldquo;Phiếu Tập Viết 5 Dấu Thanh&rdquo;</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handlePrintTarget({
                      id: "dauthanh",
                      title: "Phiếu Tập Viết 5 Dấu Thanh",
                      subtitle: "Trang 1: tập tô 5 dấu thanh trên ô ly — Trang 2: nghe và viết dấu",
                      pages: 2,
                    })
                  }
                  className="px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Printer className="size-4" />
                  <span>In Phiếu Tập Viết Dấu Thanh</span>
                </button>
              </div>
            </div>

            {/* 6 Variations of BA - Audio Lookup Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {TONE_MARKS_BA.map((item) => (
                <div
                  key={item.syllable}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col items-center text-center gap-1.5"
                >
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${item.badgeBg}`}>
                    {item.tone}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl my-1">
                    {item.emoji}
                  </div>
                  <span className={`text-2xl font-black ${item.textCol}`}>{item.syllable}</span>
                  <span className="text-xs font-bold text-slate-800">{item.meaning}</span>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{item.desc}</p>
                  <button
                    type="button"
                    onClick={() => triggerVoicePrompt(item.prompt)}
                    className={`w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center mt-2 transition-colors ${item.btnHover}`}
                    title={`Nghe âm ${item.syllable}`}
                  >
                    <Volume2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: SỐ ĐẾM 1 ĐẾN 10 */}
          <section className="scroll-mt-24 space-y-5" id="section-sodem">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/60">
                  <span>Mục 4</span>
                  <span>•</span>
                  <span>Số &amp; Lượng Chấm Tương Ứng</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
                  <span>🔢</span> 4. Số Đếm 1 Đến 10 (Chuẩn Nét Chữ Số Mầm Non)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Mỗi ô thể hiện chữ số viết tay chuẩn tiểu học (cao 4 li = 2 ô) và số lượng chấm tròn. Chạm để nghe đọc số trước khi làm phiếu tập viết số.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    handlePrintTarget({
                      id: "sodem",
                      title: "Phiếu Tập Viết Số",
                      subtitle: "Tô chữ số cao 4 li (2 ô) trên ô ly + đếm chấm viết số + điền số còn thiếu",
                      pages: 2,
                    })
                  }
                  className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Printer className="size-4" />
                  <span>In Phiếu Tập Viết Số</span>
                </button>
              </div>
            </div>

            {/* 10 Visual Number Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
              {NUMBERS_10.map((item) => (
                <button
                  key={item.num}
                  type="button"
                  onClick={() => triggerVoicePrompt(item.prompt)}
                  className="p-3 rounded-2xl bg-white hover:bg-orange-50/60 border border-slate-200 flex flex-col items-center justify-between text-center group transition-all shadow-2xs"
                >
                  <span
                    className={`font-tapviet text-[64px] leading-none pt-2 ${
                      item.isPrimary ? "text-red-600" : "text-sky-700"
                    }`}
                  >
                    {item.num}
                  </span>

                  <div className="flex flex-wrap items-center justify-center gap-0.5 my-2 max-w-[50px]">
                    {Array.from({ length: item.dots }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`size-2.5 rounded-full inline-block ${
                          item.isPrimary ? "bg-[#FF5722]" : "bg-sky-600"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-slate-600">{item.text}</span>
                  <Volume2 className="size-3.5 text-slate-400 group-hover:text-[#FF5722] mt-1 transition-colors" />
                </button>
              ))}
            </div>
          </section>

          {/* SECTION FOOTER & LỜI KHUYÊN PHỤ HUYNH */}
          <section className="scroll-mt-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Educational Advice Card */}
              <div className="md:col-span-7 bg-[#FFFDF5] border border-amber-200/80 p-6 rounded-3xl shadow-2xs flex flex-col justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center text-[#FF5722] shrink-0">
                    <Lightbulb className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Lời Khuyên Cho Ba Mẹ (Giai Đoạn 5-6 Tuổi)
                    </h3>
                    <span className="text-xs text-slate-500">
                      Nuôi dưỡng niềm yêu thích cầm bút tự nhiên &amp; mềm dẻo
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1">
                    <span className="font-bold text-[#FF5722] flex items-center gap-1">
                      <span>⏱️</span> Màn Hình &lt; 10 Phút
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Chỉ cho bé nhìn chuyển động bút 1-2 lần để nắm hướng đi nét, sau đó tắt màn hình để bảo vệ thị lực non nớt của trẻ.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1">
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <span>📝</span> Giấy Là Nơi Rèn Cổ Tay
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Cầm bút chì 2B thật viết trên giấy kẻ ô ly giúp hình thành cảm giác lực tay và tư thế chuẩn mà iPad không thể thay thế.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-1">
                  <span>Tham vấn: Ban Giáo Dục Tiền Tiểu Học Bé Tự Học</span>
                  <span className="text-[#FF5722] font-bold">Phiên Bản 2025 • Chuẩn GD Mầm Non</span>
                </div>
              </div>

              {/* Child Safety & Non-Distraction Commitment */}
              <div className="md:col-span-5 bg-gradient-to-br from-emerald-50/50 via-white to-sky-50/50 border border-emerald-200/80 p-6 rounded-3xl shadow-2xs flex flex-col justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                    <ShieldCheck className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-emerald-900">
                      Môi Trường Học Thuần Khiết
                    </h3>
                    <span className="text-xs text-slate-500">
                      Bảo vệ mắt &amp; sự tập trung của trẻ thơ
                    </span>
                  </div>
                </div>

                <ul className="text-xs space-y-2.5 text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Không quảng cáo, không pop-up</strong> gây phân tán sự chú ý.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Không chấm điểm áp lực:</strong> Ba mẹ động viên qua xấp bài in.
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong>Tự ngắt sau 10 phút</strong> nhắc bé chuyển sang làm bài trên giấy.
                    </span>
                  </li>
                </ul>

                <div className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold text-center border border-emerald-200">
                  Đồng hành tin cậy cùng 150,000+ phụ huynh chuẩn bị cho con vào Lớp 1
                </div>
              </div>
            </div>
          </section>
        </main>



        {/* Individual Print Preview Modal Dialog */}
        {activePrintTarget && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Printer className="size-6 text-[#FF5722]" />
                  <span className="text-base font-extrabold text-slate-900">
                    Xem Trước &amp; In Phiếu Mẫu A4
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePrintTarget(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Content Preview */}
              <div className="w-full bg-[#FFFDF5] border-2 border-dashed border-amber-300 rounded-2xl p-4 flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between border-b border-slate-300 pb-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-[#D84315]">
                      {activePrintTarget.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">{activePrintTarget.subtitle}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#D84315] text-xs font-bold shrink-0">
                    {activePrintTarget.id === "net" ? strokeSheetPageCount(strokePrintIds, olyLiMm) : activePrintTarget.id === "chucai" ? letterPrintIdxs.length : activePrintTarget.id === "sodem" ? (olyLiMm === 4 ? 3 : 2) : activePrintTarget.pages} Trang A4
                  </span>
                </div>

                {/* Specific controls for Section 1 (5 Nhóm Nét) */}
                {activePrintTarget.id === "net" && (
                  <div className="space-y-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/80">
                    <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
                      <span>Chọn nét cần in vào trang ô ly:</span>
                      <button
                        type="button"
                        onClick={() => setSelectedStrokePrintIds(new Set([0, 1, 2, 3, 4]))}
                        className="text-[11px] text-[#FF5722] hover:underline"
                      >
                        Chọn cả 5 nét
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {STROKE_GROUPS.map((grp) => {
                        const isChecked = selectedStrokePrintIds.has(grp.id);
                        return (
                          <button
                            key={grp.id}
                            type="button"
                            onClick={() => toggleStrokePrintId(grp.id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                              isChecked
                                ? "bg-[#FF5722] text-white border-[#FF5722]"
                                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            <span>{grp.iconSymbol}</span>
                            <span>{grp.name.replace(/^\d+\.\s*/, "")}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Specific controls for Section 2 (29 Chữ Cái) */}
                {activePrintTarget.id === "chucai" && (
                  <div className="space-y-2.5 bg-sky-50/60 p-2.5 rounded-xl border border-sky-200/80 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <span className="font-extrabold text-slate-800 block mb-1">Kiểu chữ tô:</span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {CASE_MODE_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => selectLetterTargetForPrint(selectedLetterPrintIdx, opt.value)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                                letterCaseMode === opt.value
                                  ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                              }`}
                            >
                              <span className="font-heading mr-1">{opt.sample}</span>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-extrabold text-slate-800 block mb-1">Chữ cái cần in:</span>
                        <select
                          value={selectedLetterPrintIdx}
                          onChange={(e) => {
                            const val = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);
                            selectLetterTargetForPrint(val, letterCaseMode);
                          }}
                          className="w-full sm:w-auto py-1 px-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs font-bold"
                        >
                          <option value="all">Tất cả 29 chữ cái</option>
                          {PARSED_LETTERS_29.map((item, idx) => (
                            <option key={item.key} value={idx}>
                              Chữ {item.upper} {item.lower} (Âm {item.sound})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Mỗi chữ 1 trang A4 viết bằng font chữ tiểu học: dòng đầu chữ mẫu đỏ → các dòng chữ chấm để tô → dòng có chữ mẫu đỏ ở đầu để bé tự viết.
                      {selectedLetterPrintIdx === "all" ? " In cả 29 chữ = 29 trang." : ""}
                    </p>
                  </div>
                )}

                {/* Printable Worksheet Preview Box (High Precision Vector SVG Ô Ly Sheet) */}
                <div className="p-2 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Mẫu trang kẻ ô ly thực tế:</span>
                    <span className="text-sky-700 text-[11px]">Giấy Ô Ly Chuẩn Lớp 1</span>
                  </div>

                  {activePrintTarget.id === "net" && (
                    <div className="max-h-80 overflow-y-auto border border-sky-300 rounded bg-white p-2">
                      <StrokePracticeSheet groupIds={strokePrintIds} liMm={olyLiMm} previewOnly />
                    </div>
                  )}

                  {activePrintTarget.id === "chucai" && (
                    <div className="max-h-80 overflow-y-auto border border-sky-300 rounded bg-white p-2">
                      <SingleLetterPracticeSheet
                        letter={PARSED_LETTERS_29[letterPrintIdxs[0]].key}
                        letterCase={sheetCase}
                        indexNumber={letterPrintIdxs[0] + 1}
                        liMm={olyLiMm}
                      />
                      {letterPrintIdxs.length > 1 && (
                        <p className="text-[10px] text-slate-500 text-center py-1">
                          Xem trước trang 1 / {letterPrintIdxs.length}
                        </p>
                      )}
                    </div>
                  )}

                  {activePrintTarget.id === "dauthanh" && (
                    <div className="max-h-80 overflow-y-auto border border-sky-300 rounded bg-white p-2">
                      <ToneMarkPracticeSheet base={toneBase} liMm={olyLiMm} />
                    </div>
                  )}

                  {activePrintTarget.id === "sodem" && (
                    <div className="max-h-80 overflow-y-auto border border-sky-300 rounded bg-white p-2">
                      <NumberPracticeSheet range={numberRange} liMm={olyLiMm} previewOnly />
                    </div>
                  )}
                </div>

                {/* Settings */}
                {activePrintTarget.id === "dauthanh" && (
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block mb-1">Tiếng để tập 5 dấu thanh:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {TONE_BASE_SYLLABLES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setToneBase(s)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                            toneBase === s
                              ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Trang 1: tập tô {toneBase} và 5 dấu thanh. Trang 2: nghe và viết dấu{toneBase === "ba" ? " (có hình gợi ý)" : ""}, kèm đáp án.
                    </p>
                  </div>
                )}
                {activePrintTarget.id === "sodem" && (
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block mb-1">Dãy số cần tập:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(["1-10", "0-9"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setNumberRange(r)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                            numberRange === r
                              ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          Số {r.replace("-", " – ")}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Trang tập tô: mỗi số 1 dòng (số mẫu đỏ → số chấm để tô → chỗ trống tự viết). Trang cuối: đếm chấm viết số và điền số còn thiếu, kèm đáp án.
                    </p>
                  </div>
                )}
                {(activePrintTarget.id === "net" || activePrintTarget.id === "chucai" || activePrintTarget.id === "dauthanh" || activePrintTarget.id === "sodem") && (
                  <div className="text-xs">
                    <label htmlFor="oly-li-size" className="font-bold text-slate-800 block mb-1">
                      Cỡ ô ly khi in:
                    </label>
                    <select
                      id="oly-li-size"
                      value={String(olyLiMm)}
                      onChange={(e) => setOlyLiMm(e.target.value === "4" ? 4 : 2.5)}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs"
                    >
                      <option value="2.5">Ô ly chuẩn 2,5 mm (giống vở ô ly lớp 1) — 10 dòng/trang</option>
                      <option value="4">Ô ly to 4 mm (dễ tô cho bé mầm non) — 6 dòng/trang</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Footer buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActivePrintTarget(null)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  Đóng lại
                </button>
                <button
                  type="button"
                  onClick={executePrint}
                  className="px-5 py-2 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white text-xs font-extrabold shadow-2xs flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="size-4" />
                  <span>In Phiếu Này Ngay</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. DEDICATED PRINTABLE A4 AREA (Visible ONLY when printing) */}
      {/* Authentic Ô Ly Grid Paper Layout (Matching photo) */}
      {/* ---------------------------------------------------- */}
      <div className="hidden print:block w-full max-w-none bg-white text-black p-2 print:p-0">
        {activePrintTarget ? (
          <div className="space-y-2">
            {/* Header of Worksheet (the 29-letter sheet prints its own header on every page) */}

            {/* PRINTABLE CONTENT FOR SECTION 1: 5 NHÓM NÉT — same ô ly style as the other sheets */}
            {activePrintTarget.id === "net" && <StrokePracticeSheet groupIds={strokePrintIds} liMm={olyLiMm} />}

            {/* PRINTABLE CONTENT FOR SECTION 2: 29 CHỮ CÁI — one handwriting-font ô ly page per letter */}
            {activePrintTarget.id === "chucai" &&
              letterPrintIdxs.map((letterIdx, pageIdx) => (
                <div key={PARSED_LETTERS_29[letterIdx].key} className={pageIdx > 0 ? "page-break pt-2" : ""}>
                  <SingleLetterPracticeSheet
                    letter={PARSED_LETTERS_29[letterIdx].key}
                    letterCase={sheetCase}
                    indexNumber={letterIdx + 1}
                    liMm={olyLiMm}
                  />
                </div>
              ))}

            {/* PRINTABLE CONTENT FOR SECTION 3: 5 DẤU THANH — tracing page + listening page */}
            {activePrintTarget.id === "dauthanh" && <ToneMarkPracticeSheet base={toneBase} liMm={olyLiMm} />}

            {/* PRINTABLE CONTENT FOR SECTION 4: tập viết số + đếm chấm + điền số */}
            {activePrintTarget.id === "sodem" && <NumberPracticeSheet range={numberRange} liMm={olyLiMm} />}

            {/* Footer of Printable Sheet */}
            <div className="pt-2 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
              <p>Lời nhắn của ba mẹ: Bé ngoan chăm chỉ luyện viết nhé!</p>
              <p>Hệ thống học liệu Bé Tự Học 2026 • Chuẩn Ô Ly Mầm Non</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-500">
            Hãy chọn một mục phiếu bài tập bên trên để in.
          </div>
        )}
      </div>
    </>
  );
}
