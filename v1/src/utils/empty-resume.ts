import type {
  AwardItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  ResumeDocument,
  SkillGroup,
} from "@/schema";

function createId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function createNowIso(): string {
  return new Date().toISOString();
}

export function createEmptyResumeDoc(): ResumeDocument {
  return {
    version: 1,
    updatedAt: createNowIso(),
    resume: {
      basics: {
        name: "",
        title: "",
        phone: "",
        email: "",
        location: "",
        website: "",
        github: "",
        summary: "",
      },
      education: [],
      experience: [],
      projects: [],
      skillGroups: [],
      awards: [],
    },
  };
}

export function createEmptyEducationItem(): EducationItem {
  return {
    id: createId("edu"),
    school: "",
    degree: "",
    major: "",
    start: "",
    end: "",
    location: "",
    highlights: [],
  };
}

export function createEmptyExperienceItem(): ExperienceItem {
  return {
    id: createId("exp"),
    company: "",
    role: "",
    start: "",
    end: "",
    location: "",
    highlights: [],
  };
}

export function createEmptyProjectItem(): ProjectItem {
  return {
    id: createId("proj"),
    name: "",
    role: "",
    start: "",
    end: "",
    link: "",
    highlights: [],
  };
}

export function createEmptySkillGroup(): SkillGroup {
  return { id: createId("skill"), category: "", items: [] };
}

export function createEmptyAwardItem(): AwardItem {
  return { id: createId("award"), name: "", issuer: "", date: "", detail: "" };
}
