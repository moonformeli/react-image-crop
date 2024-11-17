import styled from '@emotion/styled';
import Cropper, { Area, Point } from 'react-easy-crop';

interface ImageProps {
  src: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  onChangeCrop: (location: Point) => void;
  onChangeZoom: (zoom: number) => void;
  onCompleteCrop: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 500px;
`;

const StyledCropper = styled(Cropper)`
  width: 100%;
  height: 100%;
`;

export default function Image({
  src,
  zoom,
  crop,
  rotation,
  onChangeCrop,
  onChangeZoom,
  onCompleteCrop,
}: ImageProps) {
  return (
    <Container>
      <StyledCropper
        image={src}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        aspect={1}
        objectFit='cover'
        cropShape='round'
        onCropChange={onChangeCrop}
        onRotationChange={(r) => {
          console.log(r);
        }}
        onCropComplete={onCompleteCrop}
        onZoomChange={onChangeZoom}
      />
    </Container>
  );
}
