// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT
/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars, @typescript-eslint/no-empty-function */

import type { HelpContextInterface } from "./types";

export const defaultHelpContext: HelpContextInterface = {
  openHelp: (key) => {},
  closeHelp: () => {},
  setStatus: (status) => {},
  setDefinition: (definition) => {},
  status: "closed",
  definition: null,
};
