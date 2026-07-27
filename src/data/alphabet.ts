export interface AlphabetLetter {
  letter: string;
  speakAs: string;
  ipa: string;
  /** Ordered SVG path `d` strings on a 100x100 viewBox, one per stroke. */
  strokes: string[];
  lowercaseStrokes?: string[];
}

// Hand-authored simplified stroke-order paths for uppercase and lowercase print letters
// (Zaner-Bloser-style print formation on a shared 0-0-100-100 viewBox).
// Standard Guidelines:
// - Top line / Ascender line: y = 15
// - Midline (x-height): y = 50
// - Baseline: y = 85
// - Descender line: y = 98
export const alphabet: AlphabetLetter[] = [
  {
    letter: "A",
    speakAs: "ay",
    ipa: "/eɪ/",
    strokes: ["M50,15 L20,85", "M50,15 L80,85", "M32.9,55 L67.1,55"],
    lowercaseStrokes: ["M65,58 C55,48 35,50 35,67.5 C35,82 55,85 65,75", "M65,50 L65,85"],
  },
  {
    letter: "B",
    speakAs: "bee",
    ipa: "/biː/",
    strokes: [
      "M25,15 L25,85",
      "M25,15 C55,15 65,25 65,32 C65,40 55,50 25,50 C55,50 68,60 68,67 C68,75 55,85 25,85",
    ],
    lowercaseStrokes: ["M35,15 L35,85", "M35,50 C55,48 70,58 70,68 C70,78 55,85 35,85"],
  },
  {
    letter: "C",
    speakAs: "cee",
    ipa: "/siː/",
    strokes: ["M70,25 C55,12 25,20 25,50 C25,80 55,88 70,75"],
    lowercaseStrokes: ["M68,58 C55,48 32,52 32,67.5 C32,82 55,85 68,77"],
  },
  {
    letter: "D",
    speakAs: "dee",
    ipa: "/diː/",
    strokes: ["M25,15 L25,85", "M25,15 C60,15 75,30 75,50 C75,70 60,85 25,85"],
    lowercaseStrokes: ["M65,50 C45,48 30,58 30,68 C30,78 45,85 65,85", "M65,15 L65,85"],
  },
  {
    letter: "E",
    speakAs: "ee",
    ipa: "/iː/",
    strokes: ["M25,15 L25,85", "M25,15 L70,15", "M25,50 L62,50", "M25,85 L70,85"],
    lowercaseStrokes: ["M32,67 L68,67 C68,52 48,48 32,67.5 C32,82 55,85 68,77"],
  },
  {
    letter: "F",
    speakAs: "ef",
    ipa: "/ɛf/",
    strokes: ["M25,15 L25,85", "M25,15 L70,15", "M25,50 L62,50"],
    lowercaseStrokes: ["M62,25 C50,15 40,20 40,85", "M28,50 L58,50"],
  },
  {
    letter: "G",
    speakAs: "gee",
    ipa: "/dʒiː/",
    strokes: ["M72,28 C55,12 25,20 25,50 C25,80 55,90 72,72", "M72,72 L72,50 L48,50"],
    lowercaseStrokes: ["M65,58 C55,48 35,50 35,67.5 C35,82 55,85 65,75", "M65,50 L65,88 C65,98 42,98 32,88"],
  },
  {
    letter: "H",
    speakAs: "aitch",
    ipa: "/eɪtʃ/",
    strokes: ["M25,15 L25,85", "M75,15 L75,85", "M25,50 L75,50"],
    lowercaseStrokes: ["M35,15 L35,85", "M35,60 C45,48 65,48 65,85"],
  },
  {
    letter: "I",
    speakAs: "eye",
    ipa: "/aɪ/",
    strokes: ["M50,15 L50,85"],
    lowercaseStrokes: ["M50,50 L50,85", "M50,30 L50,34"],
  },
  {
    letter: "J",
    speakAs: "jay",
    ipa: "/dʒeɪ/",
    strokes: ["M65,15 L65,65 C65,80 55,85 40,83 C30,80 25,75 25,68"],
    lowercaseStrokes: ["M55,50 L55,88 C55,98 38,98 28,88", "M55,30 L55,34"],
  },
  {
    letter: "K",
    speakAs: "kay",
    ipa: "/keɪ/",
    strokes: ["M25,15 L25,85", "M25,50 L75,15", "M25,50 L75,85"],
    lowercaseStrokes: ["M35,15 L35,85", "M65,50 L35,68", "M48,60 L68,85"],
  },
  {
    letter: "L",
    speakAs: "el",
    ipa: "/ɛl/",
    strokes: ["M25,15 L25,85", "M25,85 L70,85"],
    lowercaseStrokes: ["M50,15 L50,85"],
  },
  {
    letter: "M",
    speakAs: "em",
    ipa: "/ɛm/",
    strokes: ["M20,15 L20,85", "M20,15 L50,55", "M50,55 L80,15", "M80,15 L80,85"],
    lowercaseStrokes: ["M25,50 L25,85", "M25,60 C32,48 50,48 50,85", "M50,60 C58,48 75,48 75,85"],
  },
  {
    letter: "N",
    speakAs: "en",
    ipa: "/ɛn/",
    strokes: ["M20,15 L20,85", "M20,15 L80,85", "M80,15 L80,85"],
    lowercaseStrokes: ["M35,50 L35,85", "M35,60 C45,48 65,48 65,85"],
  },
  {
    letter: "O",
    speakAs: "oh",
    ipa: "/oʊ/",
    strokes: ["M50,15 C72,15 78,35 78,50 C78,65 72,85 50,85 C28,85 22,65 22,50 C22,35 28,15 50,15"],
    lowercaseStrokes: ["M50,50 C68,50 72,67.5 72,67.5 C72,67.5 68,85 50,85 C32,85 28,67.5 28,67.5 C28,67.5 32,50 50,50"],
  },
  {
    letter: "P",
    speakAs: "pee",
    ipa: "/piː/",
    strokes: ["M25,15 L25,85", "M25,15 C55,15 65,22 65,32 C65,42 55,50 25,50"],
    lowercaseStrokes: ["M35,50 L35,98", "M35,50 C55,48 70,58 70,68 C70,78 55,85 35,85"],
  },
  {
    letter: "Q",
    speakAs: "cue",
    ipa: "/kjuː/",
    strokes: [
      "M50,15 C72,15 78,35 78,50 C78,65 72,85 50,85 C28,85 22,65 22,50 C22,35 28,15 50,15",
      "M62,62 L78,80",
    ],
    lowercaseStrokes: ["M65,50 C45,48 30,58 30,68 C30,78 45,85 65,85", "M65,50 L65,98"],
  },
  {
    letter: "R",
    speakAs: "ar",
    ipa: "/ɑːr/",
    strokes: [
      "M25,15 L25,85",
      "M25,15 C55,15 65,22 65,32 C65,42 55,50 25,50",
      "M45,50 L75,85",
    ],
    lowercaseStrokes: ["M38,50 L38,85", "M38,62 C48,50 62,50 68,55"],
  },
  {
    letter: "S",
    speakAs: "ess",
    ipa: "/ɛs/",
    strokes: ["M70,25 C70,15 30,15 30,32 C30,48 70,45 70,62 C70,80 30,80 30,68"],
    lowercaseStrokes: ["M63,56 C55,48 37,50 37,60 C37,70 63,68 63,76 C63,85 45,86 37,80"],
  },
  {
    letter: "T",
    speakAs: "tee",
    ipa: "/tiː/",
    strokes: ["M20,15 L80,15", "M50,15 L50,85"],
    lowercaseStrokes: ["M45,20 L45,77 C45,85 55,85 65,82", "M30,50 L60,50"],
  },
  {
    letter: "U",
    speakAs: "you",
    ipa: "/juː/",
    strokes: ["M25,15 L25,65 C25,80 35,85 50,85 C65,85 75,80 75,65 L75,15"],
    lowercaseStrokes: ["M35,50 L35,72 C35,85 65,85 65,72", "M65,50 L65,85"],
  },
  {
    letter: "V",
    speakAs: "vee",
    ipa: "/viː/",
    strokes: ["M20,15 L50,85 L80,15"],
    lowercaseStrokes: ["M28,50 L50,85 L72,50"],
  },
  {
    letter: "W",
    speakAs: "double you",
    ipa: "/ˈdʌbəl juː/",
    strokes: ["M15,15 L32,85 L50,45 L68,85 L85,15"],
    lowercaseStrokes: ["M22,50 L36,85 L50,62 L64,85 L78,50"],
  },
  {
    letter: "X",
    speakAs: "ex",
    ipa: "/ɛks/",
    strokes: ["M25,15 L75,85", "M75,15 L25,85"],
    lowercaseStrokes: ["M32,50 L68,85", "M68,50 L32,85"],
  },
  {
    letter: "Y",
    speakAs: "why",
    ipa: "/waɪ/",
    strokes: ["M25,15 L50,50", "M75,15 L50,50 L50,85"],
    lowercaseStrokes: ["M30,50 L50,85", "M70,50 L32,98"],
  },
  {
    letter: "Z",
    speakAs: "zee",
    ipa: "/ziː/",
    strokes: ["M25,15 L75,15 L25,85 L75,85"],
    lowercaseStrokes: ["M32,50 L68,50 L32,85 L68,85"],
  },
];
