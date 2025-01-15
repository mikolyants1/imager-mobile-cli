import { MouseEvent, TouchEvent } from 'react';
import { TImageParams } from './global';
import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';

export interface ICanvasHistory {
  url: string;
}

export type TCanvasEvent = MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>;

export interface IApplauch {
  x: number;
  y: number;
  context: CanvasRenderingContext2D;
  imageLoaded: boolean;
  params: TImageParams<'retouche'>;
  setToHistory?: (url: string) => void;
  canvas: Canvas;
}

export interface Interplate extends Omit<IApplauch, 'x' | 'y'> {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  setToHistory?: (url: string) => void;
  canvas: Canvas;
}
