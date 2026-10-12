export type Gender = "男" | "女";

export interface BaseInfo {
  name: string;
  gender: Gender;
  birth: string;
  showAge: boolean;
  freshGraduate: boolean;
  workStart: string;
  tel: string;
  email: string;
  hometown: string;
  political: string;
  location: string;
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
  hidden?: boolean;
}

export interface WorkDetail {
  id: string;
  title: string;
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
  content: string;
  hidden?: boolean;
}

export interface HonorItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  hidden?: boolean;
}

export interface ResumeDoc {
  id: number;
  title: string;
  base: BaseInfo;
  edu: EduItem[];
  works: WorkItem[];
  projects: ProjectItem[];
  honors: HonorItem[];
  skills: string;
  hiddenModules: ModuleKind[];
  updatedAt: number;
}

export type ModuleKind =
  "base" | "edu" | "work" | "project" | "honor" | "skill";
