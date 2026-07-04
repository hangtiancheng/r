import { z } from "zod";

const headersSchema = z.object({
  eduExperience: z.string(),
  devAbilities: z.string(),
  jobExperience: z.string(),
  projectExperience: z.string(),
  researchExperience: z.string(),
});

// Locale-aware UI chrome labels (contact chips, language toggle button)
const labelsSchema = z.object({
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  switch: z.string(),
});

const eduExperienceSchema = z.tuple([z.string(), z.string(), z.string()]);

const resumeSchema = z.object({
  headers: headersSchema,
  labels: labelsSchema,
  name: z.string(),
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  myInfo: z.string(),
  eduExperienceList: z.array(eduExperienceSchema),
  devAbilitiesList: z.array(z.string()),
  jobExperienceList: z.array(z.string()),
  projectExperienceList: z.array(z.string()),
  researchExperienceList: z.array(z.string()),
});

export type Resume = z.infer<typeof resumeSchema>;
export type Headers = z.infer<typeof headersSchema>;
export type Labels = z.infer<typeof labelsSchema>;
export type EduExperience = z.infer<typeof eduExperienceSchema>;

export { resumeSchema };
