import type {
  Preview
} from "@storybook/vue3";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "element-plus/dist/index.css";

const preview: Preview = {
  parameters: {
    options: {
      bottomPanelHeight: 0
    }
  }
};

export default preview;
