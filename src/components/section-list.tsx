import type { JSX } from "@swifty.js/preact";
import type { TitledItem } from "../schema/resume";

interface SectionListProps {
  title: string;
  items: (string | TitledItem)[];
}

/**
 * Generic list section component for skills, works, projects, research.
 */
export function SectionList({ title, items }: SectionListProps): JSX.Element {
  return (
    <section class="rounded-lg border border-neutral-200 bg-white p-3">
      <div class="text-sm font-semibold text-neutral-900">{title}</div>
      <div class="my-1 h-px bg-neutral-100" />
      <ul class="mt-1.5 ml-4 list-disc space-y-0.5 text-xs text-neutral-700">
        {items.map((item) =>
          typeof item === "string" ? (
            <li>{item}</li>
          ) : (
            <li>
              <b>{item.title}</b>: {item.content}
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
