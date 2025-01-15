export interface ImageSize {
  width: number;
  height: number;
}

export type TFileKey = keyof IFileStore;

export interface IFileStore {
  file: File | null;
  fileName: string;
  size: ImageSize;
  src: string;
  image: HTMLImageElement | null;
  imageData: ImageData | null;
  originalEditImage: HTMLImageElement | null;
  originalRetoucheImage: HTMLImageElement | null;
  downloadUrl: string;
  imageLoaded: boolean;
  setFileData: <T extends TFileKey>(key: T, value: IFileStore[T]) => void;
  clearFile: () => void;
}
