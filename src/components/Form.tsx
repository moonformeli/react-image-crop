import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { getCroppedImg, readFile } from '../utils';
import { getOrientation, Orientation } from 'get-orientation/browser';
import Image from './Image';
import { Button, Slider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Area, Point } from 'react-easy-crop';
import CroppedImage from './CroppedImage';

const ORIENTATION_TO_ANGLE: Record<number, number> = {
  '3': 180,
  '6': 90,
  '8': -90,
};

const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  padding: 40px;
  border: 1px solid red;
`;

const StyledSliderContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const StyledSlider = styled(Slider)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 0 16px;
`;

export default function Form() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [imageSrc, setImageSrc] = useState('');
  const [croppedImage, setCroppedImage] = useState('');

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files?.length) {
      return;
    }

    const file = files[0];
    let imageDataUrl = (await readFile(file)) as string;

    try {
      // apply rotation if needed
      // const orientation = await getOrientation(file);
      // const rotation = ORIENTATION_TO_ANGLE[orientation];
      // if (rotation) {
      //   imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      // }
    } catch (e) {
      console.warn('failed to detect the orientation');
    }

    setImageSrc(imageDataUrl);
  };

  const handleCompleteCrop = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        0
        // rotation
      );
      console.log('donee', { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangeZoom = (changedZoom: number) => {
    setZoom(changedZoom);
  };

  const handleChangeCrop = (location: Point) => {
    setCrop(location);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        {imageSrc && (
          <Image
            src={imageSrc}
            zoom={zoom}
            crop={crop}
            onChangeCrop={handleChangeCrop}
            onChangeZoom={handleChangeZoom}
            onCompleteCrop={handleCompleteCrop}
          />
        )}
        <StyledSliderContainer>
          <Typography variant='overline'>Zoom</Typography>
          <StyledSlider
            size='small'
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onChange={(e, zoom) => {
              if (!Array.isArray(zoom)) {
                handleChangeZoom(zoom);
              }
            }}
          />
        </StyledSliderContainer>
        <Button type='submit' variant='contained'>
          Complete
        </Button>
      </StyledForm>
      <CroppedImage src={croppedImage} />
    </>
  );
}
