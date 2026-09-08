/**
 * Copyright (c) 2026 hangtiancheng
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { atom, createStore } from "jotai/vanilla";
import enData from "@/i18n/en.json";
import zhData from "@/i18n/zh.json";
import type { Resume, TitledItem } from "@/schema/resume";

const en = enData satisfies Resume;
const zh = zhData satisfies Resume;

export type Lang = "en" | "zh";

export interface ResumeSection {
  title: string;
  items: (string | TitledItem)[];
}

function buildSections(data: Resume): ResumeSection[] {
  return [
    { title: data.headers.skills, items: data.skills },
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
