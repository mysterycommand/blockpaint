import { MouseEvent, TouchEvent, useState } from 'react';

import { CanvasProps } from './props';
import {
  CanvasContext,
  CanvasRect,
  useCanvasContext,
  useCanvasRect,
  useFetchedPainting,
  useCurrentTool,
} from './effects';

export function useCanvasState({
  canvasRef,
  fetchPainting,
  currentTool,
}: CanvasProps) {
  const [canvasContext, setCanvasContext] = useState<CanvasContext>(null);
  const [canvasRect, setCanvasRect] = useState<CanvasRect>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [prevX, setPrevX] = useState(-1);
  const [prevY, setPrevY] = useState(-1);

  useCanvasContext({ setCanvasContext, canvasRef });
  useCanvasRect({ setCanvasRect, canvasRef });
  useFetchedPainting({ canvasRef, canvasContext, fetchPainting });
  useCurrentTool({ currentTool, canvasContext });

  function handleMouse(event: MouseEvent<HTMLCanvasElement>) {
    event.preventDefault();
    setIsPainting(event.buttons !== 0);
    setPrevX(-1);
    setPrevY(-1);
  }

  function mousePaint(event: MouseEvent<HTMLCanvasElement>) {
    event.preventDefault();
    paint(event.clientX, event.clientY);
  }

  function handleTouch(event: TouchEvent<HTMLCanvasElement>) {
    // event.preventDefault();
    setIsPainting(event.touches.length !== 0);
    setPrevX(-1);
    setPrevY(-1);
  }

  function touchPaint(event: TouchEvent<HTMLCanvasElement>) {
    // event.preventDefault();
    const touches = Array.from(event.touches);

    // handle multiple touches by averaging them, will sort of draw "in the
    // middle" of all the touches
    const { clientX, clientY } = touches.reduce(
      (acc, touch) => ({
        clientX: acc.clientX + touch.clientX,
        clientY: acc.clientY + touch.clientY,
      }),
      {
        clientX: 0,
        clientY: 0,
      },
    );

    paint(clientX / touches.length, clientY / touches.length);
  }

  function paint(clientX: number, clientY: number) {
    if (
      !(
        isPainting &&
        canvasRef &&
        canvasRef.current &&
        canvasContext &&
        canvasRect
      )
    ) {
      return;
    }

    const { x, y, width, height } = canvasRect as DOMRect;
    const fillX = (clientX - x) * (canvasRef.current.width / width);
    const fillY = (clientY - y) * (canvasRef.current.height / height);

    if (prevX === -1 && prevY === -1) {
      canvasContext.beginPath();
    } else {
      canvasContext.moveTo(prevX, prevY);
      canvasContext.lineTo(fillX, fillY);
      canvasContext.stroke();
    }

    setPrevX(fillX);
    setPrevY(fillY);
  }

  return {
    // mouse event handlers
    onMouseEnter: handleMouse,
    onMouseDown: handleMouse,
    onMouseMove: mousePaint,
    onMouseUp: handleMouse,
    onMouseLeave: handleMouse,
    // touch event handlers
    onTouchStart: handleTouch,
    onTouchMove: touchPaint,
    onTouchEnd: handleTouch,
  };
}
