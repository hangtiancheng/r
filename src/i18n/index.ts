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

import { createStore, computed } from "@lark.js/mvc";
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

interface ResumeState {
  lang: Lang;
  data: Resume;
  sections: ResumeSection[];
  toggleLocale: () => void;
}

/**
 * Store holding the current resume data. Every view bound via `useStore`
 * re-renders automatically when the language toggles, with no prop
 * drilling required — the lark-mvc equivalent of the old React signal.
 */
export const resumeStore = createStore<ResumeState>("resume", (set, get) => ({
  lang: "en",
  data: en,
  sections: computed(["data"], () => buildSections(get().data)),
  toggleLocale: () => {
    const next: Lang = get().lang === "en" ? "zh" : "en";
    set({ lang: next, data: next === "en" ? en : zh });
  },
}));
