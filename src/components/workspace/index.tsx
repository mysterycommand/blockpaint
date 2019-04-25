import React, { FC, MouseEvent } from 'react';
import { Person } from 'blockstack';

import Canvas from '../canvas';

import './style.css';
import Button from '../button';

type WorkspaceProps = {
  person: Person;
  signOut: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Workspace: FC<WorkspaceProps> = ({ person, signOut }) => (
  <div className="workspace">
    <p>
      Hello, {person.name() || 'nameless person'}{' '}
      <Button onClick={signOut}>Sign out</Button>
    </p>
    <Canvas />
  </div>
);

export default Workspace;
