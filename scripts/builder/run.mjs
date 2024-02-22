// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import minimist from "minimist";
import * as packages from "./tasks/packages.mjs";

const args = minimist(process.argv.slice(2));

const { t: task, ...rest } = args;

switch (task) {
  case "prebuild":
    packages.prebuild();
    break;

  case "build":
    packages.build(rest);
    break;

  case "postbuild":
    packages.postbuild();
    break;

  default:
    console.log("❌ No task provided.");
}
