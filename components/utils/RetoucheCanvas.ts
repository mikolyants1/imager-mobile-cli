import { IRGB } from '@/types/util';
import { TImageParams } from '@/types/global';
import { MutableRefObject } from 'react';

interface IApplauch {
  x: number;
  y: number;
  context: CanvasRenderingContext2D;
  imageLoaded: boolean;
  params: TImageParams<'retouche'>;
  setToHistory?: (url: string) => void;
  canvas: HTMLCanvasElement;
}

interface Interplate extends Omit<IApplauch, 'x' | 'y'> {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  setToHistory?: (url: string) => void;
  canvas: HTMLCanvasElement;
}

export class RetoucheCanvas {
  static getLuminance(r: number, g: number, b: number) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  static getGaussianWeight(x: number, y: number, sigma: number) {
    return Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
  }

  static preserveTexture(
    params: TImageParams<'retouche'>,
    blurred: IRGB,
    amount: number,
    luminanceDiff: number,
  ) {
    const textureStrength = Math.abs(luminanceDiff) / 255;
    const adaptiveAmount = amount * (1 - textureStrength * params.smoothness);

    return {
      r: blurred.r + luminanceDiff * (1 - adaptiveAmount),
      g: blurred.g + luminanceDiff * (1 - adaptiveAmount),
      b: blurred.b + luminanceDiff * (1 - adaptiveAmount),
    };
  }

  static edgePreservation(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
    const colorDiff = Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
    return colorDiff < 50;
  }
  static applyRetouch({ x, y, context, imageLoaded, params, canvas, setToHistory }: IApplauch) {
    if (!context || !imageLoaded) return;

    const radius = params.brushSize;
    const buffer = Math.ceil(radius * 0.5);
    const diameter = radius * 2;

    const imageData = context.getImageData(
      Math.max(0, x - radius - buffer),
      Math.max(0, y - radius - buffer),
      diameter + buffer * 2,
      diameter + buffer * 2,
    );

    const pixels = imageData.data;
    const width = imageData.width;
    const originalPixels = new Uint8ClampedArray(pixels);

    const sigma = radius * 0.3;
    const kernelSize = Math.ceil(sigma * 3);

    // Новый механизм определения краев

    for (let py = buffer; py < diameter + buffer; py++) {
      for (let px = buffer; px < diameter + buffer; px++) {
        const idx = (py * width + px) * 4;
        const dx = px - (radius + buffer);
        const dy = py - (radius + buffer);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius) {
          const falloff = Math.pow(1 - distance / radius, 2);
          const factor = falloff * params.intensity;

          let sumR = 0,
            sumG = 0,
            sumB = 0;
          let weightSum = 0;
          let edgePixelsCount = 0;
          for (let ky = -kernelSize; ky <= kernelSize; ky++) {
            for (let kx = -kernelSize; kx <= kernelSize; kx++) {
              const nidx = ((py + ky) * width + (px + kx)) * 4;
              if (nidx >= 0 && nidx < pixels.length) {
                const weight = this.getGaussianWeight(kx, ky, sigma);
                const currentR = originalPixels[nidx];
                const currentG = originalPixels[nidx + 1];
                const currentB = originalPixels[nidx + 2];
                const centralR = originalPixels[idx];
                const centralG = originalPixels[idx + 1];
                const centralB = originalPixels[idx + 2];

                if (
                  this.edgePreservation(currentR, currentG, currentB, centralR, centralG, centralB)
                ) {
                  sumR += currentR * weight;
                  sumG += currentG * weight;
                  sumB += currentB * weight;
                  weightSum += weight;
                  edgePixelsCount++;
                }
              }
            }
          }
          const blurred =
            edgePixelsCount > 0
              ? {
                  r: sumR / weightSum,
                  g: sumG / weightSum,
                  b: sumB / weightSum,
                }
              : { r: pixels[idx], g: pixels[idx + 1], b: pixels[idx + 2] };

          const original = {
            r: originalPixels[idx],
            g: originalPixels[idx + 1],
            b: originalPixels[idx + 2],
          };

          const luminanceDiff =
            this.getLuminance(original.r, original.g, original.b) -
            this.getLuminance(blurred.r, blurred.g, blurred.b);

          const result = this.preserveTexture(params, blurred, factor, luminanceDiff);

          pixels[idx] = result.r;
          pixels[idx + 1] = result.g;
          pixels[idx + 2] = result.b;
        }
      }
    }

    context.putImageData(
      imageData,
      Math.max(0, x - radius - buffer),
      Math.max(0, y - radius - buffer),
    );
    if (setToHistory) {
      const url = canvas.toDataURL();
      setToHistory(url);
    }
  }

  static interpolatePoints({
    context,
    imageLoaded,
    params,
    x1,
    x2,
    y1,
    y2,
    canvas,
    setToHistory,
  }: Interplate) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.floor(distance / (params.brushSize * 0.3)), 1);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + dx * t;
      const y = y1 + dy * t;
      this.applyRetouch({
        x,
        y,
        context,
        imageLoaded,
        params,
        canvas,
        setToHistory,
      });
    }
  }

  static getCanvasCoordinates(
    clientX: number,
    clientY: number,
    canvasRef: MutableRefObject<HTMLCanvasElement>,
  ) {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }
}
