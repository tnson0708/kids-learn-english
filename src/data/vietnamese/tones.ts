/** The six Vietnamese tones (thanh ngang + 5 dấu thanh) and helpers to put them on a syllable. */

export interface ToneInfo {
  id: "ngang" | "huyen" | "sac" | "hoi" | "nga" | "nang";
  name: string;
  /** How the mark looks, for labels. */
  symbol: string;
  /** Unicode combining mark ("" for thanh ngang). */
  combining: string;
  /** Where the child writes it. */
  position: "none" | "above" | "below";
}

export const TONES: ToneInfo[] = [
  { id: "ngang", name: "Thanh ngang", symbol: "—", combining: "", position: "none" },
  { id: "huyen", name: "Dấu huyền", symbol: "`", combining: "̀", position: "above" },
  { id: "sac", name: "Dấu sắc", symbol: "´", combining: "́", position: "above" },
  { id: "hoi", name: "Dấu hỏi", symbol: "ˀ", combining: "̉", position: "above" },
  { id: "nga", name: "Dấu ngã", symbol: "~", combining: "̃", position: "above" },
  { id: "nang", name: "Dấu nặng", symbol: ".", combining: "̣", position: "below" },
];

/** Simple open syllables a pre-schooler can sound out; the tone goes on the vowel. */
export const TONE_BASE_SYLLABLES = ["ba", "ca", "la", "ma", "na", "bo", "co", "be", "bi", "bê"] as const;

const VOWELS = "aăâeêioôơuưy";

/** Index of the character that carries the tone mark (last vowel — enough for CV syllables). */
export function toneVowelIndex(base: string): number {
  const chars = [...base.normalize("NFC")];
  for (let i = chars.length - 1; i >= 0; i--) if (VOWELS.includes(chars[i].toLowerCase())) return i;
  return chars.length - 1;
}

/** "ba" + dấu huyền -> "bà" (NFC so the font's precomposed glyph is used). */
export function applyTone(base: string, tone: ToneInfo): string {
  if (!tone.combining) return base.normalize("NFC");
  const chars = [...base.normalize("NFC")];
  const i = toneVowelIndex(base);
  chars[i] = (chars[i].normalize("NFD") + tone.combining).normalize("NFC");
  return chars.join("");
}

/** Picture hints for the "ba" family, used on the listening exercise. */
export const BA_HINTS: Record<ToneInfo["id"], { emoji: string; meaning: string }> = {
  ngang: { emoji: "👨‍👧", meaning: "ba (bố)" },
  huyen: { emoji: "👵", meaning: "bà ngoại" },
  sac: { emoji: "🧑‍🦳", meaning: "bá (bác)" },
  hoi: { emoji: "🎣", meaning: "bả câu cá" },
  nga: { emoji: "🎋", meaning: "bã mía" },
  nang: { emoji: "📒", meaning: "học bạ" },
};
