import { cn } from "cn";

import { ModuleList } from "@/components/modules/module-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

export interface ModulePanelProps {
  data: ResumeDoc;
  onOpen: (kind: ModuleKind) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
  className?: string;
}

export function ModulePanel({
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
  className,
}: ModulePanelProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "no-print w-72 shrink-0 shadow-[0_1px_2px_rgba(20,46,77,0.05),0_10px_28px_-14px_rgba(20,46,77,0.18)]",
        className,
      )}
    >
      <CardHeader className="pb-0">
        <CardTitle className="text-muted-foreground text-xs font-bold tracking-wide">
          模块
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1.5">
        <ModuleList
          data={data}
          onOpen={onOpen}
          onToggleModule={onToggleModule}
          onToggleItem={onToggleItem}
        />
      </CardContent>
    </Card>
  );
}
