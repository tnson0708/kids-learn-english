import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NumberBadgeProps {
  number: number;
  className?: string;
}

export function NumberBadge({ number, className }: NumberBadgeProps) {
  const isMilestone = number > 0 && number % 10 === 0;

  if (isMilestone) {
    return (
      <div className={cn("relative my-1 inline-flex flex-col items-center justify-center", className)}>
        <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 text-white shadow-md transition-transform hover:scale-105 sm:size-20">
          <span className="absolute -top-2 -right-2 inline-flex size-6 items-center justify-center rounded-full bg-yellow-300 text-[10px] font-black text-amber-950 shadow-xs sm:-top-2.5 sm:-right-2.5 sm:size-7 sm:text-xs">
            <Sparkles className="size-3.5 fill-amber-500 text-amber-600" />
          </span>
          <span className="font-heading text-2xl font-black tracking-tight drop-shadow-xs sm:text-4xl">
            {number}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("my-1 inline-flex items-center justify-center", className)}>
      <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 text-white shadow-xs sm:size-20">
        <span className="font-heading text-2xl font-black tracking-tight drop-shadow-xs sm:text-4xl">
          {number}
        </span>
      </div>
    </div>
  );
}
