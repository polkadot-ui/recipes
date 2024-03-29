// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT
/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */

import type { ImportedAccountsContextInterface } from "./types";

export const defaultImportedAccountsContext: ImportedAccountsContextInterface =
  {
    accounts: [],
    getAccount: (address) => null,
    isReadOnlyAccount: (address) => false,
    accountHasSigner: (address) => false,
    requiresManualSign: (address) => false,
  };
