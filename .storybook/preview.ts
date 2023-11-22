import type { Preview, StoryFn } from "@storybook/react";

import "@polkadot-cloud/core/accent/polkadot-relay.css";
import "@polkadot-cloud/core/accent/kusama-relay.css";
import "@polkadot-cloud/core/accent/westend-relay.css";
import "@polkadot-cloud/core/accent/xcm.css";
import "@polkadot-cloud/core/theme/default/index.css";

const preview: Preview = {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  }
};

export default preview;
