<script lang="tsx" setup>
import {
  onUnmounted,
  VNode
} from "vue";

import {
  useContextMenu
} from "../../src";

// 获取创建和销毁上下文菜单的方法
const [
  createContextMenu,
  destroyContextMenu
] = useContextMenu();

// 定义菜单组件
const MenuComponent = (): VNode => {
  return (
    <div style="padding: 8px 16px;">
      <div style="cursor: pointer; padding: 4px 0;">复制</div>
      <div style="cursor: pointer; padding: 4px 0;">粘贴</div>
      <div style="cursor: pointer; padding: 4px 0;">剪切</div>
    </div>
  );
};

// 处理右键点击事件
const handleRightClick = (e: MouseEvent): void => {

  // 阻止默认的右键菜单
  e.preventDefault();

  // 创建自定义上下文菜单
  createContextMenu({
    event: e,
    menu: MenuComponent
  });
};

onUnmounted(() => {

  // 默认是清理的，不需要自己在清理了
  destroyContextMenu();
});
</script>

<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc;
      width: 300px;
      height: 200px;
    "
    @contextmenu="handleRightClick"
  >
    右键点击此区域
  </div>
</template>
