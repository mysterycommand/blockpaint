
import React from 'react';
import ReactDOM from 'react-dom';

import BrushColor from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrushColor />, div);
  ReactDOM.unmountComponentAtNode(div);
});

