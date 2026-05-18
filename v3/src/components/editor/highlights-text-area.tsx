import { Input } from "antd";

const { TextArea } = Input;

interface HighlightsTextAreaProps {
  value?: (string | undefined)[];
  onChange?(value: string[]): void;
  placeholder?: string;
}

export function HighlightsTextArea(
  props: HighlightsTextAreaProps,
): React.ReactElement {
  return (
    <TextArea
      autoSize={{ minRows: 3, maxRows: 6 }}
      placeholder={props.placeholder}
      value={(props.value ?? []).join("\n")}
      onChange={(event) => {
        const lines = event.target.value.split("\n");
        props.onChange?.(lines);
      }}
    />
  );
}
