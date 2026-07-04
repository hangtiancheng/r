import React from "react";
import { createComponent, type EventName } from "@lit/react";
import { ResumeHeader } from "./resume-header";

export const ResumeHeaderComponent = createComponent({
  tagName: "resume-header",
  elementClass: ResumeHeader,
  react: React,
  events: {
    onToggleLocale: "toggle-locale" as EventName<CustomEvent>,
  },
});
