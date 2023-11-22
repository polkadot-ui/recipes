import type { StoryObj } from "@storybook/react";

import { AccountCard } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Recipes/AccountCard",
  component: AccountCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      address: {
        description: "the substrate network address",
        control: "text",
      },
      align: {
        description: "Vertical alignment of the title",
        control: "object",
        options: ["flex-start", "center", "flex-end", "stretch", "baseline"],
      },
      justify: {
        description: "Horizontal alignment of the title",
        control: "object",
        options: [
          "flex-start",
          "center",
          "flex-end",
          "space-between",
          "space-around",
          "space-evenly",
        ],
      },
      component: {
        description: "A possible component that will replace the type",
      },
      className: {
        description: "A css class name",
      },
    },
    fontSize: {
      description: "The font size of the recipe",
      control: "object",
      options: [
        "xx-small",
        "x-small",
        "small",
        "medium",
        "large",
        "larger",
        "x-large",
        "xx-large",
      ],
    },
    ellipsis: {
      active: {
        description:
          "If the ellipsis is active or not (user may want dynamically to alter it)",
        control: "boolean",
      },
      amount: {
        description:
          "The amount of characters that will appear once ellipsis is applied. If ellipsis is center then the amount expresses the characters before and after the ellipsis;",
        control: "number",
      },
      position: {
        control: "string",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    title: { address: "1f1yYj2bCFhJCTVdeWLDueUsrZynLAaj6jeMy18fjZ7Cr73" },
    icon: {
      size: 40,
      gridSize: 1,
      justify: "flex-start",
      dark: false,
      colors: ["blue", "green"],
      outerColor: "yellow",
    },
  },
};
