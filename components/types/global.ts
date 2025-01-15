import { Dispatch, SetStateAction } from 'react';

export type TSetState<T> = Dispatch<SetStateAction<T>>;

export type TPage = 'retouche' | 'edit';

export type TStoreFunc = <T extends keyof K, K>(key: T, value: K[T]) => void;

export type TButtons = 'download' | 'reset' | 'forward';

export type TImageParams<T extends TPage> = T extends 'retouche'
  ? {
      brushSize: number;
      intensity: number;
      smoothness: number;
    }
  : {
      brightness: number;
      saturation: number;
      contrast: number;
    };

export interface ISliderData<T extends TPage> {
  prop: keyof TImageParams<T>;
  value: number;
  split?: number;
  title: string;
  min?: number;
  max?: number;
}
