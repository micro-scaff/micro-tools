import {
  ERouter
} from "@/enum";

const ROUTER = [
  {
    path: ERouter.ROOT,
    name: "demo-root",
    title: "案例-根路径",
    component: () => {
      return import("@/pages/demo-root/index.vue");
    }
  },
  {
    path: ERouter.DEMO_FETCH,
    name: "demo-fetch",
    title: "案例-请求",
    meta: {
      disabled: true
    },
    component: () => {
      return import("@/pages/demo-fetch/index.vue");
    }
  },
  {
    path: ERouter.DEMO_QUEUE,
    name: "demo-queue",
    title: "案例-队列",
    component: () => {
      return import("@/pages/demo-queue/index.vue");
    }
  }
];

export default ROUTER;
