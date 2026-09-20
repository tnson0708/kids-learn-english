"use client";

import { useId, useState } from "react";
import { RotateCcw, Turtle, Rabbit } from "lucide-react";
import {
  CELL_H,
  CELL_W,
  GLYPH_OFFSET_Y,
  getLetterGlyph,
  strokeStartPoint,
  type LetterCase,
} from "@/data/vietnamese/letter-strokes";
import { OlyGridLines } from "@/components/vietnamese/oly-grid";
import { cn } from "@/lib/utils";

export const STROKE_COLORS = ["#dc2626", "#2563eb", "#16a34a", "#d97706", "#7c3aed"];

interface LetterStrokeGuideProps {
  /** Lowercase key of the letter, e.g. "ă" or "đ". */
  letter: string;
  letterCase: LetterCase;
  className?: string;
}

/**
 * Animated "how to write this letter" panel: the letter is drawn stroke by stroke on an ô ly
 * grid with a moving pen tip, numbered start points and one colour per stroke, so a child can
 * follow both the order and the direction of each stroke before copying it on paper.
 */
export function LetterStrokeGuide({ letter, letterCase, className }: LetterStrokeGuideProps) {
  const glyph = getLetterGlyph(letter, letterCase);
  const [runId, setRunId] = useState(0);
  const [slow, setSlow] = useState(false);
  const idPrefix = useId().replace(/:/g, "");

  if (!glyph) return null;

  const strokeDur = slow ? 2.2 : 1.2;
  const gap = 0.4;
  const lead = 0.4;
  const strokes = glyph.strokes;
  const totalDur = lead + strokes.length * (strokeDur + gap);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative w-full rounded-2xl border border-sky-200 bg-sky-50/40 overflow-hidden">
        {/* key={runId} remounts the SVG so every SMIL timeline restarts from 0 */}
        <svg
          key={`${letter}-${letterCase}-${runId}-${slow ? "s" : "f"}`}
          viewBox={`0 0 ${CELL_W} ${CELL_H}`}
          className="mx-auto block h-[300px] sm:h-[340px] w-auto max-w-full"
          role="img"
          aria-label={`Cách viết chữ ${letterCase === "upper" ? "hoa" : "thường"} ${letter}`}
        >
          <rect width={CELL_W} height={CELL_H} fill="#ffffff" />
          <OlyGridLines width={CELL_W} height={CELL_H} />

          <g transform={`translate(0, ${GLYPH_OFFSET_Y})`}>
            {/* Ghost of the whole letter so the child sees the target shape from the start */}
            {strokes.map((d, i) => (
              <path
                key={`ghost-${i}`}
                d={d}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={11}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Animated strokes */}
            {strokes.map((d, i) => {
              const begin = lead + i * (strokeDur + gap);
              const color = STROKE_COLORS[i % STROKE_COLORS.length];
              const pathId = `${idPrefix}-s${i}`;
              return (
                <g key={`stroke-${i}`}>
                  <path
                    id={pathId}
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke={color}
                    strokeWidth={9}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="1"
                      to="0"
                      dur={`${strokeDur}s`}
                      begin={`${begin}s`}
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.4 0 0.6 1"
                    />
                  </path>
                  {/* Pen tip that travels along the stroke while it is being drawn */}
                  <g opacity={0}>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.95;1" dur={`${strokeDur}s`} begin={`${begin}s`} fill="remove" />
                    <circle r={8} fill="#0f172a" stroke="#ffffff" strokeWidth={2.5}>
                      <animateMotion dur={`${strokeDur}s`} begin={`${begin}s`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.6 1" keyTimes="0;1" keyPoints="0;1">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  </g>
                </g>
              );
            })}

            {/* Numbered start markers, always visible */}
            {strokes.map((d, i) => {
              const { x, y } = strokeStartPoint(d);
              const color = STROKE_COLORS[i % STROKE_COLORS.length];
              return (
                <g key={`start-${i}`}>
                  <circle cx={x} cy={y} r={7.5} fill="#ffffff" stroke={color} strokeWidth={2} />
                  <text
                    x={x}
                    y={y + 3.4}
                    fontSize={9.5}
                    fontWeight={800}
                    textAnchor="middle"
                    fill={color}
                    fontFamily="var(--font-heading), Nunito, sans-serif"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-extrabold border border-sky-200">
          {strokes.length} nét • {letterCase === "upper" ? "Chữ hoa" : "Chữ thường"} • {Math.ceil(totalDur)}s
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF5722] hover:bg-orange-600 text-white text-xs font-extrabold transition-colors shadow-2xs"
        >
          <RotateCcw className="size-3.5" />
          Xem lại cách viết
        </button>
        <button
          type="button"
          onClick={() => {
            setSlow((s) => !s);
            setRunId((n) => n + 1);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
        >
          {slow ? <Rabbit className="size-3.5" /> : <Turtle className="size-3.5" />}
          {slow ? "Viết nhanh hơn" : "Viết chậm lại"}
        </button>
        <div className="flex items-center gap-1 ml-auto">
          {strokes.map((_, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded-full text-[11px] font-extrabold text-white flex items-center justify-center"
              style={{ backgroundColor: STROKE_COLORS[i % STROKE_COLORS.length] }}
              title={`Nét ${i + 1}`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
