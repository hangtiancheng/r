export type Gender = "男" | "女";

/** Basic personal info — mirrors QQ Mail's 个人信息 module. */
export interface BaseInfo {
  name: string;
  gender: Gender;
  /** Birth month, "YYYY-MM". Rendered as age when `showAge` is on. */
  birth: string;
  showAge: boolean;
  /** 应届毕业生 tag. */
  freshGraduate: boolean;
  /** First-work month, "YYYY-MM" (optional). */
  workStart: string;
  tel: string;
  email: string;
  /** 籍贯 */
  hometown: string;
  /** 政治面貌 */
  political: string;
  /** 所在地 */
  location: string;
  /** 最高学历 */
  degree: string;
}

export interface EduItem {
  id: string;
  start: string;
  end: string;
  ongoing: boolean;
  school: string;
  major: string;
  degree: string;
  gpa: string;
  rank: string;
  /** Hidden items keep their data but are skipped in the paper. */
  hidden?: boolean;
}

export interface WorkDetail {
  id: string;
  title: string;
  /** Markdown body (bullet lists etc.). */
  content: string;
}

export interface WorkItem {
  id: string;
  start: string;
  end: string;
  ongoing: boolean;
  company: string;
  department: string;
  position: string;
  details: WorkDetail[];
  /** Hidden items keep their data but are skipped in the paper. */
  hidden?: boolean;
}

export interface ProjectItem {
  id: string;
  start: string;
  end: string;
  ongoing: boolean;
  name: string;
  duty: string;
  repo: string;
  /** Markdown body (bullet lists etc.). */
  content: string;
  /** Hidden items keep their data but are skipped in the paper. */
  hidden?: boolean;
}

export interface HonorItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  /** Hidden items keep their data but are skipped in the paper. */
  hidden?: boolean;
}

/** The whole resume document persisted in IndexedDB (dexie). */
export interface ResumeDoc {
  id: number;
  title: string;
  base: BaseInfo;
  edu: EduItem[];
  works: WorkItem[];
  projects: ProjectItem[];
  honors: HonorItem[];
  /** Markdown body of the 个人技能 module. */
  skills: string;
  /**
   * Modules toggled hidden from the paper. Like hidden items, their data is
   * kept — hiding only affects rendering.
   */
  hiddenModules: ModuleKind[];
  updatedAt: number;
}

export type ModuleKind =
  "base" | "edu" | "work" | "project" | "honor" | "skill";
