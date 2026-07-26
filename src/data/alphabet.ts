export interface AlphabetLetter {
  letter: string;
  speakAs: string;
  ipa: string;
  /** Ordered SVG path `d` strings on a 100x100 viewBox, one per stroke. */
  strokes: string[];
  lowercaseStrokes?: string[];
}

// Hand-authored simplified stroke-order paths for uppercase print letters
// (Zaner-Bloser-style single-line formation), on a shared 0-0-100-100 viewBox.
// Not derived from any font — geometry chosen to be clear and easy for a
// 5-year-old to trace, not calligraphically precise.
export const alphabet: AlphabetLetter[] = [
  {
    letter: "A",
    speakAs: "ay",
    ipa: "/eɪ/",
    strokes: ["M50,15 L20,85", "M50,15 L80,85", "M32.9,55 L67.1,55"],
    lowercaseStrokes: ["M62,45 C48,32 30,45 35,65 C40,82 62,75 62,50", "M62,35 L62,85"],
  },
  {
    letter: "B",
    speakAs: "bee",
    ipa: "/biː/",
    strokes: [
      "M25,15 L25,85",
      "M25,15 C55,15 65,25 65,32 C65,40 55,50 25,50 C55,50 68,60 68,67 C68,75 55,85 25,85",
    ],
    lowercaseStrokes: ["M30,15 L30,85", "M30,50 C50,35 75,50 70,68 C65,85 40,85 30,70"],
  },
  {
    letter: "C",
    speakAs: "cee",
    ipa: "/siː/",
    strokes: ["M70,25 C55,12 25,20 25,50 C25,80 55,88 70,75"],
    lowercaseStrokes: ["M70,40 C50,28 30,40 30,60 C30,80 55,88 70,75"],
  },
  {
    letter: "D",
    speakAs: "dee",
    ipa: "/diː/",
    strokes: ["M25,15 L25,85", "M25,15 C60,15 75,30 75,50 C75,70 60,85 25,85"],
    lowercaseStrokes: ["M70,50 C50,35 25,50 30,68 C35,85 60,85 70,70", "M70,15 L70,85"],
  },
  {
    letter: "E",
    speakAs: "ee",
    ipa: "/iː/",
    strokes: ["M25,15 L25,85", "M25,15 L70,15", "M25,50 L62,50", "M25,85 L70,85"],
    lowercaseStrokes: ["M30,55 L70,55 C70,35 45,30 30,50 C20,70 50,85 70,75"],
  },
  {
    letter: "F",
    speakAs: "ef",
    ipa: "/ɛf/",
    strokes: ["M25,15 L25,85", "M25,15 L70,15", "M25,50 L62,50"],
    lowercaseStrokes: ["M65,25 C50,15 40,25 40,85", "M25,45 L60,45"],
  },
  {
    letter: "G",
    speakAs: "gee",
    ipa: "/dʒiː/",
    strokes: ["M72,28 C55,12 25,20 25,50 C25,80 55,90 72,72", "M72,72 L72,50 L48,50"],
    lowercaseStrokes: ["M65,45 C50,30 30,45 35,65 C40,80 65,75 65,50", "M65,35 L65,80 C65,95 40,95 30,85"],
  },
  {
    letter: "H",
    speakAs: "aitch",
    ipa: "/eɪtʃ/",
    strokes: ["M25,15 L25,85", "M75,15 L75,85", "M25,50 L75,50"],
    lowercaseStrokes: ["M30,15 L30,85", "M30,48 C55,35 70,52 70,85"],
  },
  {
    letter: "I",
    speakAs: "eye",
    ipa: "/aɪ/",
    strokes: ["M50,15 L50,85"],
    lowercaseStrokes: ["M50,42 L50,85", "M50,23 L50,26"],
  },
  {
    letter: "J",
    speakAs: "jay",
    ipa: "/dʒeɪ/",
    strokes: ["M65,15 L65,65 C65,80 55,85 40,83 C30,80 25,75 25,68"],
    lowercaseStrokes: ["M60,42 L60,80 C60,95 40,95 30,85", "M60,23 L60,26"],
  },
  {
    letter: "K",
    speakAs: "kay",
    ipa: "/keɪ/",
    strokes: ["M25,15 L25,85", "M25,50 L75,15", "M25,50 L75,85"],
    lowercaseStrokes: ["M30,15 L30,85", "M65,45 L30,65", "M42,58 L65,85"],
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
    lowercaseStrokes: ["M25,40 L25,85", "M25,55 C35,40 50,40 50,85", "M50,55 C60,40 75,40 75,85"],
  },
  {
    letter: "N",
    speakAs: "en",
    ipa: "/ɛn/",
    strokes: ["M20,15 L20,85", "M20,15 L80,85", "M80,15 L80,85"],
    lowercaseStrokes: ["M30,40 L30,85", "M30,55 C45,40 70,40 70,85"],
  },
  {
    letter: "O",
    speakAs: "oh",
    ipa: "/oʊ/",
    strokes: ["M50,15 C72,15 78,35 78,50 C78,65 72,85 50,85 C28,85 22,65 22,50 C22,35 28,15 50,15"],
    lowercaseStrokes: ["M50,35 C70,35 75,55 75,65 C75,75 70,85 50,85 C30,85 25,75 25,65 C25,55 30,35 50,35"],
  },
  {
    letter: "P",
    speakAs: "pee",
    ipa: "/piː/",
    strokes: ["M25,15 L25,85", "M25,15 C55,15 65,22 65,32 C65,42 55,50 25,50"],
    lowercaseStrokes: ["M30,35 L30,95", "M30,45 C50,30 75,45 70,62 C65,80 40,80 30,65"],
  },
  {
    letter: "Q",
    speakAs: "cue",
    ipa: "/kjuː/",
    strokes: [
      "M50,15 C72,15 78,35 78,50 C78,65 72,85 50,85 C28,85 22,65 22,50 C22,35 28,15 50,15",
      "M62,62 L78,80",
    ],
    lowercaseStrokes: ["M70,45 C50,30 25,45 30,62 C35,80 60,80 70,65", "M70,35 L70,95"],
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
    lowercaseStrokes: ["M35,40 L35,85", "M35,55 C45,40 60,40 68,48"],
  },
  {
    letter: "S",
    speakAs: "ess",
    ipa: "/ɛs/",
    strokes: ["M70,25 C70,15 30,15 30,32 C30,48 70,45 70,62 C70,80 30,80 30,68"],
    lowercaseStrokes: ["M65,42 C65,35 35,35 35,50 C35,65 65,62 65,75 C65,88 35,88 35,78"],
  },
  {
    letter: "T",
    speakAs: "tee",
    ipa: "/tiː/",
    strokes: ["M20,15 L80,15", "M50,15 L50,85"],
    lowercaseStrokes: ["M45,20 L45,75 C45,85 55,85 65,80", "M30,38 L60,38"],
  },
  {
    letter: "U",
    speakAs: "you",
    ipa: "/juː/",
    strokes: ["M25,15 L25,65 C25,80 35,85 50,85 C65,85 75,80 75,65 L75,15"],
    lowercaseStrokes: ["M30,38 L30,70 C30,85 55,85 70,70", "M70,38 L70,85"],
  },
  {
    letter: "V",
    speakAs: "vee",
    ipa: "/viː/",
    strokes: ["M20,15 L50,85 L80,15"],
    lowercaseStrokes: ["M25,38 L50,85 L75,38"],
  },
  {
    letter: "W",
    speakAs: "double you",
    ipa: "/ˈdʌbəl juː/",
    strokes: ["M15,15 L32,85 L50,45 L68,85 L85,15"],
    lowercaseStrokes: ["M20,38 L35,85 L50,55 L65,85 L80,38"],
  },
  {
    letter: "X",
    speakAs: "ex",
    ipa: "/ɛks/",
    strokes: ["M25,15 L75,85", "M75,15 L25,85"],
    lowercaseStrokes: ["M30,38 L70,85", "M70,38 L30,85"],
  },
  {
    letter: "Y",
    speakAs: "why",
    ipa: "/waɪ/",
    strokes: ["M25,15 L50,50", "M75,15 L50,50 L50,85"],
    lowercaseStrokes: ["M30,38 L50,70", "M70,38 L35,92"],
  },
  {
    letter: "Z",
    speakAs: "zee",
    ipa: "/ziː/",
    strokes: ["M25,15 L75,15 L25,85 L75,85"],
    lowercaseStrokes: ["M30,38 L70,38 L30,85 L70,85"],
  },
];
