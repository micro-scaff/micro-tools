import {
  createVNode,
  render
} from "vue";

import {
  ContextMenuVue
} from "../rc";
import {
  IFn,
  ICreateContextOptions,
  IContextMenuProps
} from "../types";

const menuManager: {
  domList: Element[];
  resolve: IFn;
} = {
  domList: [],
  // eslint-disable-next-line no-empty-function
  resolve: () => {}
};

const isServer = typeof window === "undefined";

const isClient = !isServer;

export const createContextMenu = function(options: ICreateContextOptions): Promise<unknown> | undefined {
  const {
    event,
    menu,
    ...rest
  } = options || {};

  event && event?.preventDefault();

  if (!isClient) {
    return;
  }

  return new Promise(resolve => {
    const {
      body
    } = document;

    const container = document.createElement("div");

    const propsData: Partial<IContextMenuProps> = {
      ...rest
    };

    if (options.event) {
      propsData.customEvent = event;

      propsData.axis = {
        x: event.clientX,
        y: event.clientY + body.scrollTop
      }; // y坐标需加上body往上滚动的Y

      propsData.menu = menu;
    }

    const vm = createVNode(ContextMenuVue, propsData);

    render(vm, container);

    const handleClick = function(): void {
      menuManager.resolve("");
    };

    menuManager.domList.push(container);

    const remove = function(): void {
      for (const dom of menuManager.domList) {
        try {
          dom && dom.remove();
        } catch {
          console.error("remove error");
        }
      }

      body.removeEventListener("click", handleClick);
      body.removeEventListener("scroll", handleClick);
    };

    menuManager.resolve = function(arg): void {
      remove();
      resolve(arg);
    };

    remove();
    body.append(container);
    body.addEventListener("click", handleClick);
    body.addEventListener("scroll", handleClick);
  });
};

export const destroyContextMenu = function(): void {
  if (!menuManager) {
    return;
  }

  menuManager.resolve("");
  menuManager.domList = [];
};
