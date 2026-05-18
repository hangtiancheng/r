import typescript from "@rollup/plugin-typescript";

const external = ["html2canvas", "pdfjs-dist"];

export default {
  input: "src/index.ts",
  output: {
    file: "dist-rollup/index.js",
    format: "esm",
    sourcemap: true,
  },
  external,
  plugins: [
    typescript({
      tsconfig: "./tsconfig.rollup.json",
    }),
  ],
};
