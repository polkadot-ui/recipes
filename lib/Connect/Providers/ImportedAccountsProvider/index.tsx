// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
// Local imports
import type { ExternalAccount } from "@polkadot-ui/react/connect/types";
import type { MaybeAddress } from "@polkadot-ui/react/utils/types";
import { ManualSigners } from "../../Utils";
import { useExtensionAccounts } from "@polkadot-ui/react/connect/ExtensionAccountsProvider/useExtensionAccounts";
import { defaultImportedAccountsContext } from "./defaults";
import type { ImportedAccountsContextInterface } from "./types";
import { useOtherAccounts } from "../OtherAccountsProvider";

export const ImportedAccountsContext =
  createContext<ImportedAccountsContextInterface>(
    defaultImportedAccountsContext,
  );

export const ImportedAccountsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { otherAccounts } = useOtherAccounts();
  const { extensionAccounts } = useExtensionAccounts();

  const allAccounts = extensionAccounts.concat(otherAccounts);

  const getAccount = (who: MaybeAddress) =>
    allAccounts.find(({ address }) => address === who) || null;

  const isReadOnlyAccount = (address: MaybeAddress) => {
    const account = getAccount(address) ?? {};

    if (Object.prototype.hasOwnProperty.call(account, "addedBy")) {
      const { addedBy } = account as ExternalAccount;
      return addedBy === "user";
    }
    return false;
  };

  // Checks whether an account can sign transactions
  const accountHasSigner = (address: MaybeAddress) =>
    allAccounts.find(
      (a) => a.address === address && a.source !== "external",
    ) !== undefined;

  // Checks whether an account needs manual signing. This is the case for Ledger accounts,
  // transactions of which cannot be automatically signed by a provided `signer` as is the case with
  // extensions.
  const requiresManualSign = (address: MaybeAddress) =>
    allAccounts.find(
      (a) => a.address === address && ManualSigners.includes(a.source),
    ) !== undefined;

  return (
    <ImportedAccountsContext.Provider
      value={{
        accounts: allAccounts,
        getAccount,
        isReadOnlyAccount,
        accountHasSigner,
        requiresManualSign,
      }}
    >
      {children}
    </ImportedAccountsContext.Provider>
  );
};

export const useImportedAccounts = () => useContext(ImportedAccountsContext);
