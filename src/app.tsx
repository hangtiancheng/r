import { useTranslation } from "react-i18next";
import type { Resume } from "./schema/resume";
import { ResumeHeaderComponent } from "./components/resume-header.react";
import { SectionEduComponent } from "./components/section-edu.react";
import { SectionListComponent } from "./components/section-list.react";

/**
 * Root application component.
 *
 * Composes @lit/react-wrapped web components directly in React rather than
 * routing data through an intermediate Lit container. Resume content and UI
 * labels are sourced from the i18next translation bundle of the active locale,
 * so switching language re-renders every section with no prop drilling.
 */
function App() {
  const { i18n } = useTranslation();
  const data = i18n.getResourceBundle(i18n.language, "translation") as Resume;

  const sections = [
    { title: data.headers.devAbilities, items: data.devAbilitiesList },
    { title: data.headers.jobExperience, items: data.jobExperienceList },
    {
      title: data.headers.projectExperience,
      items: data.projectExperienceList,
    },
    {
      title: data.headers.researchExperience,
      items: data.researchExperienceList,
    },
  ];

  const handleToggleLocale = () => {
    void i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
  };

  return (
    <div className="min-h-dvh w-full bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-1.5">
        <ResumeHeaderComponent
          name={data.name}
          myInfo={data.myInfo}
          tel={data.tel}
          email={data.email}
          github={data.github}
          labelTel={data.labels.tel}
          labelEmail={data.labels.email}
          labelGithub={data.labels.github}
          labelSwitch={data.labels.switch}
          onToggleLocale={handleToggleLocale}
        />
        <SectionEduComponent
          sectionTitle={data.headers.eduExperience}
          eduList={data.eduExperienceList}
        />
        {sections.map((section) => (
          <SectionListComponent
            key={section.title}
            sectionTitle={section.title}
            items={section.items}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
