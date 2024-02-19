// Copyright 2024 @polkadot-cloud/recipes authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { AnyApi, MaybeAddress } from "@polkadot-cloud/react/utils/types";

export interface AccountInputProps {
  successCallback: (a: string) => Promise<AnyApi>;
  resetCallback?: () => void;
  defaultLabel: string;
  resetOnSuccess?: boolean;
  successLabel?: string;
  locked?: boolean;
  inactive?: boolean;
  disallowAlreadyImported?: boolean;
  initialValue?: MaybeAddress;
  border?: boolean;
}
