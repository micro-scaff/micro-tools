const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  // 确保下面的插件已经全部安装
  "addons": [
    {
      "name": "@storybook/addon-essentials",
      "options": {
        "docs": true
      }
    },
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};

export default config;
