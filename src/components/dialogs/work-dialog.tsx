import { DateRangeField } from "@/components/controls/date-range-field";
import { AddEntryButton } from "@/components/dialogs/add-entry-button";
import { EntryCard } from "@/components/dialogs/entry-card";
import { EntryEmpty } from "@/components/dialogs/entry-empty";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import { WorkDetailsField } from "@/components/dialogs/work-details-field";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { entryListActions } from "@/lib/entry-list";
import { newWorkItem } from "@/lib/factories";
import type { WorkItem } from "@/lib/types";

export interface WorkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: WorkItem[];
  onChange: (items: WorkItem[]) => void;
}

/** 工作经历 module dialog. */
export function WorkDialog({
  open,
  onOpenChange,
  items,
  onChange,
}: WorkDialogProps) {
  const list = entryListActions(items, onChange);
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="工作经历">
      {items.length === 0 && (
        <EntryEmpty
          title="暂无工作经历"
          description="添加公司、部门、职位，并分点描述主要工作内容。"
          addLabel="添加工作经历"
          onAdd={() => list.add(newWorkItem())}
        />
      )}
      {items.map((item, i) => (
        <EntryCard
          key={item.id}
          title={`工作经历 ${i + 1}`}
          hidden={item.hidden}
          onToggleHidden={() => list.toggleHidden(item.id)}
          onDelete={() => list.remove(item.id)}
        >
          <DateRangeField
            value={item}
            onChange={(patch) => list.update(item.id, patch)}
          />
          <FieldGroup className="gap-3 sm:grid sm:grid-cols-2">
            <Field>
              <FieldLabel>公司名（必填）</FieldLabel>
              <Input
                value={item.company}
                placeholder="填写公司名"
                onChange={(e) =>
                  list.update(item.id, { company: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel>部门</FieldLabel>
              <Input
                value={item.department}
                placeholder="填写部门"
                onChange={(e) =>
                  list.update(item.id, { department: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel>职位</FieldLabel>
              <Input
                value={item.position}
                placeholder="填写职位"
                onChange={(e) =>
                  list.update(item.id, { position: e.target.value })
                }
              />
            </Field>
          </FieldGroup>
          <WorkDetailsField
            details={item.details}
            onChange={(details) => list.update(item.id, { details })}
          />
        </EntryCard>
      ))}
      {items.length > 0 && (
        <AddEntryButton
          label="添加工作经历"
          onClick={() => list.add(newWorkItem())}
        />
      )}
    </ModuleDialog>
  );
}
