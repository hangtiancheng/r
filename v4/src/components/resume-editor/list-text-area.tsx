import { Input } from "antd";
import type { ComponentProps, ReactElement } from "react";

type TextAreaProps = Omit<
  ComponentProps<typeof Input.TextArea>,
  "value" | "onChange"
>;

export interface ListTextAreaProps extends TextAreaProps {
  value?: string[];
  onChange?: (value: string[]) => void;
}

function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line: string): string => line.trim())
    .filter((line: string): boolean => line.length > 0);
}

export function ListTextArea(props: ListTextAreaProps): ReactElement {
  const { value, onChange, ...rest } = props;
  const text = (value ?? []).join("\n");

  return (
    <Input.TextArea
      {...rest}
      value={text}
      onChange={(event): void => onChange?.(toLines(event.target.value))}
    />
  );
}
