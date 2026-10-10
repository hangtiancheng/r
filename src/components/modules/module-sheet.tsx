import { useState } from "react";
import { PanelsTopLeftIcon } from "lucide-react";
import { cn } from "cn";

import { ModuleList } from "@/components/modules/module-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

export interface ModuleSheetProps {
  data: ResumeDoc;
  onOpen: (kind: ModuleKind) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
  className?: string;
}

/**
 * Narrow-screen counterpart of `ModulePanel`: the same module list behind a
 * sheet. Opening a module dialog closes the sheet first.
 */
export function ModuleSheet({
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
  className,
}: ModuleSheetProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-muted-foreground hover:text-primary text-xs font-normal",
              className,
            )}
          />
        }
      >
        <PanelsTopLeftIcon data-icon="inline-start" />
        模块
      </SheetTrigger>
      <SheetContent side="right" className="w-72 gap-0 p-0 sm:max-w-72">
        <SheetHeader className="border-border/60 border-b px-4 py-3 pr-12">
          <SheetTitle>简历模块</SheetTitle>
          <SheetDescription>
            开关只影响纸面展示，隐藏不会删除数据。
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-2">
            <ModuleList
              data={data}
              onOpen={(kind) => {
                setOpen(false);
                onOpen(kind);
              }}
              onToggleModule={onToggleModule}
              onToggleItem={onToggleItem}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
