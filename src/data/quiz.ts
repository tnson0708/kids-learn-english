import { vocabularyTopics, getTopic, type VocabItem } from "./vocabulary";
import { alphabet } from "./alphabet";

export type QuizMode = "listen" | "animals" | "colors" | "numbers" | "alphabet" | "look";

export interface QuizOption {
  id: string;
  label: string; // Text to display on card
  emoji?: string; // Optional emoji
  speakText?: string; // Text to speak when tapped or prompted
  isCorrect: boolean;
}

export interface QuizQuestionItem {
  id: string;
  promptText?: string; // Audio or text prompt, e.g. "Apple" or "Find the letter A"
  promptSpeak: string; // What TTS should speak when auto-played or replayed
  promptEmoji?: string; // Emoji to display if look mode
  promptIpa?: string; // Optional IPA hint
  options: QuizOption[];
  correctOptionId: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const ANIMAL_SOUNDS: Record<string, string> = {
  dog: "Woof woof! Where is the Dog?",
  cat: "Meow meow! Where is the Cat?",
  cow: "Moo moo! Where is the Cow?",
  duck: "Quack quack! Where is the Duck?",
  pig: "Oink oink! Where is the Pig?",
  lion: "Roar! Where is the Lion?",
  monkey: "Ooh ooh ah ah! Where is the Monkey?",
  mouse: "Squeak squeak! Where is the Mouse?",
  frog: "Ribbit ribbit! Where is the Frog?",
  chicken: "Cock-a-doodle-doo! Where is the Chicken?",
  elephant: "Trumpet! Where is the Elephant?",
  bee: "Buzz buzz! Where is the Bee?",
};

export function generateQuizRound(mode: QuizMode, questionCount = 10): QuizQuestionItem[] {
  if (mode === "alphabet") {
    const shuffledLetters = shuffleArray(alphabet);
    const selected = shuffledLetters.slice(0, Math.min(questionCount, alphabet.length));

    return selected.map((target, idx) => {
      const otherLetters = alphabet.filter((l) => l.letter !== target.letter);
      const distractors = shuffleArray(otherLetters).slice(0, 3);
      const allChoices = shuffleArray([target, ...distractors]);

      return {
        id: `quiz-alpha-${idx}-${target.letter}`,
        promptText: `Letter ${target.letter}`,
        promptSpeak: `Find letter ${target.speakAs || target.letter.toLowerCase()}`,
        promptIpa: target.ipa,
        correctOptionId: target.letter,
        options: allChoices.map((item) => ({
          id: item.letter,
          label: item.letter,
          speakText: item.speakAs || item.letter.toLowerCase(),
          isCorrect: item.letter === target.letter,
        })),
      };
    });
  }

  let poolItems: VocabItem[] = [];

  if (mode === "animals") {
    poolItems = getTopic("animals")?.items || [];
  } else if (mode === "colors") {
    const colors = getTopic("colors")?.items || [];
    const shapes = getTopic("shapes")?.items || [];
    poolItems = [...colors, ...shapes];
  } else if (mode === "numbers") {
    poolItems = getTopic("numbers")?.items || [];
  } else {
    // "listen" or "look" - all vocabulary
    poolItems = vocabularyTopics.flatMap((t) => t.items);
  }

  const shuffledVocab = shuffleArray(poolItems);
  const selected = shuffledVocab.slice(0, Math.min(questionCount, poolItems.length));

  return selected.map((target, idx) => {
    const otherItems = poolItems.filter((v) => v.id !== target.id);
    const distractors = shuffleArray(otherItems).slice(0, 3);
    const allChoices = shuffleArray([target, ...distractors]);

    if (mode === "animals") {
      const soundPrompt = ANIMAL_SOUNDS[target.id] || `Where is the ${target.word.en}?`;
      return {
        id: `quiz-animal-${idx}-${target.id}`,
        promptText: soundPrompt,
        promptSpeak: soundPrompt,
        promptIpa: target.word.ipa,
        correctOptionId: target.id,
        options: allChoices.map((item) => ({
          id: item.id,
          label: item.word.en,
          emoji: item.emoji,
          speakText: item.word.en,
          isCorrect: item.id === target.id,
        })),
      };
    }

    if (mode === "colors") {
      const prompt = `Find ${target.word.en}!`;
      return {
        id: `quiz-color-${idx}-${target.id}`,
        promptText: prompt,
        promptSpeak: prompt,
        promptIpa: target.word.ipa,
        correctOptionId: target.id,
        options: allChoices.map((item) => ({
          id: item.id,
          label: item.word.en,
          emoji: item.emoji,
          speakText: item.word.en,
          isCorrect: item.id === target.id,
        })),
      };
    }

    if (mode === "numbers") {
      const prompt = `Where is number ${target.word.en}?`;
      return {
        id: `quiz-num-${idx}-${target.id}`,
        promptText: prompt,
        promptSpeak: prompt,
        promptIpa: target.word.ipa,
        correctOptionId: target.id,
        options: allChoices.map((item) => ({
          id: item.id,
          label: item.word.en,
          emoji: item.emoji,
          speakText: item.word.en,
          isCorrect: item.id === target.id,
        })),
      };
    }

    if (mode === "listen") {
      // Listen to TTS ("Apple"), pick the right emoji/image
      return {
        id: `quiz-listen-${idx}-${target.id}`,
        promptText: `Where is the ${target.word.en}?`,
        promptSpeak: `Where is the ${target.word.en}?`,
        promptIpa: target.word.ipa,
        correctOptionId: target.id,
        options: allChoices.map((item) => ({
          id: item.id,
          label: item.word.en,
          emoji: item.emoji,
          speakText: item.word.en,
          isCorrect: item.id === target.id,
        })),
      };
    } else {
      // "look" mode: Look at Emoji (🍎), pick the right English word (reading mode)
      return {
        id: `quiz-look-${idx}-${target.id}`,
        promptEmoji: target.emoji,
        promptText: "What is this?",
        promptSpeak: target.word.en,
        promptIpa: target.word.ipa,
        correctOptionId: target.id,
        options: allChoices.map((item) => ({
          id: item.id,
          label: item.word.en,
          speakText: item.word.en,
          isCorrect: item.id === target.id,
        })),
      };
    }
  });
}
