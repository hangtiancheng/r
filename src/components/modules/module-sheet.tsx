import { useState } from "react";
import { PanelsTopLeftIcon, PlusIcon } from "lucide-react";
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
import type { ModuleKind, ModuleTarget, ResumeDoc } from "@/lib/types";

export interface ModuleSheetProps {
  data: ResumeDoc;
  onOpen: (target: ModuleTarget) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
  onToggleCustomModule: (id: string) => void;
  onAddCustomModule: () => void;
  className?: string;
}

export function ModuleSheet({
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
  onToggleCustomModule,
  onAddCustomModule,
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
          <div className="flex items-center justify-between gap-2">
            <SheetTitle>简历模块</SheetTitle>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground hover:text-primary shrink-0"
              onClick={() => {
                setOpen(false);
                onAddCustomModule();
              }}
              aria-label="新增自定义模块"
              title="新增自定义模块"
            >
              <PlusIcon />
            </Button>
          </div>
          <SheetDescription>隐藏不会删除数据</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="p-2">
            <ModuleList
              data={data}
              onOpen={(target) => {
                setOpen(false);
                onOpen(target);
              }}
              onToggleModule={onToggleModule}
              onToggleItem={onToggleItem}
              onToggleCustomModule={onToggleCustomModule}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
