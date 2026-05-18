import { z } from "zod";

export const yearMonthSchema = z.string().max(32);

export const resumeBasicsSchema = z.object({
  name: z.string(),
  title: z.string(),
  phone: z.string(),
  email: z.string(),
  location: z.string(),
  website: z.string(),
  github: z.string(),
  summary: z.string(),
});

export const educationItemSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  major: z.string(),
  start: yearMonthSchema,
  end: yearMonthSchema,
  location: z.string(),
  highlights: z.array(z.string()),
});

export const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  start: yearMonthSchema,
  end: yearMonthSchema,
  location: z.string(),
  highlights: z.array(z.string()),
});

export const projectItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  start: yearMonthSchema,
  end: yearMonthSchema,
  link: z.string(),
  highlights: z.array(z.string()),
});

export const skillGroupSchema = z.object({
  id: z.string(),
  category: z.string(),
  items: z.array(z.string()),
});

export const awardItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: yearMonthSchema,
  detail: z.string(),
});

export const resumeSchema = z.object({
  basics: resumeBasicsSchema,
  education: z.array(educationItemSchema),
  experience: z.array(experienceItemSchema),
  projects: z.array(projectItemSchema),
  skillGroups: z.array(skillGroupSchema),
  awards: z.array(awardItemSchema),
});

export const resumeDocumentSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string().datetime(),
  resume: resumeSchema,
});

export type YearMonth = z.infer<typeof yearMonthSchema>;
export type ResumeBasics = z.infer<typeof resumeBasicsSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type ProjectItem = z.infer<typeof projectItemSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type AwardItem = z.infer<typeof awardItemSchema>;
export type Resume = z.infer<typeof resumeSchema>;
export type ResumeDocument = z.infer<typeof resumeDocumentSchema>;
