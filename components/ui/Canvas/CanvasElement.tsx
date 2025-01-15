import { ForwardedRef, useRef, forwardRef, memo } from 'react';
import { View, StyleSheet, PanResponder, PanResponderGestureState, Dimensions, GestureResponderEvent } from 'react-native';
import Canvas , { CanvasRenderingContext2D } from 'react-native-canvas';
import { useHistory } from '../../../components/store/canvas/history/useHistory';
import { useFile } from '../../../components/store/file/useFile';
import { useZoom } from '../../../components/store/canvas/zoom/useZoom';

import { RetoucheCanvas } from '../../utils/RetoucheCanvas';
import { FRAME_TIME } from '../../consts/time';


interface CanvasProps {
  context: CanvasRenderingContext2D;
  imageLoaded: boolean;
  params: ImageParams;
  setIsDrawing: (value: boolean) => void;
  isDrawing: boolean;
}

interface PanState {
  isZoom: boolean;
  scale: number;
  origin: Point;
}

export const CanvasElement = memo(
  forwardRef(({ context, imageLoaded, params, setIsDrawing, isDrawing }: CanvasProps, ref: ForwardedRef<Canvas>) => {
    const { setToHistory } = useHistory();
    const { setFileData } = useFile();
    const { scale, origin, setOrigin, setScale } = useZoom();
    const canvasRef = useRef<any>(null);
    const startApplauchRef = useRef<number>(0);
    const startInterpalateRef = useRef<number>(0);
    const lastPos = useRef<Point>({ x: 0, y: 0 });

    const handleGrant = (e: GestureResponderEvent) => {
      const { locationX: x, locationY: y } = e.nativeEvent;
      const zoomState = useZoom.getState() as PanState;
      if (zoomState.isZoom) return;

      setIsDrawing(true);
      lastPos.current = { x, y };
      applyRetouch({ x, y });
    };

    const applyRetouch = (point: Point) => {
      if (!canvasRef.current) return;

      requestAnimationFrame((timestamp: number) => {
        if (timestamp - startApplauchRef.current > FRAME_TIME) {
          startApplauchRef.current = timestamp;
          RetoucheCanvas.applyRetouch({
            x: point.x,
            y: point.y,
            context,
            imageLoaded,
            params,
            canvas: canvasRef.current!,
            setToHistory,
          });
        }
      });
    };

    const handleMove = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const zoomState = useZoom.getState() as PanState;
      if (zoomState.isZoom || !isDrawing) return;

      const x = gestureState.moveX;
      const y = gestureState.moveY;

      requestAnimationFrame((timestamp: number) => {
        if (timestamp - startInterpalateRef.current > FRAME_TIME) {
          startInterpalateRef.current = timestamp;
          interpolatePoints(lastPos.current, { x, y });
        }
      });
      lastPos.current = { x, y };
    };

    const interpolatePoints = (start: Point, end: Point) => {
      if (!canvasRef.current) return;

      RetoucheCanvas.interpolatePoints({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        context,
        imageLoaded,
        params,
        canvas: canvasRef.current,
        setToHistory,
      });
    };

    const handleRelease = () => {
      const zoomState = useZoom.getState() as PanState;
      if (zoomState.isZoom) return;

      setIsDrawing(false);
      if (canvasRef.current) {
        const base64 = canvasRef.current.toDataURL();
        setFileData('image', base64);
      }
    };

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: handleGrant,
      onPanResponderMove: handleMove,
      onPanResponderRelease: handleRelease,
    });

    const handlePinch = (e: { nativeEvent: { scale: number; locationX: number; locationY: number } }) => {
      const zoomState = useZoom.getState() as PanState;
      if (!zoomState.isZoom) return;

      const { scale: pinchScale, locationX: x, locationY: y } = e.nativeEvent;
      const newScale = Math.max(0.1, Math.min(5, scale * pinchScale));
      if (newScale < 1) return;

      const scaleRatio = 1 - newScale / scale;
      setOrigin({
        x: origin.x + (x - origin.x) * scaleRatio,
        y: origin.y + (y - origin.y) * scaleRatio,
      });
      setScale(newScale);
    };

    return (
      <View style={styles.container}>
        <Canvas
          ref={canvasRef}
          style={styles.canvas}
          {...panResponder.panHandlers}
         
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({

})