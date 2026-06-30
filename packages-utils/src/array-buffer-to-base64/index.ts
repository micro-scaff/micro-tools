/**
 * 将ArrayBuffer转换为Base64字符串
 * @param buffer ArrayBuffer
 * @returns Base64字符串，失败时返回空字符串
 */
export default function arrayBufferToBase64(buffer: ArrayBuffer): string {
  try {
    if (!buffer || !(buffer instanceof ArrayBuffer)) {
      console.warn("提供的 ArrayBuffer 无效");

      return "";
    }

    const bytes = new Uint8Array(buffer);

    const chunkSize = 0x80_00;

    let binary = "";

    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCodePoint(...bytes.subarray(i, i + chunkSize));
    }

    // eslint-disable-next-line unicorn/prefer-uint8array-base64
    return btoa(binary);
  } catch (error) {
    console.warn("Base64 编码失败:", error);

    return "";
  }
}
