import {
  FONT_CONFIG,
  COMMON_FONTS
} from "../const";
import measureTextWidthCanvas from "./measure-text-width-canvas";

/**
 * 批量检测字体（Canvas 方法）
 * @param {string[]} fontList - 字体列表
 * @returns {object} 检测结果对象
 */
function detectFontsCanvas(fontList: string[]): Record<string, boolean> {
  const results: Record<string, boolean> = {};

  for (const font of fontList) {
    try {
      results[font] = detectSingleFontCanvas(font);
    } catch (error) {
      console.warn(`Font detection failed for "${font}":`, error);
      results[font] = false;
    }
  }

  return results;
}

/**
 * 检测单个字体（Canvas 方法）
 * @param {string} fontName - 字体名称
 * @returns {boolean} 字体是否可用
 */
function detectSingleFontCanvas(fontName: string): boolean {
  try {
    const {
      text,
      fallbackFont
    } = FONT_CONFIG;

    // 验证输入参数
    if (!fontName || !text || !fallbackFont) {
      console.warn("Invalid font detection parameters");

      return false;
    }

    const testFont = `${fontName}, ${fallbackFont}`;

    // 测量回退字体宽度
    const baseWidth = measureTextWidthCanvas(text, fallbackFont);

    if (baseWidth === -1) {
      console.warn("Failed to measure fallback font width");

      return false;
    }

    // 测量目标字体宽度
    const fontWidth = measureTextWidthCanvas(text, testFont);

    if (fontWidth === -1) {
      console.warn(`Failed to measure font width for "${fontName}"`);

      return false;
    }

    // 计算宽度差异（考虑浮点数精度）
    const widthDifference = Math.abs(fontWidth - baseWidth);

    const threshold = 0.1; // 最小差异阈值

    return widthDifference > threshold;
  } catch (error) {
    console.warn(`Font detection error for "${fontName}":`, error);

    return false;
  }
}

/**
 * 获取可用字体列表
 * @param {string[]} fontList - 要检测的字体列表，默认为常用字体
 * @returns {string[]} 可用的字体列表
 */
export default function getAvailableFonts(fontList = COMMON_FONTS): string[] {
  try {

    // 验证输入参数
    if (!Array.isArray(fontList) || fontList.length === 0) {
      console.warn("Invalid font list provided");

      return [];
    }

    const results = detectFontsCanvas(fontList);

    const availableFonts = Object.keys(results).filter(font => {
      return results[font];
    });

    console.warn(`Font detection completed: ${availableFonts.length}/${fontList.length} fonts available`);

    return availableFonts;
  } catch (error) {
    console.error("Font detection failed:", error);

    return [];
  }
}
