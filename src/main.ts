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

import { Framework, registerViewClass } from "@lark.js/mvc";
import type { FrameworkConfig } from "@lark.js/mvc";
import { encHtml } from "@lark.js/mvc/runtime";
import { initLarkSentry, instrumentView } from "@lark.js/sentry";
import type { LarkErrorContext } from "@lark.js/sentry";
import { EventType, reportFrameworkError } from "@swifty.js/sentry";
import {
  ScreenRecordPlugin,
  PerformancePlugin,
  ExposurePlugin,
} from "@swifty.js/sentry/plugins";
import { enablePlugin } from "@swifty.js/sentry";

import resumeView from "@/views/resume";
import resumeHeaderView from "@/views/components/resume-header";
import sectionEduView from "@/views/components/section-edu";
import sectionListView from "@/views/components/section-list";

// === Error fallback (mirrors the old React/Preact error boundaries) ===

function renderErrorFallback(error: unknown): void {
  const root = document.getElementById("app");
  if (!root) return;
  const message = error instanceof Error ? error.message : String(error);
  root.innerHTML = `
    <div class="min-h-dvh w-full bg-neutral-50 p-6 text-neutral-900">
      <div class="mx-auto max-w-2xl rounded-lg border border-red-200 bg-white p-4">
        <div class="mb-3 flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-red-500"></div>
          <h1 class="text-sm font-semibold text-neutral-900">Rendering Error</h1>
        </div>
        <div class="mb-2 text-xs text-red-700">${encHtml(message)}</div>
      </div>
    </div>`;
}

// Report every captured lark-mvc error to @swifty.js/sentry (same behavior
// as the default sink) and show the fallback card for render/setup crashes,
// like the old ReactErrorBoundary / PreactErrorBoundary did.
function larkErrorSink(error: unknown, context: LarkErrorContext): void {
  reportFrameworkError({
    type: EventType.OtherFrameworks,
    error,
    context: {
      framework: "lark-mvc",
      ...context,
    },
  });
  if (context.phase === "setup" || context.phase === "template") {
    renderErrorFallback(error);
  }
}

// === View registration ===
// All views are registered synchronously before boot. instrumentView wraps
// setup / template / event handlers / cleanups so errors swallowed by the
// framework are reported (the lark-mvc replacement for error boundaries).

registerViewClass(
  "views/resume",
  instrumentView(resumeView, { viewPath: "views/resume" }),
);
registerViewClass(
  "views/components/resume-header",
  instrumentView(resumeHeaderView, {
    viewPath: "views/components/resume-header",
  }),
);
registerViewClass(
  "views/components/section-edu",
  instrumentView(sectionEduView, {
    viewPath: "views/components/section-edu",
  }),
);
registerViewClass(
  "views/components/section-list",
  instrumentView(sectionListView, {
    viewPath: "views/components/section-list",
  }),
);

// === Boot ===

const config: FrameworkConfig = {
  rootId: "app",
  routeMode: "history",
  defaultPath: "/",
  defaultView: "views/resume",
  unmatchedView: "views/resume",
  vdom: false,
  error(e: Error) {
    console.error("[resume]", e);
  },
};

Framework.boot(config);

// === Monitoring ===
// initLarkSentry must run AFTER Framework.boot() so the instrumentation
// wraps the final framework configuration.

initLarkSentry({
  dsn: "/sentry",
  debug: true,
  onError: larkErrorSink,
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
