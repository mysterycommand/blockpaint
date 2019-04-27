import React, { FC, MouseEvent, RefObject } from 'react';
import { Person } from 'blockstack';

import Canvas from '../canvas';

import './style.css';
import Button from '../button';
import Loader from '../loader';

type WorkspaceProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  fetchPainting: () => Promise<string | ArrayBuffer>;
  isFetching: boolean;
  isSaving: boolean;
  person: Person;
  savePainting: (event: MouseEvent<HTMLButtonElement>) => void;
  signOut: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Workspace: FC<WorkspaceProps> = ({
  canvasRef,
  fetchPainting,
  isFetching,
  isSaving,
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
    <div className="stage">
      <Canvas canvasRef={canvasRef} fetchPainting={fetchPainting} />
      {isFetching && (
        <div className="canvas-guard guard">
          <Loader />
        </div>
      )}
    </div>
    <footer className="footer">
      <i />
      {isSaving ? (
        <div className="button-guard guard">
          <Loader />
        </div>
      ) : (
        <Button onClick={savePainting}>Save</Button>
      )}
    </footer>
  </div>
);

export default Workspace;
