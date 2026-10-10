import Dexie, { type Table } from "dexie";

import { DEFAULT_RESUME } from "@/lib/default-resume";
import type { ResumeDoc } from "@/lib/types";

/** Single-document IndexedDB store; dexie-react-hooks watches it live. */
class ResumeDB extends Dexie {
  resumes!: Table<ResumeDoc, number>;

  constructor() {
    super("qq-resume");
    this.version(1).stores({ resumes: "id" });
  }
}

export const db = new ResumeDB();

export const RESUME_ID = 1;

/** Seed the store on first launch. */
export async function initResume(): Promise<void> {
  const count = await db.resumes.count();
  if (count === 0) {
    await db.resumes.add(structuredClone(DEFAULT_RESUME));
  }
}

export async function saveResume(doc: ResumeDoc): Promise<void> {
  await db.resumes.put({ ...doc, id: RESUME_ID, updatedAt: Date.now() });
}

export async function resetResume(): Promise<void> {
  await db.resumes.put(structuredClone(DEFAULT_RESUME));
}
