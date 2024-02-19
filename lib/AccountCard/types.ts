/* @license Copyright 2024 @polkadot-ui/recipes authors & contributors
SPDX-License-Identifier: MIT */
import { JSX } from "react";
import {
  GridItemsAlignment,
  GridJustify,
  GridSizes,
} from "@polkadot-ui/react/types";
import {
  HPositionLR,
  ComponentBaseWithClassName,
} from "@polkadot-ui/react/utils/types";

export type FontType =
  | "xx-small"
  | "x-small"
  | "small"
  | "medium"
  | "large"
  | "larger"
  | "x-large"
  | "xx-large";

export interface AccountCardProps {
  title: TitleProps;
  fontSize?: FontType | string;
  ellipsis?: EllipsisProps;
  icon?: IconProps;
  extraComponent?: ExtraComponentProps;
  noCard?: boolean;
}

export interface IconProps extends CommonParams, ComponentBaseWithClassName {
  size?: number;
  copy?: boolean;
  position?: HPositionLR;
  colors?: string[];
  outerColor?: string;
  dark?: boolean;
}

export interface ExtraComponentProps
  extends CommonParams,
    ComponentBaseWithClassName {
  component?: JSX.Element;
  position?: HPositionLR;
}

export interface EllipsisProps {
  active?: boolean;
  amount?: number;
  position?: string;
}

interface CommonParams {
  gridSize?: GridSizes;
  justify?: GridJustify;
}

export interface TitleProps extends ComponentBaseWithClassName {
  address: string;
  align?: GridItemsAlignment;
  justify?: GridJustify;
  component?: JSX.Element;
  name?: string;
}
