import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enData from "./en.json";
import zhData from "./zh.json";
import { resumeSchema } from "../schema/resume";

// Validate resource shape at module load so malformed data fails fast
// instead of surfacing as undefined access at render time.
const en = resumeSchema.parse(enData);
const zh = resumeSchema.parse(zhData);

void i18next.use(initReactI18next).init({
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

export { i18next };
