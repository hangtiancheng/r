import type { RefObject } from "react";
import type { DraftFunction } from "use-immer";
import type { ResumeDocument } from "@/schema";

export type ResumeDocMutator = DraftFunction<ResumeDocument>;
export type UpdateResumeDoc = (mutator: ResumeDocMutator) => void;
export type PreviewRef = RefObject<HTMLDivElement | null>;
