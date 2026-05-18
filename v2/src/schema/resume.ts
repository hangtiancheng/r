import { z } from "zod";

function stringField(): z.ZodCatch<z.ZodString> {
  return z.string().trim().catch("");
}

function stringList(): z.ZodCatch<z.ZodArray<z.ZodString>> {
  return z.array(z.string().trim()).catch([]);
}

const emptyBasics = {
  name: "",
  headline: "",
  phone: "",
  email: "",
  location: "",
  website: "",
  github: "",
  summary: "",
  avatarDataUrl: "",
};

const emptyExperience = {
  company: "",
  title: "",
  location: "",
  start: "",
  end: "",
  highlights: [],
};

const emptyProject = {
  name: "",
  role: "",
  link: "",
  start: "",
  end: "",
  highlights: [],
};

const emptyEducation = {
  school: "",
  degree: "",
  major: "",
  location: "",
  start: "",
  end: "",
  highlights: [],
};

const emptyAward = {
  name: "",
  issuer: "",
  date: "",
  description: "",
};

const emptyLink = {
  label: "",
  url: "",
};

export const resumeBasicsSchema = z
  .object({
    name: stringField(),
    headline: stringField(),
    phone: stringField(),
    email: stringField(),
    location: stringField(),
    website: stringField(),
    github: stringField(),
    summary: stringField(),
    avatarDataUrl: stringField(),
  })
  .catch(emptyBasics);

export const resumeExperienceSchema = z
  .object({
    company: stringField(),
    title: stringField(),
    location: stringField(),
    start: stringField(),
    end: stringField(),
    highlights: stringList(),
  })
  .catch(emptyExperience);

export const resumeProjectSchema = z
  .object({
    name: stringField(),
    role: stringField(),
    link: stringField(),
    start: stringField(),
    end: stringField(),
    highlights: stringList(),
  })
  .catch(emptyProject);

export const resumeEducationSchema = z
  .object({
    school: stringField(),
    degree: stringField(),
    major: stringField(),
    location: stringField(),
    start: stringField(),
    end: stringField(),
    highlights: stringList(),
  })
  .catch(emptyEducation);

export const resumeAwardSchema = z
  .object({
    name: stringField(),
    issuer: stringField(),
    date: stringField(),
    description: stringField(),
  })
  .catch(emptyAward);

export const resumeLinkSchema = z
  .object({
    label: stringField(),
    url: stringField(),
  })
  .catch(emptyLink);

export const resumeSchema = z
  .object({
    schemaVersion: z.number().int().catch(1),
    meta: z.object({ updatedAt: stringField() }).catch({ updatedAt: "" }),
    basics: resumeBasicsSchema,
    skills: stringList(),
    experiences: z.array(resumeExperienceSchema).catch([]),
    projects: z.array(resumeProjectSchema).catch([]),
    education: z.array(resumeEducationSchema).catch([]),
    awards: z.array(resumeAwardSchema).catch([]),
    links: z.array(resumeLinkSchema).catch([]),
  })
  .strict();

export type Resume = z.infer<typeof resumeSchema>;

export function createEmptyResume(): Resume {
  return resumeSchema.parse({});
}
