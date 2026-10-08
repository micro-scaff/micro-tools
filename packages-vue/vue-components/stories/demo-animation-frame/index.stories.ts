import type {
  Meta,
  StoryObj
} from "@storybook/vue3";

import Index from "./index.vue";

const meta = {
  component: Index,
  title: "序列帧动画组件"
} satisfies Meta<typeof Index>;

export default meta;
type TStory = StoryObj<typeof meta>;

export const AnimationFrame: TStory = {};
