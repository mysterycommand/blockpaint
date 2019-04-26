
import React from 'react';
import ReactDOM from 'react-dom';

import BackgroundColor from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BackgroundColor />, div);
  ReactDOM.unmountComponentAtNode(div);
});

