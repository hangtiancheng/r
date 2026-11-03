import type { ModuleKind, ModuleTarget, ResumeDoc } from "@/lib/types";

export interface ModuleEntry {
  id: string;
  name: string;
  hidden: boolean;
}

export interface ModuleMeta {
  kind: ModuleKind;
  label: string;
  entries?: (doc: ResumeDoc) => ModuleEntry[];
}

export const MODULES: ModuleMeta[] = [
  { kind: "base", label: "个人信息" },
  {
    kind: "edu",
    label: "教育经历",
    entries: (d) =>
      d.edu.map((i) => ({ id: i.id, name: i.school, hidden: !!i.hidden })),
  },
  {
    kind: "work",
    label: "工作经历",
    entries: (d) =>
      d.works.map((i) => ({ id: i.id, name: i.company, hidden: !!i.hidden })),
  },
  {
    kind: "project",
    label: "项目经历",
    entries: (d) =>
      d.projects.map((i) => ({ id: i.id, name: i.name, hidden: !!i.hidden })),
  },
  {
    kind: "honor",
    label: "荣誉奖项",
    entries: (d) =>
      d.honors.map((i) => ({ id: i.id, name: i.name, hidden: !!i.hidden })),
  },
];

export function isModuleHidden(doc: ResumeDoc, kind: ModuleKind): boolean {
  return (doc.hiddenModules ?? []).includes(kind);
}

export function targetKey(target: ModuleTarget): string {
  return "kind" in target ? `kind:${target.kind}` : `custom:${target.customId}`;
}

export function orderedModuleTargets(doc: ResumeDoc): ModuleTarget[] {
  const targets: ModuleTarget[] = [
    ...MODULES.map(({ kind }) => ({ kind })),
    ...doc.customModules.map(({ id }) => ({ customId: id })),
  ];
  const remaining = new Map(
    targets.map((target) => [targetKey(target), target]),
  );
  const ordered: ModuleTarget[] = [];
  for (const key of Array.isArray(doc.moduleOrder) ? doc.moduleOrder : []) {
    const target = remaining.get(key);
    if (!target) continue;
    ordered.push(target);
    remaining.delete(key);
  }
  // Older backups have no order; new or missing modules keep their defaults.
  return [...ordered, ...remaining.values()];
}

export function isSameTarget(
  a: ModuleTarget | null,
  b: ModuleTarget | null,
): boolean {
  if (a === null || b === null) return a === b;
  return targetKey(a) === targetKey(b);
}
