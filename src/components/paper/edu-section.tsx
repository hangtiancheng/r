import { PaperRow } from "@/components/paper/paper-row";
import { PaperSection } from "@/components/paper/paper-section";
import { formatRange } from "@/lib/format";
import type { EduItem, ModuleKind } from "@/lib/types";

export interface EduSectionProps {
  items: EduItem[];
  editing: boolean;
  onOpen: (kind: ModuleKind) => void;
  hidden?: boolean;
}

/** 教育经历: 学校 · 专业学历 on the left, date range on the right. */
export function EduSection({
  items,
  editing,
  onOpen,
  hidden,
}: EduSectionProps) {
  const visible = items.filter((item) => !item.hidden);
  if (visible.length === 0) return null;
  return (
    <PaperSection
      title="教育经历"
      kind="edu"
      editing={editing}
      onOpen={onOpen}
      hidden={hidden}
    >
      {visible.map((item) => (
        <PaperRow
          key={item.id}
          label={[item.school, `${item.major}${item.degree}`]
            .filter(Boolean)
            .join(" · ")}
          meta={formatRange(item)}
        />
      ))}
    </PaperSection>
  );
}
