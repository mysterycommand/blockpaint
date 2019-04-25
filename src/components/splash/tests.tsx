import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';

import Splash from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockSignIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  ReactDOM.render(<Splash signIn={mockSignIn} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
