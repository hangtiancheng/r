import { Suspense, lazy } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsDark } from "@/hooks/use-is-dark";

const MDEditor = lazy(() => import("@uiw/react-md-editor"));

export interface MarkdownFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  height?: number;
  placeholder?: string;
}

export function MarkdownField({
  label,
  value,
  onChange,
  height = 200,
  placeholder,
}: MarkdownFieldProps) {
  const dark = useIsDark();
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <div data-color-mode={dark ? "dark" : "light"}>
        <Suspense fallback={<Skeleton style={{ height }} />}>
          <MDEditor
            value={value}
            onChange={(next) => onChange(next ?? "")}
            height={height}
            preview="edit"
            hideToolbar
            textareaProps={{ placeholder }}
          />
        </Suspense>
      </div>
    </Field>
  );
}
