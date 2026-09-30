import "@/index.css";

import { createRoot } from "@yukino.js/lit-jsx";
import { createAntiCopy } from "@yukino.js/anti-copy";

import { dataAtom, resumeStore, toggleLocaleAtom } from "@/i18n";
import Resume from "@/pages/resume";

// === Copy protection (production only, matching the h site) ===

const antiCopy = import.meta.env.PROD
  ? createAntiCopy({
      mode: "replace",
      print: false,
      devtools: true,
      copy: false,
    })
  : null;
antiCopy?.enable();

// === Rendering ===

const app = document.getElementById("app");
if (!app) {
  throw new Error("Missing #app container.");
}

const root = createRoot(app);
const renderResume = () => root.render(<Resume />);
const onToggleLocale = () => resumeStore.set(toggleLocaleAtom);

app.addEventListener("toggle-locale", onToggleLocale);
const unsubscribe = resumeStore.sub(dataAtom, renderResume);
renderResume();

window.addEventListener("beforeunload", () => {
  unsubscribe();
  app.removeEventListener("toggle-locale", onToggleLocale);
  antiCopy?.destroy();
  root.unmount();
});
