export const VIETNAMESE_LETTERS = [
  "a", "ă", "â", "b", "c", "d", "đ", "e", "ê", "g", "h", "i", "k", "l", "m",
  "n", "o", "ô", "ơ", "p", "q", "r", "s", "t", "u", "ư", "v", "x", "y",
] as const;

export type VietnameseLetter = (typeof VIETNAMESE_LETTERS)[number];
export type VietnameseCaseMode = "uppercase" | "lowercase" | "both";

/** Uppercase form of a Vietnamese letter (đ -> Đ isn't a plain .toUpperCase() case). */
export function upperForm(letter: string): string {
  return letter === "đ" ? "Đ" : letter.toUpperCase();
}

/** Forms to render for a given case mode, e.g. "both" -> [uppercase, lowercase]. */
export function letterForms(letter: string, mode: VietnameseCaseMode): string[] {
  const upper = upperForm(letter);
  if (mode === "lowercase") return [letter];
  if (mode === "uppercase") return [upper];
  return [upper, letter];
}
