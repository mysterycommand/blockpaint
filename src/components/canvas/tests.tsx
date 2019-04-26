import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockCanvasRef = React.createRef<HTMLCanvasElement>();
  const mockFetch = () => Promise.resolve(JSON.stringify({}));

  ReactDOM.render(
    <Canvas canvasRef={mockCanvasRef} fetchPainting={mockFetch} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
