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
