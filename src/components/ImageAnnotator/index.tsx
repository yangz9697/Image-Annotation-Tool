import { FC, useRef, useState } from 'react';
import ImageContainer from './ImageContainer';
import ToolBar from './ToolBar';
import { ToolType } from '../../types';
import { AnnotatorRef } from './ImageContainer/AnnotationLayer';

const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

const ImageAnnotator: FC<{ imgUrl: string }> = ({ imgUrl }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const annotatorRef = useRef<AnnotatorRef>(null);

  const handleOperation = (type: ToolType) => {
    switch (type) {
      case ToolType.CLEAR:
        annotatorRef.current?.clear();
        break;
      case ToolType.ROTATE_CLOCKWISE:
        setRotationAngle((prev) => prev + 90);
        break;
      case ToolType.ROTATE_COUNTER_CLOCKWISE:
        setRotationAngle((prev) => prev - 90);
        break;
      case ToolType.LOAD_RANDOM_BOXES:
        annotatorRef.current?.loadBoxes();
        break;
      case ToolType.DRAW_FIXED_BOX:
        annotatorRef.current?.drawRandomBox();
        break;
      case ToolType.UNDO:
        annotatorRef.current?.undo();
        break;
      default:
        break;
    }
  };
  return (
    <>
      <ImageContainer
        rotationAngle={rotationAngle}
        imgUrl={imgUrl}
        annotatorRef={annotatorRef}
        maxWidth={MAX_WIDTH}
        maxHeight={MAX_HEIGHT}
      />
      <ToolBar handleOperation={handleOperation} />
    </>
  );
};
export default ImageAnnotator;
