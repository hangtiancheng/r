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
import { resumeData } from "@/i18n";
import { ResumeHeader } from "@/components/resume-header";
import { SectionEdu } from "@/components/section-edu";
import { SectionList } from "@/components/section-list";

/**
 * Root application component.
 *
 * Composes Preact components directly, reading resume content from the
 * resumeData signal. Switching language updates the signal, which triggers
 * a re-render of every component that reads it, with no prop drilling.
 */
function AppPreact(): JSX.Element {
  const data = resumeData.value;

  const sections = [
    { title: data.headers.skills, items: data.skills },
    { title: data.headers.works, items: data.works },
    {
      title: data.headers.projects,
      items: data.projects,
    },
    {
      title: data.headers.research,
      items: [data.research],
    },
  ];

  return (
    <div class="min-h-dvh w-full bg-neutral-50 text-neutral-900">
      <div class="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
        <ResumeHeader />
        <SectionEdu />
        {sections.map((section) => (
          <SectionList
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
    </div>
  );
}

export default AppPreact;
