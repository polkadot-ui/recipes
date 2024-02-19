// Copyright 2023 @polkadot-cloud/recipes authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  esbuildPlugins: [sassPlugin()],
  entry: ["lib/index.tsx"],
  treeshake: true,
  splitting: true,
  sourcemap: false,
  clean: true,
  format: ["cjs", "esm"],
});
