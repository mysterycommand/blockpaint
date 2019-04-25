import React, { FC, MouseEvent } from 'react';
import { Person } from 'blockstack';

import './style.css';

type CanvasProps = {
  person: Person;
  signOut: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Canvas: FC<CanvasProps> = ({ person, signOut }) => (
  <div>
    <p>
      Hello, {person.name() || 'nameless person'}{' '}
      <button onClick={signOut}>Sign out</button>
    </p>
    <canvas />
  </div>
);

export default Canvas;
