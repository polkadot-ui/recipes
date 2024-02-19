// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import type {
  LedgerAccount,
  VaultAccount,
} from "@polkadot-ui/react/connect/types";
import type { FunctionComponent, SVGProps } from "react";
import type { NetworkName } from "../../Utils";
import type { AnyJson, MaybeString } from "@polkadot-ui/react/utils/types";

export type LedgerHardwareContextInterface = {
  pairDevice: () => Promise<boolean>;
  setIsPaired: (v: PairingStatus) => void;
  transportResponse: AnyJson;
  executeLedgerLoop: (
    appName: string,
    tasks: LedgerTask[],
    options?: AnyJson,
  ) => Promise<void>;
  handleNewStatusCode: (ack: string, statusCode: LedgerStatusCode) => void;
  setIsExecuting: (v: boolean) => void;
  resetStatusCodes: () => void;
  getIsExecuting: () => boolean;
  getStatusCodes: () => LedgerResponse[];
  getTransport: () => AnyJson;
  ledgerAccountExists: (a: string) => boolean;
  addLedgerAccount: (a: string, i: number) => LedgerAccount | null;
  removeLedgerAccount: (a: string) => void;
  renameLedgerAccount: (a: string, name: string) => void;
  getLedgerAccount: (a: string) => LedgerAccount | null;
  isPaired: PairingStatus;
  ledgerAccounts: LedgerAccount[];
  getFeedback: () => FeedbackMessage;
  setFeedback: (s: MaybeString, helpKey?: MaybeString) => void;
  resetFeedback: () => void;
  handleUnmount: () => void;
};

export interface FeedbackMessage {
  message: MaybeString;
  helpKey?: MaybeString;
}

export type LedgerStatusCode =
  | "GettingAddress"
  | "ReceivedAddress"
  | "SigningPayload"
  | "SignedPayload"
  | "DeviceTimeout"
  | "NestingNotSupported"
  | "WrongTransaction"
  | "DeviceNotConnected"
  | "DeviceLocked"
  | "TransactionRejected"
  | "AppNotOpenContinue"
  | "AppNotOpen";

export interface LedgerResponse {
  ack: string;
  statusCode: LedgerStatusCode;
  body?: AnyJson;
  options?: AnyJson;
}

export type LedgerTask = "get_address" | "sign_tx";

export type PairingStatus = "paired" | "unpaired" | "unknown";

export interface LedgerAddress {
  address: string;
  index: number;
  name: string;
  network: NetworkName;
  pubKey: string;
}

export type LedgerApp = {
  network: NetworkName;
  appName: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
};

export type VaultHardwareContextInterface = {
  vaultAccountExists: (a: string) => boolean;
  addVaultAccount: (a: string, i: number) => LedgerAccount | null;
  removeVaultAccount: (a: string) => void;
  renameVaultAccount: (a: string, name: string) => void;
  getVaultAccount: (a: string) => LedgerAccount | null;
  vaultAccounts: VaultAccount[];
};
