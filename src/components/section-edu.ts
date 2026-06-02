import { View } from "@lark.js/mvc";
import template from "./section-edu.html";
import useResumeStore from "@/store/resume";
import type { EduExperience } from "@/schema/resume";

function syncData(): Record<string, unknown> {
  const store = useResumeStore();
  return {
    isChanging: store.isChanging,
    sectionTitle: store.headers.eduExperience,
    eduList: store.eduExperienceList.map((e: EduExperience) => [...e]),
  };
}

export default View.extend({
  template,

  init() {
    const store = useResumeStore(this);
    store.observe(this, ["isChanging", "eduExperienceList", "headers"]);
  },

  assign() {
    this.updater.snapshot();
    this.updater.set(syncData());
    return this.updater.altered();
  },

  render() {
    this.updater.set(syncData()).digest();
  },

  "updateField<input>"(e: Event) {
    const target = e.target as HTMLInputElement;
    const store = useResumeStore();
    store.setHeader("eduExperience", target.value);
  },

  "updateEdu<input>"(e: Event) {
    const target = e.target as HTMLInputElement;
    const idx = parseInt(target.dataset.idx ?? "0");
    const col = parseInt(target.dataset.col ?? "0");
    const store = useResumeStore();
    const list = store.eduExperienceList.map((edu, i): EduExperience => {
      if (i !== idx) return [...edu];
      const copy: EduExperience = [...edu];
      copy[col] = target.value;
      return copy;
    });
    store.eduExperienceList = list;
  },

  "clearEdu<click>"(e: Event) {
    const target = e.target as HTMLElement;
    const idx = parseInt(target.dataset.idx ?? "0");
    const store = useResumeStore();
    const list = store.eduExperienceList.map(
      (edu, i): EduExperience => (i === idx ? ["", "", ""] : [...edu]),
    );
    store.eduExperienceList = list;
  },
});
