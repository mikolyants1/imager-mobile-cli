export interface ImageParams {
  brightness: number;
  saturation: number;
  contrast: number;
}

export interface ISliderData {
  prop: keyof ImageParams;
  value: number;
  title: string;
}
