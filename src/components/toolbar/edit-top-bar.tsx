import type { ReactNode } from "react";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export interface EditTopBarProps {
  title: string;
  saving: boolean;
  onTitleChange: (title: string) => void;
  onCancel: () => void;
  onSave: () => void;
  actions?: ReactNode;
}

export function EditTopBar({
  title,
  saving,
  onTitleChange,
  onCancel,
  onSave,
  actions,
}: EditTopBarProps) {
  return (
    <div className="border-border/60 bg-background/85 sticky top-0 z-20 flex h-10 items-center gap-2 rounded-t-xl border-b px-2 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="退出编辑"
        onClick={onCancel}
      >
        <ArrowLeftIcon />
      </Button>
      <Input
        value={title}
        placeholder="简历标题"
        aria-label="简历标题"
        onChange={(e) => onTitleChange(e.target.value)}
        className="hover:border-input focus-visible:border-ring h-7 w-full max-w-[300px] border-transparent bg-transparent text-[13px] shadow-none transition-colors"
      />
      <div className="ml-auto flex items-center gap-1">
        {actions}
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={saving}>
          取消
        </Button>
        <Button
          size="sm"
          className="rounded-full shadow-xs"
          onClick={onSave}
          disabled={saving}
        >
          {saving && <Spinner data-icon="inline-start" />}
          保存
        </Button>
      </div>
    </div>
  );
}
