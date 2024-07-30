import { FC, useEffect, useRef, useState } from 'react';
import ImageContainer from './ImageContainer';
import ToolBar from './ToolBar';
import { ToolType } from '../../types';
import { AnnotatorRef } from './ImageContainer/AnnotationLayer';
import { MAX_WIDTH_HEIGHT } from '../../constants';

interface Props {
  imgUrl: string;
}

const ImageAnnotator: FC<Props> = ({ imgUrl }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const annotatorRef = useRef<AnnotatorRef>(null);
  const [scaledW, setScaleW] = useState(0);
  const [scaledH, setScaleH] = useState(0);

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
        annotatorRef.current?.drawFixedBox();
        break;
      case ToolType.UNDO:
        annotatorRef.current?.undo();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      let scale = 1;
      if (img.width >= MAX_WIDTH_HEIGHT || img.height >= MAX_WIDTH_HEIGHT) {
        if (img.height < MAX_WIDTH_HEIGHT) scale = MAX_WIDTH_HEIGHT / img.width;
        else if (img.width < MAX_WIDTH_HEIGHT)
          scale = MAX_WIDTH_HEIGHT / img.height;
        else {
          scale = Math.min(
            MAX_WIDTH_HEIGHT / img.width,
            MAX_WIDTH_HEIGHT / img.height
          );
        }
      } else {
        scale = Math.min(
          MAX_WIDTH_HEIGHT / img.width,
          MAX_WIDTH_HEIGHT / img.height
        );
      }
      setScaleW(img.width * scale);
      setScaleH(img.height * scale);
    };
  }, [imgUrl]);

  return (
    <>
      <ImageContainer
        rotationAngle={rotationAngle}
        imgUrl={imgUrl}
        annotatorRef={annotatorRef}
        width={scaledW}
        height={scaledH}
      />
      <ToolBar handleOperation={handleOperation} />
    </>
  );
};
export default ImageAnnotator;
