
import React from 'react';
import ReactDOM from 'react-dom';

import Tools from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tools />, div);
  ReactDOM.unmountComponentAtNode(div);
});

