/**
 * Turns a photo into a clean black & white line drawing ("coloring page")
 * optimized for kids using classic image processing:
 * 1. Edge-preserving bilateral filter & luminance posterization to eliminate background/surface texture noise
 * 2. Difference of Gaussians (DoG) + Sobel for main outline extraction
 * 3. 8-connected component analysis to remove isolated tiny detail strokes & specks
 * 4. Morphological min-filter for bold, kid-friendly outlines
 */

export type DetailLevel = "simple" | "medium" | "detailed";

export interface ColoringPageOptions {
  /** 0-100. Higher keeps only the strongest edges (cleaner, fewer lines). */
  sensitivity: number;
  /** 0-4. Smooths noisy edges before detection. */
  smoothing: number;
  /** Detail level preset: simple (for young kids), medium, detailed. */
  detailLevel?: DetailLevel;
  /** Line thickness in pixels (1 to 4). Default is 2 for clear kid-friendly outlines. */
  lineThickness?: number;
  /** 0-100. Strength of small detail/noise stroke removal. Default is 70. */
  removeNoiseAmount?: number;
}

function clamp(val: number, min: number, max: number): number {
  return val < min ? min : val > max ? max : val;
}

function toGrayscale(data: Uint8ClampedArray, width: number, height: number): Float32Array {
  const gray = new Float32Array(width * height);
  for (let i = 0, p = 0; p < gray.length; i += 4, p++) {
    gray[p] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }
  return gray;
}

/**
 * Edge-preserving bilateral filter.
 * Smooths low-contrast textures (skin, cloth patterns, background grain)
 * while preserving high-contrast boundary lines of the subject.
 */
function bilateralFilter(
  src: Float32Array,
  width: number,
  height: number,
  radius: number,
  sigmaSpatial: number,
  sigmaRange: number
): Float32Array {
  if (radius <= 0) return src;

  const dst = new Float32Array(width * height);
  const rangeLUT = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    rangeLUT[i] = Math.exp(-(i * i) / (2 * sigmaRange * sigmaRange));
  }

  const kSize = radius * 2 + 1;
  const spatialLUT = new Float32Array(kSize * kSize);
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const idx = (dy + radius) * kSize + (dx + radius);
      spatialLUT[idx] = Math.exp(-(dx * dx + dy * dy) / (2 * sigmaSpatial * sigmaSpatial));
    }
  }

  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    for (let x = 0; x < width; x++) {
      const centerVal = src[rowOffset + x];
      let sum = 0;
      let weightSum = 0;

      for (let dy = -radius; dy <= radius; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        const nRowOffset = ny * width;

        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;

          const val = src[nRowOffset + nx];
          const diff = Math.min(255, Math.abs(val - centerVal) | 0);
          const spatialWeight = spatialLUT[(dy + radius) * kSize + (dx + radius)];
          const rangeWeight = rangeLUT[diff];
          const w = spatialWeight * rangeWeight;

          sum += val * w;
          weightSum += w;
        }
      }
      dst[rowOffset + x] = weightSum > 0 ? sum / weightSum : centerVal;
    }
  }
  return dst;
}

/**
 * Posterizes luminance into discrete levels to collapse soft shading gradients into uniform regions.
 */
function posterize(src: Float32Array, levels: number): Float32Array {
  if (levels <= 0 || levels >= 256) return src;
  const dst = new Float32Array(src.length);
  const step = 255 / (levels - 1);
  for (let i = 0; i < src.length; i++) {
    dst[i] = Math.round(src[i] / step) * step;
  }
  return dst;
}

/**
 * Separable 1D Gaussian blur for fast multi-scale blurring.
 */
function gaussianBlur(src: Float32Array, width: number, height: number, sigma: number): Float32Array {
  if (sigma <= 0.1) return src;

  const radius = Math.min(Math.ceil(sigma * 3), 12);
  const kSize = radius * 2 + 1;
  const kernel = new Float32Array(kSize);
  let kSum = 0;
  for (let i = -radius; i <= radius; i++) {
    const w = Math.exp(-(i * i) / (2 * sigma * sigma));
    kernel[i + radius] = w;
    kSum += w;
  }
  for (let i = 0; i < kSize; i++) kernel[i] /= kSum;

  const temp = new Float32Array(width * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * width;
    for (let x = 0; x < width; x++) {
      let sum = 0;
      for (let dx = -radius; dx <= radius; dx++) {
        const nx = clamp(x + dx, 0, width - 1);
        sum += src[rowOffset + nx] * kernel[dx + radius];
      }
      temp[rowOffset + x] = sum;
    }
  }

  const dst = new Float32Array(width * height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        const ny = clamp(y + dy, 0, height - 1);
        sum += temp[ny * width + x] * kernel[dy + radius];
      }
      dst[y * width + x] = sum;
    }
  }
  return dst;
}

/**
 * Sobel operator for gradient magnitude computation.
 */
function sobelMagnitude(src: Float32Array, width: number, height: number): Float32Array {
  const magnitude = new Float32Array(width * height);
  const at = (x: number, y: number) =>
    src[clamp(y, 0, height - 1) * width + clamp(x, 0, width - 1)];

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

/**
 * 8-connectivity connected component filter.
 * Erases isolated black line segments smaller than `minSize` pixels.
 * Removes stray noise dots, fabric patterns, skin freckles, hair wisps.
 */
function removeSmallComponents(
  binaryMask: Uint8Array,
  width: number,
  height: number,
  minSize: number
) {
  if (minSize <= 1) return;

  const totalPixels = width * height;
  const visited = new Uint8Array(totalPixels);
  const queue = new Int32Array(totalPixels);

  for (let i = 0; i < totalPixels; i++) {
    if (binaryMask[i] === 0 && visited[i] === 0) {
      let head = 0;
      let tail = 0;
      queue[tail++] = i;
      visited[i] = 1;

      while (head < tail) {
        const curr = queue[head++];
        const cx = curr % width;
        const cy = (curr / width) | 0;

        for (let dy = -1; dy <= 1; dy++) {
          const ny = cy + dy;
          if (ny < 0 || ny >= height) continue;
          const rowOffset = ny * width;

          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = cx + dx;
            if (nx < 0 || nx >= width) continue;

            const nIdx = rowOffset + nx;
            if (binaryMask[nIdx] === 0 && visited[nIdx] === 0) {
              visited[nIdx] = 1;
              queue[tail++] = nIdx;
            }
          }
        }
      }

      if (tail < minSize) {
        for (let k = 0; k < tail; k++) {
          binaryMask[queue[k]] = 255;
        }
      }
    }
  }
}

/**
 * Morphological dilation on black lines (min filter) to make lines bolder for kids to color.
 */
function dilateLines(
  src: Uint8Array,
  width: number,
  height: number,
  thickness: number
): Uint8Array {
  if (thickness <= 1) return src;

  const radius = Math.min(thickness - 1, 3);
  const dst = new Uint8Array(width * height);
  dst.set(src);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (src[y * width + x] === 0) {
        for (let dy = -radius; dy <= radius; dy++) {
          const ny = y + dy;
          if (ny < 0 || ny >= height) continue;
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            if (nx < 0 || nx >= width) continue;
            dst[ny * width + nx] = 0;
          }
        }
      }
    }
  }
  return dst;
}

export function imageDataToColoringPage(source: ImageData, options: ColoringPageOptions): ImageData {
  const { width, height, data } = source;
  const {
    sensitivity = 55,
    smoothing = 1,
    detailLevel = "simple",
    lineThickness = 2,
    removeNoiseAmount = 70,
  } = options;

  // Parameters tuned by detail level
  let posterizeLevels = 12;
  let bilateralRadius = 2;
  let spatialSigma = 2.5;
  let rangeSigma = 28;
  let dogSigma1 = 1.4;
  let dogSigma2 = 2.8;
  let baseNoiseMinSize = Math.max(30, Math.round((width * height) / 12000));

  if (detailLevel === "medium") {
    posterizeLevels = 16;
    bilateralRadius = 2;
    spatialSigma = 2.0;
    rangeSigma = 35;
    dogSigma1 = 1.2;
    dogSigma2 = 2.4;
    baseNoiseMinSize = Math.max(18, Math.round((width * height) / 22000));
  } else if (detailLevel === "detailed") {
    posterizeLevels = 24;
    bilateralRadius = 1;
    spatialSigma = 1.5;
    rangeSigma = 45;
    dogSigma1 = 1.0;
    dogSigma2 = 2.0;
    baseNoiseMinSize = Math.max(8, Math.round((width * height) / 40000));
  }

  // Adjust smoothing multiplier
  if (smoothing > 0) {
    spatialSigma += smoothing * 0.5;
    dogSigma1 += smoothing * 0.2;
    dogSigma2 += smoothing * 0.4;
  }

  // Step 1: Grayscale
  const rawGray = toGrayscale(data, width, height);

  // Step 2: Edge-preserving Bilateral Filter
  const filteredGray = bilateralFilter(rawGray, width, height, bilateralRadius, spatialSigma, rangeSigma);

  // Step 3: Posterization (flatten subtle texture gradients)
  const quantizedGray = posterize(filteredGray, posterizeLevels);

  // Step 4: Difference of Gaussians (DoG) for bandpass outline extraction
  const g1 = gaussianBlur(quantizedGray, width, height, dogSigma1);
  const g2 = gaussianBlur(quantizedGray, width, height, dogSigma2);

  // Step 5: Sobel magnitude on filtered gray
  const sobelMag = sobelMagnitude(quantizedGray, width, height);

  // Step 6: Combined edge magnitude & adaptive thresholding
  const sensFactor = sensitivity / 50;
  const thresholdSobel = 80 * sensFactor;
  const thresholdDog = 8 * sensFactor;

  const binaryMask = new Uint8Array(width * height);
  for (let i = 0; i < binaryMask.length; i++) {
    const sMag = sobelMag[i];
    const dogVal = g1[i] - 0.96 * g2[i];

    const isEdge = sMag > thresholdSobel || dogVal < -thresholdDog;
    binaryMask[i] = isEdge ? 0 : 255;
  }

  // Step 7: Filter small isolated noise components & stray lines
  const minComponentSize = Math.round(baseNoiseMinSize * (removeNoiseAmount / 50));
  removeSmallComponents(binaryMask, width, height, minComponentSize);

  // Step 8: Dilate lines according to requested lineThickness
  const finalMask = dilateLines(binaryMask, width, height, lineThickness);

  // Step 9: Create ImageData output
  const out = new ImageData(width, height);
  for (let p = 0; p < finalMask.length; p++) {
    const val = finalMask[p];
    const i = p * 4;
    out.data[i] = val;
    out.data[i + 1] = val;
    out.data[i + 2] = val;
    out.data[i + 3] = 255;
  }
  return out;
}
