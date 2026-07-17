import { render } from "@swifty.js/preact";
import "@/index.css";
import "@/i18n/store";
import "@/i18n";
import {
  ScreenRecordPlugin,
  PerformancePlugin,
  ExposurePlugin,
} from "@swifty.js/sentry/plugins";
import { enablePlugin, init } from "@swifty.js/sentry";
import { resumeStore } from "@/i18n/store";
import { mountReactApp } from "@/mount-react";

import App from "@/app";
import { PreactErrorBoundary } from "@swifty.js/sentry/preact";

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
// Only one is visible at a time, toggled by the store subscription below.
const preactRoot = document.getElementById("root")!;
const reactRoot = document.createElement("div");
reactRoot.id = "root-react";
document.body.appendChild(reactRoot);

// Initial visibility based on current language (default: en → Preact).
const isZh = resumeStore.getLang() === "zh";
preactRoot.classList.toggle("hidden", isZh);
reactRoot.classList.toggle("hidden", !isZh);

// Preact tree (English mode).
render(
  <PreactErrorBoundary fallback={<>Oops!!!</>}>
    <App />
  </PreactErrorBoundary>,
  preactRoot,
);

// React tree (Chinese mode, Lit Web Components via @lit/react).
mountReactApp(reactRoot);

// Toggle visibility on language change.
resumeStore.subscribe(() => {
  const zh = resumeStore.getLang() === "zh";
  preactRoot.classList.toggle("hidden", zh);
  reactRoot.classList.toggle("hidden", !zh);
});
