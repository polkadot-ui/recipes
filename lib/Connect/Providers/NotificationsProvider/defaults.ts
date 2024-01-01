// Copyright 2024 @polkadot-cloud/recipes authors & contributors
// SPDX-License-Identifier: GPL-3.0-only
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, no-unused-vars */

import type { NotificationsContextInterface } from "./types";

export const defaultNotificationsContext: NotificationsContextInterface = {
  addNotification: (n) => {},
  removeNotification: (n) => {},
  notifications: [],
};
