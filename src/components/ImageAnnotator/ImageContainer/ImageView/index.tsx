import { FC } from 'react';

const ImageView: FC<{ imgUrl: string; width: number; height: number }> = ({
  imgUrl,
  width,
  height,
}) => {
  return <img src={imgUrl} width={width} height={height} />;
};
export default ImageView;
