import {
  Ref,
  onMounted,
  onUnmounted,
  ref
} from "vue";

interface IOptions {
  src: string;
}

interface IOptions {
  src: string;
}

/*
 * // 模拟写一个 js 文件（test.js）
 *
 *const test = {
 *  a: 1,
 *  b: 2
 *}
 */

/**
 * 创建 script 并加入 head 中
 *
 * 并在离开的时候进行销毁
 *
 * @param {IOptions} opts
 * @returns
 *
 * 使用：
 *
 * const { toPromise } = useScript({ src: "URL || ./test.js" });
 *
 * async function initMap() {
 *     await toPromise();
 *     await nextTick(); // 这个可以不要，但是在使用 DOM 的时候，还是让存在吧
 *     const test = (window as any).加入到上方 URL 里定义的变量名 || test;
 *
 *     console.log(test.a); // 1
 * }
 */
export default function useScript(opts: IOptions): {
  isLoading: Ref<boolean>;
  error: Ref<boolean>;
  success: Ref<boolean>;
  promise: () => Promise<unknown>;
} {
  const isLoading = ref(false);

  const error = ref(false);

  const success = ref(false);

  let script: HTMLScriptElement;

  const promise = new Promise((resolve, reject) => {
    onMounted(() => {
      script = document.createElement("script");
      script.type = "text/javascript";

      script.addEventListener("load", (res): void => {
        isLoading.value = false;
        success.value = true;
        error.value = false;
        resolve(res);
      });

      script.addEventListener("error", (err): void => {
        isLoading.value = false;
        success.value = false;
        error.value = true;
        reject(err);
      });

      script.src = opts.src;
      const head: HTMLHeadElement = document.head || document.querySelector("head");

      head.append(script);
    });
  });

  onUnmounted(() => {

    // 销毁
    script && script.remove();
  });

  return {
    isLoading,
    error,
    success,
    promise: () => {
      return promise;
    }
  };
}
