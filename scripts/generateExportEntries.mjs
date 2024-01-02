// Copyright 2024 @polkadot-cloud/recipes authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { existsSync } from "fs";
import fs from "fs/promises";
import { format } from "prettier";

// Generates bundle entry files based on the content of the lib/ folder.
//
// - `lib/index.tsx` is generated to house all recipes exports.
export const generateExportEntries = async ({ ignore }) => {
  // Iterates through a provided directory and returns all component paths.
  const getDirFolders = async (dir) => {
    const folders = [];

    // If directory contains index.tsx file, stop.
    if (dir !== "./lib" && existsSync(`${dir}/index.tsx`)) {
      folders.push(dir);
    } else {
      // for each folder in this directory, loop again.
      for (let file of await fs.readdir(dir))
        if ((await fs.stat(dir + "/" + file)).isDirectory())
          if (!ignore.includes(file))
            folders.push(...(await getDirFolders(dir + "/" + file)));
    }
    return folders;
  };

  // Iterate through all files and construct entries.
  const recipes = [];
  for (let name of await getDirFolders("./lib")) {
    recipes.push({
      export: name.split("/").pop(),
      from: name,
    });
  }

  // Construct entry files.
  await writeFormattedFile(
    "./lib/index.tsx",
    generateExportLines(recipes, "./")
  );
};

// Generate export lines for an array of items.
const generateExportLines = (items, basePath) =>
  items
    .map(
      (item) =>
        `export { ${item.export} } from "${basePath}${item.from
          .split("/")
          .slice(2)
          .join("/")}";`
    )
    .join("\n");

// Write formatted TypeScript code to a file.
const writeFormattedFile = async (path, lines) => {
  const content = await format(lines, { parser: "typescript" });
  await fs.writeFile(path, content);
};
