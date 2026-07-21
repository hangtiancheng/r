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

import type { JSX } from "@swifty.js/preact";
import type { TitledItem } from "@/schema/resume";

interface SectionListProps {
  title: string;
  items: (string | TitledItem)[];
}

/**
 * Generic list section component for skills, works, projects, research.
 */
export function SectionList({ title, items }: SectionListProps): JSX.Element {
  return (
    <section class="rounded-lg border border-neutral-200 bg-white p-3">
      <div class="text-sm font-semibold text-neutral-900">{title}</div>
      <div class="my-1 h-px bg-neutral-100" />
      <ul class="mt-1.5 ml-4 list-disc space-y-0.5 text-xs text-neutral-700">
        {items.map((item) =>
          typeof item === "string" ? (
            <li>{item}</li>
          ) : (
            <li>
              <b>{item.title}</b>: {item.content}
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
