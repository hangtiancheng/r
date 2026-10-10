import { cn } from "cn";

import { BLUE, INK } from "@/components/paper/paper-tokens";

export interface PaperEntryHeaderProps {
  /** Bold parts (company / department / position, or name / duty). */
  parts: string[];
  /** Right-aligned range text, e.g. "2024.9 - 至今". */
  date: string;
}

/** Bold entry headline shared by the 工作经历 and 项目经历 modules. */
export function PaperEntryHeader({ parts, date }: PaperEntryHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-2.5 text-sm leading-5 font-bold",
        INK,
      )}
    >
      {parts.filter(Boolean).map((part, i) => (
        <span key={i}>{part}</span>
      ))}
      <span className={cn("font-normal tabular-nums", BLUE)}>{date}</span>
    </div>
  );
}
