import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  external: ["html2canvas", "pdfjs-dist"],
  format: ["esm"],
  outDir: "dist-tsup",
  sourcemap: true,
  splitting: false,
});
