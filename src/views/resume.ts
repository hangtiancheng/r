import { View } from "@lark.js/mvc";
import template from "./resume.html";
import { resumeSchema, type Resume, type EduExperience } from "@/schema/resume";
import defaultData from "../resume.json";

interface ResumeViewData extends Resume {
  isChanging: boolean;
}

const RESUME_KEY = "resume";

function getDefaults(): ResumeViewData {
  const parsed = resumeSchema.safeParse(defaultData);
  const resume = parsed.success
    ? parsed.data
    : (defaultData as unknown as Resume);
  return { ...resume, isChanging: false };
}

function saveResume(data: ResumeViewData): void {
  const { isChanging: _, ...resume } = data;
  localStorage.setItem(RESUME_KEY, JSON.stringify(resume));
}

function loadResume(): ResumeViewData | null {
  const raw = localStorage.getItem(RESUME_KEY);
  if (!raw) return null;
  const parsed = resumeSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    console.error("Invalid resume:", parsed.error);
    return null;
  }
  return { ...parsed.data, isChanging: false };
}

export default View.extend({
  template,

  render() {
    const data = loadResume() ?? getDefaults();
    this.updater.digest(data as unknown as Record<string, unknown>);
  },

  "toggleEdit<click>"() {
    const data = this.updater.get<ResumeViewData>();
    if (data.isChanging) {
      saveResume(data);
    } else {
      const stored = loadResume();
      if (stored) {
        this.updater.set(stored as unknown as Record<string, unknown>);
      }
    }
    this.updater.set({ isChanging: !data.isChanging }).digest();
  },

  "toggleEdit<contextmenu>"(e: Event) {
    e.preventDefault();
    const data = this.updater.get<ResumeViewData>();
    if (data.isChanging) {
      saveResume(data);
    } else {
      const stored = loadResume();
      if (stored) {
        this.updater.set(stored as unknown as Record<string, unknown>);
      }
    }
    this.updater.set({ isChanging: !data.isChanging }).digest();
  },

  "updateField<change>"(e: Event) {
    const target = e.target as HTMLInputElement;
    const field = target.dataset.field ?? "";
    const data = this.updater.get<ResumeViewData>();
    const update: Record<string, unknown> = {};

    if (field.startsWith("headers.")) {
      const key = field.split(".")[1] as keyof Resume["headers"];
      update.headers = { ...data.headers, [key]: target.value };
    } else {
      update[field] = target.value;
    }
    this.updater.set(update).digest();
  },

  "updateEdu<change>"(e: Event) {
    const target = e.target as HTMLInputElement;
    const idx = parseInt(target.dataset.idx ?? "0");
    const col = parseInt(target.dataset.col ?? "0");
    const data = this.updater.get<ResumeViewData>();

    const list = data.eduExperienceList.map((edu, i): EduExperience => {
      if (i !== idx) return edu;
      const copy: EduExperience = [...edu];
      copy[col] = target.value;
      return copy;
    });
    this.updater.set({ eduExperienceList: list }).digest();
  },

  "clearEdu<click>"(e: Event) {
    const target = e.target as HTMLElement;
    const idx = parseInt(target.dataset.idx ?? "0");
    const data = this.updater.get<ResumeViewData>();

    const list = data.eduExperienceList.map(
      (edu, i): EduExperience => (i === idx ? ["", "", ""] : edu),
    );
    this.updater.set({ eduExperienceList: list }).digest();
  },

  "updateListItem<change>"(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    const field = target.dataset.field ?? "";
    const idx = parseInt(target.dataset.idx ?? "0");
    const data = this.updater.get<ResumeViewData>();

    const list = [...(data[field as keyof ResumeViewData] as string[])];
    list[idx] = target.value;
    this.updater.set({ [field]: list }).digest();
  },

  "addItem<click>"(e: Event) {
    const target = e.target as HTMLElement;
    const section = target.dataset.section ?? "";
    const li = target.closest("li");
    const textarea = li?.querySelector(
      "textarea",
    ) as HTMLTextAreaElement | null;
    if (!textarea) return;
    const value = textarea.value.trim();
    if (!value) return;

    const data = this.updater.get<ResumeViewData>();
    const list = [...(data[section as keyof ResumeViewData] as string[])];
    list.push(value);
    textarea.value = "";
    this.updater.set({ [section]: list }).digest();
  },

  "removeItem<click>"(e: Event) {
    const target = e.target as HTMLElement;
    const field = target.dataset.field ?? "";
    const idx = parseInt(target.dataset.idx ?? "0");
    const data = this.updater.get<ResumeViewData>();

    const list = [...(data[field as keyof ResumeViewData] as string[])];
    list.splice(idx, 1);
    this.updater.set({ [field]: list }).digest();
  },

  "clearStorage<click>"() {
    localStorage.removeItem(RESUME_KEY);
    const defaults = getDefaults();
    this.updater.set(defaults as unknown as Record<string, unknown>).digest();
  },
});
