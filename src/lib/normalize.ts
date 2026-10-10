import type { BaseInfo, ResumeDoc } from "@/lib/types";

const DEFAULT_BASE: BaseInfo = {
  name: "",
  gender: "男",
  birth: "",
  showAge: false,
  freshGraduate: false,
  workStart: "",
  tel: "",
  email: "",
  hometown: "",
  political: "",
  location: "",
  degree: "",
};

export function normalizeResume(doc: ResumeDoc): ResumeDoc {
  doc.title ??= "";
  doc.skills ??= "";
  doc.hiddenModules ??= [];
  doc.edu ??= [];
  doc.works ??= [];
  doc.projects ??= [];
  doc.honors ??= [];
  doc.base = { ...DEFAULT_BASE, ...doc.base };

  for (const work of doc.works) {
    work.details ??= [];
    for (const detail of work.details) {
      detail.title ??= "";
      detail.content ??= "";
    }
  }
  for (const project of doc.projects) {
    project.content ??= "";
    project.repo ??= "";
  }
  for (const honor of doc.honors) {
    honor.name ??= "";
    honor.issuer ??= "";
    honor.date ??= "";
  }
  for (const edu of doc.edu) {
    edu.school ??= "";
    edu.major ??= "";
    edu.degree ??= "";
  }
  return doc;
}
