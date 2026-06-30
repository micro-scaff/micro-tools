const preview = {

  // https://storybook.org.cn/docs/writing-stories/parameters#global-parameters
  parameters: {

    // https://storybook.org.cn/docs/essentials/controls
    // controls: {
    //   matchers: {
    //     color: /(background|color)$/i,
    //     date: /Date$/i
    //   }
    // },

    // https://storybook.nodejs.cn/docs/essentials/viewport
    // viewport: {
    //   defaultViewport: "responsive"
    // },

    // https://storybook.org.cn/docs/configure/story-layout
    layout: "padded",

    // https://storybook.org.cn/docs/configure/user-interface/features-and-behavior
    // 设置默认的 UI 状态
    options: {

      // 初始激活的面板
      // initialActive: "canvas",

      // 是否显示工具栏
      // showToolbar: true,

      // 导航面板宽度
      // navSize: 300,

      // 底部面板高度
      bottomPanelHeight: 0

      // 右侧面板宽度
      // rightPanelWidth: 0,

      // 面板位置
      // panelPosition: "bottom",

      // 是否显示标签页
      // showTabs: true
    }
  }
};

export default preview;
