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

/**
 * Custom-element registrations for Lark JSX.
 *
 * `JSX.IntrinsicElements` is strict — unknown tags are compile errors — so
 * the local Lit components (src/pages/wc) are registered here via module
 * augmentation (declaration merging into `@lark.js/mvc/jsx-runtime`).
 *
 * Only DATA attributes are declared: the lark runtime serializes them as
 * plain attributes and Lit's `@property` converters turn them back into
 * typed properties. The `toggle-locale` custom event is not expressible as
 * a lark `on*` prop (event types are derived via `slice(2).toLowerCase()`) —
 * listen via `ref` + `addEventListener` (typed by the `HTMLElementEventMap`
 * augmentation in resume-header.ts).
 */
import type { HTMLAttributes } from "@lark.js/mvc";

import type { ResumeHeaderElement } from "@/pages/wc/resume-header";
import type { SectionEduElement } from "@/pages/wc/section-edu";
import type { SectionListElement } from "@/pages/wc/section-list";

declare module "@lark.js/mvc/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "resume-header": HTMLAttributes<ResumeHeaderElement> & {
        name?: string;
        about?: string;
        tel?: string;
        email?: string;
        github?: string;
        /** JSON `Labels` object (Lit Object converter). */
        labels?: string;
      };
      "section-edu": HTMLAttributes<SectionEduElement> & {
        header?: string;
        /** JSON `string[][]` rows (Lit Array converter). */
        edu?: string;
      };
      "section-list": HTMLAttributes<SectionListElement> & {
        heading?: string;
        /** JSON array of `string | TitledItem` (Lit Array converter). */
        items?: string;
      };
    }
  }
}
