import { FC, Ref } from 'react';
import AnnotationLayer, { AnnotatorRef } from './AnnotationLayer';
import { MAX_WIDTH_HEIGHT } from '../../../constants';
interface Props {
  rotationAngle: number;
  imgUrl: string;
  annotatorRef: Ref<AnnotatorRef>;
  width: number;
  height: number;
}
const ImageContainer: FC<Props> = ({
  imgUrl,
  annotatorRef,
  rotationAngle,
  width,
  height,
}) => {
  return (
    <div
      style={{
        transform: `rotate(${rotationAngle}deg)`,
        transformOrigin: 'center center',
        height: `${MAX_WIDTH_HEIGHT}px`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: width + 'px',
          height: height + 'px',
        }}
      >
        <img src={imgUrl} width={width} height={height} alt="image-display" />
        <AnnotationLayer
          annotatorRef={annotatorRef}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};
export default ImageContainer;
