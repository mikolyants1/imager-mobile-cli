import { create } from 'zustand';
import { IEditParamsStore } from './types';
import { ImageParams } from '../../../data/sliders/edit/types';

export const useEditParams = create<IEditParamsStore>()((set, get) => ({
  params: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
  },
  setParamsData: (key, value) => {
    const params = get().params;
    const newParams: ImageParams = { ...params, [key]: value };
    set({ params: newParams });
  },
  resetParams: () => {
    set({
      params: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
      },
    });
  },
}));
