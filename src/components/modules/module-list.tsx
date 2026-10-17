import {
  AddCustomModuleButton,
  CustomModuleRow,
} from "@/components/modules/custom-module-row";
import { ModuleRow } from "@/components/modules/module-row";
import { MODULES } from "@/lib/modules";
import { Separator } from "@/components/ui/separator";
import type { ModuleKind, ModuleTarget, ResumeDoc } from "@/lib/types";

export interface ModuleListProps {
  data: ResumeDoc;
  onOpen: (target: ModuleTarget) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
  onToggleCustomModule: (id: string) => void;
  onAddCustomModule: () => void;
}

export function ModuleList({
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
  onToggleCustomModule,
  onAddCustomModule,
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
      <Separator className="my-1.5" />
      {data.customModules.map((module) => (
        <CustomModuleRow
          key={module.id}
          module={module}
          onOpen={onOpen}
          onToggleHidden={onToggleCustomModule}
        />
      ))}
      <AddCustomModuleButton onClick={onAddCustomModule} />
    </div>
  );
}
