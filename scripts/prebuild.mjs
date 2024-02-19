// Copyright 2024 @polkadot-cloud/recipes authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { generateExportEntries } from "./generateExportEntries.mjs";
import { generateTypeExports } from "./generateTypeExports.mjs";

const main = async () => {
  // Generate type exports.
  generateTypeExports("./lib", "./lib/types/index.ts");

  // Generate entry files.
  // await generateExportEntries({ ignore: ["styles", "svg", "utils"] });
  await generateExportEntries({ ignore: [] });
};

await main();
