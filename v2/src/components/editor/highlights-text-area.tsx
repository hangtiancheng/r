import { Input } from "antd";

const { TextArea } = Input;

interface HighlightsTextAreaProps {
  value?: string[];
  onChange?(value: string[]): void;
  placeholder?: string;
}

export function HighlightsTextArea(
  props: HighlightsTextAreaProps,
): React.ReactElement {
  return (
    <TextArea
      autoSize={{ minRows: 3, maxRows: 6 }}
      value={(props.value ?? []).join("\n")}
      placeholder={props.placeholder}
      onChange={(event) => {
        const lines = event.target.value
          .split("\n")
          .map((line): string => line.trim())
          .filter(Boolean);
        props.onChange?.(lines);
      }}
    />
  );
}
