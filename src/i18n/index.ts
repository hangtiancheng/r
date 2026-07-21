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

import i18next from "i18next";
import { signal } from "@preact/signals";
import enData from "@/i18n/en.json";
import zhData from "@/i18n/zh.json";
import { resumeSchema } from "@/schema/resume";
import type { Resume } from "@/schema/resume";

// Validate resource shape at module load so malformed data fails fast
// instead of surfacing as undefined access at render time.
const en = resumeSchema.parse(enData);
const zh = resumeSchema.parse(zhData);

/**
 * Signal holding the current resume data.
 * Updates reactively whenever the active language changes.
 */
export const resumeData = signal<Resume>(en);

/**
 * Signal holding the current language code.
 */
export const currentLang = signal<string>("en");

void i18next.init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  interpolation: {
    escapeValue: false,
  },
});

i18next.on("languageChanged", (lng: string) => {
  currentLang.value = lng;
  resumeData.value = i18next.getResourceBundle(lng, "translation") as Resume;
});

export { i18next };
