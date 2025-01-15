import { create } from 'zustand';
import { IFOrwardHistoryArgs, IHistoryStore } from './types';
import { Image } from 'react-native-canvas';

export const useHistory = create<IHistoryStore>()((set, get) => ({
  history: [],
  clearHistory: () => {
    set({ history: [] });
  },
  initHistory: (history: string[]) => {
    set({ history });
  },
  forward: ({ canvasRef, ctx, original }: IFOrwardHistoryArgs) => {
    if (!ctx || !canvasRef.current) return;
    const history = get().history;
    if (history.length > 3) {
      const newImageData = history.slice(history.length - 3, history.length)[0];
      const image = new Image();
      image.onload = () => {
        const r = {} as Image
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        ctx.drawImage(r, 0, 0, width, height);
        const newHistory = history.slice(0, history.length - 3);
        set({ history: newHistory });
      };
      image.src = newImageData;
    } else {
      if (!original) return;
      ctx.drawImage(original, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  },
  setToHistory: (url: string) => {
    const history = get().history;
    set({ history: [...history, url] });
  },
  reset: ({ canvasRef, ctx, original }: IFOrwardHistoryArgs) => {
    if (original && ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(original, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  },
}));
