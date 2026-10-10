import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";
import { isModuleHidden, type ModuleMeta } from "@/lib/modules";
import type { ModuleKind, ResumeDoc } from "@/lib/types";

export interface ModuleRowProps {
  meta: ModuleMeta;
  data: ResumeDoc;
  onOpen: (kind: ModuleKind) => void;
  onToggleModule: (kind: ModuleKind) => void;
  onToggleItem: (kind: ModuleKind, id: string) => void;
}

/**
 * One module row: expand toggle, icon, name (+ entry count) and a visibility
 * switch. Expanding reveals per-entry switches for list modules.
 */
export function ModuleRow({
  meta,
  data,
  onOpen,
  onToggleModule,
  onToggleItem,
}: ModuleRowProps) {
  const [expanded, setExpanded] = useState(false);
  const entries = meta.entries?.(data) ?? [];
  const hidden = isModuleHidden(data, meta.kind);
  const expandable = entries.length > 0;
  const open = expanded && expandable;
  const Icon = meta.icon;

  return (
    <Collapsible open={open} onOpenChange={setExpanded}>
      <Item
        size="xs"
        className={cn(
          "hover:bg-accent/60 px-1.5 py-1 transition-colors",
          hidden && "opacity-50",
        )}
      >
        <ItemMedia variant="icon" className="gap-0.5">
          {expandable ? (
            <CollapsibleTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={open ? `收起${meta.label}` : `展开${meta.label}`}
                />
              }
            >
              <ChevronDownIcon
                className={cn("transition-transform", !open && "-rotate-90")}
              />
            </CollapsibleTrigger>
          ) : (
            <span className="size-6" aria-hidden />
          )}
          <Icon className="text-muted-foreground" />
        </ItemMedia>
        <ItemContent className="min-w-0 flex-1">
          <ItemTitle className="w-full min-w-0 gap-1">
            <Button
              variant="ghost"
              size="xs"
              className="-mx-1.5 min-w-0 flex-1 justify-start text-[13px] font-normal"
              onClick={() => onOpen(meta.kind)}
            >
              <span className="truncate">{meta.label}</span>
            </Button>
            {expandable && <Badge variant="secondary">{entries.length}</Badge>}
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Switch
            size="sm"
            checked={!hidden}
            onCheckedChange={() => onToggleModule(meta.kind)}
            aria-label={`${hidden ? "显示" : "隐藏"}${meta.label}`}
          />
        </ItemActions>
      </Item>
      <CollapsibleContent>
        {/* No left margin here: indenting the whole group would push the
            entry switches past the panel's clipped right edge. The indent
            lives on the text content instead, keeping switches aligned with
            the module-level one. */}
        <ItemGroup className="gap-0.5 py-0.5">
          {entries.map((entry) => (
            <Item
              key={entry.id}
              size="xs"
              className={cn(
                "hover:bg-accent/60 px-1.5 py-0.5 transition-colors",
                entry.hidden && "opacity-50",
              )}
            >
              <ItemContent className="min-w-0 flex-1 pl-7">
                <ItemTitle className="w-full min-w-0">
                  <Button
                    variant="ghost"
                    size="xs"
                    className="-mx-1.5 min-w-0 flex-1 justify-start text-xs font-normal"
                    onClick={() => onOpen(meta.kind)}
                  >
                    <span className="truncate">{entry.name || "(未命名)"}</span>
                  </Button>
                </ItemTitle>
              </ItemContent>
              <ItemActions>
                <Switch
                  size="sm"
                  checked={!entry.hidden}
                  onCheckedChange={() => onToggleItem(meta.kind, entry.id)}
                  aria-label={`${entry.hidden ? "显示" : "隐藏"}${entry.name || meta.label}条目`}
                />
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CollapsibleContent>
    </Collapsible>
  );
}
