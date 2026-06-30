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

    return new Uint8Array(buffer).toBase64();
  } catch (error) {
    console.warn("Base64 编码失败:", error);

    return "";
  }
}
