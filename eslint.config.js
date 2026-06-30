import EsLint, {
  VUE,
  REACT
} from "@mt-kit/eslint-config";
import {
  defineConfig
} from "eslint/config";

export default defineConfig([
  {
    files: [
      "**/*.?([cm])[t]s?(x)",
      "**/*.vue",
      "**/*.json",
      "**/*.json5",
      "**/*.jsonc",
      "**/*.js",
      "**/*.mjs"
    ],
    extends: [
      EsLint
    ]
  },
  {
    files: [
      "./packages-vue/**/*.vue",
      "./packages-cli/cli-storybook-vue/**/*.vue",
      "./packages-demo/demo-vue/**/*.vue"
    ],
    extends: [
      VUE
    ]
  },
  {
    files: [
      "./packages-react/**/*.tsx",
      "./packages-react/**/*.ts",
      "./packages-react/**/*.js",
      "./packages-react/**/*.jsx"
    ],
    extends: [
      REACT
    ]
  }
]);
