import seedResume from "@/data/default-resume.json";

import type { ResumeDoc } from "@/lib/types";

const seed = { ...seedResume };
delete (seed as { $schema?: string }).$schema;

export const DEFAULT_RESUME: ResumeDoc = seed as ResumeDoc;
