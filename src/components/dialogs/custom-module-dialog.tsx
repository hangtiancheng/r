import { Trash2Icon } from "lucide-react";

import { RequiredIndicator } from "@/components/controls/required-indicator";
import { IconPicker } from "@/components/controls/icon-picker";
import { MarkdownField } from "@/components/controls/markdown-field";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import { Button } from "@/components/ui/button";
import { FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { CustomModule } from "@/lib/types";
import { issueFor, type ValidationReport } from "@/lib/validation";

export interface CustomModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  module: CustomModule | undefined;
  onChange: (patch: Partial<CustomModule>) => void;
  onRemove: () => void;
  report: ValidationReport;
}

export function CustomModuleDialog({
  open,
  onOpenChange,
  module,
  onChange,
  onRemove,
  report,
}: CustomModuleDialogProps) {
  if (!module) return null;
  const nameError = issueFor(report, `custom:${module.id}:name`);
  return (
    <ModuleDialog
      open={open}
      onOpenChange={onOpenChange}
      title={<span className="sr-only">自定义模块</span>}
      headerExtra={
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <InputGroup className="flex-1">
              <InputGroupAddon>
                <IconPicker
                  value={module.icon}
                  onChange={(icon) => onChange({ icon })}
                />
              </InputGroupAddon>
              <InputGroupInput
                value={module.name}
                placeholder="填写模块名称，如：个人技能"
                aria-label="模块名称"
                aria-invalid={!!nameError}
                onChange={(e) => onChange({ name: e.target.value })}
              />
              <InputGroupAddon align="inline-end">
                <RequiredIndicator />
              </InputGroupAddon>
            </InputGroup>
            <Button
              variant="destructive"
              size="icon"
              className="shrink-0"
              onClick={onRemove}
              aria-label="删除该自定义模块"
              title="删除该自定义模块"
            >
              <Trash2Icon />
            </Button>
          </div>
          <FieldError>{nameError}</FieldError>
        </div>
      }
    >
      <FieldGroup>
        <MarkdownField
          label="模块正文"
          value={module.content}
          height={280}
          placeholder="支持 Markdown，分点描述事项（- 一条）"
          onChange={(content) => onChange({ content })}
        />
      </FieldGroup>
    </ModuleDialog>
  );
}
