import React from 'react';

import './style.css';

import { CanvasProps } from './props';
import { useCanvasState } from './state';

export default function Canvas(props: CanvasProps) {
  const eventHandlers = useCanvasState(props);

  return (
    <canvas
      ref={props.canvasRef}
      className="canvas"
      width="1080"
      height="1080"
      {...eventHandlers}
    />
  );
}
