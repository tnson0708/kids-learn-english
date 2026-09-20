import { letterForms, type VietnameseCaseMode } from "@/data/vietnamese/alphabet";
import { cn } from "@/lib/utils";

interface TraceSheetProps {
  letters: string[];
  mode: VietnameseCaseMode;
  /** Ruled-line rows to repeat per letter (default 2, matching the print worksheet default). */
  rows?: number;
  /** Faded repeats drawn after the solid model letter on each ruled line. */
  repeatsPerRow?: number;
  onLetterTap?: (letter: string) => void;
  className?: string;
}

/**
 * Ruled 4-line "vở ô ly" notebook rows with a solid model letterform followed by faded repeats to
 * trace — ports vo-luyen-tap.html's `.ruled`/`.trace-letter` worksheet look for both the on-screen
 * interactive alphabet page and the printable worksheet, so the two never drift apart.
 */
export function TraceSheet({
  letters,
  mode,
  rows = 2,
  repeatsPerRow = 5,
  onLetterTap,
  className,
}: TraceSheetProps) {
  if (letters.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {letters.map((letter) => (
        <div key={letter} className="flex flex-col gap-1.5">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex flex-col gap-1">
              {rowIndex === 0 && (
                <span className="text-xs font-bold text-muted-foreground">
                  &ldquo;{letter}&rdquo;
                </span>
              )}
              <div
                className="flex items-end gap-1 overflow-hidden"
                style={{
                  height: 72,
                  backgroundImage:
                    "repeating-linear-gradient(180deg, transparent 0 17px, var(--border) 17px 18px, transparent 18px 35px, var(--muted-foreground) 35px 36px)",
                }}
              >
                {letterForms(letter, mode).map((form, formIdx) => (
                  <span key={formIdx} className="flex items-end gap-1">
                    <button
                      type="button"
                      disabled={!onLetterTap}
                      onClick={() => onLetterTap?.(letter)}
                      className={cn(
                        "font-heading text-foreground/85 px-2 leading-[72px]",
                        onLetterTap && "cursor-pointer hover:text-primary transition-colors"
                      )}
                      style={{ fontSize: 52 }}
                    >
                      {form}
                    </button>
                    {Array.from({ length: repeatsPerRow }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className="font-heading px-2 leading-[72px] text-foreground/25"
                        style={{ fontSize: 52 }}
                      >
                        {form}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
