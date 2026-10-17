import { RequiredIndicator } from "@/components/controls/required-indicator";
import { DateRangeField } from "@/components/controls/date-range-field";
import { OptionsSelect } from "@/components/controls/options-select";
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
import { newEduItem } from "@/lib/factories";
import { DEGREES } from "@/lib/format";
import type { EduItem } from "@/lib/types";
import { issueFor, type ValidationReport } from "@/lib/validation";

export interface EduDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: EduItem[];
  onChange: (items: EduItem[]) => void;
  report: ValidationReport;
}

export function EduDialog({
  open,
  onOpenChange,
  items,
  onChange,
  report,
}: EduDialogProps) {
  const list = entryListActions(items, onChange);
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="教育经历">
      {items.length === 0 && (
        <EntryEmpty
          title="暂无教育经历"
          description="添加学历、学校、专业等信息"
          addLabel="添加教育经历"
          onAdd={() => list.add(newEduItem())}
        />
      )}
      {items.map((item, i) => {
        const startError = issueFor(report, `edu:${item.id}:start`);
        const endError = issueFor(report, `edu:${item.id}:end`);
        const schoolError = issueFor(report, `edu:${item.id}:school`);
        const rangeError = startError ?? endError;
        return (
          <EntryCard
            key={item.id}
            title={`教育经历 ${i + 1}`}
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
              <Field>
                <FieldLabel>学历</FieldLabel>
                <OptionsSelect
                  value={item.degree}
                  options={DEGREES}
                  onChange={(degree) => list.update(item.id, { degree })}
                />
              </Field>
              <Field data-invalid={!!schoolError}>
                <FieldLabel>
                  学校 <RequiredIndicator />
                </FieldLabel>
                <Input
                  value={item.school}
                  placeholder="填写学校名称"
                  aria-invalid={!!schoolError}
                  onChange={(e) =>
                    list.update(item.id, { school: e.target.value })
                  }
                />
                <FieldError>{schoolError}</FieldError>
              </Field>
              <Field>
                <FieldLabel>专业</FieldLabel>
                <Input
                  value={item.major}
                  placeholder="填写专业名称"
                  onChange={(e) =>
                    list.update(item.id, { major: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>绩点</FieldLabel>
                <Input
                  value={item.gpa}
                  placeholder="3.5/4.0"
                  onChange={(e) =>
                    list.update(item.id, { gpa: e.target.value })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>成绩排名</FieldLabel>
                <Input
                  value={item.rank}
                  placeholder="前 30%"
                  onChange={(e) =>
                    list.update(item.id, { rank: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>
          </EntryCard>
        );
      })}
      {items.length > 0 && (
        <AddEntryButton
          label="添加教育经历"
          onClick={() => list.add(newEduItem())}
        />
      )}
    </ModuleDialog>
  );
}
