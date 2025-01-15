import { create } from 'zustand';
import { IZoomOrigin, IZoomStore } from './types';

export const useZoom = create<IZoomStore>()(set => ({
  scale: 1,
  origin: {
    x: 0,
    y: 0,
  },
  isZoom: false,
  setIsZoom: (isZoom: boolean) => {
    set({ isZoom });
  },
  setScale: (scale: number) => {
    set({ scale });
  },
  setOrigin: (origin: IZoomOrigin) => {
    set({ origin });
  },
  reset: () => {
    set({
      origin: { x: 0, y: 0 },
      scale: 1,
    });
  },
}));
