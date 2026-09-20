import type { MathItem } from "@/data/vietnamese/math";

interface MathWorksheetProps {
  items: MathItem[];
  className?: string;
}

/** Renders counting / addition / subtraction items with an answer box — ports vo-luyen-tap.html's `.math-grid`. Print-only, per the prototype. */
export function MathWorksheet({ items, className }: MathWorksheetProps) {
  return (
    <div className={`grid grid-cols-2 gap-x-8 gap-y-5 ${className ?? ""}`}>
      {items.map((item, i) => (
        <div key={i} className="border-b border-dashed border-border pb-3.5">
          {item.type === "dem" ? (
            <>
              <div className="mb-2 flex min-h-[26px] flex-wrap gap-1.5">
                {Array.from({ length: item.n }).map((_, dotIdx) => (
                  <span key={dotIdx} className="size-4 rounded-full bg-amber-500" />
                ))}
              </div>
              <div className="flex items-center gap-2 text-lg">
                <span>Có tất cả:</span>
                <span className="inline-block h-9 w-11 rounded-md border-2 border-foreground" />
                <span>hình</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-lg">
              <span>
                {item.a} {item.type === "cong" ? "+" : "−"} {item.b} =
              </span>
              <span className="inline-block h-9 w-11 rounded-md border-2 border-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
