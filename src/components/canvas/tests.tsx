import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockCanvasRef = React.createRef<HTMLCanvasElement>();

  ReactDOM.render(<Canvas canvasRef={mockCanvasRef} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
