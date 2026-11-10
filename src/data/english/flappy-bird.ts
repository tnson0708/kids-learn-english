import { alphabet } from "@/data/english/alphabet";
import { vocabularyTopics } from "@/data/english/vocabulary";

export type FlappyDifficulty = "beginner" | "easy" | "normal" | "hard";

export const FLAPPY_DIFFICULTIES: FlappyDifficulty[] = ["beginner", "easy", "normal", "hard"];

export interface FlappyRules {
  /** Horizontal scroll speed in px per 60fps frame. */
  speed: number;
  /**
   * Height of each opening in a gate, in px. A "double" gate has two openings to choose
   * between; a "single" gate has one big opening with the animal to touch in the middle.
   */
  gapHeight: number;
  lives: number;
  layout: "single" | "double";
}

export const FLAPPY_RULES: Record<FlappyDifficulty, FlappyRules> = {
  beginner: { speed: 1.4, gapHeight: 250, lives: 5, layout: "single" },
  easy: { speed: 1.7, gapHeight: 136, lives: 5, layout: "double" },
  normal: { speed: 2.2, gapHeight: 118, lives: 3, layout: "double" },
  hard: { speed: 2.8, gapHeight: 104, lives: 3, layout: "double" },
};

export type FlappyContent = "animals" | "numbers" | "letters";

export const FLAPPY_CONTENTS: FlappyContent[] = ["animals", "numbers", "letters"];

/** Something to find: shown in the gaps as `display`, named in the HUD by `label`, read aloud as `speak`. */
export interface FlappyItem {
  id: string;
  /** Emoji for animals; a big glyph (digit or capital letter) for numbers and letters. */
  display: string;
  isGlyph: boolean;
  label: string;
  speak: string;
}

const MAX_FLAPPY_NUMBER = 10;

const animalItems: FlappyItem[] =
  vocabularyTopics
    .find((topic) => topic.id === "animals")
    ?.items.map((item) => ({
      id: item.id,
      display: item.emoji,
      isGlyph: false,
      label: item.word.en,
      speak: item.word.en,
    })) ?? [];

const numberItems: FlappyItem[] = (vocabularyTopics.find((topic) => topic.id === "numbers")?.items ?? [])
  .filter((item) => {
    const n = Number(item.id.replace("num_", ""));
    return n >= 1 && n <= MAX_FLAPPY_NUMBER;
  })
  .map((item) => ({
    id: item.id,
    display: item.id.replace("num_", ""),
    isGlyph: true,
    label: item.word.en,
    speak: item.word.en,
  }));

// Capital letter in the gaps, lowercase in the HUD: matches the pair as well as the sound.
const letterItems: FlappyItem[] = alphabet.map((letter) => ({
  id: `letter_${letter.letter}`,
  display: letter.letter,
  isGlyph: true,
  label: letter.letter.toLowerCase(),
  speak: letter.speakAs || letter.letter.toLowerCase(),
}));

const ITEM_POOLS: Record<FlappyContent, FlappyItem[]> = {
  animals: animalItems,
  numbers: numberItems,
  letters: letterItems,
};

export interface FlappyGateItems {
  target: FlappyItem;
  decoy: FlappyItem;
}

export function pickGateItems(content: FlappyContent, previousTargetId?: string): FlappyGateItems {
  const all = ITEM_POOLS[content];
  const pool = all.filter((item) => item.id !== previousTargetId);
  const target = pool[Math.floor(Math.random() * pool.length)];
  const decoys = all.filter((item) => item.id !== target.id);
  const decoy = decoys[Math.floor(Math.random() * decoys.length)];
  return { target, decoy };
}

const COIN_RATE: Record<FlappyDifficulty, number> = { beginner: 0.3, easy: 0.5, normal: 0.75, hard: 1 };
const MAX_COINS_PER_GAME = 10;

export function getFlappyCoinReward(difficulty: FlappyDifficulty, score: number): number {
  return Math.min(MAX_COINS_PER_GAME, Math.floor(score * COIN_RATE[difficulty]));
}

export type FlappyDifficultyScores = Record<FlappyDifficulty, number>;

export type FlappyBestScores = Record<FlappyContent, FlappyDifficultyScores>;

const EMPTY_DIFFICULTY_SCORES: FlappyDifficultyScores = { beginner: 0, easy: 0, normal: 0, hard: 0 };

export const EMPTY_FLAPPY_BEST: FlappyBestScores = {
  animals: EMPTY_DIFFICULTY_SCORES,
  numbers: EMPTY_DIFFICULTY_SCORES,
  letters: EMPTY_DIFFICULTY_SCORES,
};

const BEST_SCORES_KEY = "kids_english_flappy_best_v1";

const toScores = (raw: Record<string, unknown> | undefined): FlappyDifficultyScores => ({
  beginner: Number(raw?.beginner) || 0,
  easy: Number(raw?.easy) || 0,
  normal: Number(raw?.normal) || 0,
  hard: Number(raw?.hard) || 0,
});

export function loadFlappyBest(): FlappyBestScores {
  try {
    const saved = JSON.parse(localStorage.getItem(BEST_SCORES_KEY) ?? "{}");
    // Scores saved before content types existed were flat per-difficulty animal scores.
    const legacyAnimals = saved.animals === undefined ? saved : undefined;
    return {
      animals: toScores(saved.animals ?? legacyAnimals),
      numbers: toScores(saved.numbers),
      letters: toScores(saved.letters),
    };
  } catch {
    return EMPTY_FLAPPY_BEST;
  }
}

export function saveFlappyBest(best: FlappyBestScores) {
  try {
    localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(best));
  } catch {}
}
