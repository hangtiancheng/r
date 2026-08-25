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

import { useEffect, useRef } from "@lark.js/mvc";

import { resumeStore } from "@/i18n";
import "@/pages/wc";
import type { ResumeHeaderElement } from "@/pages/wc/resume-header";

/**
 * Root view. Composes the `<resume-header>` / `<section-edu>` /
 * `<section-list>` Lit custom elements and reads resume content from the
 * resume store. The tracked `getState()` reads subscribe this component to
 * `data`/`sections`, so toggling the language re-renders it; complex values
 * are pushed as JSON attributes that Lit's `@property` converters parse back
 * into typed properties. The `toggle-locale` custom event cannot be a lark
 * `on*` prop (event types derive via `slice(2).toLowerCase()`), so it is
 * wired via `ref` + `addEventListener`.
 */
export default function Resume() {
  const { data, sections } = resumeStore.getState();
  const header = useRef<ResumeHeaderElement>();

  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const onToggleLocale = () => resumeStore.getState().toggleLocale();
    el.addEventListener("toggle-locale", onToggleLocale);
    return () => el.removeEventListener("toggle-locale", onToggleLocale);
  });

  return (
    <div class="min-h-dvh w-full bg-neutral-50 text-neutral-900">
      <div class="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
        <resume-header
          ref={header}
          name={data.name}
          about={data.about}
          tel={data.tel}
          email={data.email}
          github={data.github}
          labels={JSON.stringify(data.labels)}
        />

        <section-edu header={data.headers.edu} edu={JSON.stringify(data.edu)} />

        {sections.map((section, idx) => (
          <section-list
            key={`section-${idx}`}
            heading={section.title}
            items={JSON.stringify(section.items)}
          />
        ))}
      </div>
    </div>
  );
}

// import { resumeStore } from "@/i18n";
// import ResumeHeader from "@/pages/comp/resume-header";
// import SectionEdu from "@/pages/comp/section-edu";
// import SectionList from "@/pages/comp/section-list";

// /**
//  * Root view. Composes the header / edu / list section child components and
//  * reads resume content from the resume store. The tracked `getState()`
//  * reads subscribe this component to `data`/`sections`, so toggling the
//  * language re-renders it and pushes fresh props down to every child.
//  */
// export default function Resume() {
//   const { data, sections } = resumeStore.getState();
//   return (
//     <div class="min-h-dvh w-full bg-neutral-50 text-neutral-900">
//       <div class="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
//         <ResumeHeader
//           name={data.name}
//           about={data.about}
//           tel={data.tel}
//           email={data.email}
//           github={data.github}
//           labels={data.labels}
//           onToggleLocale={() => resumeStore.getState().toggleLocale()}
//         />

//         <SectionEdu header={data.headers.edu} edu={data.edu} />

//         {sections.map((section, idx) => (
//           <SectionList
//             key={`section-${idx}`}
//             title={section.title}
//             items={section.items}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
