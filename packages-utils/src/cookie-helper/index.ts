interface ICookieOptions {

  /**
   * Cookie 的过期时间（单位：秒）
   */
  expires?: number;

  /**
   * Cookie 的域
   */
  domain?: string;

  /**
   * Cookie 的路径
   */
  path?: string;

  /**
   * 是否仅在使用 SSL（也就是 https） 连接时发送 Cookie
   */
  secure?: boolean;

  /**
   * 控制 Cookie 的跨站点请求行为
   *
   * Strict: 在同站点情况下才发送 Cookie，即只有当请求来自于当前站点时，浏览器才会发送 Cookie。这是最为严格的设置，减少了跨站点请求伪造（CSRF）的风险。
   *
   * Lax: 在导航到目标站点的顶级导航时（例如通过点击链接或者通过 GET 表单提交），会发送 Cookie。在同站点的 POST 请求中，也会发送 Cookie。这是默认值，提供了一定程度的安全性，同时允许一些导航的场景。
   *
   * None: 总是发送 Cookie，无论是同站点还是跨站点请求。这通常在需要使用跨站点请求的场景下使用，但需要注意安全性问题。使用 None 的同时，还需要将 Secure 属性设置为 true，表示只有在通过 HTTPS 安全连接传输时才发送 Cookie。
   *
   * 注：
   * ① 存储关键信息的 Cookie，sameSite 属性不能为 None；
   * ② sameSite 为 None === sameSite 不传，默认是啥也不传的。
   */
  sameSite?: "Strict" | "Lax" | "None";
}

/**
 * 封装 Cookie 操作的工具类
 *
 * 端口、协议不同，不影响 Cookie
 *
 *
 */
const cookieHelper = {

  /**
   * 设置 Cookie
   * @param {string} name - Cookie 的名称
   * @param {string} value - Cookie 的值
   * @param {CookieOptions} options - Cookie 的选项
   */
  setCookie(name: string, value: string, options?: ICookieOptions): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options?.expires) {
      const expirationDate = new Date(Date.now() + options.expires * 1000);

      cookieString += `; expires=${expirationDate.toUTCString()}`;
    }

    if (options?.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    if (options?.path) {
      cookieString += `; path=${options.path}`;
    }

    if (options?.secure) {
      cookieString += "; secure";
    }

    if (options?.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    // eslint-disable-next-line unicorn/no-document-cookie
    document.cookie = cookieString;
  },

  /**
   * 获取 Cookie 的值
   * @param {string} name - Cookie 的名称
   * @returns {string|null} Cookie 的值，如果不存在则返回 null
   */
  getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [
        cookieName,
        cookieValue
      ] = cookie.split("=");

      if (decodeURIComponent(cookieName) === name) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  },

  /**
   * 删除 Cookie
   * @param {string} name - Cookie 的名称
   * @param {CookieOptions} options - Cookie 的路径（一版不需要）
   */
  deleteCookie(name: string, options?: ICookieOptions): void {
    if (!cookieHelper.getCookie(name)) {
      return;
    }

    // 设置过期时间为过去的时间来删除 Cookie
    const deleteOptions: ICookieOptions = {
      domain: options?.domain,
      expires: -1,
      path: options?.path,
      sameSite: options?.sameSite,
      secure: options?.secure
    };

    cookieHelper.setCookie(name, "", deleteOptions);
  }
};

export default cookieHelper;

/*
 * // 使用示例
 * const cookieOptions: CookieOptions = {
 *     expires: 3600,
 *     domain: 'example.com',
 *     path: '/',
 *     secure: true,
 *     sameSite: 'None'
 * };
 *
 * CookieHelper.setCookie('username', 'John Doe', cookieOptions);
 * const username = CookieHelper.getCookie('username');
 * console.log(username);
 *
 * CookieHelper.deleteCookie('username', cookieOptions);
 */
