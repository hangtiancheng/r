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

import { render } from "@lark.js/mvc";
import {
  enablePlugin,
  initLarkSentry,
  isInitialized,
  traceCustomEvent,
} from "@lark.js/sentry";
import { PerformancePlugin, ScreenRecordPlugin } from "@lark.js/sentry/plugins";
import { createAntiCopy } from "@swifty.js/anti-copy";

import Resume from "@/pages/resume";

// === Monitoring (before render, so first-render errors are captured) ===

initLarkSentry({
  dsn: "/sentry",
  trackRoutes: false, // single-page resume — no router
  debug: import.meta.env.DEV,
  beforePushEventList(eventList) {
    if (!import.meta.env.DEV) {
      console.log("@lark.js/sentry App:", eventList);
      return false; // no backend in production — log and drop
    }
    return eventList; // dev — send to the vite mock endpoint
  },
});

enablePlugin(new ScreenRecordPlugin(), new PerformancePlugin());

// === Copy protection ===

createAntiCopy({
  mode: "replace",
  print: false,
  //   replaceText: (selection) =>
  //     `${selection}\n\n— Copyright © ${new Date().getFullYear()} hangtiancheng. All rights reserved.
  // Unauthorized reproduction or distribution of this content is prohibited without prior written permission.`,
  devtools: true,
  onViolation: (e) => {
    if (!isInitialized()) return;
    traceCustomEvent({
      name: "AntiCopyViolation",
      message: e.key ? `${e.type}:${e.key}` : e.type,
      extra: { violation: e.type, key: e.key ?? "", url: location.href },
    });
  },
}).enable();

// === Rendering ===

render(<Resume />, document.getElementById("app")!);
