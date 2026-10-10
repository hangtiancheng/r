import { useRef, useState } from "react";
import {
  DownloadIcon,
  EllipsisIcon,
  FileDownIcon,
  RotateCcwIcon,
  SquarePenIcon,
  UploadIcon,
} from "lucide-react";

import { ResetResumeDialog } from "@/components/toolbar/reset-resume-dialog";
import { ToolButton } from "@/components/toolbar/tool-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export interface ViewToolbarProps {
  title: string;
  exporting: boolean;
  onEdit: () => void;
  onExportPdf: () => void;
  onDownloadJson: () => void;
  onImportJson: (file: File) => void;
  onReset: () => void;
}

/** View mode: resume title + 编辑简历 / 导出 / 更多. */
export function ViewToolbar({
  title,
  exporting,
  onEdit,
  onExportPdf,
  onDownloadJson,
  onImportJson,
  onReset,
}: ViewToolbarProps) {
  // The file input must stay mounted while the 更多 menu closes after a
  // pick, so it lives in the toolbar instead of the menu popup.
  const importInputRef = useRef<HTMLInputElement>(null);
  // The reset confirmation lives here too: nested inside the menu popup it
  // would unmount before the dialog ever shows.
  const [resetOpen, setResetOpen] = useState(false);
  return (
    <div className="border-border/60 bg-background/85 sticky top-0 z-20 flex h-10 items-center gap-1 rounded-t-xl border-b px-2 backdrop-blur-sm">
      <div className="text-foreground/85 min-w-0 flex-1 truncate px-1.5 text-[13px] font-medium">
        {title}
      </div>
      <Button size="sm" className="rounded-full shadow-xs" onClick={onEdit}>
        <SquarePenIcon data-icon="inline-start" />
        编辑简历
      </Button>
      <Separator orientation="vertical" className="h-3.5" />
      <ToolButton
        icon={
          exporting ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <FileDownIcon data-icon="inline-start" />
          )
        }
        label="导出"
        title="导出为 PDF 文件"
        disabled={exporting}
        onClick={onExportPdf}
      />
      <Separator orientation="vertical" className="h-3.5" />
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <ToolButton
              icon={<EllipsisIcon data-icon="inline-start" />}
              label="更多"
            />
          }
        />
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onDownloadJson}>
              <DownloadIcon data-icon="inline-start" />
              下载简历 JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => importInputRef.current?.click()}>
              <UploadIcon data-icon="inline-start" />
              导入简历 JSON
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setResetOpen(true)}
          >
            <RotateCcwIcon data-icon="inline-start" />
            恢复默认简历
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ResetResumeDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        onReset={() => {
          setResetOpen(false);
          onReset();
        }}
      />
      <input
        ref={importInputRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onImportJson(file);
        }}
      />
    </div>
  );
}
