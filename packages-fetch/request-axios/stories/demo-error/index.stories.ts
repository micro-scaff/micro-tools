import type {
  Meta,
  StoryObj
} from "@storybook/react";

import Index from "./index";

const meta = {
  title: "失败",
  component: Index
} satisfies Meta<typeof Index>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Failure: TStory = {};
