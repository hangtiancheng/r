import { Framework, registerViewClass } from "@lark.js/mvc";
import type { FrameworkConfig } from "@lark.js/mvc";
import ResumeView from "./views/resume";
import {
  ResumeHeader,
  SectionEdu,
  DevAbilitiesSection,
  JobExperienceSection,
  ProjectExperienceSection,
  ResearchExperienceSection,
} from "./components";

import "./style.css";

registerViewClass("resume", ResumeView);
registerViewClass("components/resume-header", ResumeHeader);
registerViewClass("components/section-edu", SectionEdu);
registerViewClass("components/section-dev-abilities", DevAbilitiesSection);
registerViewClass("components/section-job-experience", JobExperienceSection);
registerViewClass(
  "components/section-project-experience",
  ProjectExperienceSection,
);
registerViewClass(
  "components/section-research-experience",
  ResearchExperienceSection,
);

const config: FrameworkConfig = {
  rootId: "app",
  defaultPath: "/resume",
  defaultView: "resume",
  routes: {
    "/resume": "resume",
  },
  unmatchedView: "resume",
  error(e: Error) {
    console.error("Lark application error:", e);
  },
};

Framework.boot(config);
