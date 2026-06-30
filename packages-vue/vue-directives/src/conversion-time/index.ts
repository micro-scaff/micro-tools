import {
  App
} from "vue";

function dateFormat(time: number): string {
  const date = new Date(time);

  const year = date.getFullYear();

  /* 在日期格式中，月份是从0开始的，因此要加0
   * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
   */
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  // 拼接
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 转换时间
 */
export default function directiveConversionTime(app: App): void {
  app.directive("directiveConversionTime", {
    mounted(el) {
      const text = el.textContent;

      let timer: number = Number.parseInt(text);

      // 同意格式
      if (JSON.stringify(timer).length === 10) {
        timer *= 1000;
      }

      // 处理一个时间格式错误
      if (Number.isNaN(timer)) {
        el.textContent = "Wrong time format.";

        return;
      }

      el.textContent = dateFormat(timer);
    }
  });
}
