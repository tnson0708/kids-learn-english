export type MathWorksheetType = "dem" | "cong" | "tru";

export type MathItem =
  | { type: "dem"; n: number }
  | { type: "cong"; a: number; b: number }
  | { type: "tru"; a: number; b: number };

/** Ports vo-luyen-tap.html's renderToan() random generators (counting / addition / subtraction, kept within `range`). */
export function generateMathItems(type: MathWorksheetType, range: number, count: number): MathItem[] {
  const items: MathItem[] = [];
  for (let i = 0; i < count; i++) {
    if (type === "dem") {
      const n = 1 + Math.floor(Math.random() * range);
      items.push({ type, n });
    } else if (type === "cong") {
      const a = 1 + Math.floor(Math.random() * (range - 1));
      const b = 1 + Math.floor(Math.random() * (range - a));
      items.push({ type, a, b });
    } else {
      const a = 2 + Math.floor(Math.random() * (range - 1));
      const b = 1 + Math.floor(Math.random() * (a - 1));
      items.push({ type, a, b });
    }
  }
  return items;
}
