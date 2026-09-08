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

import { createRoot } from "@swifty.js/lit-jsx";
import { createAntiCopy } from "@swifty.js/anti-copy";

import { resumeStore } from "@/i18n";
import Resume from "@/pages/resume";

// === Copy protection ===

createAntiCopy({
  mode: "replace",
  print: false,
  //   replaceText: (selection) =>
  //     `${selection}\n\n— Copyright © ${new Date().getFullYear()} hangtiancheng. All rights reserved.
  // Unauthorized reproduction or distribution of this content is prohibited without prior written permission.`,
  devtools: true,
  copy: false,
}).enable();

// === Rendering ===

const app = document.getElementById("app");
if (!app) {
  throw new Error("Missing #app container.");
}

const root = createRoot(app);
const renderResume = () => root.render(<Resume />);
const onToggleLocale = () => resumeStore.getState().toggleLocale();

app.addEventListener("toggle-locale", onToggleLocale);
const unsubscribe = resumeStore.subscribe(renderResume);
renderResume();

window.addEventListener("beforeunload", () => {
  unsubscribe();
  app.removeEventListener("toggle-locale", onToggleLocale);
  root.unmount();
});
