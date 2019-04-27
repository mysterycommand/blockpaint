import React, { FC } from 'react';
import './style.css';
import Paint from '../icons/paint';
import Erase from '../icons/erase';

export enum ToolType {
  Paint = 'paint',
  Erase = 'erase',
}

type ToolsProps = {
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
};

const Tools: FC<ToolsProps> = ({ currentTool, setCurrentTool }) => (
  <ul className="tools">
    <li>
      <input
        type="radio"
        id="paint"
        name="tools"
        checked={currentTool === ToolType.Paint}
        onChange={() => setCurrentTool(ToolType.Paint)}
      />
      <label htmlFor="paint">
        <Paint />
      </label>
    </li>
    <li>
      <input
        type="radio"
        id="erase"
        name="tools"
        checked={currentTool === ToolType.Erase}
        onChange={() => setCurrentTool(ToolType.Erase)}
      />
      <label htmlFor="erase">
        <Erase />
      </label>
    </li>
  </ul>
);

export default Tools;
