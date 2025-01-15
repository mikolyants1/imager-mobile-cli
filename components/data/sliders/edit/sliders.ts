import { ImageParams, ISliderData } from './types';

export const createSliders = (params: ImageParams): ISliderData[] => {
  return [
    {
      prop: 'brightness',
      title: `Яркость ${params.brightness.toFixed(0)}%`,
      value: params.brightness,
    },
    {
      prop: 'saturation',
      title: `Насыщеность ${params.saturation.toFixed(0)}%`,
      value: params.saturation,
    },
    {
      prop: 'contrast',
      title: `Контраст ${params.contrast.toFixed(0)}%`,
      value: params.contrast,
    },
  ];
};
