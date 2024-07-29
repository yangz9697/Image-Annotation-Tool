import { useState } from 'react';
import Popup from './components/Popup';
import './App.css';
import ImageAnnotator from './components/ImageAnnotator';

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div>
        <h3>Upload and Click Image to make annotations</h3>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Uploaded"
            style={{ maxWidth: '200px' }}
            onClick={() => setShowPopup(true)}
          />
        )}
        <Popup
          title="Image Viewer"
          show={showPopup}
          onClose={() => setShowPopup(false)}
        >
          <ImageAnnotator imgUrl={imageSrc || ''} />
        </Popup>
      </div>
    </>
  );
}

export default App;
