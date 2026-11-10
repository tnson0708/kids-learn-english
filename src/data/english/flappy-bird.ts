import { vocabularyTopics } from "@/data/english/vocabulary";

export type FlappyDifficulty = "easy" | "normal" | "hard";

export const FLAPPY_DIFFICULTIES: FlappyDifficulty[] = ["easy", "normal", "hard"];

export interface FlappyRules {
  /** Horizontal scroll speed in px per 60fps frame. */
  speed: number;
  /** Height of each of the two openings in a gate, in px. */
  gapHeight: number;
  lives: number;
}

export const FLAPPY_RULES: Record<FlappyDifficulty, FlappyRules> = {
  easy: { speed: 1.7, gapHeight: 136, lives: 5 },
  normal: { speed: 2.2, gapHeight: 118, lives: 3 },
  hard: { speed: 2.8, gapHeight: 104, lives: 3 },
};

export interface FlappyAnimal {
  id: string;
  emoji: string;
  word: string;
}

const animalItems: FlappyAnimal[] =
  vocabularyTopics
    .find((topic) => topic.id === "animals")
    ?.items.map((item) => ({ id: item.id, emoji: item.emoji, word: item.word.en })) ?? [];

export interface FlappyGateWords {
  target: FlappyAnimal;
  decoy: FlappyAnimal;
}

export function pickGateWords(previousTargetId?: string): FlappyGateWords {
  const pool = animalItems.filter((a) => a.id !== previousTargetId);
  const target = pool[Math.floor(Math.random() * pool.length)];
  const decoys = animalItems.filter((a) => a.id !== target.id);
  const decoy = decoys[Math.floor(Math.random() * decoys.length)];
  return { target, decoy };
}

const COIN_RATE: Record<FlappyDifficulty, number> = { easy: 0.5, normal: 0.75, hard: 1 };
const MAX_COINS_PER_GAME = 10;

export function getFlappyCoinReward(difficulty: FlappyDifficulty, score: number): number {
  return Math.min(MAX_COINS_PER_GAME, Math.floor(score * COIN_RATE[difficulty]));
}

export type FlappyBestScores = Record<FlappyDifficulty, number>;

export const EMPTY_FLAPPY_BEST: FlappyBestScores = { easy: 0, normal: 0, hard: 0 };

const BEST_SCORES_KEY = "kids_english_flappy_best_v1";

export function loadFlappyBest(): FlappyBestScores {
  try {
    const saved = JSON.parse(localStorage.getItem(BEST_SCORES_KEY) ?? "{}");
    return {
      easy: Number(saved.easy) || 0,
      normal: Number(saved.normal) || 0,
      hard: Number(saved.hard) || 0,
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
