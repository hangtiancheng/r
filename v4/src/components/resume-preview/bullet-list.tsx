import type { ReactElement } from "react";

interface BulletListProps {
  items: string[];
}

export function BulletList(props: BulletListProps): ReactElement | null {
  const normalized = props.items
    .map((item: string): string => item.trim())
    .filter((item: string): boolean => item.length > 0);

  if (normalized.length === 0) {
    return null;
  }

  return (
    <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-slate-800">
      {normalized.map(
        (item: string): ReactElement => (
          <li key={item}>{item}</li>
        ),
      )}
    </ul>
  );
}
