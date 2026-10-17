import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";

import { IconPicker } from "@/components/controls/icon-picker";
import { MarkdownField } from "@/components/controls/markdown-field";
import { RequiredIndicator } from "@/components/controls/required-indicator";
import { ModuleDialog } from "@/components/dialogs/module-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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
  title?: string;
  module: CustomModule | undefined;
  onChange: (patch: Partial<CustomModule>) => void;
  onRemove?: () => void;
  onConfirm?: () => void;
  report: ValidationReport;
}

export function CustomModuleDialog({
  open,
  onOpenChange,
  title = "自定义模块",
  module,
  onChange,
  onRemove,
  onConfirm,
  report,
}: CustomModuleDialogProps) {
  const [showNameError, setShowNameError] = useState(false);
  useEffect(() => {
    if (open) setShowNameError(false);
  }, [open, module?.id]);
  if (!module) return null;
  const nameError =
    issueFor(report, `custom:${module.id}:name`) ??
    (showNameError && !module.name.trim() ? "请填写模块名称" : undefined);
  const handleConfirm = () => {
    if (!module.name.trim()) {
      setShowNameError(true);
      return;
    }
    onConfirm?.();
  };
  return (
    <ModuleDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      onConfirm={onConfirm ? handleConfirm : undefined}
      titleAction={
        onRemove ? (
          <Button
            variant="destructive"
            size="icon"
            className="shrink-0"
            onClick={onRemove}
            aria-label="删除该模块"
            title="删除该模块"
          >
            <Trash2Icon />
          </Button>
        ) : undefined
      }
    >
      <FieldGroup>
        <Field data-invalid={!!nameError}>
          <FieldLabel>
            模块名称 <RequiredIndicator />
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <IconPicker
                value={module.icon}
                onChange={(icon) => onChange({ icon })}
              />
            </InputGroupAddon>
            <InputGroupInput
              value={module.name}
              placeholder="填写模块名称"
              aria-label="模块名称"
              aria-invalid={!!nameError}
              onChange={(e) => {
                setShowNameError(false);
                onChange({ name: e.target.value });
              }}
            />
          </InputGroup>
          <FieldError>{nameError}</FieldError>
        </Field>
        <MarkdownField
          label="模块内容"
          value={module.content}
          height={260}
          placeholder="支持 Markdown"
          onChange={(content) => onChange({ content })}
        />
      </FieldGroup>
    </ModuleDialog>
  );
}
