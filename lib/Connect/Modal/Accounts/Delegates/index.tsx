// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import { isSupportedProxy } from "../../../Providers/ProxiesProvider/proxies";
import { useImportedAccounts } from "../../../Providers/ImportedAccountsProvider";
import { AccountButton } from "../Account";
import type { DelegatesProps } from "../types";

// eslint-disable-next-line import/no-unresolved
import "./index.scss";

import "@polkadot-ui/core/css/recipes/Connect/Modal/Accounts/Delegates/index.css";

export const Delegates = ({ delegates, delegator }: DelegatesProps) => {
  const { accounts } = useImportedAccounts();
  const { getAccount } = useImportedAccounts();

  // Filter delegates that are external or not imported. Default to empty array if there are no
  // delegates for this address.
  const delegatesList =
    delegates?.delegates.filter(
      ({ delegate, proxyType }) =>
        accounts.find(({ address }) => address === delegate) !== undefined &&
        isSupportedProxy(proxyType) &&
        getAccount(delegate || null)?.source !== "external",
    ) || [];

  return (
    <>
      {delegatesList.length ? (
        <div className="delegates-wrapper">
          {delegatesList.map(({ delegate, proxyType }, i) => (
            <AccountButton
              key={`_del_${i}`}
              address={delegate}
              delegator={delegator}
              proxyType={proxyType}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};
