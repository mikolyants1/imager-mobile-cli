import { useZoom } from '@/store/canvas/zoom/useZoom';
import { useFile } from '@/store/file/useFile';
import { MutableRefObject, useEffect } from 'react';

interface IArgs {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
}

export const useZoomEffect = ({ canvasRef, context }: IArgs) => {
  const { scale, origin, isZoom } = useZoom();
  const { image } = useFile();

  useEffect(() => {
    if (canvasRef.current && context && image) {
      requestAnimationFrame(() => {
        canvasRef.current.style.transform = `translate(${origin.x}px, ${origin.y}px) scale(${scale})`;
        canvasRef.current.style.transformOrigin = '0 0';
      });
    }
  }, [scale, origin, image, context]);

  useEffect(() => {
    document.body.style.overflowY = isZoom ? 'hidden' : 'initial';
  }, [isZoom]);
};
