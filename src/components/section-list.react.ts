import React from "react";
import { createComponent } from "@lit/react";
import { SectionList } from "./section-list";

export const SectionListComponent = createComponent({
  tagName: "section-list",
  elementClass: SectionList,
  react: React,
});
