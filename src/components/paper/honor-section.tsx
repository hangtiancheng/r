import { PaperRow } from "@/components/paper/paper-row";
import { PaperSection } from "@/components/paper/paper-section";
import { formatMonth } from "@/lib/format";
import type { HonorItem, ModuleTarget } from "@/lib/types";

export interface HonorSectionProps {
  items: HonorItem[];
  editing: boolean;
  onOpen: (target: ModuleTarget) => void;
  hidden?: boolean;
}

export function HonorSection({
  items,
  editing,
  onOpen,
  hidden,
}: HonorSectionProps) {
  const visible = items.filter((item) => !item.hidden);
  if (visible.length === 0) return null;
  return (
    <PaperSection
      title="荣誉奖项"
      target={{ kind: "honor" }}
      editing={editing}
      onOpen={onOpen}
      hidden={hidden}
    >
      {visible.map((item) => (
        <PaperRow
          key={item.id}
          label={[item.name, item.issuer].filter(Boolean).join(" · ")}
          meta={item.date ? formatMonth(item.date) : undefined}
        />
      ))}
    </PaperSection>
  );
}
