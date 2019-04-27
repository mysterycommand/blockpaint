
import React from 'react';
import ReactDOM from 'react-dom';

import Erase from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Erase />, div);
  ReactDOM.unmountComponentAtNode(div);
});

