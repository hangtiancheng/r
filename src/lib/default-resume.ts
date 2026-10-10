import seedResume from "@/data/default-resume.json";

import type { ResumeDoc } from "@/lib/types";

/**
 * Seed document — the same resume data shown on wx.mail.qq.com's 简历 page.
 * Written to IndexedDB on first launch; afterwards the stored copy wins.
 *
 * The data itself lives in `src/data/default-resume.json`, with its shape
 * described by `src/data/resume.schema.json`. The `$schema` key only helps
 * editors and is stripped before use.
 */
const seed = { ...seedResume };
delete (seed as { $schema?: string }).$schema;

export const DEFAULT_RESUME: ResumeDoc = seed as ResumeDoc;
