import {
  useCallback,
  useEffect,
  useRef
} from "react";

/**
 * 查组件是否已经卸载
 * @returns boolean 已经卸载返回 true
 *
 * target：https://github.com/aliyun/alibabacloud-console-base/blob/master/packages-hook/react-hook-is-unmounted/src/hook/use-is-unmounted.ts
 */
export default function useIsUnmounted(): () => boolean {
  const ref = useRef<boolean>(false);

  const isUnmounted = useCallback(() => {
    return ref.current;
  }, []);

  useEffect(() => {
    return (): void => {
      ref.current = true;
    };
  }, []);

  return isUnmounted;
}
