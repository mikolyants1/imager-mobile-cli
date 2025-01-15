import { FRAME_TIME } from '@/consts/time';
import { useRef } from 'react';

export const useAnimateFrame = (func: () => any) => {
  const debounceRef = useRef<number>(0);

  const animate = () => {
    requestAnimationFrame((timestamp: number) => {
      if (timestamp - debounceRef.current > FRAME_TIME) {
        debounceRef.current = timestamp;
        func();
      }
    });
  };

  return { animate };
};
