import { cn } from "cn";

import { PaperEntryHeader } from "@/components/paper/paper-entry-header";
import { PaperMarkdown } from "@/components/paper/paper-markdown";
import { PaperSection } from "@/components/paper/paper-section";
import { INK } from "@/components/paper/paper-tokens";
import { formatRange } from "@/lib/format";
import type { ModuleKind, WorkItem } from "@/lib/types";

function WorkEntry({ item }: { item: WorkItem }) {
  return (
    <div className="print-avoid-break py-1">
      <PaperEntryHeader
        parts={[item.company, item.department, item.position]}
        date={formatRange(item)}
      />
      {item.details.map((detail) => (
        <div key={detail.id} className="mt-1">
          {detail.title && (
            <h3 className={cn("text-sm leading-5 font-medium", INK)}>
              {detail.title}
            </h3>
          )}
          <PaperMarkdown source={detail.content} />
        </div>
      ))}
    </div>
  );
}

export interface WorkSectionProps {
  items: WorkItem[];
  editing: boolean;
  onOpen: (kind: ModuleKind) => void;
  hidden?: boolean;
}

export function WorkSection({
  items,
  editing,
  onOpen,
  hidden,
}: WorkSectionProps) {
  const visible = items.filter((item) => !item.hidden);
  if (visible.length === 0) return null;
  return (
    <PaperSection
      title="工作经历"
      kind="work"
      editing={editing}
      onOpen={onOpen}
      hidden={hidden}
    >
      {visible.map((item) => (
        <WorkEntry key={item.id} item={item} />
      ))}
    </PaperSection>
  );
}
