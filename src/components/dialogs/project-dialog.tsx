import { RequiredIndicator } from "@/components/controls/required-indicator";
import { DateRangeField } from "@/components/controls/date-range-field";
import { MarkdownField } from "@/components/controls/markdown-field";
import { AddEntryButton } from "@/components/dialogs/add-entry-button";
import { EntryCard } from "@/components/dialogs/entry-card";
import { EntryEmpty } from "@/components/dialogs/entry-empty";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { entryListActions } from "@/lib/entry-list";
import { newProjectItem } from "@/lib/factories";
import type { ProjectItem } from "@/lib/types";
import { issueFor, type ValidationReport } from "@/lib/validation";

export interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
  report: ValidationReport;
}

export function ProjectDialog({
  open,
  onOpenChange,
  items,
  onChange,
  report,
}: ProjectDialogProps) {
  const list = entryListActions(items, onChange);
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="项目经历">
      {items.length === 0 && (
        <EntryEmpty
          title="暂无项目经历"
          description="添加项目名称、项目角色, 支持 Markdown"
          addLabel="添加项目经历"
          onAdd={() => list.add(newProjectItem())}
        />
      )}
      {items.map((item, i) => {
        const startError = issueFor(report, `project:${item.id}:start`);
        const endError = issueFor(report, `project:${item.id}:end`);
        const nameError = issueFor(report, `project:${item.id}:name`);
        const rangeError = startError ?? endError;
        return (
          <EntryCard
            key={item.id}
            title={`项目经历 ${i + 1}`}
            hidden={item.hidden}
            onToggleHidden={() => list.toggleHidden(item.id)}
            onDelete={() => list.remove(item.id)}
          >
            <DateRangeField
              value={item}
              invalid={!!rangeError}
              onChange={(patch) => list.update(item.id, patch)}
            />
            {rangeError && <FieldError>{rangeError}</FieldError>}
            <FieldGroup className="gap-3 sm:grid sm:grid-cols-2">
              <Field data-invalid={!!nameError}>
                <FieldLabel>
                  项目名称 <RequiredIndicator />
                </FieldLabel>
                <Input
                  value={item.name}
                  placeholder="项目名称"
                  aria-invalid={!!nameError}
                  onChange={(e) =>
                    list.update(item.id, { name: e.target.value })
                  }
                />
                <FieldError>{nameError}</FieldError>
              </Field>
              <Field>
                <FieldLabel>项目角色</FieldLabel>
                <Input
                  value={item.duty}
                  placeholder="全栈开发"
                  onChange={(e) =>
                    list.update(item.id, { duty: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>
            <Field>
              <FieldLabel>项目链接</FieldLabel>
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
              placeholder="支持 Markdown"
              onChange={(content) => list.update(item.id, { content })}
            />
          </EntryCard>
        );
      })}
      {items.length > 0 && (
        <AddEntryButton
          label="添加项目经历"
          onClick={() => list.add(newProjectItem())}
        />
      )}
    </ModuleDialog>
  );
}
