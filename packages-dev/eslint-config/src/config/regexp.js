import pluginRegexp, {
  configs as regexpConfigs
} from "eslint-plugin-regexp";

export default {
  plugins: {
    regexp: pluginRegexp
  },
  rules: {
    ...regexpConfigs.recommended.rules
  }
};
