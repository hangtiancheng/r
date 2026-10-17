import { PlusIcon } from "lucide-react";
import { cn } from "cn";

import { ModuleList } from "@/components/modules/module-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ModuleKind, ModuleTarget, ResumeDoc } from "@/lib/types";

export interface ModulePanelProps {
  data: ResumeDoc;
  onOpen: (target: ModuleTarget) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
  onToggleCustomModule: (id: string) => void;
  onAddCustomModule: () => void;
  className?: string;
}

export function ModulePanel({
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
  onToggleCustomModule,
  onAddCustomModule,
  className,
}: ModulePanelProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "w-72 shrink-0 shadow-[0_1px_2px_rgba(20,46,77,0.05),0_10px_28px_-14px_rgba(20,46,77,0.18)] print:hidden",
        className,
      )}
    >
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-muted-foreground text-xs font-bold tracking-wide">
          模块
        </CardTitle>
        <CardAction className="row-span-1 self-center">
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-muted-foreground hover:text-primary"
            onClick={onAddCustomModule}
            aria-label="新增自定义模块"
            title="新增自定义模块"
          >
            <PlusIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="p-1.5">
        <ModuleList
          data={data}
          onOpen={onOpen}
          onToggleModule={onToggleModule}
          onToggleItem={onToggleItem}
          onToggleCustomModule={onToggleCustomModule}
        />
      </CardContent>
    </Card>
  );
}
