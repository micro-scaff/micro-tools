import {
  II18n
} from "./types";

/**
 * 🌐 国际化信息
 */
export default function deviceI18n(): II18n {
  return {
    timeZone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
    daylightSaving: new Date().getTimezoneOffset() < new Date(2024, 6, 1).getTimezoneOffset(),
    numberFormat: new Intl.NumberFormat().format(1234.56),
    currencyFormat: new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY"
    }).format(1234.56),
    dateFormat: new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date()),
    timeFormat: new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date())
  };
}
