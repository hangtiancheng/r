import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CustomModuleRow } from "@/components/modules/custom-module-row";
import { ModuleRow } from "@/components/modules/module-row";
import { SortableModule } from "@/components/modules/sortable-module";
import { MODULES, orderedModuleTargets, targetKey } from "@/lib/modules";
import type { ModuleKind, ModuleTarget, ResumeDoc } from "@/lib/types";

export interface ModuleListProps {
  data: ResumeDoc;
  onOpen: (target: ModuleTarget) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
  onToggleCustomModule: (id: string) => void;
  onMoveModule: (activeKey: string, overKey: string) => void;
}

export function ModuleList({
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
  onToggleCustomModule,
  onMoveModule,
}: ModuleListProps) {
  const targets = orderedModuleTargets(data);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      accessibility={{
        screenReaderInstructions: {
          draggable:
            "按空格开始排序，使用上下方向键移动，再按空格确认，按 Esc 取消。",
        },
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id) {
          onMoveModule(String(active.id), String(over.id));
        }
      }}
    >
      <SortableContext
        items={targets.map(targetKey)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-1">
          {targets.map((target) => {
            if ("kind" in target) {
              const meta = MODULES.find(
                (module) => module.kind === target.kind,
              )!;
              return (
                <SortableModule
                  key={targetKey(target)}
                  id={targetKey(target)}
                  label={meta.label}
                >
                  <ModuleRow
                    meta={meta}
                    data={data}
                    onOpen={onOpen}
                    onToggleModule={onToggleModule}
                    onToggleItem={onToggleItem}
                  />
                </SortableModule>
              );
            }
            const module = data.customModules.find(
              (module) => module.id === target.customId,
            )!;
            return (
              <SortableModule
                key={targetKey(target)}
                id={targetKey(target)}
                label={module.name || "自定义模块"}
              >
                <CustomModuleRow
                  module={module}
                  onOpen={onOpen}
                  onToggleHidden={onToggleCustomModule}
                />
              </SortableModule>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
}
