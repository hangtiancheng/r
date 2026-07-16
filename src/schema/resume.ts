import { z } from "zod";

const headersSchema = z.object({
  edu: z.string(),
  skills: z.string(),
  works: z.string(),
  projects: z.string(),
  research: z.string(),
});

// Locale-aware UI chrome labels (contact chips, language toggle button)
const labelsSchema = z.object({
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  switch: z.string(),
});

const eduSchema = z.tuple([z.string(), z.string(), z.string()]);

const titledItemSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const resumeSchema = z.object({
  headers: headersSchema,
  labels: labelsSchema,
  name: z.string(),
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  about: z.string(),
  edu: z.array(eduSchema),
  skills: z.array(z.string()),
  works: z.array(titledItemSchema),
  projects: z.array(titledItemSchema),
  research: z.string(),
});

export type Resume = z.infer<typeof resumeSchema>;
export type Headers = z.infer<typeof headersSchema>;
export type Labels = z.infer<typeof labelsSchema>;
export type edu = z.infer<typeof eduSchema>;
export type TitledItem = z.infer<typeof titledItemSchema>;

export { resumeSchema };
