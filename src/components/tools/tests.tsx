import React from 'react';
import ReactDOM from 'react-dom';

import Tools, { ToolType } from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Tools currentTool={ToolType.Paint} setCurrentTool={() => {}} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
