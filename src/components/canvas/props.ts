import { RefObject } from 'react';
import { ToolType } from '../tools';

export type CanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  fetchPainting: () => Promise<string>;
  currentTool: ToolType;
};
