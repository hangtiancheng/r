import MarkdownPreview from "@uiw/react-markdown-preview";
import { cn } from "cn";

export interface PaperMarkdownProps {
  source: string;
  strong?: boolean;
}

export function PaperMarkdown({ source, strong = false }: PaperMarkdownProps) {
  const body = typeof source === "string" ? source : "";
  if (!body.trim()) return null;
  return (
    <div
      className={cn("qq-md mt-0.5", strong ? "qq-md-ink" : "qq-md-ink-60")}
      data-color-mode="light"
    >
      <MarkdownPreview
        source={body}
        components={{
          a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      />
    </div>
  );
}
