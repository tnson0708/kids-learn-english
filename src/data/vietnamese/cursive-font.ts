/**
 * Metrics for the handwriting fonts in src/lib/handwriting-fonts.ts, so SVG worksheets can place
 * letters on the ô ly grid without measuring text at runtime.
 *
 * Font units: UPM 2048, 1 ô li = 200 units. Rendering with fontSize = li * FONT_SIZE_PER_LI puts
 * the baseline on the text y coordinate and makes lowercase "o" exactly 2 li tall.
 */

export const FONT_UNITS_PER_LI = 200;
export const FONT_UPM = 2048;
/** fontSize (in the same unit as 1 li) that maps 200 font units onto 1 li. */
export const FONT_SIZE_PER_LI = FONT_UPM / FONT_UNITS_PER_LI;

export const TAPVIET_FONT = "var(--font-tapviet), cursive";
export const TAPDO_FONT = "var(--font-tapdo), cursive";

/** Advance widths in font units (same in the solid and dotted fonts). */
const ADVANCE: Record<string, number> = {
  a: 500, ă: 500, â: 500, b: 500, c: 300, d: 500, đ: 500, e: 300, ê: 300, g: 400, h: 600,
  i: 300, k: 600, l: 400, m: 1000, n: 700, o: 300, ô: 300, ơ: 300, p: 600, q: 300, r: 500,
  s: 500, t: 300, u: 600, ư: 600, v: 600, x: 600, y: 500,
  A: 1100, Ă: 1100, Â: 1100, B: 1000, C: 900, D: 900, Đ: 900, E: 800, Ê: 800, G: 1000,
  H: 1000, I: 600, K: 1000, L: 800, M: 1200, N: 1000, O: 900, Ô: 900, Ơ: 900, P: 700,
  Q: 900, R: 1100, S: 600, T: 900, U: 1100, Ư: 1100, V: 800, X: 900, Y: 1000,
  // digits are 4 li (2 ô) tall
  "0": 600, "1": 400, "2": 600, "3": 600, "4": 700, "5": 600, "6": 600, "7": 600, "8": 600, "9": 600,
};

/** Advance width of one letter, in li. */
export function advanceLi(ch: string): number {
  // tone-marked letters (à, ấ, ợ…) share the advance of their base letter (a, â, ơ…)
  const units =
    ADVANCE[ch] ??
    ADVANCE[ch.normalize("NFD").replace(/[\u0300\u0301\u0303\u0309\u0323]/g, "").normalize("NFC")] ??
    ADVANCE[ch.normalize("NFD")[0]] ??
    600;
  return units / FONT_UNITS_PER_LI;
}

/** Advance width of a whole word, in li. */
export function wordAdvanceLi(word: string): number {
  return [...word.normalize("NFC")].reduce((sum, ch) => sum + advanceLi(ch), 0);
}

/**
 * Practice slot width in li: the letter's advance plus breathing room, snapped to half a
 * big ô (2 li) so every copy starts on a vertical grid line.
 */
export function slotLi(ch: string): number {
  return Math.max(4, 2 * Math.ceil((advanceLi(ch) + 1.5) / 2));
}

/**
 * Standard letter heights for "chữ cỡ vừa" (Bộ GD&ĐT): li above / below the baseline.
 * Diacritics (ă â ê ô ơ ư, the dot on i) are not counted, as in the textbook.
 */
const LOWER_HEIGHT: Record<string, [number, number]> = {
  b: [5, 0], h: [5, 0], k: [5, 0], l: [5, 0],
  g: [2, 3], y: [2, 3],
  d: [4, 0], đ: [4, 0],
  p: [2, 2], q: [2, 2],
  t: [3, 0],
  r: [2.5, 0], s: [2.5, 0],
};

export function letterHeight(ch: string): { above: number; below: number } {
  const isUpper = ch !== ch.toLowerCase();
  if (isUpper) return ch === "G" || ch === "Y" ? { above: 5, below: 3 } : { above: 5, below: 0 };
  const [above, below] = LOWER_HEIGHT[ch] ?? [2, 0];
  return { above, below };
}

const fmt = (n: number) => String(n).replace(".", ",");

/** e.g. "cao 2 li", "cao 5 li (2 li trên, 3 li dưới đường kẻ đậm)". */
export function describeHeight(ch: string): string {
  const { above, below } = letterHeight(ch);
  const total = above + below;
  if (below === 0) return `cao ${fmt(total)} li`;
  return `cao ${fmt(total)} li (${fmt(above)} li trên, ${fmt(below)} li dưới đường kẻ đậm)`;
}
