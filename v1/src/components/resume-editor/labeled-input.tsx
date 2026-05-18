import { Input } from "antd";
import type { ReactElement } from "react";

interface LabeledInputProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function LabeledInput(props: LabeledInputProps): ReactElement {
  const { label, value, placeholder, onChange } = props;

  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-slate-700">{label}</div>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(event): void => onChange(event.target.value)}
      />
    </label>
  );
}
