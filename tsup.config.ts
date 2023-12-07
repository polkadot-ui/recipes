import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/**/index.tsx"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
