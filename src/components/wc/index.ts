import React from "react";
import { createComponent } from "@lit/react";
import { ResumeHeader } from "@/components/wc/resume-header";
import { SectionEdu } from "@/components/wc/section-edu";
import { SectionList } from "@/components/wc/section-list";

/**
 * @lit/react wrappers — bridges Lit Web Components into React/Preact
 * so they can be composed in JSX with proper prop reflection and
 * event mapping, while the custom elements are registered globally
 * via @customElement on first import.
 */
export const ResumeHeaderWC = createComponent({
  tagName: "resume-header",
  elementClass: ResumeHeader,
  react: React,
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
