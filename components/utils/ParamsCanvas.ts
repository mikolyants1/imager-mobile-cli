import { ImageParams } from '@/components/data/sliders/edit/types';

interface IParamsArgs {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  originalImage: HTMLImageElement;
  params: ImageParams;
}

export class ParamsCanvas {
  static paramsHandler({ canvas, context, originalImage, params }: IParamsArgs) {
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.filter = `
          brightness(${params.brightness}%)
          contrast(${params.contrast}%)
          saturate(${params.saturation}%)
          `;
    context.drawImage(originalImage, 0, 0, width, height);
  }

  static mobileParamsHandler({ canvas, context, originalImage, params }: IParamsArgs) {
    const width = canvas.width;
    const height = canvas.height;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempContext = tempCanvas.getContext('2d');
    if (!tempContext) return;
    tempContext.clearRect(0, 0, width, height);
    tempContext.drawImage(originalImage, 0, 0, width, height);
    const imageData = tempContext.getImageData(0, 0, width, height);
    const data = imageData.data;
    const brightness = params.brightness / 100;
    const contrast = params.contrast / 100;
    const saturation = params.saturation / 100;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] * brightness;
      data[i + 1] = data[i + 1] * brightness;
      data[i + 2] = data[i + 2] * brightness;
      data[i] = ((data[i] / 255 - 0.5) * contrast + 0.5) * 255;
      data[i + 1] = ((data[i + 1] / 255 - 0.5) * contrast + 0.5) * 255;
      data[i + 2] = ((data[i + 2] / 255 - 0.5) * contrast + 0.5) * 255;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray = 0.2989 * r + 0.587 * g + 0.114 * b;

      data[i] = gray + (r - gray) * saturation;
      data[i + 1] = gray + (g - gray) * saturation;
      data[i + 2] = gray + (b - gray) * saturation;
    }
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.min(255, Math.max(0, data[i]));
    }
    context.clearRect(0, 0, width, height);
    context.putImageData(imageData, 0, 0);
  }
}
