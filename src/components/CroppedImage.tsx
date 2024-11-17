import styled from '@emotion/styled';

interface CroppedImageProps {
  src: string;
}

const Image = styled.img`
  object-fit: cover;
`;

export default function CroppedImage({ src }: CroppedImageProps) {
  if (!src) {
    return null;
  }

  return <Image src={src} />;
}
