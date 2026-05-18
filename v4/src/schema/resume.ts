import { z } from "zod";

const textSchema = z.string().catch("");
const textListSchema = z.array(textSchema).catch([]);

export const resumeLinkSchema = z.object({
  label: textSchema,
  url: textSchema,
});

export const resumeBasicsSchema = z.object({
  name: textSchema,
  title: textSchema,
  phone: textSchema,
  email: textSchema,
  city: textSchema,
  links: z.array(resumeLinkSchema).catch([]),
});

export const resumeExperienceSchema = z.object({
  company: textSchema,
  role: textSchema,
  city: textSchema,
  start: textSchema,
  end: textSchema,
  highlights: textListSchema,
});

export const resumeProjectSchema = z.object({
  name: textSchema,
  role: textSchema,
  link: textSchema,
  start: textSchema,
  end: textSchema,
  techStack: textListSchema,
  highlights: textListSchema,
});

export const resumeEducationSchema = z.object({
  school: textSchema,
  major: textSchema,
  degree: textSchema,
  start: textSchema,
  end: textSchema,
  highlights: textListSchema,
});

export const resumeSkillSchema = z.object({
  name: textSchema,
  items: textListSchema,
});

export const resumeAwardSchema = z.object({
  title: textSchema,
  date: textSchema,
  detail: textSchema,
});

export const resumeSchema = z.object({
  basics: resumeBasicsSchema.catch({
    name: "",
    title: "",
    phone: "",
    email: "",
    city: "",
    links: [],
  }),
  summary: textSchema,
  experience: z.array(resumeExperienceSchema).catch([]),
  projects: z.array(resumeProjectSchema).catch([]),
  education: z.array(resumeEducationSchema).catch([]),
  skills: z.array(resumeSkillSchema).catch([]),
  awards: z.array(resumeAwardSchema).catch([]),
  additional: textSchema,
});

export type Resume = z.infer<typeof resumeSchema>;
export type ResumeHydrationSource = "storage" | "default";
