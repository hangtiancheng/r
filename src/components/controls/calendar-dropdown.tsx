import type { ChangeEvent, SelectHTMLAttributes } from "react";
import type { DropdownOption } from "react-day-picker";
import { cn } from "cn";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarDropdownProps = {
  options?: DropdownOption[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "children">;

export function CalendarDropdown({
  options = [],
  value,
  onChange,
  disabled,
  className,
  ...props
}: CalendarDropdownProps) {
  return (
    <Select<number>
      items={options.map((option) => ({
        value: option.value,
        label: option.label,
      }))}
      value={typeof value === "number" ? value : undefined}
      disabled={disabled}
      onValueChange={(next) => {
        if (next == null) return;
        onChange?.({
          target: { value: next },
        } as unknown as ChangeEvent<HTMLSelectElement>);
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={props["aria-label"]}
        className={cn("w-auto min-w-16", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} className="max-h-64">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
