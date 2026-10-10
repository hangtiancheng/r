import { cn } from "cn";

import { PaperEntryHeader } from "@/components/paper/paper-entry-header";
import { PaperLinkText } from "@/components/paper/paper-link-text";
import { PaperMarkdown } from "@/components/paper/paper-markdown";
import { PaperSection } from "@/components/paper/paper-section";
import { INK_60 } from "@/components/paper/paper-tokens";
import { formatRange } from "@/lib/format";
import type { ModuleKind, ProjectItem } from "@/lib/types";

function ProjectEntry({ item }: { item: ProjectItem }) {
  return (
    <div className="print-avoid-break py-1">
      <PaperEntryHeader
        parts={[item.name, item.duty]}
        date={formatRange(item)}
      />
      {item.repo && (
        <h3 className={cn("mt-1 text-sm leading-5 font-medium", INK_60)}>
          仓库链接: <PaperLinkText text={item.repo} />
        </h3>
      )}
      <PaperMarkdown source={item.content} />
    </div>
  );
}

export interface ProjectSectionProps {
  items: ProjectItem[];
  editing: boolean;
  onOpen: (kind: ModuleKind) => void;
  hidden?: boolean;
}

export function ProjectSection({
  items,
  editing,
  onOpen,
  hidden,
}: ProjectSectionProps) {
  const visible = items.filter((item) => !item.hidden);
  if (visible.length === 0) return null;
  return (
    <PaperSection
      title="项目经历"
      kind="project"
      editing={editing}
      onOpen={onOpen}
      hidden={hidden}
    >
      {visible.map((item) => (
        <ProjectEntry key={item.id} item={item} />
      ))}
    </PaperSection>
  );
}
