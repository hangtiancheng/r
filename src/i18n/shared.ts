/** The resume's two locales. */
export type Lang = "en" | "zh";

/**
 * Key holding the active resume language. The jotai-persisted `langAtom`
 * stores it in localStorage and mirrors it into a same-named cookie, because
 * the llms.txt endpoints (Vite dev/preview middleware) can only see request
 * headers, not localStorage. Also imported by the llms-txt plugin in
 * vite.config.ts — keep this file free of client-only imports.
 */
export const LANG_STORAGE_KEY = "resume-lang";
