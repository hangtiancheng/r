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

import { Framework } from "@lark.js/mvc";
import type { FrameworkConfig } from "@lark.js/mvc";
import {
  initLarkSentry,
  isInitialized,
  traceCustomEvent,
} from "@lark.js/sentry";
import {
  ScreenRecordPlugin,
  PerformancePlugin,
  ExposurePlugin,
} from "@lark.js/sentry/plugins";
import { enablePlugin } from "@lark.js/sentry";
import { applyAntiCopy } from "@swifty.js/anti-copy/lark-mvc";

import resumeView from "@/views/resume";

// === Copy protection ===

applyAntiCopy({
  mode: "replace",
  print: false,
  replaceText: (selection) =>
    `${selection}\n\n— Copyright © ${new Date().getFullYear()} hangtiancheng. All rights reserved.
Unauthorized reproduction or distribution of this content is prohibited without prior written permission.`,
  devtools: true,
  onViolation: (e) => {
    // Before init the SDK drops events silently (empty dsn); skip early.
    if (!isInitialized()) return;
    traceCustomEvent({
      name: "AntiCopyViolation",
      message: e.key ? `${e.type}:${e.key}` : e.type,
      extra: { violation: e.type, key: e.key ?? "", url: location.href },
    });
  },
});

// === Boot ===

const config: FrameworkConfig = {
  rootId: "app",
  routeMode: "history",
  defaultPath: "/",
  defaultView: resumeView,
  unmatchedView: resumeView,
  error(e: Error) {
    console.error("[resume]", e);
  },
};

Framework.boot(config);

// === Monitoring ===
// initLarkSentry must run AFTER Framework.boot() so the instrumentation
// wraps the final framework configuration.

if (Framework.isBooted()) {
  initLarkSentry({
    dsn: "/sentry",
    debug: true,
    beforePushEventList(eventList) {
      if (!import.meta.env.DEV) {
        console.log("@lark.js/sentry App:", eventList);
        return false;
      }
      return eventList;
    },
  });
}

enablePlugin(
  new ScreenRecordPlugin(),
  new ExposurePlugin(),
  new PerformancePlugin(),
);
