import { FC, Ref, useEffect, useState } from 'react';
import AnnotationLayer, { AnnotatorRef } from './AnnotationLayer';
import ImageView from './ImageView';
interface Props {
  rotationAngle: number;
  imgUrl: string;
  annotatorRef: Ref<AnnotatorRef>;
  maxWidth: number;
  maxHeight: number;
}
const ImageContainer: FC<Props> = ({
  imgUrl,
  annotatorRef,
  rotationAngle,
  maxWidth,
  maxHeight,
}) => {
  const [scaledW, setScaleW] = useState(0);
  const [scaledH, setScaleH] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      let scale = 1;
      if (img.width >= maxWidth || img.height >= maxHeight) {
        if (img.height < maxHeight) scale = maxWidth / img.width;
        else if (img.width < maxWidth) scale = maxHeight / img.height;
        else {
          scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        }
      } else {
        scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      }
      setScaleW(img.width * scale);
      setScaleH(img.height * scale);
    };
  }, [imgUrl, maxWidth, maxHeight]);

  return (
    <div
      style={{
        transform: `rotate(${rotationAngle}deg)`,
        transformOrigin: 'center center',
        height: `${maxHeight}px`,
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
          width: scaledW + 'px',
          height: scaledH + 'px',
        }}
      >
        <ImageView imgUrl={imgUrl} width={scaledW} height={scaledH} />
        <AnnotationLayer
          annotatorRef={annotatorRef}
          width={scaledW}
          height={scaledH}
        />
      </div>
    </div>
  );
};
export default ImageContainer;
