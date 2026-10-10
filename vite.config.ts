import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";

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

const PKG_DIR = import.meta.dirname;
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/r/" : "/",
  publicDir: resolve(PKG_DIR, "public"),
  plugins: [react(), tailwindcss(), fetchPriorityHints()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
