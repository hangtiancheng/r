import type { CSSProperties, ReactNode } from "react";
import { cn } from "cn";

import { PaperSection } from "@/components/paper/paper-section";
import { BLUE, INK, INK_60 } from "@/components/paper/paper-tokens";
import { formatRange } from "@/lib/format";
import type { EduItem, ModuleTarget } from "@/lib/types";

interface EduField {
  value: (item: EduItem) => string;
  color: string;
}

export interface EduSectionProps {
  items: EduItem[];
  editing: boolean;
  onOpen: (target: ModuleTarget) => void;
  hidden?: boolean;
}

export function EduSection({
  items,
  editing,
  onOpen,
  hidden,
}: EduSectionProps) {
  const visible = items.filter((item) => !item.hidden);
  if (visible.length === 0) return null;

  const fields: EduField[] = [
    { value: (item) => item.degree, color: INK },
    { value: (item) => item.school, color: INK },
    { value: (item) => item.major, color: INK },
  ];
  if (visible.some((item) => item.gpa.trim())) {
    fields.push({
      value: (item) => (item.gpa.trim() ? `GPA ${item.gpa}` : ""),
      color: INK_60,
    });
  }
  if (visible.some((item) => item.rank.trim())) {
    fields.push({ value: (item) => item.rank, color: INK_60 });
  }

  const tracks: string[] = [];
  fields.forEach((_, i) => {
    tracks.push("auto");
    if (i < fields.length - 1) tracks.push("auto");
  });
  tracks.push("minmax(0, 1fr)");
  const gridStyle: CSSProperties = { gridTemplateColumns: tracks.join(" ") };

  return (
    <PaperSection
      title="教育经历"
      target={{ kind: "edu" }}
      editing={editing}
      onOpen={onOpen}
      hidden={hidden}
    >
      <div className="grid gap-y-0.5 leading-5" style={gridStyle}>
        {visible.flatMap((item) => {
          const cells: ReactNode[] = [];
          fields.forEach((field, i) => {
            if (i > 0) {
              const current = field.value(item).trim();
              const hasLeft = fields
                .slice(0, i)
                .some((left) => left.value(item).trim());
              cells.push(
                <span
                  key={`${item.id}-sep-${i}`}
                  aria-hidden
                  className={cn(
                    "mx-1.5 text-[#c9d2dc]",
                    (!current || !hasLeft) && "invisible",
                  )}
                >
                  |
                </span>,
              );
            }
            cells.push(
              <span
                key={`${item.id}-${i}`}
                className={cn("min-w-0", field.color)}
              >
                {field.value(item)}
              </span>,
            );
          });
          cells.push(
            <span
              key={`${item.id}-date`}
              className={cn(
                "justify-self-end whitespace-nowrap tabular-nums",
                BLUE,
              )}
            >
              {formatRange(item)}
            </span>,
          );
          return cells;
        })}
      </div>
    </PaperSection>
  );
}
