import React, { FC, MouseEvent, RefObject } from 'react';
import { Person } from 'blockstack';

import Button from '../button';
import Canvas from '../canvas';
import Loader from '../loader';

import './style.css';
import Tools, { ToolType } from '../tools';

type WorkspaceProps = {
  canvasRef: RefObject<HTMLCanvasElement>;
  currentTool: ToolType;
  fetchPainting: () => Promise<string>;
  isFetching: boolean;
  isSaving: boolean;
  person: Person;
  savePainting: (event: MouseEvent<HTMLButtonElement>) => void;
  setCurrentTool: (tool: ToolType) => void;
  signOut: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Workspace: FC<WorkspaceProps> = ({
  canvasRef,
  currentTool,
  fetchPainting,
  isFetching,
  isSaving,
  person,
  savePainting,
  setCurrentTool,
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
      <Canvas
        canvasRef={canvasRef}
        currentTool={currentTool}
        fetchPainting={fetchPainting}
      />
      {isFetching && (
        <div className="canvas-guard guard">
          <Loader />
        </div>
      )}
    </div>
    <footer className="footer">
      <Tools currentTool={currentTool} setCurrentTool={setCurrentTool} />
      <Button onClick={savePainting} disabled={isSaving}>
        Save
      </Button>
    </footer>
  </div>
);

export default Workspace;
