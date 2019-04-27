import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from '.';
import { ToolType } from '../tools';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockCanvasRef = React.createRef<HTMLCanvasElement>();
  const mockFetch = () => Promise.resolve(JSON.stringify({}));

  ReactDOM.render(
    <Canvas
      canvasRef={mockCanvasRef}
      currentTool={ToolType.Paint}
      fetchPainting={mockFetch}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
