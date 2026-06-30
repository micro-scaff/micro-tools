import {
  h
} from "vue";

type TParameters = Parameters<typeof h>;

// TODO 需要优化类型
export type TChildren = TParameters[2];

export type TExtractProps<T> = T extends new (...args: unknown[]) => { "$props": infer P } ? P : never;
