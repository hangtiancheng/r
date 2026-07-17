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
