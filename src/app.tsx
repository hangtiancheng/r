import type { JSX } from "preact";
import { resumeData } from "./i18n";
import { ResumeHeader } from "./components/resume-header";
import { SectionEdu } from "./components/section-edu";
import { SectionList } from "./components/section-list";

/**
 * Root application component.
 *
 * Composes Preact components directly, reading resume content from the
 * resumeData signal. Switching language updates the signal, which triggers
 * a re-render of every component that reads it, with no prop drilling.
 */
function App(): JSX.Element {
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

export default App;
