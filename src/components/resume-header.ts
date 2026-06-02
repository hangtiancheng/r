import { View } from "@lark.js/mvc";
import template from "./resume-header.html";
import useResumeStore from "@/store/resume";

function syncData(): Record<string, unknown> {
  const store = useResumeStore();
  return {
    isChanging: store.isChanging,
    name: store.name,
    myInfo: store.myInfo,
    tel: store.tel,
    email: store.email,
    github: store.github,
  };
}

export default View.extend({
  template,

  init() {
    const store = useResumeStore(this);
    store.observe(this, [
      "isChanging",
      "name",
      "myInfo",
      "tel",
      "email",
      "github",
    ]);
  },

  assign() {
    this.updater.snapshot();
    this.updater.set(syncData());
    return this.updater.altered();
  },

  render() {
    this.updater.set(syncData()).digest();
  },

  "toggleEdit<click>"() {
    const store = useResumeStore();
    store.toggleEdit();
  },

  "toggleEdit<contextmenu>"(e: Event) {
    e.preventDefault();
    const store = useResumeStore();
    store.toggleEdit();
  },

  "updateField<input>"(e: Event) {
    const target = e.target as HTMLInputElement;
    const field = target.dataset.field ?? "";
    const store = useResumeStore();
    if (field === "name") store.name = target.value;
    else if (field === "myInfo") store.myInfo = target.value;
    else if (field === "tel") store.tel = target.value;
    else if (field === "email") store.email = target.value;
    else if (field === "github") store.github = target.value;
  },

  "clearStorage<click>"() {
    const store = useResumeStore();
    store.clearStorage();
  },
});
