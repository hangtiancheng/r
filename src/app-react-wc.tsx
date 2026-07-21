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

/** @jsxImportSource react */
import { useCallback, useSyncExternalStore } from "react";
import { i18next, resumeData } from "@/i18n";
import { ResumeHeaderWC, SectionEduWC, SectionListWC } from "@/components/wc";

/**
 * Subscribes to i18next language changes and returns the current
 * resume data snapshot. Triggers re-render whenever the language switches.
 */
function useResumeData() {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const handler = () => onStoreChange();
    i18next.on("languageChanged", handler);
    return () => {
      i18next.off("languageChanged", handler);
    };
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => resumeData.value,
    () => resumeData.value,
  );
}

/**
 * React application composed of Lit Web Components wrapped via @lit/react.
 *
 * Reads resume data from the Preact signal (which i18n/index.ts keeps
 * in sync with i18next), then pushes it down as props to each WC.
 */
export default function AppReactWC(): React.JSX.Element {
  const data = useResumeData();

  const handleToggleLocale = useCallback(() => {
    const next = i18next.language === "en" ? "zh" : "en";
    void i18next.changeLanguage(next);
  }, []);

  const sections = [
    { title: data.headers.skills, items: data.skills },
    { title: data.headers.works, items: data.works },
    { title: data.headers.projects, items: data.projects },
    { title: data.headers.research, items: [data.research] },
  ];

  return (
    <div className="min-h-dvh w-full bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
        <ResumeHeaderWC
          name={data.name}
          about={data.about}
          tel={data.tel}
          email={data.email}
          github={data.github}
          labels={data.labels}
          onToggleLocale={handleToggleLocale}
        />
        <SectionEduWC header={data.headers.edu} edu={data.edu} />
        {sections.map((section) => (
          <SectionListWC
            key={section.title}
            title={section.title}
            items={section.items}
          />
        ))}
      </div>
    </div>
  );
}
