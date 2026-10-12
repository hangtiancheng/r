import { DateRangeField } from "@/components/controls/date-range-field";
import { MarkdownField } from "@/components/controls/markdown-field";
import { AddEntryButton } from "@/components/dialogs/add-entry-button";
import { EntryCard } from "@/components/dialogs/entry-card";
import { EntryEmpty } from "@/components/dialogs/entry-empty";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { entryListActions } from "@/lib/entry-list";
import { newProjectItem } from "@/lib/factories";
import type { ProjectItem } from "@/lib/types";

export interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

export function ProjectDialog({
  open,
  onOpenChange,
  items,
  onChange,
}: ProjectDialogProps) {
  const list = entryListActions(items, onChange);
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="项目经历">
      {items.length === 0 && (
        <EntryEmpty
          title="暂无项目经历"
          description="添加项目名称、担任角色，并用 Markdown 分点描述项目内容。"
          addLabel="添加项目经历"
          onAdd={() => list.add(newProjectItem())}
        />
      )}
      {items.map((item, i) => (
        <EntryCard
          key={item.id}
          title={`项目经历 ${i + 1}`}
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
              <FieldLabel>项目名称（必填）</FieldLabel>
              <Input
                value={item.name}
                placeholder="填写项目名称"
                onChange={(e) => list.update(item.id, { name: e.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>担任角色</FieldLabel>
              <Input
                value={item.duty}
                placeholder="如：全栈开发"
                onChange={(e) => list.update(item.id, { duty: e.target.value })}
              />
            </Field>
          </FieldGroup>
          <Field>
            <FieldLabel>仓库链接</FieldLabel>
            <Input
              type="url"
              value={item.repo}
              placeholder="https://github.com/..."
              onChange={(e) => list.update(item.id, { repo: e.target.value })}
            />
          </Field>
          <MarkdownField
            label="项目描述"
            value={item.content}
            height={220}
            placeholder="支持 Markdown，分点描述事项（- 一条）"
            onChange={(content) => list.update(item.id, { content })}
          />
        </EntryCard>
      ))}
      {items.length > 0 && (
        <AddEntryButton
          label="添加项目经历"
          onClick={() => list.add(newProjectItem())}
        />
      )}
    </ModuleDialog>
  );
}
