import { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

interface ImageProps {
  src: string;
}

export default function Image({ src }: ImageProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  return (
    <Cropper
      image={src}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={handleCropComplete}
      onZoomChange={setZoom}
    />
  );
}
