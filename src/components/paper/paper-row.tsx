import { cn } from "cn";

import { BLUE, INK } from "@/components/paper/paper-tokens";

export interface PaperRowProps {
  /** Main text on the left. */
  label: string;
  /** Right-aligned date or meta text; omitted when empty. */
  meta?: string;
}

/** One-line 左标题 / 右日期 row used by the 教育经历 and 荣誉奖项 modules. */
export function PaperRow({ label, meta }: PaperRowProps) {
  return (
    <div className="print-avoid-break flex items-baseline justify-between gap-4 py-0.5 leading-5">
      <span className={cn("min-w-0", INK)}>{label}</span>
      {meta && (
        <span className={cn("shrink-0 tabular-nums", BLUE)}>{meta}</span>
      )}
    </div>
  );
}
