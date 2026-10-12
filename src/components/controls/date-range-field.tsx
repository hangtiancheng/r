import { useId } from "react";

import { MonthPicker } from "@/components/controls/month-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";

export interface DateRangeValue {
  start: string;
  end: string;
  ongoing: boolean;
}

export interface DateRangeFieldProps {
  value: DateRangeValue;
  onChange: (patch: Partial<DateRangeValue>) => void;
  maxDate?: Date;
}

export function DateRangeField({
  value,
  onChange,
  maxDate,
}: DateRangeFieldProps) {
  const id = useId();
  return (
    <Field>
      <FieldLabel>起止时间（必填）</FieldLabel>
      <div className="flex flex-wrap items-center gap-2">
        <MonthPicker
          aria-label="开始时间"
          value={value.start}
          maxDate={maxDate}
          onChange={(start) => onChange({ start })}
          className="min-w-40 flex-1"
        />
        <span aria-hidden className="text-muted-foreground">
          -
        </span>
        <MonthPicker
          aria-label="结束时间"
          value={value.end}
          disabled={value.ongoing}
          maxDate={maxDate}
          onChange={(end) => onChange({ end })}
          className="min-w-40 flex-1"
        />
        <Field orientation="horizontal" className="w-auto gap-1.5">
          <Checkbox
            id={`${id}-ongoing`}
            checked={value.ongoing}
            onCheckedChange={(checked) =>
              onChange({ ongoing: checked === true })
            }
          />
          <FieldLabel htmlFor={`${id}-ongoing`}>至今</FieldLabel>
        </Field>
      </div>
    </Field>
  );
}
