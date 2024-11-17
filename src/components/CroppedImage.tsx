import styled from '@emotion/styled';

interface CroppedImageProps {
  src: string;
}

const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
  border-radius: 100%;
`;

export default function CroppedImage({ src }: CroppedImageProps) {
  if (!src) {
    return null;
  }

  return <Image src={src} />;
}
