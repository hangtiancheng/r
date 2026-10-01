import { defineConfig, type Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { LANG_STORAGE_KEY, type Lang } from "./src/i18n/shared.ts";

function fetchPriorityHints(): Plugin {
  return {
    name: "fetch-priority-hints",
    enforce: "post",
    transformIndexHtml(html) {
      return html
        .replace(
          /<link rel="stylesheet"/g,
          '<link rel="stylesheet" fetchpriority="high"',
        )
        .replace(
          /<script type="module" crossorigin/g,
          '<script type="module" crossorigin fetchpriority="high"',
        );
    },
  };
}

// === llms.txt / llms-full.txt endpoints ===
//
// Both endpoints serve the resume Markdown of the current language
// (`resume.md` for en, `resume_zh.md` for zh). "Current language" is the
// value of the jotai-persisted `langAtom`, which is mirrored into the
// `resume-lang` cookie so request handlers can see it. An explicit `?lang=`
// query wins over the cookie.
//
// Hosts that cannot branch per request (GitHub Pages) get a static build
// artifact instead, written in the default locale.

const LLMS_FILES = ["llms.txt", "llms-full.txt"] as const;

/** Locale used when neither `?lang=` nor the cookie carries a signal. */
const LLMS_DEFAULT_LANG: Lang = "zh";

function readResumeMd(root: string, lang: Lang): string {
  const fileName = lang === "zh" ? "resume_zh.md" : "resume.md";
  return readFileSync(resolve(root, "src/i18n", fileName), "utf-8");
}

/** Explicit `?lang=` wins; otherwise the mirrored cookie; default Chinese. */
function resolveLlmsLang(
  searchParams: URLSearchParams,
  cookie: string | null,
): Lang {
  const param = searchParams.get("lang");
  if (param === "zh" || param === "en") return param;
  for (const part of (cookie ?? "").split(";")) {
    const eq = part.indexOf("=");
    if (eq > -1 && part.slice(0, eq).trim() === LANG_STORAGE_KEY) {
      const value = part.slice(eq + 1).trim();
      if (value === "zh" || value === "en") return value;
    }
  }
  return LLMS_DEFAULT_LANG;
}

function llmsTxt(): Plugin {
  let root = PKG_DIR;
  let base = "/";

  const middleware = (
    req: IncomingMessage,
    res: ServerResponse,
    next: () => void,
  ) => {
    if (req.method !== "GET") return next();
    const url = new URL(req.url ?? "/", "http://localhost");
    // dev serves under "/", preview under the built base
    const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
    if (prefix && !url.pathname.startsWith(`${prefix}/`)) return next();
    const name = url.pathname.slice(prefix.length + 1);
    if (!(LLMS_FILES as readonly string[]).includes(name)) return next();
    const lang = resolveLlmsLang(url.searchParams, req.headers.cookie ?? null);
    res.setHeader("Content-Type", "text/markdown; charset=utf-8");
    res.end(readResumeMd(root, lang));
  };

  return {
    name: "llms-txt-endpoints",
    configResolved(config) {
      root = config.root;
      base = config.base;
    },
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
    generateBundle() {
      // Static artifact for hosts that cannot branch per request (e.g.
      // GitHub Pages), written in the default locale.
      for (const fileName of LLMS_FILES) {
        this.emitFile({
          type: "asset",
          fileName,
          source: readResumeMd(root, LLMS_DEFAULT_LANG),
        });
      }
    },
  };
}

const PKG_DIR = import.meta.dirname;
const isProd = process.env.NODE_ENV === "production";

// https://vite.dev/config/
export default defineConfig({
  base: isProd ? "/r/" : "/",
  publicDir: resolve(PKG_DIR, "public"),
  plugins: [tailwindcss(), fetchPriorityHints(), llmsTxt()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
