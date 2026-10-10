import {
  BriefcaseIcon,
  FolderKanbanIcon,
  GraduationCapIcon,
  LightbulbIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react";

import type { ModuleKind, ResumeDoc } from "@/lib/types";

export interface ModuleEntry {
  id: string;
  name: string;
  hidden: boolean;
}

export interface ModuleMeta {
  kind: ModuleKind;
  label: string;
  icon: typeof UserIcon;
  entries?: (doc: ResumeDoc) => ModuleEntry[];
}

export const MODULES: ModuleMeta[] = [
  { kind: "base", label: "个人信息", icon: UserIcon },
  {
    kind: "edu",
    label: "教育经历",
    icon: GraduationCapIcon,
    entries: (d) =>
      d.edu.map((i) => ({ id: i.id, name: i.school, hidden: !!i.hidden })),
  },
  {
    kind: "work",
    label: "工作经历",
    icon: BriefcaseIcon,
    entries: (d) =>
      d.works.map((i) => ({ id: i.id, name: i.company, hidden: !!i.hidden })),
  },
  {
    kind: "project",
    label: "项目经历",
    icon: FolderKanbanIcon,
    entries: (d) =>
      d.projects.map((i) => ({ id: i.id, name: i.name, hidden: !!i.hidden })),
  },
  {
    kind: "honor",
    label: "荣誉奖项",
    icon: TrophyIcon,
    entries: (d) =>
      d.honors.map((i) => ({ id: i.id, name: i.name, hidden: !!i.hidden })),
  },
  { kind: "skill", label: "个人技能", icon: LightbulbIcon },
];

export function isModuleHidden(doc: ResumeDoc, kind: ModuleKind): boolean {
  return (doc.hiddenModules ?? []).includes(kind);
}
