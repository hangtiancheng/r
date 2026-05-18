import { Input } from "antd";
import type { ReactElement } from "react";
import type { YearMonth } from "@/schema";
import { normalizeYearMonth } from "@/utils";

interface YearMonthInputProps {
  label: string;
  value: YearMonth;
  onChange: (value: YearMonth) => void;
}

export function YearMonthInput(props: YearMonthInputProps): ReactElement {
  const { label, value, onChange } = props;

  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-slate-700">{label}</div>
      <Input
        value={value}
        placeholder="YYYY-MM / Present"
        onChange={(event): void =>
          onChange(normalizeYearMonth(event.target.value))
        }
      />
    </label>
  );
}
