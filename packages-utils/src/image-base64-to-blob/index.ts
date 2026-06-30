/**
 * 将 base64 编码的图像数据转换为 Blob 对象
 * @param base64Buf  base64Buf 是包含 base64 编码的图像数据的字符串
 * @returns 返回一个 Blob 对象，该对象表示解码后的图像数据
 */
export default function imageBase64ToBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(",");

  const [
    typeItem
  ] = arr;

  const [
    , mime
  ] = typeItem.match(/:(.*?);/) || [
    "",
    ""
  ];

  const u8arr = Uint8Array.fromBase64(arr[1]);

  return new Blob([
    u8arr
  ], {
    type: mime
  });
}
