import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  titleAction?: ReactNode;
  onConfirm?: () => void;
  children: ReactNode;
}

export function ModuleDialog({
  open,
  onOpenChange,
  title,
  titleAction,
  onConfirm,
  children,
}: ModuleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 sm:max-w-150"
      >
        <DialogHeader className="border-border/60 flex-row items-center justify-between gap-3 border-b px-5 py-3">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          {titleAction}
        </DialogHeader>
        <ScrollArea className="max-h-[min(62dvh,540px)]">
          <FieldGroup className="gap-3 px-5 py-4">{children}</FieldGroup>
        </ScrollArea>
        <DialogFooter className="border-border/60 mx-0 mb-0 flex-row justify-end gap-1.5 bg-transparent px-5 py-3">
          <DialogClose render={<Button variant="ghost" size="sm" />}>
            取消
          </DialogClose>
          {onConfirm ? (
            <Button size="sm" className="rounded-full" onClick={onConfirm}>
              确定
            </Button>
          ) : (
            <DialogClose render={<Button size="sm" className="rounded-full" />}>
              确定
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
