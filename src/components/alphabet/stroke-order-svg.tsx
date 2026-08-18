"use client";

import { useState } from "react";
import type { AlphabetLetter } from "@/data/alphabet";
import { cn } from "@/lib/utils";

interface StrokeOrderSvgProps {
  letter: AlphabetLetter;
  className?: string;
  showNumbers?: boolean;
  caseMode?: "uppercase" | "lowercase" | "both";
}

/** Calculate starting position and tangent angle for directional arrowheads. */
function getStrokeArrowData(pathD: string): {
  startX: number;
  startY: number;
  arrowX: number;
  arrowY: number;
  angleDeg: number;
} | null {
  const match = pathD.match(/M\s*(-?[\d.]+)[, ]\s*(-?[\d.]+)\s*([LC])\s*(-?[\d.]+)[, ]\s*(-?[\d.]+)/i);
  if (!match) return null;

  const startX = parseFloat(match[1]);
  const startY = parseFloat(match[2]);
  const targetX = parseFloat(match[4]);
  const targetY = parseFloat(match[5]);

  const dx = targetX - startX;
  const dy = targetY - startY;

  const len = Math.hypot(dx, dy);
  if (len < 0.1) return null;

  const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

  const dist = Math.min(16, len * 0.45);
  const arrowX = startX + (dx / len) * dist;
  const arrowY = startY + (dy / len) * dist;

  return { startX, startY, arrowX, arrowY, angleDeg };
}

export function StrokeOrderSvg({
  letter,
  className,
  showNumbers = true,
  caseMode: initialCaseMode = "uppercase",
}: StrokeOrderSvgProps) {
  const [selectedMode, setSelectedMode] = useState<"uppercase" | "lowercase">(
    initialCaseMode === "lowercase" ? "lowercase" : "uppercase"
  );

  const activeStrokes =
    selectedMode === "lowercase" && letter.lowercaseStrokes
      ? letter.lowercaseStrokes
      : letter.strokes;

  const displayChar = selectedMode === "lowercase" ? letter.letter.toLowerCase() : letter.letter;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Case Mode Switch (In Hoa / In Thường) */}
      {letter.lowercaseStrokes && (
        <div className="inline-flex rounded-full bg-muted/60 p-1 text-xs font-extrabold shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedMode("uppercase")}
            className={cn(
              "rounded-full px-3.5 py-1 transition-all active:scale-95",
              selectedMode === "uppercase"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            In Hoa ({letter.letter})
          </button>
          <button
            type="button"
            onClick={() => setSelectedMode("lowercase")}
            className={cn(
              "rounded-full px-3.5 py-1 transition-all active:scale-95",
              selectedMode === "lowercase"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            In Thường ({letter.letter.toLowerCase()})
          </button>
        </div>
      )}

      {/* Static "Vở 4 Ô Ly" Primary School Handwriting Notebook Grid Card */}
      <div className={cn("relative rounded-3xl bg-white dark:bg-slate-950 p-4 border-2 border-blue-200 dark:border-slate-800 shadow-md w-full max-w-[250px] aspect-square flex items-center justify-center overflow-hidden", className)}>
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          role="img"
          aria-label={`Vở 4 ô ly tập viết chữ ${displayChar}`}
        >
          {/* Authentic Vietnamese 4-Ô-Ly Blue Grid (4x4 Grid Cells) */}
          <g stroke="#60a5fa" strokeOpacity={0.35} strokeWidth={0.6}>
            {/* Horizontal Grid Lines */}
            <line x1="0" y1="0" x2="100" y2="0" strokeWidth={1} strokeOpacity={0.6} />
            <line x1="0" y1="25" x2="100" y2="25" />
            <line x1="0" y1="50" x2="100" y2="50" strokeWidth={0.8} strokeDasharray="3 3" />
            <line x1="0" y1="75" x2="100" y2="75" />
            <line x1="0" y1="100" x2="100" y2="100" strokeWidth={1} strokeOpacity={0.6} />

            {/* Vertical Grid Lines */}
            <line x1="0" y1="0" x2="0" y2="100" strokeWidth={1} strokeOpacity={0.6} />
            <line x1="25" y1="0" x2="25" y2="100" />
            <line x1="50" y1="0" x2="50" y2="100" strokeWidth={0.8} strokeDasharray="3 3" />
            <line x1="75" y1="0" x2="75" y2="100" />
            <line x1="100" y1="0" x2="100" y2="100" strokeWidth={1} strokeOpacity={0.6} />
          </g>

          {/* LAYER 1: Background Dashed Tracing Line (Nét Đứt Hướng Dẫn Trẻ Viết) */}
          <g fill="none" stroke="#64748b" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3.5" opacity={0.45}>
            {activeStrokes.map((d, i) => (
              <path key={`dash-${i}`} d={d} />
            ))}
          </g>

          {/* LAYER 2: Static Dark Ink Writing Stroke (Nét Mực Đen Viết Tay Tĩnh) */}
          <g fill="none" stroke="#0f172a" strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-slate-100">
            {activeStrokes.map((d, i) => (
              <path key={`stroke-${i}`} d={d} />
            ))}
          </g>

          {/* LAYER 3: Red Stroke Numbers (1, 2, 3) & Red Directional Arrows (Mũi Tên Đỏ Hướng Dẫn) */}
          {showNumbers && (
            <g>
              {activeStrokes.map((d, i) => {
                const arrowData = getStrokeArrowData(d);
                if (!arrowData) return null;

                const { startX, startY, arrowX, arrowY, angleDeg } = arrowData;

                return (
                  <g key={`guide-${i}`}>
                    {/* Red Directional Arrowhead along stroke */}
                    <g transform={`translate(${arrowX}, ${arrowY}) rotate(${angleDeg})`}>
                      <path
                        d="M -3,-2.5 L 4.5,0 L -3,2.5 Z"
                        fill="#dc2626"
                        stroke="#ffffff"
                        strokeWidth="0.6"
                      />
                    </g>

                    {/* Red Stroke Order Number (1, 2, 3) with Small Arrow */}
                    <text
                      x={startX - 5}
                      y={startY - 3}
                      fill="#dc2626"
                      fontSize={6.5}
                      fontWeight="900"
                      className="font-heading"
                    >
                      {i + 1}
                    </text>

                    {/* Small Red Arrow next to starting number */}
                    <g transform={`translate(${startX - 1.5}, ${startY - 5}) rotate(${angleDeg})`}>
                      <path
                        d="M 0,0 L 4,0 M 2.5,-1.5 L 4,0 L 2.5,1.5"
                        stroke="#dc2626"
                        strokeWidth="1.2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </g>
                );
              })}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
