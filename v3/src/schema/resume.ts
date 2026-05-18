import { z } from "zod";

const draftText = z.string().optional().default("");
const draftStringList = z.array(draftText).default([]);
const persistedText = z.string().trim().min(1);
const persistedOptionalText = z.string().trim().optional();
const persistedStringList = z.array(persistedText).default([]);

const linkDraftSchema = z.object({ label: draftText, url: draftText }).strict();
const linkSchema = z
  .object({ label: persistedOptionalText, url: persistedText })
  .strict();
const basicsDraftSchema = z
  .object({
    name: draftText,
    headline: draftText,
    email: draftText,
    phone: draftText,
    location: draftText,
    links: z.array(linkDraftSchema).default([]),
  })
  .strict();
const basicsSchema = z
  .object({
    name: persistedOptionalText,
    headline: persistedOptionalText,
    email: persistedOptionalText,
    phone: persistedOptionalText,
    location: persistedOptionalText,
    links: z.array(linkSchema).default([]),
  })
  .strict();
const experienceDraftSchema = z
  .object({
    company: draftText,
    title: draftText,
    location: draftText,
    startDate: draftText,
    endDate: draftText,
    highlights: draftStringList,
  })
  .strict();
const experienceSchema = z
  .object({
    company: persistedOptionalText,
    title: persistedOptionalText,
    location: persistedOptionalText,
    startDate: persistedOptionalText,
    endDate: persistedOptionalText,
    highlights: persistedStringList,
  })
  .strict();
const projectDraftSchema = z
  .object({
    name: draftText,
    role: draftText,
    startDate: draftText,
    endDate: draftText,
    highlights: draftStringList,
    link: draftText,
  })
  .strict();
const projectSchema = z
  .object({
    name: persistedOptionalText,
    role: persistedOptionalText,
    startDate: persistedOptionalText,
    endDate: persistedOptionalText,
    highlights: persistedStringList,
    link: persistedOptionalText,
  })
  .strict();
const educationDraftSchema = z
  .object({
    school: draftText,
    degree: draftText,
    major: draftText,
    startDate: draftText,
    endDate: draftText,
    highlights: draftStringList,
  })
  .strict();
const educationSchema = z
  .object({
    school: persistedOptionalText,
    degree: persistedOptionalText,
    major: persistedOptionalText,
    startDate: persistedOptionalText,
    endDate: persistedOptionalText,
    highlights: persistedStringList,
  })
  .strict();

export const resumeDraftSchema = z
  .object({
    schemaVersion: z.literal(1),
    basics: basicsDraftSchema.default({
      name: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      links: [],
    }),
    summary: draftText,
    skills: draftStringList,
    experiences: z.array(experienceDraftSchema).default([]),
    projects: z.array(projectDraftSchema).default([]),
    education: z.array(educationDraftSchema).default([]),
  })
  .strict();
export const resumeSchema = z
  .object({
    schemaVersion: z.literal(1),
    updatedAt: z.string().datetime().optional(),
    basics: basicsSchema.default({ links: [] }),
    summary: z.string().default(""),
    skills: persistedStringList,
    experiences: z.array(experienceSchema).default([]),
    projects: z.array(projectSchema).default([]),
    education: z.array(educationSchema).default([]),
  })
  .strict();

export type ResumeDraft = z.infer<typeof resumeDraftSchema>;
export type Resume = z.infer<typeof resumeSchema>;

export function createEmptyResumeDraft(): ResumeDraft {
  return resumeDraftSchema.parse({ schemaVersion: 1 });
}

export function createEmptyResume(): Resume {
  return resumeSchema.parse({ schemaVersion: 1 });
}
