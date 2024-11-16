import { ChangeEventHandler, useState } from 'react';
import { readFile } from '../utils';
import { getOrientation, Orientation } from 'get-orientation/browser';
import Image from './Image';

const ORIENTATION_TO_ANGLE: Record<number, number> = {
  '3': 180,
  '6': 90,
  '8': -90,
};

export default function Form() {
  const [imageSrc, setImageSrc] = useState('');

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    e.preventDefault();

    const files = e.target.files;
    console.log(files);

    if (!files?.length) {
      return;
    }

    const file = files[0];
    let imageDataUrl = (await readFile(file)) as string;
    console.log(`imageDataUrl`, imageDataUrl);

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

  return (
    <form>
      <input type='file' onChange={handleFileChange} />
      {imageSrc && <Image src={imageSrc} />}
    </form>
  );
}
