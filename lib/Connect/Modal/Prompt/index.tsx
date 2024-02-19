// Copyright 2024 @polkadot-ui/recipes authors & contributors
// SPDX-License-Identifier: MIT

import { usePrompt } from "../../Providers/PromptProvider";
import "@polkadot-ui/core/css/recipes/Connect/Modal/Prompt/index.css";

// eslint-disable-next-line import/no-unresolved
import "./index.scss";

export const Prompt = () => {
  const { closePrompt, size, status, Prompt: PromptInner } = usePrompt();

  if (status === 0) {
    return <></>;
  }

  return (
    <div className="prompt-wrapper">
      <div>
        <div
          className="height-wrapper"
          style={
            size === "small" ? { maxWidth: "500px" } : { maxWidth: "700px" }
          }
        >
          <div className="content-wrapper">{PromptInner}</div>
        </div>
        <button type="button" className="close" onClick={() => closePrompt()}>
          &nbsp;
        </button>
      </div>
    </div>
  );
};
