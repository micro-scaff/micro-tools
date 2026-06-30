/**
 * 只要修改了 device 文件夹下的文件，都需要在这里导出，然后如果改变了结构等，需要发布一个新 Y 版本
 */

export type {
  IDeviceAll as DeviceAll,
  IDeviceAllOptions as DeviceAllOptions,
  IBrowser as DeviceBrowser,
  IFeatures as DeviceFeatures,
  II18n as DeviceI18n,
  ILocation as DeviceLocation,
  IMemory as DeviceMemory,
  IScreen as DeviceScreen
} from "./types";

export { default as deviceOperatingSystem } from "./operating-system";
export { default as deviceBrowser } from "./browser";
export { default as deviceLanguage } from "./language";
export { default as deviceOnLine } from "./onLine";
export { default as deviceScreen } from "./screen";
export { default as deviceLocation } from "./location";
export { default as devicePublicIp } from "./public-ip";
export { default as deviceCpuCores } from "./cpu-cores";
export { default as deviceMemory } from "./memory";
export { default as deviceHardwareConcurrency } from "./hardware-concurrency";
export { default as deviceFeatures } from "./features";
export { default as deviceSensor } from "./sensor";
export { default as deviceI18n } from "./i18n";
export { default as deviceUa } from "./ua";

export { default as deviceAll } from "./all";
