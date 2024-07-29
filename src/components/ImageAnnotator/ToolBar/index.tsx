import { FC } from 'react';
import { ToolType } from '../../../types';
import './index.scss';

const ToolBar: FC<{ handleOperation: (type: ToolType) => void }> = ({
  handleOperation,
}) => {
  return (
    <div>
      <button onClick={() => handleOperation(ToolType.UNDO)}>Undo</button>
      <button onClick={() => handleOperation(ToolType.CLEAR)}>Clear</button>
      <button onClick={() => handleOperation(ToolType.ROTATE)}>Rotate</button>
      <button onClick={() => handleOperation(ToolType.DRAW_BOX)}>
        Place a Random Box
      </button>
      <button onClick={() => handleOperation(ToolType.LOAD_BOXES)}>
        Load Boxes
      </button>
    </div>
  );
};
export default ToolBar;
