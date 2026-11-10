"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import {
  EMPTY_FLAPPY_BEST,
  FLAPPY_DIFFICULTIES,
  FLAPPY_RULES,
  getFlappyCoinReward,
  loadFlappyBest,
  pickGateWords,
  saveFlappyBest,
  type FlappyAnimal,
  type FlappyBestScores,
  type FlappyDifficulty,
  type FlappyRules,
} from "@/data/english/flappy-bird";
import { useVoice } from "@/lib/voice-context";
import { useLanguage } from "@/lib/language-context";
import { useReward } from "@/lib/reward-context";
import { useIsWide, useMinWidth } from "@/lib/use-is-wide";
import { playCorrectSound, playVictorySound, playWrongSound } from "@/lib/sound-effects";
import { GoldCoin } from "@/components/gold-coin";
import { cn } from "@/lib/utils";

type Phase = "intro" | "playing" | "over";

// Logical canvas size; the element is scaled with CSS.
const W = 360;
const H = 560;
const GROUND_H = 56;
const PLAY_H = H - GROUND_H;

const BIRD_X = 96;
const BIRD_R = 16;
const HIT_R = 12;
const GRAVITY = 0.42;
const FLAP_VELOCITY = -7.2;
const MAX_FALL_SPEED = 9;

const PIPE_W = 64;
const PIPE_CAP_H = 18;
const MID_H = 46;
const MIN_PIPE_H = 44;
const GATE_SPACING = 240;
const FIRST_GATE_OFFSET = 80;

const FRAME_MS = 1000 / 60;
const MAX_DELTA_MS = 50;
const INVULNERABLE_MS = 1500;
const FLOAT_TEXT_MS = 900;

const EMOJI_FONT = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';

// Viewport height taken by the site header/nav around the board; the HUD lives inside it.
// Below the `lg` breakpoint a fixed bottom nav bar adds to the header height.
const LARGE_SCREEN_PX = 1024;
const RESERVED_HEIGHT_PHONE_REM = 12.5;
const RESERVED_HEIGHT_TABLET_REM = 16;
const RESERVED_HEIGHT_DESKTOP_REM = 11;
const MIN_BOARD_REM = 20;
const MAX_BOARD_REM = 56;

const DIFFICULTY_EMOJI: Record<FlappyDifficulty, string> = {
  easy: "🐢",
  normal: "🐰",
  hard: "🐆",
};

interface Gate {
  x: number;
  top: number;
  target: FlappyAnimal;
  decoy: FlappyAnimal;
  correctGap: 0 | 1;
  resolved: boolean;
}

interface FloatText {
  text: string;
  x: number;
  y: number;
  age: number;
  color: string;
}

interface GameState {
  birdY: number;
  vel: number;
  started: boolean;
  over: boolean;
  time: number;
  scroll: number;
  gates: Gate[];
  score: number;
  lives: number;
  invulnerableUntil: number;
  floats: FloatText[];
}

interface GameEvents {
  onScore: (score: number) => void;
  onLives: (lives: number) => void;
  onTarget: (animal: FlappyAnimal) => void;
  onEnd: (score: number) => void;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const circleHitsRect = (cx: number, cy: number, r: number, rx: number, ry: number, rw: number, rh: number) => {
  const nearestX = clamp(cx, rx, rx + rw);
  const nearestY = clamp(cy, ry, ry + rh);
  return (cx - nearestX) ** 2 + (cy - nearestY) ** 2 < r * r;
};

const gapTop = (gate: Gate, rules: FlappyRules, index: 0 | 1) =>
  gate.top + index * (rules.gapHeight + MID_H);

function createGate(x: number, rules: FlappyRules, previousTargetId?: string): Gate {
  const slack = PLAY_H - 2 * rules.gapHeight - MID_H;
  const jitter = slack * 0.3;
  const top = clamp(slack / 2 + (Math.random() * 2 - 1) * jitter, MIN_PIPE_H, slack - MIN_PIPE_H);
  const { target, decoy } = pickGateWords(previousTargetId);
  return { x, top, target, decoy, correctGap: Math.random() < 0.5 ? 0 : 1, resolved: false };
}

function ensureGates(g: GameState, rules: FlappyRules) {
  for (;;) {
    const last = g.gates[g.gates.length - 1];
    const x = last ? last.x + GATE_SPACING : W + FIRST_GATE_OFFSET;
    if (x > W + GATE_SPACING) return;
    g.gates.push(createGate(x, rules, last?.target.id));
  }
}

function createGame(rules: FlappyRules): GameState {
  const g: GameState = {
    birdY: PLAY_H / 2,
    vel: 0,
    started: false,
    over: false,
    time: 0,
    scroll: 0,
    gates: [],
    score: 0,
    lives: rules.lives,
    invulnerableUntil: 0,
    floats: [],
  };
  ensureGates(g, rules);
  return g;
}

function hitsGate(g: GameState, gate: Gate, rules: FlappyRules) {
  if (BIRD_X + HIT_R <= gate.x || BIRD_X - HIT_R >= gate.x + PIPE_W) return false;
  const gap1Top = gapTop(gate, rules, 1);
  const rects: [number, number][] = [
    [0, gate.top],
    [gate.top + rules.gapHeight, gap1Top],
    [gap1Top + rules.gapHeight, PLAY_H],
  ];
  return rects.some(([from, to]) => circleHitsRect(BIRD_X, g.birdY, HIT_R, gate.x, from, PIPE_W, to - from));
}

function gapIndexAt(gate: Gate, rules: FlappyRules, y: number): 0 | 1 | -1 {
  for (const index of [0, 1] as const) {
    const top = gapTop(gate, rules, index);
    if (y >= top && y <= top + rules.gapHeight) return index;
  }
  return -1;
}

function addFloat(g: GameState, text: string, color: string) {
  g.floats.push({ text, x: BIRD_X + 20, y: g.birdY - 24, age: 0, color });
}

/** Returns true when the game ended. */
function loseLife(g: GameState, reason: "hit" | "wrong" | "ground", wrongLabel: string, ev: GameEvents) {
  g.lives -= 1;
  ev.onLives(g.lives);
  playWrongSound();
  addFloat(g, reason === "wrong" ? wrongLabel : "💥", "#e53935");

  if (g.lives <= 0) {
    g.over = true;
    ev.onEnd(g.score);
    return true;
  }
  g.invulnerableUntil = g.time + INVULNERABLE_MS;
  if (reason !== "wrong") {
    g.birdY = PLAY_H * 0.45;
    g.vel = 0;
  }
  return false;
}

function stepGame(g: GameState, rules: FlappyRules, delta: number, labels: { wrong: string; correct: string }, ev: GameEvents) {
  g.time += delta;
  g.floats = g.floats.filter((f) => {
    f.age += delta;
    return f.age < FLOAT_TEXT_MS;
  });

  if (!g.started) {
    g.birdY = PLAY_H / 2 + Math.sin(g.time / 220) * 6;
    return;
  }

  const dt = delta / FRAME_MS;
  g.vel = Math.min(g.vel + GRAVITY * dt, MAX_FALL_SPEED);
  g.birdY += g.vel * dt;
  if (g.birdY < BIRD_R) {
    g.birdY = BIRD_R;
    g.vel = 0;
  }

  g.scroll += rules.speed * dt;
  for (const gate of g.gates) gate.x -= rules.speed * dt;
  g.gates = g.gates.filter((gate) => gate.x + PIPE_W > -10);
  ensureGates(g, rules);

  const invulnerable = g.time < g.invulnerableUntil;

  for (const gate of g.gates) {
    if (!invulnerable && hitsGate(g, gate, rules)) {
      loseLife(g, "hit", labels.wrong, ev);
      return;
    }

    if (!gate.resolved && gate.x + PIPE_W / 2 <= BIRD_X) {
      gate.resolved = true;
      if (!invulnerable) {
        if (gapIndexAt(gate, rules, g.birdY) === gate.correctGap) {
          g.score += 1;
          ev.onScore(g.score);
          playCorrectSound();
          addFloat(g, `+1 ${labels.correct}`, "#2e7d32");
        } else if (loseLife(g, "wrong", labels.wrong, ev)) {
          return;
        }
      }
      const next = g.gates.find((candidate) => !candidate.resolved);
      if (next) ev.onTarget(next.target);
    }
  }

  if (!invulnerable && g.birdY + BIRD_R >= PLAY_H) {
    loseLife(g, "ground", labels.wrong, ev);
  }
}

function drawPipeSegment(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, caps: "top" | "bottom" | "both") {
  if (h <= 0) return;
  ctx.fillStyle = "#4caf50";
  ctx.strokeStyle = "#2e7d32";
  ctx.lineWidth = 2;
  ctx.fillRect(x, y, PIPE_W, h);
  ctx.strokeRect(x, y, PIPE_W, h);

  ctx.fillStyle = "#66bb6a";
  ctx.fillRect(x + 8, y, 8, h);

  const drawCap = (capY: number) => {
    ctx.fillStyle = "#43a047";
    ctx.fillRect(x - 4, capY, PIPE_W + 8, PIPE_CAP_H);
    ctx.strokeRect(x - 4, capY, PIPE_W + 8, PIPE_CAP_H);
  };
  if (caps === "bottom" || caps === "both") drawCap(y + h - PIPE_CAP_H);
  if (caps === "top" || caps === "both") drawCap(y);
}

function drawScene(ctx: CanvasRenderingContext2D, g: GameState, rules: FlappyRules) {
  const sky = ctx.createLinearGradient(0, 0, 0, PLAY_H);
  sky.addColorStop(0, "#87ceeb");
  sky.addColorStop(1, "#e0f6ff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `44px ${EMOJI_FONT}`;
  ctx.globalAlpha = 0.85;
  [
    [60, 70],
    [210, 130],
    [330, 50],
    [120, 220],
  ].forEach(([cx, cy], i) => {
    const x = (((cx - g.scroll * 0.25 * (1 + i * 0.2)) % (W + 80)) + W + 80) % (W + 80) - 40;
    ctx.fillText("☁️", x, cy);
  });
  ctx.globalAlpha = 1;

  for (const gate of g.gates) {
    const gap0 = gapTop(gate, rules, 0);
    const gap1 = gapTop(gate, rules, 1);
    drawPipeSegment(ctx, gate.x, 0, gate.top, "bottom");
    drawPipeSegment(ctx, gate.x, gap0 + rules.gapHeight, MID_H, "both");
    drawPipeSegment(ctx, gate.x, gap1 + rules.gapHeight, PLAY_H - gap1 - rules.gapHeight, "top");

    const animals = gate.correctGap === 0 ? [gate.target, gate.decoy] : [gate.decoy, gate.target];
    ([0, 1] as const).forEach((index) => {
      const cx = gate.x + PIPE_W / 2;
      const cy = gapTop(gate, rules, index) + rules.gapHeight / 2;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `34px ${EMOJI_FONT}`;
      ctx.fillStyle = "#000";
      ctx.fillText(animals[index].emoji, cx, cy + 2);
    });
  }

  ctx.fillStyle = "#ded895";
  ctx.fillRect(0, PLAY_H, W, GROUND_H);
  ctx.fillStyle = "#73bf2e";
  ctx.fillRect(0, PLAY_H, W, 12);
  ctx.fillStyle = "#cbbf7a";
  const offset = g.scroll % 24;
  for (let x = -24; x < W + 24; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x - offset, PLAY_H + 12);
    ctx.lineTo(x - offset + 12, PLAY_H + 12);
    ctx.lineTo(x - offset - 2, H);
    ctx.lineTo(x - offset - 14, H);
    ctx.closePath();
    ctx.fill();
  }

  const blinking = g.time < g.invulnerableUntil && Math.floor(g.time / 120) % 2 === 0;
  ctx.save();
  ctx.translate(BIRD_X, g.birdY);
  ctx.rotate(clamp(g.vel * 0.06, -0.5, 1));
  ctx.scale(-1, 1);
  ctx.globalAlpha = blinking ? 0.35 : 1;
  ctx.font = `38px ${EMOJI_FONT}`;
  ctx.fillText("🐦", 0, 1);
  ctx.restore();

  ctx.font = `bold 16px sans-serif`;
  for (const f of g.floats) {
    ctx.globalAlpha = 1 - f.age / FLOAT_TEXT_MS;
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, f.y - f.age * 0.04);
  }
  ctx.globalAlpha = 1;
}

interface GameResult {
  score: number;
  coins: number;
  newRecord: boolean;
}

export default function FlappyBirdPage() {
  const { t } = useLanguage();
  const { speak } = useVoice();
  const { addQuizCoins } = useReward();
  const isWide = useIsWide();
  const isLarge = useMinWidth(LARGE_SCREEN_PX);

  const [phase, setPhase] = useState<Phase>("intro");
  const [difficulty, setDifficulty] = useState<FlappyDifficulty>("normal");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(0);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [target, setTarget] = useState<FlappyAnimal | null>(null);
  const [best, setBest] = useState<FlappyBestScores>(EMPTY_FLAPPY_BEST);
  const [result, setResult] = useState<GameResult>({ score: 0, coins: 0, newRecord: false });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState | null>(null);
  const pausedRef = useRef(false);
  const speakRef = useRef(speak);
  const addCoinsRef = useRef(addQuizCoins);
  const bestRef = useRef(best);
  const labelsRef = useRef({ wrong: "", correct: "" });

  useEffect(() => {
    labelsRef.current = { wrong: t("flappy_wrong_gap"), correct: t("flappy_correct_gap") };
    speakRef.current = speak;
    addCoinsRef.current = addQuizCoins;
    bestRef.current = best;
  });

  useEffect(() => {
    const loadBest = setTimeout(() => setBest(loadFlappyBest()), 0);
    return () => clearTimeout(loadBest);
  }, []);

  const startGame = () => {
    const game = createGame(FLAPPY_RULES[difficulty]);
    gameRef.current = game;
    pausedRef.current = false;
    setPaused(false);
    setStarted(false);
    setScore(0);
    setLives(game.lives);
    setTarget(game.gates[0].target);
    setPhase("playing");
  };

  const setPausedState = (value: boolean) => {
    pausedRef.current = value;
    setPaused(value);
  };

  const flap = () => {
    const g = gameRef.current;
    if (!g || g.over || pausedRef.current) return;
    if (!g.started) {
      g.started = true;
      setStarted(true);
      const next = g.gates.find((gate) => !gate.resolved);
      if (next) speakRef.current(next.target.word, "en");
    }
    g.vel = FLAP_VELOCITY;
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rules = FLAPPY_RULES[difficulty];
    const events: GameEvents = {
      onScore: setScore,
      onLives: setLives,
      onTarget: (animal) => {
        setTarget(animal);
        speakRef.current(animal.word, "en");
      },
      onEnd: (finalScore) => {
        const coins = getFlappyCoinReward(difficulty, finalScore);
        const earned = coins > 0 ? addCoinsRef.current(coins) : 0;
        const newRecord = finalScore > bestRef.current[difficulty];
        if (newRecord) {
          const nextBest = { ...bestRef.current, [difficulty]: finalScore };
          setBest(nextBest);
          saveFlappyBest(nextBest);
          playVictorySound();
        }
        setResult({ score: finalScore, coins: earned, newRecord });
        setPhase("over");
      },
    };

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const g = gameRef.current;
      if (!g) return;
      const delta = Math.min(now - last, MAX_DELTA_MS);
      last = now;
      if (!pausedRef.current) stepGame(g, rules, delta, labelsRef.current, events);
      drawScene(ctx, g, rules);
      if (!g.over) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [phase, difficulty]);

  useEffect(() => {
    if (phase !== "playing") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (!e.repeat) flap();
      }
    };
    const pauseWhenHidden = () => {
      if (document.hidden) setPausedState(true);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [phase]);

  const backLink = (
    <Link
      href="/english/quiz"
      className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2.5 text-sm font-extrabold text-foreground shadow-xs transition-all hover:bg-accent hover:shadow-md active:scale-95"
    >
      <ArrowLeft className="size-5 text-primary" />
      <span>{t("quiz_back_to_modes")}</span>
    </Link>
  );

  if (phase === "intro") {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-10 text-center">
        <div className="mb-4 text-7xl" aria-hidden>
          🐦🐱🐶
        </div>
        <h1 className="font-heading text-3xl font-black text-foreground sm:text-4xl">{t("flappy_title")}</h1>
        <p className="mt-3 text-sm font-semibold text-muted-foreground sm:text-base">{t("flappy_intro")}</p>

        <div className="mt-6 w-full">
          <p className="mb-2 text-sm font-extrabold text-foreground">{t("zoo_pick_difficulty")}</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3" role="radiogroup" aria-label={t("zoo_pick_difficulty")}>
            {FLAPPY_DIFFICULTIES.map((d) => {
              const selected = d === difficulty;
              return (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-2xl border-2 px-2 py-3 transition-all active:scale-95",
                    selected ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card hover:bg-accent"
                  )}
                >
                  <span className="text-3xl" aria-hidden>
                    {DIFFICULTY_EMOJI[d]}
                  </span>
                  <span className="font-heading text-base font-extrabold text-foreground">
                    {t(`zoo_diff_${d}`)}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {t(`flappy_diff_${d}_desc`)}
                  </span>
                  <span className="mt-0.5 flex items-center gap-0.5 text-xs font-bold text-primary">
                    <Heart className="size-3 fill-current" />
                    {FLAPPY_RULES[d].lives}
                  </span>
                  {best[d] > 0 && (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">🏆 {best[d]}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={startGame}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-lg font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
        >
          {t("zoo_start")}
        </button>
        <div className="mt-6">{backLink}</div>
      </div>
    );
  }

  if (phase === "over") {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mb-3 text-6xl" aria-hidden>
          🐦
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-foreground sm:text-4xl">{t("flappy_game_over")}</h1>

        {result.newRecord && (
          <div className="mt-2 inline-flex animate-bounce items-center gap-1.5 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-black text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            🏆 {t("zoo_new_record")}
          </div>
        )}

        <div className="my-4 flex items-end gap-6">
          <div>
            <div className="font-heading text-6xl font-black text-primary">{result.score}</div>
            <div className="text-sm font-bold text-muted-foreground">{t("flappy_score")}</div>
          </div>
          <div>
            <div className="font-heading text-3xl font-black text-amber-500">🏆 {best[difficulty]}</div>
            <div className="text-sm font-bold text-muted-foreground">{t("flappy_best")}</div>
          </div>
        </div>

        {result.coins > 0 && (
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            <GoldCoin className="size-4 shrink-0" />
            <span>
              {t("zoo_coins_earned")} <strong>+{result.coins}</strong> {t("gifts_dong")}
            </span>
          </div>
        )}

        <div className="flex w-full max-w-xs flex-col gap-3">
          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
          >
            <RotateCcw className="size-4" />
            {t("flappy_play_again")}
          </button>
          <button
            type="button"
            onClick={() => setPhase("intro")}
            className="text-sm font-bold text-muted-foreground underline-offset-2 hover:underline"
          >
            {t("zoo_change_difficulty")}
          </button>
          <div className="mt-2 flex justify-center">{backLink}</div>
        </div>
      </div>
    );
  }

  const reservedHeight = isLarge
    ? RESERVED_HEIGHT_DESKTOP_REM
    : isWide
    ? RESERVED_HEIGHT_TABLET_REM
    : RESERVED_HEIGHT_PHONE_REM;
  const boardHeight = `clamp(${MIN_BOARD_REM}rem, calc(100dvh - ${reservedHeight}rem), ${MAX_BOARD_REM}rem)`;
  const stopFlap = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-2 py-2 sm:px-4 sm:py-3">
      <div
        className="relative mx-auto touch-none select-none overflow-hidden rounded-2xl border-2 border-sky-300 shadow-md"
        style={{
          width: `min(100%, calc(${boardHeight} * ${W} / ${H}))`,
          aspectRatio: `${W} / ${H}`,
        }}
        onPointerDown={flap}
      >
        <canvas ref={canvasRef} className="size-full" />

        {/* In-game HUD */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-1.5 p-2">
          <div className="flex w-full items-start justify-between gap-2">
            <Link
              href="/english/quiz"
              aria-label={t("quiz_back_to_modes")}
              onPointerDown={stopFlap}
              className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md transition-all active:scale-95"
            >
              <ArrowLeft className="size-5 text-primary" />
            </Link>
            <div
              aria-label={`${lives}`}
              className="inline-flex items-center gap-0.5 rounded-full bg-white/85 px-3 py-2 shadow-md"
            >
              {Array.from({ length: FLAPPY_RULES[difficulty].lives }, (_, i) => (
                <Heart
                  key={i}
                  className={cn(
                    "size-5",
                    i < lives ? "fill-rose-500 text-rose-500" : "fill-transparent text-rose-300"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPausedState(true)}
              onPointerDown={stopFlap}
              disabled={paused}
              aria-label={t("zoo_pause")}
              className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-full bg-white/85 text-foreground shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Pause className="size-5" />
            </button>
          </div>

          <div
            aria-label={`${t("flappy_score")} ${score}`}
            className="font-heading text-5xl font-black leading-none tabular-nums text-white [text-shadow:0_2px_0_rgba(0,0,0,0.35),0_0_10px_rgba(0,0,0,0.25)]"
          >
            {score}
          </div>

          <button
            type="button"
            onClick={() => target && speak(target.word, "en")}
            onPointerDown={stopFlap}
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-amber-100/95 px-4 py-2 text-sm font-extrabold text-amber-800 shadow-md transition-all active:scale-95"
          >
            <Volume2 className="size-4" />
            <span>
              {t("flappy_find")}: <span className="font-heading text-lg font-black">{target?.word}</span>
            </span>
          </button>
        </div>

        {!started && !paused && (
          <div className="pointer-events-none absolute inset-x-0 top-[62%] flex flex-col items-center gap-1 text-center">
            <span className="text-4xl motion-safe:animate-bounce" aria-hidden>
              👆
            </span>
            <span className="rounded-full bg-white/90 px-4 py-1.5 font-heading text-base font-black text-foreground shadow-md">
              {t("flappy_tap_to_fly")}
            </span>
          </div>
        )}

        {paused && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-card/95"
            onPointerDown={stopFlap}
          >
            <div className="text-5xl" aria-hidden>
              ⏸️
            </div>
            <p className="font-heading text-xl font-extrabold text-foreground">{t("zoo_paused")}</p>
            <button
              type="button"
              onClick={() => setPausedState(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-base font-extrabold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
            >
              <Play className="size-5" />
              {t("zoo_resume")}
            </button>
            {backLink}
          </div>
        )}
      </div>
    </div>
  );
}
