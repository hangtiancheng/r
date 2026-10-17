import { Suspense, lazy, useState } from "react";
import { cn } from "cn";

import { ModuleIcon } from "@/components/controls/module-icon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

const IconGrid = lazy(() => import("@/components/controls/icon-grid"));

export interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  className?: string;
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(
              "text-muted-foreground hover:text-foreground",
              className,
            )}
            aria-label="选择模块图标"
            title="选择模块图标"
          />
        }
      >
        <ModuleIcon name={value} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1.5">
        <Suspense fallback={<Skeleton className="h-44 w-full" />}>
          <IconGrid
            value={value}
            onSelect={(icon) => {
              onChange(icon);
              setOpen(false);
            }}
          />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
}
