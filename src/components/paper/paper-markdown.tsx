import MarkdownPreview from "@uiw/react-markdown-preview";
import { cn } from "cn";

export interface PaperMarkdownProps {
  source: string;
  strong?: boolean;
}

// wmde-markdown ships its own unlayered stylesheet, so overrides need the
// important modifier to win the cascade against it.
const WMDE = [
  "[&_.wmde-markdown]:bg-transparent!",
  "[&_.wmde-markdown]:font-sans!",
  "[&_.wmde-markdown]:text-sm!",
  "[&_.wmde-markdown]:leading-5.5!",
  "[&_.wmde-markdown_p]:my-0.5!",
  "[&_.wmde-markdown_ol]:my-0.5!",
  "[&_.wmde-markdown_ol]:pl-[1.4em]!",
  "[&_.wmde-markdown_ul]:my-0.5!",
  "[&_.wmde-markdown_ul]:list-disc!",
  "[&_.wmde-markdown_ul]:pl-[1.4em]!",
  "[&_.wmde-markdown_li+li]:mt-0.5!",
  "[&_.wmde-markdown_a]:text-[#0f7af5]!",
  "[&_.wmde-markdown_a]:no-underline!",
  "[&_.wmde-markdown_a:hover]:underline!",
  "[&_.wmde-markdown_code]:text-[12.5px]!",
].join(" ");

const WMDE_INK =
  "[&_.wmde-markdown]:text-[#13181d]! [&_.wmde-markdown]:[--color-fg-default:#13181d]!";

const WMDE_INK_60 =
  "[&_.wmde-markdown]:text-[rgba(24,36,48,0.6)]! [&_.wmde-markdown]:[--color-fg-default:rgba(24,36,48,0.6)]!";

export function PaperMarkdown({ source, strong = false }: PaperMarkdownProps) {
  const body = typeof source === "string" ? source : "";
  if (!body.trim()) return null;
  return (
    <div
      className={cn("mt-0.5", WMDE, strong ? WMDE_INK : WMDE_INK_60)}
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
