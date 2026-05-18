import type { ReactElement } from "react";

export function EmptyHint(): ReactElement {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
      No content yet. Add items in the editor and the preview will update
      automatically.
    </div>
  );
}
