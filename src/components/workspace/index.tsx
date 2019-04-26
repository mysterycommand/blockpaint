import React, { FC, MouseEvent, RefObject } from 'react';
import { Person } from 'blockstack';

import Canvas from '../canvas';

import './style.css';
import Button from '../button';

type WorkspaceProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  fetchPainting: () => Promise<string | ArrayBuffer>;
  person: Person;
  savePainting: (event: MouseEvent<HTMLButtonElement>) => void;
  signOut: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Workspace: FC<WorkspaceProps> = ({
  canvasRef,
  fetchPainting,
  person,
  savePainting,
  signOut,
}) => (
  <div className="workspace">
    <header className="header">
      <h2 className="current-user">
        Signed in as {person.name() || 'nameless person'}
      </h2>
      <Button onClick={signOut}>Sign out</Button>
    </header>
    <Canvas canvasRef={canvasRef} fetchPainting={fetchPainting} />
    <footer className="footer">
      <i />
      <Button onClick={savePainting}>Save</Button>
    </footer>
  </div>
);

export default Workspace;
