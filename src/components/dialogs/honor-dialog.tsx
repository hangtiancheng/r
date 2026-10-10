import { MonthPicker } from "@/components/controls/month-picker";
import { AddEntryButton } from "@/components/dialogs/add-entry-button";
import { EntryCard } from "@/components/dialogs/entry-card";
import { EntryEmpty } from "@/components/dialogs/entry-empty";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { entryListActions } from "@/lib/entry-list";
import { newHonorItem } from "@/lib/factories";
import type { HonorItem } from "@/lib/types";

export interface HonorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: HonorItem[];
  onChange: (items: HonorItem[]) => void;
}

/** 荣誉奖项 module dialog. */
export function HonorDialog({
  open,
  onOpenChange,
  items,
  onChange,
}: HonorDialogProps) {
  const list = entryListActions(items, onChange);
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="荣誉奖项">
      {items.length === 0 && (
        <EntryEmpty
          title="暂无荣誉奖项"
          description="添加奖项名称、颁发机构与获奖时间。"
          addLabel="添加荣誉奖项"
          onAdd={() => list.add(newHonorItem())}
        />
      )}
      {items.map((item, i) => (
        <EntryCard
          key={item.id}
          title={`荣誉奖项 ${i + 1}`}
          hidden={item.hidden}
          onToggleHidden={() => list.toggleHidden(item.id)}
          onDelete={() => list.remove(item.id)}
        >
          <FieldGroup className="gap-3 sm:grid sm:grid-cols-2">
            <Field>
              <FieldLabel>名称（必填）</FieldLabel>
              <Input
                value={item.name}
                placeholder="奖项/荣誉名称"
                onChange={(e) => list.update(item.id, { name: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>颁发机构</FieldLabel>
              <Input
                value={item.issuer}
                placeholder="颁发机构"
                onChange={(e) =>
                  list.update(item.id, { issuer: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel>获奖时间</FieldLabel>
              <MonthPicker
                value={item.date}
                onChange={(date) => list.update(item.id, { date })}
                className="w-full"
              />
            </Field>
          </FieldGroup>
        </EntryCard>
      ))}
      {items.length > 0 && (
        <AddEntryButton
          label="添加荣誉奖项"
          onClick={() => list.add(newHonorItem())}
        />
      )}
    </ModuleDialog>
  );
}
