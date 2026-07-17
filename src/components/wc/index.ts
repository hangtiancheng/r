import React from "react";
import { createComponent, type EventName } from "@lit/react";
import { ResumeHeader } from "@/components/wc/resume-header";
import { SectionEdu } from "@/components/wc/section-edu";
import { SectionList } from "@/components/wc/section-list";

/**
 * @lit/react wrappers — bridges Lit Web Components into React
 * so they can be composed in JSX with proper prop reflection and
 * event mapping.
 */
export const ResumeHeaderWC = createComponent({
  tagName: "resume-header",
  elementClass: ResumeHeader,
  react: React,
  events: {
    onToggleLocale: "toggle-locale" as EventName<CustomEvent>,
  },
});

export const SectionEduWC = createComponent({
  tagName: "section-edu",
  elementClass: SectionEdu,
  react: React,
});

export const SectionListWC = createComponent({
  tagName: "section-list",
  elementClass: SectionList,
  react: React,
});
