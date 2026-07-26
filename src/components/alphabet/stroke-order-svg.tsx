"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { AlphabetLetter } from "@/data/alphabet";
import { useLanguage } from "@/lib/language-context";

interface StrokeOrderSvgProps {
  letter: AlphabetLetter;
  className?: string;
  autoPlay?: boolean;
  showNumbers?: boolean;
  caseMode?: "uppercase" | "lowercase" | "both";
}

const STROKE_DURATION_MS = 550;
const STROKE_GAP_MS = 200;

export function StrokeOrderSvg({
  letter,
  className,
  autoPlay = true,
  showNumbers = true,
  caseMode = "uppercase",
}: StrokeOrderSvgProps) {
  const { t } = useLanguage();
  const [playKey, setPlayKey] = useState(0);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const activeStrokes =
    caseMode === "lowercase" && letter.lowercaseStrokes
      ? letter.lowercaseStrokes
      : letter.strokes;

  useEffect(() => {
    if (!autoPlay) return;
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.style.transition = "none";
      // Force reflow so the transition below reliably restarts on replay.
      void el.getBoundingClientRect();
      el.style.transition = `stroke-dashoffset ${STROKE_DURATION_MS}ms ease-in-out`;
      el.style.transitionDelay = `${i * (STROKE_DURATION_MS + STROKE_GAP_MS)}ms`;
      el.style.strokeDashoffset = "0";
    });
  }, [letter.letter, playKey, autoPlay, caseMode]);

  return (
    <div className="flex flex-col items-center">
      <div className={className}>
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          role="img"
          aria-label={`Stroke order for ${letter.letter}`}
        >
          <line x1="0" y1="85" x2="100" y2="85" stroke="currentColor" strokeOpacity={0.15} strokeDasharray="4 4" />
          <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeOpacity={0.15} strokeDasharray="4 4" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeOpacity={0.1} strokeDasharray="2 2" />
          <g fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
            {activeStrokes.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  pathRefs.current[i] = el;
                }}
                d={d}
              />
            ))}
          </g>
          {showNumbers && (
            <g fill="#f97316" fontSize={9} fontWeight={700}>
              {(() => {
                // Multiple strokes often start at the same point (e.g. the two
                // legs of "A" both start at the apex) — nudge repeat labels
                // sideways so they don't render stacked on top of each other.
                const seenPoints = new Map<string, number>();
                return activeStrokes.map((d, i) => {
                  const start = d.match(/M\s*(-?[\d.]+)[, ]\s*(-?[\d.]+)/);
                  if (!start) return null;
                  const x = parseFloat(start[1]);
                  const y = parseFloat(start[2]);
                  const key = `${Math.round(x)},${Math.round(y)}`;
                  const repeatIndex = seenPoints.get(key) ?? 0;
                  seenPoints.set(key, repeatIndex + 1);
                  return (
                    <text key={i} x={x - 9 + repeatIndex * 13} y={y - 2 - repeatIndex * 11}>
                      {i + 1}
                    </text>
                  );
                });
              })()}
            </g>
          )}
        </svg>
      </div>

      <button
        type="button"
        onClick={() => setPlayKey((k) => k + 1)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-2xs transition-all duration-150 hover:border-primary/50 hover:bg-accent hover:text-foreground hover:shadow-xs active:scale-95"
        title={t("alphabet_replay")}
        aria-label={t("alphabet_replay")}
      >
        <RotateCcw className="size-3.5" />
        <span>{t("alphabet_replay")}</span>
      </button>
    </div>
  );
}
