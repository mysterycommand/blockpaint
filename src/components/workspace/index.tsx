import React, { FC, MouseEvent } from 'react';
import { Person } from 'blockstack';

import Canvas from '../canvas';

import './style.css';

type WorkspaceProps = {
  person: Person;
  signOut: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Workspace: FC<WorkspaceProps> = ({ person, signOut }) => (
  <div className="workspace">
    <Canvas person={person} signOut={signOut} />
  </div>
);

export default Workspace;
