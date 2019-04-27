import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { Person } from 'blockstack';

import Workspace from '.';
import { ToolType } from '../tools';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockCanvasRef = React.createRef<HTMLCanvasElement>();
  const mockFetch = () => Promise.resolve(JSON.stringify({}));
  const mockPerson = new Person({ name: 'John Doe' });
  const mockHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  ReactDOM.render(
    <Workspace
      canvasRef={mockCanvasRef}
      currentTool={ToolType.Paint}
      fetchPainting={mockFetch}
      isFetching={false}
      isSaving={false}
      person={mockPerson}
      savePainting={mockHandler}
      setCurrentTool={() => {}}
      signOut={mockHandler}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
