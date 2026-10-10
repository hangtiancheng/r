import { MarkdownField } from "@/components/controls/markdown-field";
import { ModuleDialog } from "@/components/dialogs/module-dialog";

export interface SkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skills: string;
  onChange: (skills: string) => void;
}

/** 个人技能 module dialog — a single markdown body. */
export function SkillDialog({
  open,
  onOpenChange,
  skills,
  onChange,
}: SkillDialogProps) {
  return (
    <ModuleDialog open={open} onOpenChange={onOpenChange} title="个人技能">
      <MarkdownField
        label="技能描述"
        value={skills}
        height={260}
        placeholder="支持 Markdown，如：- 熟悉 JS/TS/Go"
        onChange={onChange}
      />
    </ModuleDialog>
  );
}
