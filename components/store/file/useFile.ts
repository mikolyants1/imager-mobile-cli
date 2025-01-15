import { create } from 'zustand';
import { IFileStore } from './types';

export const useFile = create<IFileStore>()(set => ({
  imageLoaded: false,
  file: null,
  fileName: '',
  image: null,
  originalEditImage: null,
  originalRetoucheImage: null,
  imageData: null,
  downloadUrl: '',
  src: '',
  size: {
    width: 0,
    height: 0,
  },
  setFileData: (key, value) => {
    set({ [key]: value });
  },
  clearFile: () => {
    set({
      file: null,
      fileName: '',
      image: null,
      originalEditImage: null,
      originalRetoucheImage: null,
      size: {
        width: 0,
        height: 0,
      },
      src: '',
    });
  },
}));
