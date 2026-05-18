import { Input } from "antd";
import type { ReactElement } from "react";

interface BulletEditorProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export function BulletEditor(props: BulletEditorProps): ReactElement {
  const { label, value, onChange } = props;

  return (
    <div>
      <div className="mb-1 text-xs font-medium text-slate-700">{label}</div>
      <Input.TextArea
        value={value.join("\n")}
        placeholder="Write one bullet per line"
        autoSize={{ minRows: 3, maxRows: 8 }}
        onChange={(event): void => {
          const lines = event.target.value
            .split("\n")
            .map((line: string): string => line.trim())
            .filter((line: string): boolean => line.length > 0);

          onChange(lines);
        }}
      />
    </div>
  );
}
