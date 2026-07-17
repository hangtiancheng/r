import i18next from "i18next";
import enData from "@/i18n/en.json";
import zhData from "@/i18n/zh.json";
import { resumeSchema } from "@/schema/resume";
import type { Resume } from "@/schema/resume";

const en = resumeSchema.parse(enData);
const zh = resumeSchema.parse(zhData);

type Listener = () => void;

let data: Resume = en;
let lang: string = "en";
const listeners = new Set<Listener>();

function notify(): void {
  for (const listener of listeners) {
    listener();
  }
}

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
  data = i18next.getResourceBundle(lng, "translation") as Resume;
  lang = lng;
  notify();
});

/**
 * External store with subscribe/getData/getLang interface.
 *
 * Lit components subscribe in connectedCallback and call requestUpdate()
 * on each notification. React wrappers can use useSyncExternalStore
 * directly against this API.
 */
export const resumeStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getData(): Resume {
    return data;
  },
  getLang(): string {
    return lang;
  },
  toggleLanguage(): void {
    void i18next.changeLanguage(lang === "en" ? "zh" : "en");
  },
};
