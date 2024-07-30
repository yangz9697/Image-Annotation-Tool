import { FC } from 'react';
import { ToolType } from '../../../types';
import './index.scss';

const ToolBar: FC<{ handleOperation: (type: ToolType) => void }> = ({
  handleOperation,
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={() => handleOperation(ToolType.UNDO)}>Undo</button>
      <button onClick={() => handleOperation(ToolType.CLEAR)}>Clear</button>
      <button onClick={() => handleOperation(ToolType.ROTATE_CLOCKWISE)}>
        Rotate +90
      </button>
      <button
        onClick={() => handleOperation(ToolType.ROTATE_COUNTER_CLOCKWISE)}
      >
        Rotate -90
      </button>
      {/* <button onClick={() => handleOperation(ToolType.DRAW_FIXED_BOX)}>
        Draw Fixed Box
      </button> */}
      <button onClick={() => handleOperation(ToolType.LOAD_RANDOM_BOXES)}>
        Load Boxes
      </button>
    </div>
  );
};
export default ToolBar;
