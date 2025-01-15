import { useBrowser } from '@/store/browser/useBrowser';
import { useHistory } from '@/store/canvas/history/useHistory';
import { useFile } from '@/store/file/useFile';
import { TPage, TSetState } from '@/types/global';
import { UtilFile } from '@/utils/UtilFile';
import { MutableRefObject, useEffect, useState } from 'react';

interface IArgs {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  setContext: TSetState<CanvasRenderingContext2D>;
  page: TPage;
}

export const useCanvasEffect = ({ canvasRef, setContext, page }: IArgs) => {
  const { setToHistory } = useHistory();
  const { image, fileName, size, originalEditImage, setFileData } = useFile();

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d', { willReadFrequently: true })!;
      let initImage: HTMLImageElement | null = null;
      if (page === 'edit') initImage = image;
      if (page === 'retouche') initImage = originalEditImage;
      if (initImage) {
        setFileData('imageLoaded', false);
        UtilFile.addImageToCanvas({
          context,
          fileName,
          image: initImage,
          originalEditImage,
          setToHistory,
          setFileData,
          canvas: canvasRef.current,
          size,
          page,
        });
      }
      setContext(context);
    }
  }, []);
};
