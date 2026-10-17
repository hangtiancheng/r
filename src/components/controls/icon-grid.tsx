import { useState } from "react";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { MODULE_ICON_NAMES, resolveModuleIcon } from "@/lib/icons-registry";

const PAGE_SIZE = 48;

export interface IconGridProps {
  value: string;
  onSelect: (name: string) => void;
}

export default function IconGrid({ value, onSelect }: IconGridProps) {
  const pageCount = Math.max(
    1,
    Math.ceil(MODULE_ICON_NAMES.length / PAGE_SIZE),
  );
  const initialPage = Math.min(
    pageCount - 1,
    Math.max(0, Math.floor(MODULE_ICON_NAMES.indexOf(value) / PAGE_SIZE)),
  );
  const [page, setPage] = useState(initialPage);
  const names = MODULE_ICON_NAMES.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-0.5">
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="上一页图标"
          disabled={page === 0}
          onClick={() => setPage((current) => Math.max(0, current - 1))}
        >
          <ChevronLeftIcon />
        </Button>
        <span
          className="text-muted-foreground text-xs tabular-nums"
          aria-live="polite"
        >
          {page + 1} / {pageCount}
        </span>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="下一页图标"
          disabled={page >= pageCount - 1}
          onClick={() =>
            setPage((current) => Math.min(pageCount - 1, current + 1))
          }
        >
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="grid grid-cols-8 gap-0.5">
        {names.map((name) => {
          const Icon = resolveModuleIcon(name);
          const active = name === value;
          return (
            <Button
              key={name}
              variant="ghost"
              size="icon-xs"
              aria-label={name}
              aria-pressed={active}
              title={name}
              className={cn("relative", active && "bg-primary/10 text-primary")}
              onClick={() => onSelect(name)}
            >
              <Icon />
              {active && (
                <CheckIcon className="absolute right-0 bottom-0 size-2.5" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
