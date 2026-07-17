/** @jsxImportSource react */
import { ResumeHeaderWC, SectionEduWC, SectionListWC } from "@/components/wc";
import { resumeStore } from "@/i18n/store";

/**
 * React application composed entirely of Lit Web Components
 * wrapped via @lit/react.
 *
 * The Lit components subscribe to resumeStore internally, so this
 * wrapper only provides layout structure and passes section data
 * as props. Re-renders on language change are driven by the Lit
 * components themselves, not by this wrapper.
 */
export default function AppReact(): React.JSX.Element {
  const data = resumeStore.getData();

  const sections = [
    { title: data.headers.skills, items: data.skills },
    { title: data.headers.works, items: data.works },
    { title: data.headers.projects, items: data.projects },
    { title: data.headers.research, items: [data.research] },
  ];

  return (
    <div className="min-h-dvh w-full bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
        <ResumeHeaderWC />
        <SectionEduWC />
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
