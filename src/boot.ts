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
import { pluginEnable, init } from "@lark.js/sentry";
import ScreenRecordPlugin from "@lark.js/sentry/plugins/record";
import ExposurePlugin from "@lark.js/sentry/plugins/exposure";
import PerformancePlugin from "@lark.js/sentry/plugins/perf";

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
    console.error("@lark.js/mvc application error:", e);
  },
};

init({ dsn: "/sentry " });
pluginEnable(ScreenRecordPlugin);
pluginEnable(ExposurePlugin);
pluginEnable(PerformancePlugin);

Framework.boot(config);
