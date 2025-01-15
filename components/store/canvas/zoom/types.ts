export interface IZoomOrigin {
  x: number;
  y: number;
}

export interface IZoomStore {
  scale: number;
  origin: IZoomOrigin;
  isZoom: boolean;
  setScale: (scale: number) => void;
  setOrigin: (zoom: IZoomOrigin) => void;
  setIsZoom: (zoom: boolean) => void;
  reset: () => void;
}
