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

// react-day-picker types Dropdown#onChange as a native select ChangeEvent and
// reads event.target.value as a number, so build a structurally complete
// ChangeEvent around a real <select> element instead of casting.
function toSelectChangeEvent(value: number): ChangeEvent<HTMLSelectElement> {
  const select = document.createElement("select");
  // An option must exist, otherwise assigning `value` resets it to "".
  select.add(new Option(String(value), String(value), false, true));
  return {
    nativeEvent: new Event("change", { bubbles: true }),
    currentTarget: select,
    target: select,
    bubbles: true,
    cancelable: true,
    defaultPrevented: false,
    eventPhase: Event.AT_TARGET,
    isTrusted: false,
    preventDefault() {},
    isDefaultPrevented() {
      return false;
    },
    stopPropagation() {},
    isPropagationStopped() {
      return false;
    },
    persist() {},
    timeStamp: Date.now(),
    type: "change",
  };
}

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
        onChange?.(toSelectChangeEvent(next));
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
