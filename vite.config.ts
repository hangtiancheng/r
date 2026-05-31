import { defineConfig } from "vite";
import { larkMvcPlugin } from "@lark.js/mvc/vite";
import tailwindcss from "@tailwindcss/vite";
import { sentryPlugin } from "@lark.js/sentry/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/r/" : "/",
  plugins: [
    larkMvcPlugin(),
    tailwindcss(),
    sentryPlugin({
      dsn: "/sentry",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
