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

import React from "react";
import { createComponent, type EventName } from "@lit/react";
import { ResumeHeader } from "@/components/wc/resume-header";
import { SectionEdu } from "@/components/wc/section-edu";
import { SectionList } from "@/components/wc/section-list";

/**
 * @lit/react wrappers — bridges Lit Web Components into React
 * so they can be composed in JSX with proper prop reflection and
 * event mapping.
 */
export const ResumeHeaderWC = createComponent({
  tagName: "resume-header",
  elementClass: ResumeHeader,
  react: React,
  events: {
    onToggleLocale: "toggle-locale" as EventName<CustomEvent>,
  },
});

export const SectionEduWC = createComponent({
  tagName: "section-edu",
  elementClass: SectionEdu,
  react: React,
});

export const SectionListWC = createComponent({
  tagName: "section-list",
  elementClass: SectionList,
  react: React,
});
