import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/jsx-runtime.ts"],
  format: ["esm", "cjs"],
  dts: {
    // tsup's dts pipeline internally emits a deprecated baseUrl option,
    // which TypeScript 6 rejects unless explicitly silenced.
    compilerOptions: { ignoreDeprecations: "6.0" },
  },
  clean: true,
  sourcemap: true,
});
