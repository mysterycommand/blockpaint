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
    <header className="header">
      <h2 className="current-user">
        Signed in as {person.name() || 'nameless person'}
      </h2>
      <Button onClick={signOut}>Sign out</Button>
    </header>
    <Canvas />
  </div>
);

export default Workspace;
