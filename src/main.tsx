import "@/index.css";
import "@/i18n";
import {
  ScreenRecordPlugin,
  PerformancePlugin,
  ExposurePlugin,
} from "@swifty.js/sentry/plugins";
import { enablePlugin, init } from "@swifty.js/sentry";
import { i18next } from "@/i18n";
import { mountReactWC } from "@/react-wc";

import { mountPreact } from "./preact";

init({
  dsn: "/sentry",
  debug: true,
  beforePushEventList(eventList) {
    if (!import.meta.env.DEV) {
      console.log("@swifty.js/sentry App:", eventList);
      return false;
    }
    return eventList;
  },
});

enablePlugin(new ScreenRecordPlugin());
enablePlugin(new ExposurePlugin());
enablePlugin(new PerformancePlugin());

// Two rendering roots: Preact for English, React+Lit WC for Chinese.
// Only one is visible at a time, toggled by the i18next listener below.
const reactRoot =
  document.getElementById("react-root") ?? document.createElement("react-root");

const preactRoot =
  document.getElementById("preact-root") ??
  document.createElement("react-root");

if (!reactRoot.id) {
  reactRoot.id = "react-root";
}
if (!preactRoot.id) {
  preactRoot.id = "preact-root";
}
if (!document.body.contains(reactRoot)) {
  document.body.appendChild(reactRoot);
}
if (!document.body.contains(preactRoot)) {
  document.body.appendChild(preactRoot);
}
function updateVisibility(lang: string): void {
  const en = lang === "en";
  reactRoot.classList.toggle("hidden", en);
  preactRoot.classList.toggle("hidden", !en);
}

// Initial visibility based on current language (default: en -> Preact).
updateVisibility(i18next.language);

// Preact tree (English mode).
mountPreact(preactRoot);
// React tree (Chinese mode, Lit Web Components via @lit/react).
mountReactWC(reactRoot);

// Toggle visibility on language change.
i18next.on("languageChanged", updateVisibility);
