import { ModuleRow } from "@/components/modules/module-row";
import { MODULES } from "@/lib/modules";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

export interface ModuleListProps {
  data: ResumeDoc;
  onOpen: (kind: ModuleKind) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
}

/** All module rows; shared by the desktop panel and the narrow-screen sheet. */
export function ModuleList({
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
}: ModuleListProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {MODULES.map((meta) => (
        <ModuleRow
          key={meta.kind}
          meta={meta}
          data={data}
          onOpen={onOpen}
          onToggleModule={onToggleModule}
          onToggleItem={onToggleItem}
        />
      ))}
    </div>
  );
}
