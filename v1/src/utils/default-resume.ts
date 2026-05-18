import defaultResumeDocJson from "../../v1.json";
import { resumeDocumentSchema, type ResumeDocument } from "@/schema";

export function getDefaultResume(): ResumeDocument {
  const parsedDefaultDoc = resumeDocumentSchema.parse(defaultResumeDocJson);
  const rawCopy = JSON.stringify(parsedDefaultDoc);
  const clonedDoc: unknown = JSON.parse(rawCopy);
  return resumeDocumentSchema.parse(clonedDoc);
}
