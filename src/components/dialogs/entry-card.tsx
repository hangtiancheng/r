import type { ReactNode } from "react";
import { Trash2Icon } from "lucide-react";
import { cn } from "cn";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export interface EntryCardProps {
  title: string;
  hidden?: boolean;
  onToggleHidden: () => void;
  onDelete: () => void;
  children: ReactNode;
}

export function EntryCard({
  title,
  hidden,
  onToggleHidden,
  onDelete,
  children,
}: EntryCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "hover:border-primary/40 transition-colors",
        hidden && "opacity-60",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {hidden && (
            <Badge variant="secondary" className="font-normal">
              已隐藏，纸面不展示
            </Badge>
          )}
        </CardTitle>
        <CardAction className="flex items-center gap-1.5">
          <Switch
            size="sm"
            checked={!hidden}
            onCheckedChange={onToggleHidden}
            aria-label={`${hidden ? "显示" : "隐藏"}${title}`}
          />
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={`删除${title}`}
            onClick={onDelete}
          >
            <Trash2Icon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-3">{children}</FieldGroup>
      </CardContent>
    </Card>
  );
}
