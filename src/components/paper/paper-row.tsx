import { cn } from "cn";

import { BLUE, INK } from "@/components/paper/paper-tokens";

export interface PaperRowProps {
  label: string;
  meta?: string;
}

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
