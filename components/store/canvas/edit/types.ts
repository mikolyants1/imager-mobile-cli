import { ImageParams } from '@/components/data/sliders/edit/types';

export interface IEditParamsStore {
  params: ImageParams;
  setParamsData: <T extends keyof ImageParams>(key: T, value: ImageParams[T]) => void;
  resetParams: () => void;
}
