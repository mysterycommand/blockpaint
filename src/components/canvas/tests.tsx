import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { Person } from 'blockstack';

import Canvas from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockPerson = new Person({ name: 'John Doe' });
  const mockSignOut = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  ReactDOM.render(<Canvas person={mockPerson} signOut={mockSignOut} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
