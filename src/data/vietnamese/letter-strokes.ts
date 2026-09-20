/**
 * Stroke-order data for the 29 Vietnamese letters (print-style "chữ in", the form taught in
 * mầm non / tiền tiểu học) drawn on a "vở ô ly" grid.
 *
 * Coordinate system — one cell per glyph, 1 ô li = LI units:
 *   - cell is CELL_W x CELL_H units = 6 li wide x 10 li tall; glyph paths are authored with the
 *     capital top line at y = 20 and get translated down by GLYPH_OFFSET_Y when rendered
 *   - BASELINE is 7 li from the top of the cell; ASC_TOP (5 li above baseline) is where b/h/k/l and all
 *     capitals reach; X_TOP (2 li above baseline) is the lowercase body height;
 *   - d/đ reach 4 li, t reaches 3 li, p/q descend 2 li, g/y descend ~2.5 li;
 *   - the area above y = 20 only holds diacritics of capitals (Ă Â Ê Ô Ơ Ư).
 * Each stroke is an SVG path drawn in pen order, so the guide animation and the print sheet
 * share the exact same shapes.
 */

export const LI = 20;
export const CELL_W = LI * 6;
/** Extra li above the glyph box so capital diacritics (Ă Â Ê Ô Ơ Ư) have room; renderers translate glyphs down by this. */
export const GLYPH_OFFSET_Y = LI;
export const CELL_H = LI * 10;
export const BASELINE = LI * 6 + GLYPH_OFFSET_Y;
export const X_TOP = LI * 4 + GLYPH_OFFSET_Y;
export const ASC_TOP = LI * 1 + GLYPH_OFFSET_Y;

export type LetterCase = "upper" | "lower";

export interface LetterGlyph {
  /** SVG path per stroke, in writing order. A dot is a zero-length segment with round caps. */
  strokes: string[];
}

const HAT_LOWER = "M 48 66 L 60 54 L 72 66";
const BREVE_LOWER = "M 48 56 C 52 66 68 66 72 56";
const HAT_UPPER = "M 48 8 L 60 -4 L 72 8";
const BREVE_UPPER = "M 48 -4 C 52 8 68 8 72 -4";

const A_BOWL = "M 78 86 C 72 80 62 79 54 82 C 42 87 38 104 46 113 C 54 122 72 120 78 112";
const B_BOWL = "M 40 86 C 50 78 66 78 74 86 C 84 96 84 110 74 116 C 66 122 50 122 40 114";
const D_BOWL = "M 80 86 C 70 78 54 78 46 86 C 36 96 36 110 46 116 C 54 122 70 122 80 114";
const E_BODY =
  "M 40 102 L 80 102 C 80 90 72 80 60 80 C 48 80 40 89 40 100 C 40 112 48 121 60 121 C 70 121 76 117 80 111";
const O_BODY =
  "M 60 80 C 48 80 40 89 40 100 C 40 111 48 120 60 120 C 72 120 80 111 80 100 C 80 89 72 80 60 80";
const U_BODY = "M 40 80 L 40 106 C 40 122 80 122 80 106 L 80 80";
const N_ARCH = "M 40 92 C 46 80 80 76 80 98 L 80 120";

const A_CAP: string[] = ["M 34 120 L 60 20", "M 60 20 L 86 120", "M 44 84 L 76 84"];
const C_CAP = "M 84 40 C 74 22 48 18 40 36 C 30 56 30 84 40 104 C 48 122 74 118 84 100";
const D_CAP: string[] = ["M 38 20 L 38 120", "M 38 20 L 56 20 C 96 20 96 120 56 120 L 38 120"];
const E_CAP: string[] = ["M 40 20 L 40 120", "M 40 20 L 82 20", "M 40 70 L 74 70", "M 40 120 L 82 120"];
const O_CAP = "M 60 20 C 38 20 32 44 32 70 C 32 96 38 120 60 120 C 82 120 88 96 88 70 C 88 44 82 20 60 20";
const P_CAP: string[] = ["M 40 20 L 40 120", "M 40 20 L 66 20 C 90 20 90 72 66 72 L 40 72"];
const U_CAP = "M 36 20 L 36 94 C 36 126 84 126 84 94 L 84 20";

export const LETTER_GLYPHS: Record<string, { upper: LetterGlyph; lower: LetterGlyph }> = {
  a: { upper: { strokes: A_CAP }, lower: { strokes: [A_BOWL, "M 80 80 L 80 120"] } },
  ă: {
    upper: { strokes: [...A_CAP, BREVE_UPPER] },
    lower: { strokes: [A_BOWL, "M 80 80 L 80 120", BREVE_LOWER] },
  },
  â: {
    upper: { strokes: [...A_CAP, HAT_UPPER] },
    lower: { strokes: [A_BOWL, "M 80 80 L 80 120", HAT_LOWER] },
  },
  b: {
    upper: {
      strokes: [
        "M 38 20 L 38 120",
        "M 38 20 L 64 20 C 86 20 86 68 64 68 L 38 68",
        "M 38 68 L 68 68 C 92 68 92 120 68 120 L 38 120",
      ],
    },
    lower: { strokes: ["M 40 20 L 40 120", B_BOWL] },
  },
  c: {
    upper: { strokes: [C_CAP] },
    lower: { strokes: ["M 80 88 C 74 80 60 78 50 82 C 36 90 36 112 50 118 C 60 122 74 120 80 112"] },
  },
  d: { upper: { strokes: D_CAP }, lower: { strokes: [D_BOWL, "M 80 40 L 80 120"] } },
  đ: {
    upper: { strokes: [...D_CAP, "M 28 70 L 52 70"] },
    lower: { strokes: [D_BOWL, "M 80 40 L 80 120", "M 68 54 L 92 54"] },
  },
  e: { upper: { strokes: E_CAP }, lower: { strokes: [E_BODY] } },
  ê: {
    upper: { strokes: [...E_CAP, HAT_UPPER] },
    lower: { strokes: [E_BODY, HAT_LOWER] },
  },
  g: {
    upper: {
      strokes: [
        "M 84 40 C 74 22 48 18 40 36 C 30 56 30 84 40 104 C 48 122 76 120 84 100 L 84 76 L 62 76",
      ],
    },
    lower: { strokes: [D_BOWL, "M 80 80 L 80 158 C 80 172 62 176 46 168"] },
  },
  h: {
    upper: { strokes: ["M 38 20 L 38 120", "M 82 20 L 82 120", "M 38 70 L 82 70"] },
    lower: { strokes: ["M 40 20 L 40 120", N_ARCH] },
  },
  i: {
    upper: { strokes: ["M 60 20 L 60 120"] },
    lower: { strokes: ["M 60 80 L 60 120", "M 60 62 L 60 62.01"] },
  },
  k: {
    upper: { strokes: ["M 40 20 L 40 120", "M 82 20 L 40 78", "M 52 64 L 84 120"] },
    lower: { strokes: ["M 40 20 L 40 120", "M 78 82 L 40 110", "M 52 101 L 82 120"] },
  },
  l: {
    upper: { strokes: ["M 40 20 L 40 120 L 82 120"] },
    lower: { strokes: ["M 60 20 L 60 120"] },
  },
  m: {
    upper: { strokes: ["M 34 120 L 34 20", "M 34 20 L 60 86", "M 60 86 L 86 20", "M 86 20 L 86 120"] },
    lower: {
      strokes: [
        "M 36 80 L 36 120",
        "M 36 92 C 40 80 60 78 60 96 L 60 120",
        "M 60 92 C 64 80 84 78 84 96 L 84 120",
      ],
    },
  },
  n: {
    upper: { strokes: ["M 38 120 L 38 20", "M 38 20 L 82 120", "M 82 120 L 82 20"] },
    lower: { strokes: ["M 40 80 L 40 120", N_ARCH] },
  },
  o: { upper: { strokes: [O_CAP] }, lower: { strokes: [O_BODY] } },
  ô: {
    upper: { strokes: [O_CAP, HAT_UPPER] },
    lower: { strokes: [O_BODY, HAT_LOWER] },
  },
  ơ: {
    upper: { strokes: [O_CAP, "M 87 32 C 94 30 98 24 96 16"] },
    lower: { strokes: [O_BODY, "M 79 88 C 86 86 90 80 89 72"] },
  },
  p: { upper: { strokes: P_CAP }, lower: { strokes: ["M 40 80 L 40 160", B_BOWL] } },
  q: {
    upper: { strokes: [O_CAP, "M 70 98 L 92 124"] },
    lower: { strokes: [D_BOWL, "M 80 80 L 80 160"] },
  },
  r: {
    upper: { strokes: [...P_CAP, "M 58 72 L 86 120"] },
    lower: { strokes: ["M 44 80 L 44 120", "M 44 96 C 50 80 68 78 80 88"] },
  },
  s: {
    upper: { strokes: ["M 82 36 C 74 20 38 18 36 44 C 34 68 86 66 86 94 C 86 124 44 124 34 102"] },
    lower: { strokes: ["M 78 88 C 72 78 46 78 44 90 C 42 102 78 98 78 110 C 78 123 50 124 42 112"] },
  },
  t: {
    upper: { strokes: ["M 32 20 L 88 20", "M 60 20 L 60 120"] },
    lower: { strokes: ["M 54 56 L 54 110 C 54 120 64 122 78 116", "M 40 80 L 76 80"] },
  },
  u: { upper: { strokes: [U_CAP] }, lower: { strokes: [U_BODY, "M 80 80 L 80 120"] } },
  ư: {
    upper: { strokes: [U_CAP, "M 85 28 C 92 26 96 20 94 12"] },
    lower: { strokes: [U_BODY, "M 80 80 L 80 120", "M 81 86 C 88 84 92 78 91 70"] },
  },
  v: {
    upper: { strokes: ["M 34 20 L 60 120 L 86 20"] },
    lower: { strokes: ["M 40 80 L 60 120 L 80 80"] },
  },
  x: {
    upper: { strokes: ["M 36 20 L 84 120", "M 84 20 L 36 120"] },
    lower: { strokes: ["M 40 80 L 80 120", "M 80 80 L 40 120"] },
  },
  y: {
    upper: { strokes: ["M 34 20 L 60 72", "M 86 20 L 60 72 L 60 120"] },
    lower: { strokes: ["M 40 80 L 60 120", "M 80 80 L 52 160 C 48 170 40 174 34 172"] },
  },
};

export function getLetterGlyph(letter: string, letterCase: LetterCase): LetterGlyph | undefined {
  return LETTER_GLYPHS[letter.toLowerCase()]?.[letterCase];
}

/** Start point of an SVG path that begins with an absolute "M x y" command. */
export function strokeStartPoint(path: string): { x: number; y: number } {
  const match = /M\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(path);
  return match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
}
