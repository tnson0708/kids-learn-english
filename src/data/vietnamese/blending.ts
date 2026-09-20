export const PHU_AM = [
  "b", "c", "d", "đ", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "v",
  "x", "ch", "kh", "nh", "ng", "ph", "th", "tr",
] as const;

export const NGUYEN_AM = ["a", "ă", "â", "e", "ê", "i", "o", "ô", "ơ", "u", "ư", "y"] as const;

export interface ToneMark {
  mark: string;
  name: string;
}

export const TONE_MARKS: ToneMark[] = [
  { mark: "", name: "ngang" },
  { mark: "̀", name: "huyền" },
  { mark: "́", name: "sắc" },
  { mark: "̉", name: "hỏi" },
  { mark: "̃", name: "ngã" },
  { mark: "̣", name: "nặng" },
];

/** Precomputed tone-mark variants for common single-vowel syllables (ngang/huyền/sắc/hỏi/ngã/nặng). */
export const TONE_MAP: Record<string, string[]> = {
  a: ["a", "à", "á", "ả", "ã", "ạ"],
  e: ["e", "è", "é", "ẻ", "ẽ", "ẹ"],
  i: ["i", "ì", "í", "ỉ", "ĩ", "ị"],
  o: ["o", "ò", "ó", "ỏ", "õ", "ọ"],
  u: ["u", "ù", "ú", "ủ", "ũ", "ụ"],
  y: ["y", "ỳ", "ý", "ỷ", "ỹ", "ỵ"],
  ă: ["ă", "ằ", "ắ", "ẳ", "ẵ", "ặ"],
  â: ["â", "ầ", "ấ", "ẩ", "ẫ", "ậ"],
  ê: ["ê", "ề", "ế", "ể", "ễ", "ệ"],
  ô: ["ô", "ồ", "ố", "ổ", "ỗ", "ộ"],
  ơ: ["ơ", "ờ", "ớ", "ở", "ỡ", "ợ"],
  ư: ["ư", "ừ", "ứ", "ử", "ữ", "ự"],
};

/** Find the longest vowel key that a syllable ends with, e.g. "thương" -> "ương"'s last vowel "ơ". */
export function getToneVowelKey(syllable: string): string | null {
  let vowelKey: string | null = null;
  for (const key of Object.keys(TONE_MAP)) {
    if (syllable.endsWith(key) && (!vowelKey || key.length > vowelKey.length)) {
      vowelKey = key;
    }
  }
  return vowelKey;
}

/** Tone-mark variants of a syllable's vowel, with the leading consonant preserved, e.g. "ba" -> ["ba","bà","bá","bả","bã","bạ"]. */
export function getToneVariants(syllable: string): string[] | null {
  const vowelKey = getToneVowelKey(syllable);
  if (!vowelKey) return null;
  const consonant = syllable.slice(0, syllable.length - vowelKey.length);
  return TONE_MAP[vowelKey].map((v) => `${consonant}${v}`);
}
