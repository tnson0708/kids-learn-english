import { vocabularyTopics } from "@/data/english/vocabulary";

export interface ZooCard {
  uid: string;
  animalId: string;
  emoji: string;
  word: string;
}

const PAIRS_BY_LEVEL = [2, 3, 4, 6, 8, 10, 12];

export function getPairsForLevel(level: number): number {
  return PAIRS_BY_LEVEL[Math.min(level, PAIRS_BY_LEVEL.length) - 1];
}

export type ZooDifficulty = "easy" | "normal" | "hard";

export const ZOO_DIFFICULTIES: ZooDifficulty[] = ["easy", "normal", "hard"];

const TIME_RULES: Record<ZooDifficulty, { secondsPerPair: number; baseSeconds: number }> = {
  easy: { secondsPerPair: 14, baseSeconds: 14 },
  normal: { secondsPerPair: 10, baseSeconds: 10 },
  hard: { secondsPerPair: 7, baseSeconds: 6 },
};

export function getTimeLimitForLevel(level: number, difficulty: ZooDifficulty): number {
  const { secondsPerPair, baseSeconds } = TIME_RULES[difficulty];
  return getPairsForLevel(level) * secondsPerPair + baseSeconds;
}

export type ZooBestLevels = Record<ZooDifficulty, number>;

export const EMPTY_BEST_LEVELS: ZooBestLevels = { easy: 0, normal: 0, hard: 0 };

const BEST_LEVELS_KEY = "kids_english_zoo_best_v1";

export function loadBestLevels(): ZooBestLevels {
  try {
    const saved = JSON.parse(localStorage.getItem(BEST_LEVELS_KEY) ?? "{}");
    return {
      easy: Number(saved.easy) || 0,
      normal: Number(saved.normal) || 0,
      hard: Number(saved.hard) || 0,
    };
  } catch {
    return EMPTY_BEST_LEVELS;
  }
}

export function saveBestLevels(best: ZooBestLevels) {
  try {
    localStorage.setItem(BEST_LEVELS_KEY, JSON.stringify(best));
  } catch {}
}

const BASE_COINS: Record<ZooDifficulty, number> = {
  easy: 3,
  normal: 5,
  hard: 8,
};

const FAST_FINISH_BONUS_COINS = 2;
const FAST_FINISH_TIME_RATIO = 0.5;

export function getCoinReward(difficulty: ZooDifficulty, timeLeft: number, timeLimit: number): number {
  const fastFinish = timeLeft >= timeLimit * FAST_FINISH_TIME_RATIO;
  return BASE_COINS[difficulty] + (fastFinish ? FAST_FINISH_BONUS_COINS : 0);
}

export function getMaxLevel(): number {
  return PAIRS_BY_LEVEL.length;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const animalItems = vocabularyTopics.find((topic) => topic.id === "animals")?.items ?? [];

export function buildZooDeck(level: number): ZooCard[] {
  const pairs = getPairsForLevel(level);
  const chosen = shuffle(animalItems).slice(0, pairs);
  const cards = chosen.flatMap((item) =>
    [0, 1].map((copy) => ({
      uid: `${item.id}-${copy}`,
      animalId: item.id,
      emoji: item.emoji,
      word: item.word.en,
    }))
  );
  return shuffle(cards);
}

export function getStars(moves: number, pairs: number): 1 | 2 | 3 {
  if (moves <= Math.ceil(pairs * 1.5)) return 3;
  if (moves <= pairs * 2.5) return 2;
  return 1;
}
