import Cropper, { Area, Point } from 'react-easy-crop';

interface ImageProps {
  src: string;
  crop: { x: number; y: number };
  zoom: number;
  onChangeCrop: (location: Point) => void;
  onChangeZoom: (zoom: number) => void;
  onCompleteCrop: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

export default function Image({
  src,
  zoom,
  crop,
  onChangeCrop,
  onChangeZoom,
  onCompleteCrop,
}: ImageProps) {
  return (
    <Cropper
      image={src}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      objectFit='cover'
      style={{
        containerStyle: {
          position: 'relative',
          width: 500,
          height: 500,
        },
      }}
      onCropChange={onChangeCrop}
      onCropComplete={onCompleteCrop}
      onZoomChange={onChangeZoom}
    />
  );
}
