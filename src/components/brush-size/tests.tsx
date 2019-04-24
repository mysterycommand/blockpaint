
import React from 'react';
import ReactDOM from 'react-dom';

import BrushSize from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrushSize />, div);
  ReactDOM.unmountComponentAtNode(div);
});

