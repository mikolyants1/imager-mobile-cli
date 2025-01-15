import { useEditParams } from '@/store/canvas/edit/useEditParams';
import { MutableRefObject, useEffect } from 'react';

interface IArgs {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
}

export const useParamsEffect = ({ canvasRef }: IArgs) => {
  const { params } = useEditParams();

  useEffect(() => {
    if (canvasRef.current) {
      requestAnimationFrame(() => {
        canvasRef.current.style.filter = `
          brightness(${params.brightness}%)
          contrast(${params.contrast}%)
          saturate(${params.saturation}%)
        `;
      });
    }
  }, [params]);
};
