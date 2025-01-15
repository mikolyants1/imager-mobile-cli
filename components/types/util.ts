import { IFileStore, ImageSize, TFileKey } from '../store/file/types';
import { MutableRefObject } from 'react';
import { TPage } from './global';
import { IZoomOrigin } from '../store/canvas/zoom/types';
import Canvas, { Image } from 'react-native-canvas';

export interface IFileOnChangeArgs {
  setFileData: <T extends TFileKey>(key: T, value: IFileStore[T]) => void;
}

export interface IEditLoadArgs {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  imageRef: MutableRefObject<HTMLImageElement>;
  contextRef: MutableRefObject<CanvasRenderingContext2D>;
}

export interface IHealAreaArgs {
  centerX: number;
  centerY: number;
  sampleRadius: number;
  brushSize: number;
  contextRef: MutableRefObject<CanvasRenderingContext2D>;
  tempCanvasRef: MutableRefObject<HTMLCanvasElement>;
}
export interface IRemCircleArgs extends IHealAreaArgs {
  preserveDetails: number;
  blendStrength: number;
}

export interface IEditUploadArgs extends IFileOnChangeArgs {
  context: CanvasRenderingContext2D;
  resetParams: () => void;
  canvasRef: MutableRefObject<Canvas>;
  clearHistory?: () => void;
  setToHistory?: (url: string) => void;
  page: TPage;
}

export interface IRGB {
  r: number;
  g: number;
  b: number;
}

export interface ICreateImageArgs extends IFileOnChangeArgs {
  url: string;
  canvas: Canvas;
  context: CanvasRenderingContext2D;
}

export interface IAddImageToCanvas extends Omit<IEditUploadArgs, 'resetParams' | 'canvasRef'> {
  image: Image;
  fileName: string;
  size: ImageSize;
  canvas: Canvas;
  originalEditImage: HTMLImageElement | null;
  page: TPage;
}

export interface IZoomCanvasArgs {
  canvasRef: MutableRefObject<Canvas>;
  context: CanvasRenderingContext2D;
  image?: Image;
  origin: IZoomOrigin;
  scale: number;
}
