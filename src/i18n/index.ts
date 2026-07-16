import i18next from "i18next";
import { signal } from "@preact/signals";
import enData from "./en.json";
import zhData from "./zh.json";
import { resumeSchema } from "../schema/resume";
import type { Resume } from "../schema/resume";

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
