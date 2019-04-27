
import React from 'react';
import ReactDOM from 'react-dom';

import Loader from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loader />, div);
  ReactDOM.unmountComponentAtNode(div);
});

