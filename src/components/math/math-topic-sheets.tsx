import { CursiveOlyGrid, U } from "@/components/vietnamese/cursive-oly";
import { SheetHeader } from "@/components/vietnamese/tone-mark-practice-sheet";

/** Small blank ô ly box where the child writes a number or sign with a 2B pencil. */
function OlyWriteBox({ widthLi = 6, heightLi = 6 }: { widthLi?: number; heightLi?: number }) {
  return (
    <svg
      viewBox={`0 0 ${widthLi * U} ${heightLi * U}`}
      className="h-[17mm] w-auto shrink-0 rounded border border-sky-400 bg-white"
    >
      <rect width={widthLi * U} height={heightLi * U} fill="#fff" />
      <CursiveOlyGrid widthLi={widthLi} heightLi={heightLi} baselineLi={heightLi - 1} variant="print" />
    </svg>
  );
}

/**
 * Printable A4 Worksheet 2: So Sánh (>, <, =), Sắp Xếp Thứ Tự & Tách – Gộp Số (Number Bonds)
 */
export function CompareAndBondsPracticeSheet() {
  const comparePairs = [
    { left: 5, right: 3, emoji: "🍎" },
    { left: 2, right: 6, emoji: "🐣" },
    { left: 4, right: 4, emoji: "⭐" },
    { left: 7, right: 5, emoji: "🍓" },
    { left: 3, right: 8, emoji: "🐟" },
    { left: 6, right: 6, emoji: "🎈" },
  ];

  const bondItems = [
    { whole: 5, partA: 2, partB: null },
    { whole: 6, partA: 4, partB: null },
    { whole: 7, partA: null, partB: 3 },
    { whole: 8, partA: 5, partB: null },
    { whole: 9, partA: 6, partB: null },
    { whole: 10, partA: 5, partB: null },
  ];

  return (
    <div className="mx-auto w-full max-w-[794px] bg-white text-slate-800 space-y-4">
      <SheetHeader
        accentClass="text-amber-700"
        subtitle="Phiếu Bài Tập Toán Tiền Tiểu Học"
        title="So Sánh (>, <, =) & Tách – Gộp Số Trong Phạm Vi 10"
        note="Bé đếm số lượng hai bên rồi điền dấu >, <, = vào ô giữa. Sau đó điền số còn thiếu vào sơ đồ tách – gộp."
      />

      {/* Part 1: Compare groups */}
      <div>
        <h3 className="mb-2 font-heading text-sm font-black text-slate-900">
          Bài 1: Đếm số lượng hai bên và điền dấu &gt;, &lt; hoặc = vào ô ly
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {comparePairs.map((pair, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 rounded-xl border-2 border-slate-300 px-3 py-2 break-inside-avoid"
            >
              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="flex flex-wrap justify-center gap-0.5 text-base min-h-[28px]">
                  {Array.from({ length: pair.left }).map((_, i) => (
                    <span key={i}>{pair.emoji}</span>
                  ))}
                </div>
                <span className="font-heading text-base font-black text-slate-800">{pair.left}</span>
              </div>

              <OlyWriteBox widthLi={6} heightLi={6} />

              <div className="flex flex-col items-center gap-1 flex-1">
                <div className="flex flex-wrap justify-center gap-0.5 text-base min-h-[28px]">
                  {Array.from({ length: pair.right }).map((_, i) => (
                    <span key={i}>{pair.emoji}</span>
                  ))}
                </div>
                <span className="font-heading text-base font-black text-slate-800">{pair.right}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Number Bonds */}
      <div>
        <h3 className="mb-2 font-heading text-sm font-black text-slate-900">
          Bài 2: Điền số còn thiếu vào sơ đồ Tách – Gộp số
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {bondItems.map((b, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center rounded-xl border-2 border-slate-300 p-2.5 break-inside-avoid"
            >
              <svg viewBox="0 0 160 105" className="h-24 w-auto">
                {/* Lines connecting whole to parts */}
                <line x1="80" y1="36" x2="42" y2="72" stroke="#475569" strokeWidth="2.5" />
                <line x1="80" y1="36" x2="118" y2="72" stroke="#475569" strokeWidth="2.5" />
                {/* Whole circle */}
                <circle cx="80" cy="24" r="20" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
                <text x="80" y="31" textAnchor="middle" fontSize="20" fontWeight="800" fill="#92400e">
                  {b.whole}
                </text>
                {/* Part A circle */}
                <circle
                  cx="42"
                  cy="80"
                  r="20"
                  fill={b.partA === null ? "#ffffff" : "#e0f2fe"}
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeDasharray={b.partA === null ? "4,3" : undefined}
                />
                {b.partA !== null && (
                  <text x="42" y="87" textAnchor="middle" fontSize="20" fontWeight="800" fill="#0369a1">
                    {b.partA}
                  </text>
                )}
                {/* Part B circle */}
                <circle
                  cx="118"
                  cy="80"
                  r="20"
                  fill={b.partB === null ? "#ffffff" : "#dcfce7"}
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeDasharray={b.partB === null ? "4,3" : undefined}
                />
                {b.partB !== null && (
                  <text x="118" y="87" textAnchor="middle" fontSize="20" fontWeight="800" fill="#15803d">
                    {b.partB}
                  </text>
                )}
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Ordering numbers */}
      <div>
        <h3 className="mb-2 font-heading text-sm font-black text-slate-900">
          Bài 3: Sắp xếp các số: 8, 2, 5, 9, 1 theo thứ tự
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border-2 border-slate-300 p-3 space-y-2">
            <span className="font-bold text-slate-800 block">a) Từ bé đến lớn:</span>
            <div className="flex items-center justify-between gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <OlyWriteBox key={i} widthLi={5} heightLi={6} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border-2 border-slate-300 p-3 space-y-2">
            <span className="font-bold text-slate-800 block">b) Từ lớn đến bé:</span>
            <div className="flex items-center justify-between gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <OlyWriteBox key={i} widthLi={5} heightLi={6} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="pt-1 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
    </div>
  );
}

/**
 * Printable A4 Worksheet 3: Phép Cộng & Phép Trừ Trực Quan Phạm Vi 10
 */
export function ArithmeticPracticeSheet({ range = 10 }: { range?: 5 | 10 }) {
  const visualProblems =
    range === 5
      ? [
          { op: "+" as const, a: 2, b: 1, emoji: "🍎" },
          { op: "+" as const, a: 3, b: 2, emoji: "⭐" },
          { op: "-" as const, a: 4, b: 1, emoji: "🐣" },
          { op: "-" as const, a: 5, b: 2, emoji: "🎈" },
          { op: "+" as const, a: 1, b: 3, emoji: "🍓" },
          { op: "-" as const, a: 5, b: 3, emoji: "🐟" },
        ]
      : [
          { op: "+" as const, a: 4, b: 3, emoji: "🍎" },
          { op: "+" as const, a: 5, b: 4, emoji: "⭐" },
          { op: "-" as const, a: 7, b: 2, emoji: "🐣" },
          { op: "-" as const, a: 8, b: 3, emoji: "🎈" },
          { op: "+" as const, a: 6, b: 4, emoji: "🍓" },
          { op: "-" as const, a: 9, b: 4, emoji: "🐟" },
        ];

  const drillEquations =
    range === 5
      ? ["1 + 2 =", "2 + 3 =", "4 - 2 =", "5 - 1 =", "3 + 1 =", "4 - 3 =", "2 + 2 =", "5 - 4 ="]
      : ["3 + 5 =", "6 + 3 =", "8 - 3 =", "9 - 5 =", "4 + 6 =", "10 - 4 =", "7 + 2 =", "10 - 7 ="];

  return (
    <div className="mx-auto w-full max-w-[794px] bg-white text-slate-800 space-y-4">
      <SheetHeader
        accentClass="text-sky-700"
        subtitle="Phiếu Bài Tập Toán Tiền Tiểu Học"
        title={`Phép Cộng & Phép Trừ Trực Quan (Phạm Vi ${range})`}
        note="Bé nhìn hình minh họa, nhảy trên tia số 0–10 và viết kết quả đúng vào ô kẻ ô ly."
      />

      {/* Helper Number Line 0-10 */}
      <div className="rounded-xl border-2 border-sky-200 bg-sky-50/40 px-4 py-2.5">
        <span className="text-xs font-extrabold text-sky-900 block mb-1">
          🐸 Tia số hỗ trợ bé đếm (Cộng thì nhảy tiến sang phải, Trừ thì nhảy lùi sang trái):
        </span>
        <svg viewBox="0 0 600 42" className="w-full h-auto">
          <line x1="25" y1="22" x2="575" y2="22" stroke="#0284c7" strokeWidth="2.5" />
          {Array.from({ length: 11 }, (_, n) => {
            const x = 30 + n * 54;
            return (
              <g key={n}>
                <line x1={x} y1="14" x2={x} y2="30" stroke="#0284c7" strokeWidth="2.5" />
                <text x={x} y="40" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Part 1: Visual Addition & Subtraction */}
      <div>
        <h3 className="mb-2 font-heading text-sm font-black text-slate-900">
          Bài 1: Nhìn hình ảnh và viết kết quả phép tính vào ô ly
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {visualProblems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 rounded-xl border-2 border-slate-300 px-3 py-2 break-inside-avoid"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-1 text-base">
                  {item.op === "+" ? (
                    <>
                      <span>{Array.from({ length: item.a }).map(() => item.emoji).join("")}</span>
                      <span className="font-black text-emerald-600 px-1">+</span>
                      <span>{Array.from({ length: item.b }).map(() => item.emoji).join("")}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {Array.from({ length: item.a - item.b })
                          .map(() => item.emoji)
                          .join("")}
                      </span>
                      <span className="line-through opacity-45 decoration-red-600 decoration-2">
                        {Array.from({ length: item.b }).map(() => item.emoji).join("")}
                      </span>
                    </>
                  )}
                </div>
                <div className="font-heading text-lg font-black text-slate-900">
                  {item.a} {item.op} {item.b} =
                </div>
              </div>
              <OlyWriteBox widthLi={7} heightLi={6} />
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Quick Equations */}
      <div>
        <h3 className="mb-2 font-heading text-sm font-black text-slate-900">
          Bài 2: Tính và viết số thích hợp vào ô ly
        </h3>
        <div className="grid grid-cols-4 gap-2.5">
          {drillEquations.map((eq, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border-2 border-slate-300 px-3 py-1.5 break-inside-avoid"
            >
              <span className="font-heading text-base font-black text-slate-800">{eq}</span>
              <OlyWriteBox widthLi={6} heightLi={6} />
            </div>
          ))}
        </div>
      </div>

      <p className="pt-1 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
    </div>
  );
}

/**
 * Printable A4 Worksheet 4: Hình Học, Quy Luật (Patterns) & Đồng Hồ
 */
export function ShapesAndLogicPracticeSheet() {
  const patternRows = [
    { seq: ["🔴", "🟦", "🔴", "🟦", "🔴"], options: ["🟦", "🔴", "🔺"] },
    { seq: ["⭐", "⭐", "🌙", "⭐", "⭐"], options: ["⭐", "🌙", "☀️"] },
    { seq: ["🍎", "🍌", "🍇", "🍎", "🍌"], options: ["🍎", "🍌", "🍇"] },
  ];

  const clocks = [
    { hour: 3, label: "...... giờ" },
    { hour: 7, label: "...... giờ" },
    { hour: 9, label: "...... giờ" },
    { hour: 12, label: "...... giờ" },
  ];

  return (
    <div className="mx-auto w-full max-w-[794px] bg-white text-slate-800 space-y-4">
      <SheetHeader
        accentClass="text-purple-700"
        subtitle="Phiếu Bài Tập Toán Tiền Tiểu Học"
        title="Nhận Biết Hình Học, Quy Luật & Xem Giờ Đúng"
        note="Bé đếm số lượng từng loại hình, khoanh tròn vào hình đúng quy luật và tập xem giờ đúng trên mặt đồng hồ."
      />

      {/* Part 1: Count geometric shapes */}
      <div className="rounded-xl border-2 border-slate-300 p-3 space-y-2.5">
        <h3 className="font-heading text-sm font-black text-slate-900">
          Bài 1: Quan sát các hình dưới đây, đếm và viết số lượng từng hình vào ô ly
        </h3>
        <svg viewBox="0 0 600 95" className="w-full h-24 rounded-lg border border-slate-200 bg-slate-50/50">
          {/* Circles (4) */}
          <circle cx="45" cy="35" r="18" fill="#fecaca" stroke="#dc2626" strokeWidth="2.5" />
          <circle cx="195" cy="65" r="16" fill="#fecaca" stroke="#dc2626" strokeWidth="2.5" />
          <circle cx="360" cy="30" r="18" fill="#fecaca" stroke="#dc2626" strokeWidth="2.5" />
          <circle cx="520" cy="62" r="17" fill="#fecaca" stroke="#dc2626" strokeWidth="2.5" />
          {/* Squares (3) */}
          <rect x="95" y="18" width="34" height="34" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2.5" />
          <rect x="275" y="50" width="34" height="34" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2.5" />
          <rect x="445" y="16" width="34" height="34" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2.5" />
          {/* Triangles (3) */}
          <polygon points="155,15 135,52 175,52" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
          <polygon points="240,14 220,50 260,50" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
          <polygon points="405,52 385,86 425,86" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
          {/* Rectangles (2) */}
          <rect x="40" y="64" width="56" height="24" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2.5" />
          <rect x="515" y="16" width="56" height="24" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2.5" />
        </svg>

        <div className="grid grid-cols-4 gap-2.5 pt-1">
          {[
            { name: "Hình tròn", icon: "🔴" },
            { name: "Hình vuông", icon: "🟦" },
            { name: "Hình tam giác", icon: "🔺" },
            { name: "Hình chữ nhật", icon: "🟩" },
          ].map((sh, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-slate-300 px-2.5 py-1">
              <span className="text-xs font-bold text-slate-800">
                {sh.icon} {sh.name}:
              </span>
              <OlyWriteBox widthLi={5} heightLi={6} />
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Complete the pattern */}
      <div>
        <h3 className="mb-2 font-heading text-sm font-black text-slate-900">
          Bài 2: Tìm quy luật và khoanh tròn vào hình tiếp theo ở cột bên phải
        </h3>
        <div className="space-y-2">
          {patternRows.map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border-2 border-slate-300 px-4 py-2 break-inside-avoid"
            >
              <div className="flex items-center gap-3 text-xl">
                {row.seq.map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
                <span className="inline-flex size-8 items-center justify-center rounded-lg border-2 border-dashed border-slate-400 text-sm font-bold text-slate-400">
                  ?
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-1 border border-slate-200">
                <span className="text-xs font-bold text-slate-500">Khoanh chọn:</span>
                {row.options.map((opt, i) => (
                  <span
                    key={i}
                    className="inline-flex size-8 items-center justify-center rounded-full border border-slate-300 bg-white text-lg"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Read the analog clock */}
      <div>
        <h3 className="mb-2 font-heading text-sm font-black text-slate-900">
          Bài 3: Kim ngắn chỉ giờ, kim dài chỉ số 12. Bé hãy viết số giờ đúng vào ô ly
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {clocks.map((c, idx) => {
            const angle = (c.hour % 12) * 30 - 90;
            const rad = (angle * Math.PI) / 180;
            const hx = 50 + 20 * Math.cos(rad);
            const hy = 50 + 20 * Math.sin(rad);
            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-slate-300 p-2.5 break-inside-avoid"
              >
                <svg viewBox="0 0 100 100" className="size-20">
                  <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#334155" strokeWidth="3" />
                  {[12, 3, 6, 9].map((num) => {
                    const a = ((num % 12) * 30 - 90) * (Math.PI / 180);
                    return (
                      <text
                        key={num}
                        x={50 + 34 * Math.cos(a)}
                        y={54 + 34 * Math.sin(a)}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="800"
                        fill="#1e293b"
                      >
                        {num}
                      </text>
                    );
                  })}
                  {/* Minute hand pointing to 12 */}
                  <line x1="50" y1="50" x2="50" y2="18" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Hour hand */}
                  <line x1="50" y1="50" x2={hx} y2={hy} stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="3" fill="#0f172a" />
                </svg>
                <div className="flex items-center gap-1.5">
                  <OlyWriteBox widthLi={5} heightLi={6} />
                  <span className="text-xs font-bold text-slate-700">giờ</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="pt-1 text-center font-heading text-sm font-bold tracking-wider text-amber-500">Bé Tự Học</p>
    </div>
  );
}
