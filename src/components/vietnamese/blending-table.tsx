import { getToneVariants } from "@/data/vietnamese/blending";
import { cn } from "@/lib/utils";

interface BlendingTableProps {
  consonants: string[];
  vowels: string[];
  /** When set, renders the tone-mark row (ngang/huyền/sắc/hỏi/ngã/nặng) for this consonant+vowel syllable below the table. */
  toneSyllable?: string;
  onCellTap?: (syllable: string) => void;
  className?: string;
}

/**
 * Consonant x vowel blending table with an optional tone-mark row — ports vo-luyen-tap.html's
 * `.van-table`/`.tone-row` worksheet look for both the interactive blending page and the
 * printable worksheet.
 */
export function BlendingTable({ consonants, vowels, toneSyllable, onCellTap, className }: BlendingTableProps) {
  if (consonants.length === 0 || vowels.length === 0) {
    return null;
  }

  const toneVariants = toneSyllable ? getToneVariants(toneSyllable) : null;

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="border-b border-r border-border bg-muted/60 p-2 text-sm font-bold text-muted-foreground" />
              {vowels.map((v) => (
                <th
                  key={v}
                  className="border-b border-border bg-vietnamese-accent-soft p-2 text-sm font-bold text-vietnamese-accent"
                >
                  {v}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {consonants.map((c) => (
              <tr key={c}>
                <th className="border-r border-border bg-vietnamese-accent-soft p-2 text-sm font-bold text-vietnamese-accent">
                  {c}
                </th>
                {vowels.map((v) => {
                  const syllable = `${c}${v}`;
                  return (
                    <td
                      key={v}
                      className={cn(
                        "font-heading border border-border/60 p-2.5 text-lg text-foreground/85",
                        onCellTap && "cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                      )}
                      onClick={onCellTap ? () => onCellTap(syllable) : undefined}
                    >
                      {syllable}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toneSyllable && toneVariants && (
        <div className="mt-4 flex flex-wrap gap-3">
          {toneVariants.map((variant) => (
            <button
              key={variant}
              type="button"
              disabled={!onCellTap}
              onClick={() => onCellTap?.(variant)}
              className={cn(
                "font-heading rounded-xl border border-dashed border-border px-4 py-2 text-lg text-foreground/85",
                onCellTap && "cursor-pointer hover:border-primary hover:text-primary transition-colors"
              )}
            >
              {variant}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
