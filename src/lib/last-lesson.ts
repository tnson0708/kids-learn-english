import type { TranslationKey } from "./i18n";

const LAST_LESSON_KEY = "ela_kids_last_lesson_v1";

export interface LastLesson {
  href: string;
  labelKey: TranslationKey;
}

/** Records the most recently visited lesson so the homepage can offer a "resume" shortcut. */
export function recordLastLesson(lesson: LastLesson): void {
  try {
    localStorage.setItem(LAST_LESSON_KEY, JSON.stringify(lesson));
  } catch {
    // Ignore localStorage errors
  }
}

export function getLastLesson(): LastLesson | null {
  try {
    const saved = localStorage.getItem(LAST_LESSON_KEY);
    return saved ? (JSON.parse(saved) as LastLesson) : null;
  } catch {
    return null;
  }
}
