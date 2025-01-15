import { MutableRefObject } from 'react';
import Canvas, { CanvasRenderingContext2D, Image } from 'react-native-canvas';

export interface IMutableSize {
  height: number;
  width: number;
}

export type TCanvasRef = MutableRefObject<Canvas>;

export interface IFOrwardHistoryArgs {
  canvasRef: TCanvasRef;
  ctx: CanvasRenderingContext2D;
  original: Image | null;
}
export interface IHistoryStore {
  history: string[];
  initHistory: (history: string[]) => void;
  setToHistory: (url: string) => void;
  clearHistory: () => void;
  reset: (args: IFOrwardHistoryArgs) => void;
  forward: (args: IFOrwardHistoryArgs) => void;
}
export interface ICacheHistoryStore {
  cache_history: string[];
  setToCacheHistory: (urls: string[]) => void;
  clearCacheHistory: () => void;
}
export interface ICanvasStore {
  context: CanvasRenderingContext2D | null;
  canvas: Canvas | null;
  originalImage: Image | null;
  setCanvasData: (key: keyof ICanvasStore, value: ICanvasStore[keyof ICanvasStore]) => void;
}
