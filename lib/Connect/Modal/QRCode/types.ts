// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import type { HexString } from "@polkadot/util/types";
import { CSSProperties } from "react";

export interface FrameState {
  frames: Uint8Array[];
  frameIdx: number;
  image: string | null;
  valueHash: string | null;
}

export interface ScanType {
  signature: HexString;
}

export interface TimerState {
  timerDelay: number;
  timerId: ReturnType<typeof setTimeout> | null;
}

export interface DisplayProps {
  className?: string | undefined;
  size?: string | number | undefined;
  skipEncoding?: boolean;
  style?: CSSProperties | undefined;
  timerDelay?: number | undefined;
  value: Uint8Array;
}

export interface DisplayPayloadProps {
  address: string;
  className?: string;
  cmd: number;
  genesisHash: Uint8Array | string;
  payload: Uint8Array;
  size?: string | number;
  style?: CSSProperties;
  timerDelay?: number;
}

export interface ScanProps {
  className?: string | undefined;
  delay?: number;
  onError?: undefined | ((error: Error) => void);
  onScan: (data: string) => void;
  size?: string | number | undefined;
  style?: CSSProperties | undefined;
}

export interface ScanSignatureProps {
  className?: string;
  onError?: (error: Error) => void;
  onScan: (scanned: ScanType) => void;
  size?: string | number;
  style?: CSSProperties;
}
