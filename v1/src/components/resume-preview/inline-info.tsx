import type { ReactElement } from "react";

interface InlineInfoProps {
  label: string;
  value: string;
}

export function InlineInfo(props: InlineInfoProps): ReactElement | null {
  const { label, value } = props;
  return value.trim().length === 0 ? null : (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-700">{value}</span>
    </span>
  );
}
