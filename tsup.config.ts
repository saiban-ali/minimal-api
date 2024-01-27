import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  minify: true,
  splitting: true,
  shims: true,
  skipNodeModulesBundle: true,
});
