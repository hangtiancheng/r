import React from "react";
import { createComponent } from "@lit/react";
import { SectionEdu } from "./section-edu";

export const SectionEduComponent = createComponent({
  tagName: "section-edu",
  elementClass: SectionEdu,
  react: React,
});
