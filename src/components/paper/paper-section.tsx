import type { ReactNode } from "react";
import { cn } from "cn";

import { HEAD_BLUE } from "@/components/paper/paper-tokens";
import type { ModuleKind } from "@/lib/types";

export interface PaperSectionProps {
  title?: string;
  kind: ModuleKind;
  editing: boolean;
  onOpen: (kind: ModuleKind) => void;
  hidden?: boolean;
  children: ReactNode;
}

export function PaperSection({
  title,
  kind,
  editing,
  onOpen,
  hidden,
  children,
}: PaperSectionProps) {
  if (hidden) return null;
  return (
    <section
      onClick={editing ? () => onOpen(kind) : undefined}
      className={cn(
        "mt-3 first:mt-0",
        editing &&
          "-mx-1.5 cursor-pointer rounded-md px-1.5 py-1 transition-colors hover:bg-[rgba(15,122,245,0.05)] hover:ring-1 hover:ring-[rgba(15,122,245,0.3)]",
      )}
    >
      {title && (
        <div className="mb-1.5 flex items-center gap-2">
          <h2 className={cn("text-sm leading-5.25 font-bold", HEAD_BLUE)}>
            {title}
          </h2>
          <div
            className="h-px flex-1 bg-[linear-gradient(90deg,#a8cffb_0%,rgba(168,207,251,0.45)_60%,rgba(168,207,251,0)_100%)]"
            aria-hidden
          />
        </div>
      )}
      {children}
    </section>
  );
}
