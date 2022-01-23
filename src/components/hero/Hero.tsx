import tw, { styled } from "twin.macro";

import { BaseImage } from "~/components/base";

import { AssetFragment } from "~/types";

interface Props {
  image: AssetFragment[];
  text?: string;
}

const Wrapper = styled.section`
  ${tw`relative w-full`}

  height: 60vh;
`;

const Overlay = tw.div`absolute flex items-center justify-center top-0 left-0 w-full h-full z-1`;

const Text = tw.h1`text-2xl text-white font-athletics uppercase`;

export const Hero = ({ image, text }: Props) => {
  return (
    <Wrapper>
      <BaseImage fullH fullW {...image[0]} />

      <Overlay>
        <Text>{text}</Text>
      </Overlay>
    </Wrapper>
  );
};
