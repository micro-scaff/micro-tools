interface IParams<T> {

  /**
   * 定义 localStorage 的 key
   */
  key: string;

  /**
   * 定义 localStorage 的 values
   */
  value: T;

  /**
   * 定义 localStorage 的储存时间
   * 1 = 24h、0.5 = 12h
   */
  expire?: number;
}

/**
 * localStorage 的一些扩展
 */
const localStorageHelper = {

  // private static readonly storageKeyPrefix = 'test';
  /**
   * 设置 localStorage
   */
  set<T>({
    key, value, expire
  }: IParams<T>): void {
    if ([
      "",
      null,
      undefined
    ].includes(key)) {
      throw new Error("key 不能为空");
    }

    if ([
      "",
      null,
      undefined
    ].includes(value as null | string | undefined)) {
      throw new Error("value 不能为空");
    }

    localStorage.setItem(
        key,
        JSON.stringify({
          value,
          expire: expire ? Date.now() + expire * 24 * 60 * 60 * 1000 : null
        })
    );
  },

  get<T>(key: string): T | null {
    const storedItem = localStorage.getItem(key);

    if (storedItem) {
      const parsedItem = JSON.parse(storedItem);

      if (parsedItem?.expire) {
        const now = Date.now();

        if (parsedItem.expire === Infinity || parsedItem.expire > now) {
          return parsedItem.value;
        }

        localStorage.removeItem(key);

        return null;
      }

      delete parsedItem.expire;

      return parsedItem.value;
    }

    return null;
  },

  delete(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  }
};

export default localStorageHelper;
