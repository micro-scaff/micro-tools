export default function timeoutFn(fn: Function): void {
  setTimeout(() => {
    return fn();
  }, 30);
}
