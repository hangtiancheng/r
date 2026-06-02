import { View } from "@lark.js/mvc";
import template from "./section-list.html";
import useResumeStore from "@/store/resume";

function createSectionListView(listKey: string, headerKey: string) {
  return View.extend({
    template,

    init() {
      const store = useResumeStore(this);
      store.observe(this, [listKey, "isChanging", "headers"]);
    },

    assign() {
      this.updater.snapshot();
      const store = useResumeStore();
      this.updater.set({
        isChanging: store.isChanging,
        sectionTitle: store.getHeader(headerKey),
        items: store.getList(listKey),
      });
      return this.updater.altered();
    },

    render() {
      const store = useResumeStore();
      this.updater
        .set({
          isChanging: store.isChanging,
          sectionTitle: store.getHeader(headerKey),
          items: store.getList(listKey),
        })
        .digest();
    },

    "updateTitle<input>"(e: Event) {
      const target = e.target as HTMLInputElement;
      const store = useResumeStore();
      store.setHeader(headerKey, target.value);
    },

    "updateListItem<input>"(e: Event) {
      const target = e.target as HTMLTextAreaElement;
      const idx = parseInt(target.dataset.idx ?? "0");
      const store = useResumeStore();
      const list = store.getList(listKey);
      list[idx] = target.value;
      store.setList(listKey, list);
    },

    "addItem<click>"(e: Event) {
      const target = e.target as HTMLElement;
      const li = target.closest("li");
      const textarea = li?.querySelector(
        "textarea",
      ) as HTMLTextAreaElement | null;
      if (!textarea) return;
      const value = textarea.value.trim();
      if (!value) return;
      const store = useResumeStore();
      const list = store.getList(listKey);
      list.push(value);
      store.setList(listKey, list);
      textarea.value = "";
    },

    "removeItem<click>"(e: Event) {
      const target = e.target as HTMLElement;
      const idx = parseInt(target.dataset.idx ?? "0");
      const store = useResumeStore();
      const list = store.getList(listKey);
      list.splice(idx, 1);
      store.setList(listKey, list);
    },
  });
}

export const DevAbilitiesSection = createSectionListView(
  "devAbilitiesList",
  "devAbilities",
);
export const JobExperienceSection = createSectionListView(
  "jobExperienceList",
  "jobExperience",
);
export const ProjectExperienceSection = createSectionListView(
  "projectExperienceList",
  "projectExperience",
);
export const ResearchExperienceSection = createSectionListView(
  "researchExperienceList",
  "researchExperience",
);
