
import React from 'react';
import ReactDOM from 'react-dom';

import Splash from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Splash />, div);
  ReactDOM.unmountComponentAtNode(div);
});

