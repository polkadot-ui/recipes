/* @license Copyright 2023 @polkadot-cloud/recipes authors & contributors
SPDX-License-Identifier: GPL-3.0-only */

import {
  faChevronRight,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@polkadot-cloud/react";
import type { HeadingProps } from "./types";

// eslint-disable-next-line import/no-unresolved
import "./index.css";

export const Heading = ({
  connectTo,
  title,
  Icon,
  disabled,
  handleReset,
}: HeadingProps) => {
  return (
    <div className="heading-wrapper">
      <section>
        <h4>
          {Icon && <Icon />}
          <span>
            {connectTo && (
              <>
                {connectTo}{" "}
                <FontAwesomeIcon icon={faChevronRight} transform="shrink-5" />
              </>
            )}
            {title}
          </span>
        </h4>
      </section>
      <section>
        {handleReset && (
          <Button
            type="text"
            text="Reset"
            iconLeft={faCircleMinus}
            onClick={() => {
              if (typeof handleReset === "function") {
                handleReset();
              }
            }}
            disabled={disabled || false}
            marginLeft
          />
        )}
      </section>
    </div>
  );
};
