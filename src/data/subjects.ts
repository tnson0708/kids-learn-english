import type { TranslationKey } from "@/lib/i18n";

export interface SubjectLesson {
  labelKey: TranslationKey;
  href: string;
}

export interface Subject {
  id: string;
  href: string;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  emoji: string;
  /** Tailwind color tokens defined in globals.css (english-accent / vietnamese-accent / art-accent / soon). */
  accent: "english" | "vietnamese" | "art" | "soon";
  status: "active" | "soon";
  lessons?: SubjectLesson[];
}

export const subjects: Subject[] = [
  {
    id: "vietnamese",
    href: "/vietnamese",
    labelKey: "subject_vietnamese",
    descKey: "subject_vietnamese_desc",
    emoji: "📝",
    accent: "vietnamese",
    status: "active",
  },
  {
    id: "math",
    href: "/math",
    labelKey: "subject_math",
    descKey: "subject_math_desc",
    emoji: "🧮",
    accent: "soon",
    status: "soon",
  },
  {
    id: "english",
    href: "/english",
    labelKey: "subject_english",
    descKey: "subject_english_desc",
    emoji: "🇬🇧",
    accent: "english",
    status: "active",
    lessons: [
      { labelKey: "nav_alphabet", href: "/english/alphabet" },
      { labelKey: "nav_vocabulary", href: "/english/vocabulary" },
      { labelKey: "nav_qna", href: "/english/qna" },
      { labelKey: "nav_quiz", href: "/english/quiz" },
    ],
  },
  {
    id: "science",
    href: "/science",
    labelKey: "subject_science",
    descKey: "subject_science_desc",
    emoji: "🔬",
    accent: "soon",
    status: "soon",
  },
  {
    id: "music",
    href: "/music",
    labelKey: "subject_music",
    descKey: "subject_music_desc",
    emoji: "🎵",
    accent: "soon",
    status: "soon",
  },
  {
    id: "art",
    href: "/art",
    labelKey: "subject_art",
    descKey: "subject_art_desc",
    emoji: "🎨",
    accent: "art",
    status: "active",
    lessons: [{ labelKey: "nav_art_coloring", href: "/art/coloring-page" }],
  },
  {
    id: "sel",
    href: "/sel",
    labelKey: "subject_sel",
    descKey: "subject_sel_desc",
    emoji: "💗",
    accent: "soon",
    status: "soon",
  },
];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}
