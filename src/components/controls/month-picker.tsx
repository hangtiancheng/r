import { useState } from "react";
import { addYears, endOfYear, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MonthPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxDate?: Date;
  "aria-label"?: string;
}

const MONTH_RE = /^(\d{4})-(\d{2})$/;

function parseMonth(value: string): Date | undefined {
  const match = MONTH_RE.exec(value);
  if (!match) return undefined;
  return new Date(Number(match[1]), Number(match[2]) - 1, 1);
}

export function MonthPicker({
  value,
  onChange,
  placeholder = "请选择",
  disabled,
  className,
  maxDate,
  ...props
}: MonthPickerProps) {
  const [open, setOpen] = useState(false);
  const selected = parseMonth(value);
  const endMonth = maxDate ?? addYears(endOfYear(new Date()), 5);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "justify-start font-normal",
              !selected && "text-muted-foreground",
              className,
            )}
            {...props}
          />
        }
      >
        <CalendarIcon
          data-icon="inline-start"
          className="text-muted-foreground"
        />
        {selected ? format(selected, "yyyy年M月") : placeholder}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          endMonth={endMonth}
          captionLayout="dropdown"
          onSelect={(date) => {
            if (date) onChange(format(date, "yyyy-MM"));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
