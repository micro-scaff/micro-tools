import type {
  IImageColor
} from "./types";

const MAX_DRAW_DIMENSION = 240;

const BUCKET_SIZE = 24;

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[
    r,
    g,
    b
  ].map(channel => {
    return channel.toString(16).padStart(2, "0");
  }).join("")}`;
};

const rgbToHsb = (r: number, g: number, b: number) => {
  const rn = r / 255;

  const gn = g / 255;

  const bn = b / 255;

  const max = Math.max(rn, gn, bn);

  const min = Math.min(rn, gn, bn);

  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === rn) {
      h = ((gn - bn) / delta) % 6;
    } else if (max === gn) {
      h = (bn - rn) / delta + 2;
    } else {
      h = (rn - gn) / delta + 4;
    }

    h = Math.round(h * 60);

    if (h < 0) {
      h += 360;
    }
  }

  const s = max === 0 ? 0 : delta / max;

  const v = max;

  return {
    h,
    s: Math.round(s * 100),
    b: Math.round(v * 100)
  };
};

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

const getPixelScore = (r: number, g: number, b: number) => {
  const {
    s, b: brightness
  } = rgbToHsb(r, g, b);

  const saturationScore = s / 100;

  const preferredBrightness = 1 - Math.abs(brightness - 65) / 65;

  const brightnessScore = clamp(preferredBrightness, 0, 1);

  return saturationScore * 0.7 + brightnessScore * 0.3;
};

const computeDominantColor = (data: Uint8ClampedArray) => {
  const buckets = new Map();

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];

    if (alpha < 128) {
      continue;
    }

    const r = data[i];

    const g = data[i + 1];

    const b = data[i + 2];

    const score = getPixelScore(r, g, b);

    if (score <= 0) {
      continue;
    }

    const key = [
      Math.round(r / BUCKET_SIZE),
      Math.round(g / BUCKET_SIZE),
      Math.round(b / BUCKET_SIZE)
    ].join("-");

    let bucket = buckets.get(key);

    if (!bucket) {
      bucket = {
        r: 0,
        g: 0,
        b: 0,
        count: 0,
        score: 0
      };
      buckets.set(key, bucket);
    }

    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    bucket.count += 1;
    bucket.score += score;
  }

  if (buckets.size === 0) {
    return null;
  }

  let bestBucket: {
    r: number;
    g: number;
    b: number;
    count: number;
    score: number;
  } | null = null as {
    r: number;
    g: number;
    b: number;
    count: number;
    score: number;
  } | null;

  let bestWeight = -Infinity;

  buckets.forEach(bucket => {
    const weight = bucket.score * (1 + Math.log(bucket.count + 1));

    if (weight > bestWeight) {
      bestWeight = weight;
      bestBucket = bucket;
    }
  });

  if (!bestBucket || bestBucket.count === 0) {
    return null;
  }

  return {
    r: Math.round(bestBucket.r / bestBucket.count),
    g: Math.round(bestBucket.g / bestBucket.count),
    b: Math.round(bestBucket.b / bestBucket.count)
  };
};

const getImageDataSafe = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  try {
    return ctx.getImageData(0, 0, width, height);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "SecurityError") {
      throw new Error("跨域限制：目标图片未正确设置 CORS");
    }

    throw error;
  }
};

const updateThemeColor = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");

  const sourceWidth = img.naturalWidth || img.width;

  const sourceHeight = img.naturalHeight || img.height;

  if (!sourceWidth || !sourceHeight) {
    throw new Error("未获取到图片尺寸");
  }

  const longestSide = Math.max(sourceWidth, sourceHeight);

  const scale = longestSide > MAX_DRAW_DIMENSION ? MAX_DRAW_DIMENSION / longestSide : 1;

  const width = Math.max(1, Math.round(sourceWidth * scale));

  const height = Math.max(1, Math.round(sourceHeight * scale));

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("未获取到 Canvas 2D 上下文");
  }

  ctx.drawImage(img, 0, 0, width, height);

  let imageData;

  try {
    imageData = getImageDataSafe(ctx, width, height);
  } catch {
    throw new Error("未获取到图片数据");
  }

  const dominantColor = computeDominantColor(imageData.data);

  if (!dominantColor) {
    throw new Error("未识别到有效像素");
  }

  const {
    r, g, b
  } = dominantColor;

  const hex = rgbToHex(r, g, b);

  const {
    h, s, b: brightness
  } = rgbToHsb(r, g, b);

  return {
    hex,
    rgb: {
      r,
      g,
      b
    },
    hsb: {
      h,
      s,
      b: brightness
    }
  };
};

export default async function getImageColor(image: string): Promise<IImageColor> {
  const img = document.createElement("img");

  img.crossOrigin = "anonymous";
  img.referrerPolicy = "no-referrer";

  img.src = image;

  let color = {
    hex: "",
    rgb: {
      r: 0,
      g: 0,
      b: 0
    },
    hsb: {
      h: 0,
      s: 0,
      b: 0
    }
  };

  if (img.complete && img.naturalWidth) {
    color = await updateThemeColor(img);
  }

  img.addEventListener("load", async () => {
    color = await updateThemeColor(img);
  });

  img.addEventListener("error", () => {
    throw new Error("图片加载失败");
  });

  return color;
}
