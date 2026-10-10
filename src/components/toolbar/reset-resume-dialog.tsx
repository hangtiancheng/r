import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface ResetResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
}

/**
 * Confirmation dialog behind the 更多 menu's 恢复默认简历 entry. Rendered at
 * toolbar level (not inside the menu popup) so it survives the menu closing.
 */
export function ResetResumeDialog({
  open,
  onOpenChange,
  onReset,
}: ResetResumeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>恢复默认简历？</AlertDialogTitle>
          <AlertDialogDescription>
            当前保存在浏览器 IndexedDB
            中的简历数据将被内置默认数据覆盖，此操作不可撤销。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onReset}>恢复默认</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
