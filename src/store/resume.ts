import { defineStore } from "@lark.js/mvc";
import { resumeSchema, type Resume, type EduExperience } from "@/schema/resume";
import defaultData from "@/resume.json";

const RESUME_KEY = "resume";

export interface ResumeStoreData extends Resume {
  isChanging: boolean;
  toggleEdit(): void;
  clearStorage(): void;
  reloadFromStorage(): void;
  setField(key: string, value: string): void;
  getList(key: string): string[];
  setList(key: string, value: string[]): void;
  setEduList(list: EduExperience[]): void;
  getHeader(key: string): string;
  setHeader(key: string, value: string): void;
}

function getDefaults(): Resume & { isChanging: boolean } {
  const parsed = resumeSchema.safeParse(defaultData);
  const resume = parsed.success
    ? parsed.data
    : (defaultData as unknown as Resume);
  return { ...resume, isChanging: false };
}

function loadResume(): Resume | null {
  const raw = localStorage.getItem(RESUME_KEY);
  if (!raw) return null;
  const parsed = resumeSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) return null;
  return parsed.data;
}

function saveResume(data: Resume): void {
  localStorage.setItem(RESUME_KEY, JSON.stringify(data));
}

function toResume(store: ResumeStoreData): Resume {
  return {
    name: store.name,
    myInfo: store.myInfo,
    tel: store.tel,
    email: store.email,
    github: store.github,
    headers: { ...store.headers },
    eduExperienceList: store.eduExperienceList.map((e: EduExperience) => [
      ...e,
    ]),
    devAbilitiesList: [...store.devAbilitiesList],
    jobExperienceList: [...store.jobExperienceList],
    projectExperienceList: [...store.projectExperienceList],
    researchExperienceList: [...store.researchExperienceList],
  };
}

function applyResume(target: ResumeStoreData, source: Resume): void {
  target.name = source.name;
  target.myInfo = source.myInfo;
  target.tel = source.tel;
  target.email = source.email;
  target.github = source.github;
  target.headers = { ...source.headers };
  target.eduExperienceList = source.eduExperienceList.map(
    (e: EduExperience) => [...e],
  );
  target.devAbilitiesList = [...source.devAbilitiesList];
  target.jobExperienceList = [...source.jobExperienceList];
  target.projectExperienceList = [...source.projectExperienceList];
  target.researchExperienceList = [...source.researchExperienceList];
}

const useResumeStore = defineStore<ResumeStoreData>("resume", (store) => {
  const stored = loadResume();
  const initial = stored ? { ...stored, isChanging: false } : getDefaults();

  return {
    ...initial,

    toggleEdit(): void {
      if (store.isChanging) {
        saveResume(toResume(store));
      } else {
        const fresh = loadResume();
        if (fresh) applyResume(store, fresh);
      }
      store.isChanging = !store.isChanging;
    },

    clearStorage(): void {
      localStorage.removeItem(RESUME_KEY);
      const defaults = getDefaults();
      applyResume(store, defaults);
      store.isChanging = defaults.isChanging;
    },

    reloadFromStorage(): void {
      const fresh = loadResume();
      if (fresh) applyResume(store, fresh);
    },

    setField(key: string, value: string): void {
      if (key === "name") store.name = value;
      else if (key === "myInfo") store.myInfo = value;
      else if (key === "tel") store.tel = value;
      else if (key === "email") store.email = value;
      else if (key === "github") store.github = value;
    },

    getList(key: string): string[] {
      if (key === "devAbilitiesList") return [...store.devAbilitiesList];
      if (key === "jobExperienceList") return [...store.jobExperienceList];
      if (key === "projectExperienceList")
        return [...store.projectExperienceList];
      if (key === "researchExperienceList")
        return [...store.researchExperienceList];
      return [];
    },

    setList(key: string, value: string[]): void {
      if (key === "devAbilitiesList") {
        store.devAbilitiesList = value;
        return;
      }
      if (key === "jobExperienceList") {
        store.jobExperienceList = value;
        return;
      }
      if (key === "projectExperienceList") {
        store.projectExperienceList = value;
        return;
      }
      if (key === "researchExperienceList") {
        store.researchExperienceList = value;
        return;
      }
    },

    setEduList(list: EduExperience[]): void {
      store.eduExperienceList = list;
    },

    getHeader(key: string): string {
      if (key === "eduExperience") return store.headers.eduExperience;
      if (key === "devAbilities") return store.headers.devAbilities;
      if (key === "jobExperience") return store.headers.jobExperience;
      if (key === "projectExperience") return store.headers.projectExperience;
      if (key === "researchExperience") return store.headers.researchExperience;
      return "";
    },

    setHeader(key: string, value: string): void {
      store.headers = { ...store.headers, [key]: value };
    },
  };
});

export default useResumeStore;
