import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { Person } from 'blockstack';

import Workspace from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockPerson = new Person({ name: 'John Doe' });
  const mockHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  ReactDOM.render(
    <Workspace
      person={mockPerson}
      signOut={mockHandler}
      savePainting={mockHandler}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
