import type {
  Meta,
  StoryObj
} from "@storybook/web-components";
import {
  fn
} from "@storybook/test";

import {
  ButtonProps,
  Button
} from "../../src";

const meta: Meta<ButtonProps> = {
  title: "Button",

  // tags: [
  //   "autodocs"
  // ],
  render: args => {
    return Button(args);
  },
  argTypes: {
    backgroundColor: {
      control: "color"
    },
    size: {
      control: {
        type: "select"
      },
      options: [
        "small",
        "medium",
        "large"
      ]
    }
  },
  args: {
    onClick: fn()
  }
};

export default meta;
type TStory = StoryObj<ButtonProps>;

export const Primary: TStory = {
  args: {
    primary: true,
    label: "Button"
  }
};

export const Secondary: TStory = {
  args: {
    label: "Button"
  }
};

export const Large: TStory = {
  args: {
    size: "large",
    label: "Button"
  }
};

export const Small: TStory = {
  args: {
    size: "small",
    label: "Button"
  }
};
