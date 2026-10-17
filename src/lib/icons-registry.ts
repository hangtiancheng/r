import * as lucide from "lucide-react";
import { LightbulbIcon, type LucideIcon } from "lucide-react";

const FORWARD_REF = Symbol.for("react.forward_ref");

function isIconComponent(value: unknown): value is LucideIcon {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { $$typeof?: symbol }).$$typeof === FORWARD_REF
  );
}

// lucide-react exports every icon twice (`Activity` and `ActivityIcon`). Dedupe
// by component reference and keep the `Icon`-suffixed alias for a stable name.
function collectIcons(): Map<string, LucideIcon> {
  const byRef = new Map<LucideIcon, string>();
  for (const [name, value] of Object.entries(lucide)) {
    if (!isIconComponent(value)) continue;
    const existing = byRef.get(value);
    if (!existing) byRef.set(value, name);
    else if (!existing.endsWith("Icon") && name.endsWith("Icon"))
      byRef.set(value, name);
  }
  const icons = [...byRef].map(
    ([component, name]) => [name, component] as const,
  );
  icons.sort(([a], [b]) => a.localeCompare(b));
  return new Map(icons);
}

const ICONS = collectIcons();

export const MODULE_ICON_NAMES = [...ICONS.keys()];

export function resolveModuleIcon(name: string): LucideIcon {
  return ICONS.get(name) ?? LightbulbIcon;
}
