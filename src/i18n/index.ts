import { atom, createStore } from "jotai/vanilla";

import { parseResume } from "@/schema/parse";
import type { Lang, Resume, TitledItem } from "@/schema/resume";

import resumeEnMd from "@/i18n/resume.md?raw";
import resumeZhMd from "@/i18n/resume_zh.md?raw";

export type { Lang };

// Markdown is the single source of truth: both locales are parsed from
// `resume.md` (en) / `resume_zh.md` (zh) at module init, mirroring the h
// project's `lib/resume` pipeline.
const en = parseResume(resumeEnMd, "en");
const zh = parseResume(resumeZhMd, "zh");

export interface ResumeSection {
  title: string;
  items: (string | TitledItem)[];
  /** Column count hint for rendering; defaults to 1. */
  columns?: number;
}

function buildSections(data: Resume): ResumeSection[] {
  return [
    { title: data.headers.skills, items: data.skills, columns: 2 },
    { title: data.headers.works, items: data.works },
    { title: data.headers.projects, items: data.projects },
    { title: data.headers.research, items: [data.research] },
  ];
}

const langAtom = atom<Lang>("en");

/** Resume data for the active language. */
export const dataAtom = atom<Resume>((get) =>
  get(langAtom) === "en" ? en : zh,
);

/** Locale-agnostic section list derived from the resume data. */
export const sectionsAtom = atom<ResumeSection[]>((get) =>
  buildSections(get(dataAtom)),
);

/** Flips the active language between English and Chinese. */
export const toggleLocaleAtom = atom(null, (get, set) => {
  set(langAtom, get(langAtom) === "en" ? "zh" : "en");
});

/**
 * Vanilla (non-React) jotai store. This app has no React — views read
 * atoms imperatively via `resumeStore.get(...)` and re-render on
 * `resumeStore.sub(...)` notifications.
 */
export const resumeStore = createStore();
