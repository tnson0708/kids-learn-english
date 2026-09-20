/**
 * Turns a photo into a black & white line drawing ("coloring page") using
 * classic image processing (grayscale + box blur + Sobel edge detection) —
 * no AI/ML model or network call involved.
 */

export interface ColoringPageOptions {
  /** 0-100. Higher keeps only the strongest edges (cleaner, fewer lines). */
  sensitivity: number;
  /** 0-4. Smooths the photo before edge detection to remove noisy lines. */
  smoothing: number;
}

const MAX_MAGNITUDE = 400;

function clampIndex(value: number, max: number): number {
  return value < 0 ? 0 : value > max ? max : value;
}

function toGrayscale(data: Uint8ClampedArray, width: number, height: number): Float32Array {
  const gray = new Float32Array(width * height);
  for (let i = 0, p = 0; p < gray.length; i += 4, p++) {
    gray[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return gray;
}

function boxBlur(src: Float32Array, width: number, height: number, radius: number): Float32Array {
  if (radius <= 0) return src;

  const horizontal = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let dx = -radius; dx <= radius; dx++) {
        sum += src[rowOffset + clampIndex(x + dx, width - 1)];
      }
      horizontal[rowOffset + x] = sum / (radius * 2 + 1);
    }
  }

  const result = new Float32Array(width * height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        sum += horizontal[clampIndex(y + dy, height - 1) * width + x];
      }
      result[y * width + x] = sum / (radius * 2 + 1);
    }
  }
  return result;
}

function sobelMagnitude(gray: Float32Array, width: number, height: number): Float32Array {
  const magnitude = new Float32Array(width * height);
  const at = (x: number, y: number) =>
    gray[clampIndex(y, height - 1) * width + clampIndex(x, width - 1)];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const gx =
        -at(x - 1, y - 1) + at(x + 1, y - 1) - 2 * at(x - 1, y) + 2 * at(x + 1, y) - at(x - 1, y + 1) + at(x + 1, y + 1);
      const gy =
        -at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1) + at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1);
      magnitude[y * width + x] = Math.sqrt(gx * gx + gy * gy);
    }
  }
  return magnitude;
}

export function imageDataToColoringPage(source: ImageData, options: ColoringPageOptions): ImageData {
  const { width, height, data } = source;
  const gray = toGrayscale(data, width, height);
  const smoothed = boxBlur(gray, width, height, Math.round(options.smoothing));
  const magnitude = sobelMagnitude(smoothed, width, height);

  const threshold = (options.sensitivity / 100) * MAX_MAGNITUDE;
  const out = new ImageData(width, height);
  for (let p = 0; p < magnitude.length; p++) {
    const value = magnitude[p] > threshold ? 0 : 255;
    const i = p * 4;
    out.data[i] = value;
    out.data[i + 1] = value;
    out.data[i + 2] = value;
    out.data[i + 3] = 255;
  }
  return out;
}
