import { cn } from "cn";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface OptionsSelectProps {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function OptionsSelect({
  value,
  options,
  onChange,
  placeholder,
  className,
}: OptionsSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => onChange(String(next ?? ""))}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
