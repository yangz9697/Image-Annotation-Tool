import { ReactNode, FC } from 'react';
import './index.scss';

interface Props {
  title?: string;
  show: boolean;
  children: ReactNode;
  onClose: () => void;
}
const ImageViewerPopup: FC<Props> = ({ title, show, children, onClose }) => {
  if (!show) return null;
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="contener-header">
          <span>{title}</span>
          <span className="header-close" onClick={onClose}>
            X
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};
export default ImageViewerPopup;
