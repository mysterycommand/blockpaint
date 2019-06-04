import {
  Dispatch,
  SetStateAction,
  RefObject,
  useEffect,
  useCallback,
} from 'react';
import { ToolType } from '../tools';

export type CanvasContext = CanvasRenderingContext2D | null;
export type CanvasRect = DOMRect | ClientRect | null;

export function useCanvasContext({
  canvasRef,
  setCanvasContext,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  setCanvasContext: Dispatch<SetStateAction<CanvasContext>>;
}) {
  useEffect(() => {
    if (!(canvasRef && canvasRef.current)) {
      return;
    }

    setCanvasContext(canvasRef.current.getContext('2d'));
  }, [canvasRef, setCanvasContext]);
}

export function useCanvasRect({
  canvasRef,
  setCanvasRect,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  setCanvasRect: Dispatch<SetStateAction<CanvasRect>>;
}) {
  useEffect(() => {
    if (!(canvasRef && canvasRef.current)) {
      return;
    }

    setCanvasRect(canvasRef.current.getBoundingClientRect());
  }, [canvasRef, setCanvasRect]);
}

export function useFetchedPainting({
  canvasRef,
  fetchPainting,
  canvasContext,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  fetchPainting: () => Promise<string>;
  canvasContext: CanvasContext;
}) {
  const memoizedFetchPainting = useCallback(fetchPainting, []);

  useEffect(() => {
    if (!canvasContext) {
      return;
    }

    memoizedFetchPainting().then(file => {
      if (!(canvasRef && canvasRef.current)) {
        return;
      }

      const { data } = JSON.parse(file);
      if (!data) {
        return;
      }

      const img = new Image(canvasRef.current.width, canvasRef.current.height);
      img.src = data;
      img.onload = () => {
        canvasContext.drawImage(img, 0, 0);
      };
    });
  }, [canvasRef, canvasContext, memoizedFetchPainting]);
}

export function useCurrentTool({
  currentTool,
  canvasContext,
}: {
  currentTool: ToolType;
  canvasContext: CanvasContext;
}) {
  useEffect(() => {
    if (!canvasContext) {
      return;
    }

    canvasContext.strokeStyle =
      currentTool === ToolType.Paint ? 'black' : 'white';
    canvasContext.lineWidth = currentTool === ToolType.Paint ? 4 : 24;
    canvasContext.lineCap = 'round';
    canvasContext.lineJoin = 'round';
  }, [canvasContext, currentTool]);
}
