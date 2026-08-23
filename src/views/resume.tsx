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

import { defineView, jsxTemplate, useStore } from "@lark.js/mvc";
import { resumeStore, type ResumeSection } from "@/i18n";
import type { Resume } from "@/schema/resume";
import ResumeHeader from "@/views/comp/resume-header";
import SectionEdu from "@/views/comp/section-edu";
import SectionList from "@/views/comp/section-list";

interface ResumeData {
  data: Resume;
  sections: ResumeSection[];
}

const template = jsxTemplate<ResumeData>(({ data, sections }) => (
  <div class="min-h-dvh w-full bg-neutral-50 text-neutral-900">
    <div class="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
      <ResumeHeader
        name={data.name}
        about={data.about}
        tel={data.tel}
        email={data.email}
        github={data.github}
        labels={data.labels}
        onToggleLocale={() => resumeStore.getState().toggleLocale()}
      />

      <SectionEdu header={data.headers.edu} edu={data.edu} />

      {sections.map((section, idx) => (
        <SectionList
          key={`section-${idx}`}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  </div>
));

/**
 * Root view. Composes the header / edu / list section child components and
 * reads resume content from the resume store. Toggling the language
 * updates the store, which re-renders this view and pushes the new
 * props down to every child via mountZone.
 */
export default defineView(() => {
  useStore(resumeStore, (s) => ({ data: s.data, sections: s.sections }));

  return { template };
});
