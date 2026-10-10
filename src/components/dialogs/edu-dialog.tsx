import { DateRangeField } from "@/components/controls/date-range-field";
import { OptionsSelect } from "@/components/controls/options-select";
import { AddEntryButton } from "@/components/dialogs/add-entry-button";
import { EntryCard } from "@/components/dialogs/entry-card";
import { EntryEmpty } from "@/components/dialogs/entry-empty";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { entryListActions } from "@/lib/entry-list";
import { newEduItem } from "@/lib/factories";
import { DEGREES } from "@/lib/format";
import type { EduItem } from "@/lib/types";

export interface EduDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: EduItem[];
  onChange: (items: EduItem[]) => void;
}

/** 教育经历 module dialog. */
export function EduDialog({
  open,
  onOpenChange,
  items,
  onChange,
}: EduDialogProps) {
  const list = entryListActions(items, onChange);
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="教育经历">
      {items.length === 0 && (
        <EntryEmpty
          title="暂无教育经历"
          description="添加学校、专业、学历与绩点等信息。"
          addLabel="添加教育经历"
          onAdd={() => list.add(newEduItem())}
        />
      )}
      {items.map((item, i) => (
        <EntryCard
          key={item.id}
          title={`教育经历 ${i + 1}`}
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
              <FieldLabel>学校（必填）</FieldLabel>
              <Input
                value={item.school}
                placeholder="填写学校名称"
                onChange={(e) =>
                  list.update(item.id, { school: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel>专业</FieldLabel>
              <Input
                value={item.major}
                placeholder="填写你的专业"
                onChange={(e) =>
                  list.update(item.id, { major: e.target.value })
                }
              />
            </Field>
            <Field>
              <FieldLabel>学历</FieldLabel>
              <OptionsSelect
                value={item.degree}
                options={DEGREES}
                onChange={(degree) => list.update(item.id, { degree })}
              />
            </Field>
            <Field>
              <FieldLabel>绩点</FieldLabel>
              <Input
                value={item.gpa}
                placeholder="填写绩点"
                onChange={(e) => list.update(item.id, { gpa: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>成绩排名</FieldLabel>
              <Input
                value={item.rank}
                placeholder="填写成绩排名"
                onChange={(e) => list.update(item.id, { rank: e.target.value })}
              />
            </Field>
          </FieldGroup>
        </EntryCard>
      ))}
      {items.length > 0 && (
        <AddEntryButton
          label="添加教育经历"
          onClick={() => list.add(newEduItem())}
        />
      )}
    </ModuleDialog>
  );
}
