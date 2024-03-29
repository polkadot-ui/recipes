// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import type { MutableRefObject } from "react";
import {
  Fragment,
  cloneElement,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import type { AnyJson } from "@polkadot-ui/react/utils/types";
import type { SelectItemsProps } from "./types";

import "./index.scss";

export const SelectItems = ({ layout, children }: SelectItemsProps) => {
  // Initialise refs for container and body of items.
  const containerRefs: MutableRefObject<AnyJson>[] = [];
  const bodyRefs: MutableRefObject<AnyJson>[] = [];

  if (children) {
    for (let i = 0; i < children.length; i++) {
      bodyRefs.push(useRef(null));
      containerRefs.push(useRef(null));
    }
  }

  // Adjust all container heights to be uniform.
  const handleAdjustHeight = () => {
    const refsInitialised = [...containerRefs]
      .concat(bodyRefs)
      .every((r: AnyJson) => r !== null);

    if (refsInitialised) {
      // Get max height from button refs.
      let maxHeight = 0;
      for (let i = 0; i < bodyRefs.length; i++) {
        const { current } = bodyRefs[i];
        if (current) {
          const thisHeight = current.offsetHeight || 0;
          if (thisHeight > maxHeight) {
            maxHeight = thisHeight;
          }
        }
      }

      // Update container heights to max height.
      for (let i = 0; i < containerRefs.length; i++) {
        const { current } = containerRefs[i];

        if (current) {
          const icon: AnyJson = current.querySelector(".icon");
          const toggle: AnyJson = current.querySelector(".toggle");

          // if (window.innerWidth <= TwoThreshold) {
          if (window.innerWidth <= 800) {
            current.style.height = `${bodyRefs[i].current.offsetHeight}px`;
            if (icon)
              icon.style.height = `${bodyRefs[i].current.offsetHeight}px`;
            if (toggle)
              toggle.style.height = `${bodyRefs[i].current.offsetHeight}px`;
          } else {
            current.style.height = `${maxHeight}px`;
            if (icon) icon.style.height = `${maxHeight}px`;
            if (toggle) toggle.style.height = `${maxHeight}px`;
          }
        }
      }
    }
  };

  // Update on ref change.
  useLayoutEffect(() => {
    handleAdjustHeight();
  }, [children, bodyRefs, containerRefs]);

  // Adjust height on window resize.
  useEffect(() => {
    window.addEventListener("resize", handleAdjustHeight);
    return () => {
      window.removeEventListener("resize", handleAdjustHeight);
    };
  }, []);

  return (
    <div className={layout + " select-items"}>
      {children
        ? children.map((child: AnyJson, i: number) => (
            <Fragment key={`select_${i}`}>
              {cloneElement(child, {
                bodyRef: bodyRefs[i],
                containerRef: containerRefs[i],
              })}
            </Fragment>
          ))
        : null}
    </div>
  );
};
