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
