import { cn } from "cn";

import { BLUE, INK } from "@/components/paper/paper-tokens";

export interface PaperEntryHeaderProps {
  parts: string[];
  date: string;
}

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
