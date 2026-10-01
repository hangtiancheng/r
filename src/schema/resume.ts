// Defined in the client/node-safe i18n shared module (also used by the
// llms-txt plugin in vite.config.ts) and re-exported here for consumers.
export type { Lang } from "@/i18n/shared";

export interface Headers {
  edu: string;
  skills: string;
  works: string;
  projects: string;
  research: string;
}

// Locale-aware UI chrome labels (contact chips, language toggle button)
export interface Labels {
  tel: string;
  email: string;
  github: string;
  switch: string;
}

/**
 * A single block of a work/project description. `text` blocks are rendered
 * inline; `list` blocks are rendered as a nested `<ul>`.
 */
export type ResumeBlock =
  { kind: "text"; text: string } | { kind: "list"; items: string[] };

export interface TitledItem {
  title: string;
  blocks: ResumeBlock[];
}

export interface Resume {
  headers: Headers;
  labels: Labels;
  name: string;
  tel: string;
  email: string;
  github: string;
  about: string;
  edu: string[][];
  skills: string[];
  works: TitledItem[];
  projects: TitledItem[];
  research: string;
}
