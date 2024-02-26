// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  esbuildPlugins: [sassPlugin()],
  entry: [
    "lib/AccountCard/index.tsx",
    "lib/Connect/index.tsx"
  ],
  treeshake: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  format: ["cjs", "esm"],
});
