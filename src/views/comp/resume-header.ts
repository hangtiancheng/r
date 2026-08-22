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

import { defineView, useState } from "@lark.js/mvc";
import type { Labels } from "@/schema/resume";
import template from "./resume-header.html";
import avatarUrl from "@/assets/avatar.jpeg";

interface ResumeHeaderProps {
  name?: string;
  about?: string;
  tel?: string;
  email?: string;
  github?: string;
  labels?: Labels;
}

/**
 * Resume header view.
 *
 * Pure presentation — all data arrives via `*prop` bindings, and the
 * language toggle fires a "toggleLocale" frame event for the parent to
 * handle (the lark-mvc equivalent of the old Lit CustomEvent). Later
 * parent renders push updated props through mountZone automatically.
 */
export default defineView((ctx, params) => {
  const p = (params ?? {}) as ResumeHeaderProps;
  const [, setPreviewing] = useState("previewing", false);
  ctx.updater.set({
    avatarUrl,
    name: p.name ?? "",
    about: p.about ?? "",
    tel: p.tel ?? "",
    email: p.email ?? "",
    github: p.github ?? "",
    labels: p.labels ?? { tel: "", email: "", github: "", switch: "" },
  });

  return {
    template,
    events: {
      "toggleLocale<click>": () => {
        ctx.owner.fire("toggleLocale");
      },
      "previewAvatar<click>": () => {
        setPreviewing(true);
      },
      "closePreview<click>": () => {
        setPreviewing(false);
      },
    },
  };
});
