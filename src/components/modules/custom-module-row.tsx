import { cn } from "cn";

import { ModuleIcon } from "@/components/controls/module-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";
import type { CustomModule, ModuleTarget } from "@/lib/types";

export interface CustomModuleRowProps {
  module: CustomModule;
  onOpen: (target: ModuleTarget) => void;
  onToggleHidden: (id: string) => void;
  className?: string;
}

export function CustomModuleRow({
  module,
  onOpen,
  onToggleHidden,
  className,
}: CustomModuleRowProps) {
  return (
    <Item
      size="xs"
      className={cn(
        "hover:bg-accent/60 px-1.5 py-1 transition-colors",
        module.hidden && "opacity-50",
        className,
      )}
    >
      <ItemMedia variant="icon" className="gap-0.5">
        <span className="size-6" aria-hidden />
        <ModuleIcon name={module.icon} className="text-muted-foreground" />
      </ItemMedia>
      <ItemContent className="min-w-0 flex-1">
        <ItemTitle className="w-full min-w-0 gap-1">
          <Button
            variant="ghost"
            size="xs"
            className="-mx-1.5 min-w-0 flex-1 justify-start text-[13px] font-normal"
            onClick={() => onOpen({ customId: module.id })}
          >
            <span className="truncate">{module.name || "(未命名)"}</span>
          </Button>
          {!module.content.trim() && (
            <Badge variant="secondary" className="font-normal">
              空内容
            </Badge>
          )}
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <Switch
          size="sm"
          checked={!module.hidden}
          onCheckedChange={() => onToggleHidden(module.id)}
          aria-label={`${module.hidden ? "显示" : "隐藏"}${module.name || "自定义模块"}`}
        />
      </ItemActions>
    </Item>
  );
}
