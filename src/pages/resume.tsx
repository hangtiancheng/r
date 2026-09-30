import { dataAtom, resumeStore, sectionsAtom } from "@/i18n";
import "@/pages/wc";

/** Root view rendered by the lit-jsx automatic JSX runtime. */
export default function Resume() {
  const data = resumeStore.get(dataAtom);
  const sections = resumeStore.get(sectionsAtom);

  return (
    <div className="min-h-dvh w-full bg-neutral-100 text-neutral-900 dark:bg-[#121212] dark:text-neutral-100">
      <art-plum />
      {/* `relative` stacks the content above the fixed <art-plum> canvas. */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-1 px-3 pt-3 pb-2 md:px-6 md:pb-2">
        <resume-header
          name={data.name}
          about={data.about}
          tel={data.tel}
          email={data.email}
          github={data.github}
          labels={data.labels}
        />

        <resume-card header={data.headers.edu} items={data.edu} />

        {sections.map((section) => (
          <resume-list
            header={section.title}
            items={section.items}
            columns={section.columns ?? 1}
          />
        ))}
      </div>
    </div>
  );
}
