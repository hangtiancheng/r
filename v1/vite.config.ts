import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

function createManualChunks(id: string): string | undefined {
  const normalizedId = id.replaceAll("\\", "/");

  if (!normalizedId.includes("/node_modules/")) {
    return undefined;
  }

  if (
    // react
    normalizedId.includes("/node_modules/react/") ||
    // react-dom
    normalizedId.includes("/node_modules/react-dom/")
  ) {
    return "react-vendor";
  }

  if (
    // react-router
    normalizedId.includes("/node_modules/react-router/") ||
    // react-router-dom
    normalizedId.includes("/node_modules/react-router-dom/")
  ) {
    return "router-vendor";
  }

  if (
    // antd
    normalizedId.includes("/node_modules/antd/") ||
    // @ant-design
    normalizedId.includes("/node_modules/@ant-design/")
  ) {
    return "antd-vendor";
  }

  if (
    normalizedId.includes("/node_modules/html2canvas/") ||
    normalizedId.includes("/node_modules/pdfjs-dist/") ||
    normalizedId.includes("/node_modules/core-js/")
  ) {
    return "pdf-vendor";
  }

  if (
    normalizedId.includes("/node_modules/dayjs/") ||
    normalizedId.includes("/node_modules/zod/")
  ) {
    return "app-vendor";
  }

  return undefined;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: createManualChunks,
      },
    },
  },
});
