/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent } from 'react';
import { IAddImageToCanvas, IEditUploadArgs, IFileOnChangeArgs } from '../types/util';
import Canvas, {Image} from 'react-native-canvas';

export class UtilFile {
  static handleImageUpload({
    setFileData,
    clearHistory,
    setToHistory,
    resetParams,
    context,
    canvasRef,
    page,
  }: IEditUploadArgs) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.[0]) return;
      const file = event.target.files[0];
      const img = new Image();
      img.onload = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !context) return;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (height > maxHeight) {
          const ratio = maxHeight / height;
          width *= ratio;
          height = maxHeight;
        }
        canvas.width = width;
        canvas.height = height;
        context.drawImage({} as any, 0, 0, width, height);
        const url = await canvas.toDataURL();
        clearHistory && clearHistory();
        setToHistory && setToHistory(url);
        resetParams();
        setFileData('file', file);
        setFileData('fileName', file.name || '');
        setFileData('image', img);
        setFileData('size', { height, width });
        setFileData('src', url);
        setFileData('imageLoaded', true);
        setFileData(page === 'edit' ? 'originalEditImage' : 'originalRetoucheImage', img);
      };
      img.src = URL.createObjectURL(file);
    };
  }

  static async addImageToCanvas({
    setFileData,
    setToHistory,
    originalEditImage,
    context,
    canvas,
    image,
    size,
    page,
  }: IAddImageToCanvas) {
    if (!canvas || !context) return;
    canvas.width = size.width;
    canvas.height = size.height;
    const url = await canvas.toDataURL();
    context.drawImage(image, 0, 0, size.width, size.height);
    setToHistory && setToHistory(url);
    setFileData('imageLoaded', true);
    if (page === 'retouche') {
      setFileData('image', originalEditImage);
    }
    if (page === 'edit') {
      setFileData('originalEditImage', image);
    }
  }

  static getImageDimensionsFromBlob(uri: string): Promise<{
    width: number;
    height: number;
    img: Image;
  }> {
    return new Promise(resolve => {
      const img = new Image;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        resolve({ width, height, img });
      };

      img.setState({}).src = {uri};
    });
  }

  static async createUrlFromBase64(url: string, format: string) {
    if (format === 'jpg') format = 'jpeg';
    try {
      const data = await fetch(url);
      const byteArray = await data.arrayBuffer();
      const blob = new Blob([byteArray], { type: `image/${format}` });
      return URL.createObjectURL(blob);
    } catch {
      return '';
    }
  }

  static async getUrlFromCanvas(url: string): Promise<Image> {
    return new Promise(res => {
      const image = new Canvas();
      const im = image.cre
      image.src = url;
      image.onload = () => res(image);
    });
  }
  static delay(delay: number) {
    return new Promise(res => {
      setTimeout(res, delay);
    });
  }
}
