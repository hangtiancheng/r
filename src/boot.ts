import { Framework, registerViewClass } from "@lark.js/mvc";
import type { FrameworkConfig } from "@lark.js/mvc";
import ResumeView from "./views/resume";

import "./style.css";

registerViewClass("resume", ResumeView);

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
