/* @license Copyright 2024 @polkadot-ui/recipes authors & contributors
SPDX-License-Identifier: MIT */

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Button, HardwareAddress, Polkicon } from "@polkadot-ui/react";
import { ellipsisFn, unescape } from "@polkadot-ui/utils";

import { useLedgerHardware } from "../../Providers/HardwareProviders/Ledger";
import { getLocalLedgerAddresses } from "../../Providers/HardwareProviders/Utils";

import { usePrompt } from "../../Providers/PromptProvider";
import { Confirm } from "../ImportHardwareCommon/Confirm";
import { Remove } from "../ImportHardwareCommon/Remove";
import type { AnyJson } from "@polkadot-ui/react/utils/types";
import { useOtherAccounts } from "../../Providers/OtherAccountsProvider";

import "./index.scss";

export const Addresess = ({
  addresses,
  handleLedgerLoop,
  network,
}: AnyJson) => {
  const {
    getIsExecuting,
    ledgerAccountExists,
    renameLedgerAccount,
    addLedgerAccount,
    removeLedgerAccount,
    setIsExecuting,
    getLedgerAccount,
    pairDevice,
  } = useLedgerHardware();
  const isExecuting = getIsExecuting();
  const { openPromptWith } = usePrompt();
  const { renameOtherAccount } = useOtherAccounts();

  const renameHandler = (address: string, newName: string) => {
    renameLedgerAccount(address, newName);
    renameOtherAccount(address, newName);
  };

  const openConfirmHandler = (address: string, index: number) => {
    openPromptWith(
      <Confirm address={address} index={index} addHandler={addLedgerAccount} />,
      "small",
    );
  };

  const openRemoveHandler = (address: string) => {
    openPromptWith(
      <Remove
        address={address}
        removeHandler={removeLedgerAccount}
        getHandler={getLedgerAccount}
      />,
      "small",
    );
  };

  return (
    <>
      <div className="addresses-wrapper">
        <div className="items">
          {addresses.map(({ address, index }: AnyJson, i: number) => {
            const initialName = (() => {
              const localAddress = getLocalLedgerAddresses().find(
                (a) => a.address === address && a.network === network,
              );
              return localAddress?.name
                ? unescape(localAddress.name)
                : ellipsisFn(address);
            })();

            return (
              <HardwareAddress
                key={i}
                address={address}
                index={index}
                initial={initialName}
                Identicon={<Polkicon address={address} size={40} />}
                existsHandler={ledgerAccountExists}
                renameHandler={renameHandler}
                openRemoveHandler={openRemoveHandler}
                openConfirmHandler={openConfirmHandler}
                t={{
                  tRemove: "Remove",
                  tImport: "Import",
                }}
              />
            );
          })}
        </div>
        <div className="more">
          <Button
            type="text"
            iconLeft={faArrowDown}
            text={isExecuting ? "Getting Account" : "Get Another Account"}
            disabled={isExecuting}
            onClick={async () => {
              // re-pair the device if it has been disconnected.
              const paired = await pairDevice();
              if (paired) {
                setIsExecuting(true);
                handleLedgerLoop();
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
