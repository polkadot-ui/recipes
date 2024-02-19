/* @license Copyright 2024 @polkadot-ui/recipes authors & contributors
SPDX-License-Identifier: MIT */

import { Button, Polkicon } from "@polkadot-ui/react";
import { useOtherAccounts } from "../../Providers/OtherAccountsProvider";
import type { ConfirmProps } from "./types";

import { usePrompt } from "../../Providers/PromptProvider";

import "@polkadot-ui/core/css/recipes/Connect/Modal/ImportHardwareCommon/index.css";

// eslint-disable-next-line import/no-unresolved
import "./index.scss";

export const Confirm = ({ address, index, addHandler }: ConfirmProps) => {
  const { setStatus } = usePrompt();
  const { addOtherAccounts } = useOtherAccounts();

  return (
    <div className="confirm-wrapper">
      <Polkicon address={address} size="3rem" />
      <h3>Import Account</h3>
      <h5>{address}</h5>
      <div className="footer">
        <Button type="monoInvert" text="Cancel" onClick={() => setStatus(0)} />
        <Button
          type="mono"
          text="Import Account"
          onClick={() => {
            const account = addHandler(address, index);
            if (account) {
              addOtherAccounts([account]);
            }
            setStatus(0);
          }}
        />
      </div>
    </div>
  );
};
