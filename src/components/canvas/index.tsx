import React, { FC } from 'react';

import './style.css';

type CanvasProps = {};

const Canvas: FC<CanvasProps> = () => (
  <canvas className="canvas" width="1080" height="1080" />
);

export default Canvas;
