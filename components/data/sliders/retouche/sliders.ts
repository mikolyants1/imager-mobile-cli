import { TImageParams, ISliderData } from '@/types/global';

export const createSliders = (params: TImageParams<'retouche'>): ISliderData<'retouche'>[] => {
  return [
    {
      split: 1,
      prop: 'brushSize',
      title: `Размер кисти: ${params.brushSize}px`,
      value: params.brushSize,
      min: 5,
      max: 100,
    },
    {
      split: 100,
      prop: 'intensity',
      title: `Интенсивность: ${(params.intensity * 100).toFixed(0)}%`,
      value: params.intensity * 100,
      min: 5,
      max: 100,
    },
    {
      split: 100,
      prop: 'smoothness',
      title: `Сглаживание: ${(params.smoothness * 100).toFixed(0)}%`,
      value: params.smoothness * 100,
      min: 5,
      max: 100,
    },
  ];
};