import { useRef } from "react";
import tw, { styled } from "twin.macro";

import { BaseImage } from "~/components/base";
import { MaskOpacity } from "~/components/mask";
import { HEADER_HEIGHT } from "~/constants";

import { useParallax } from "~/hooks";

import { AssetFragment } from "~/types";

import { up } from "~/utils/screens";

interface Props {
  image: AssetFragment[];
  imageMobile?: AssetFragment[];
  text?: string;
}

const Wrapper = styled.section`
  ${tw`relative w-full overflow-hidden`}

  height: 60vh;
`;

const BaseImageDesktop = tw(BaseImage)`hidden lg:block`;

const BaseImageMobile = tw(BaseImage)`lg:hidden`;

const Overlay = styled.div`
  ${tw`absolute flex items-center justify-center top-0 left-0 w-full h-full z-1`}

  padding-top: ${HEADER_HEIGHT.min}px;

  ${up("lg")} {
    padding-top: ${HEADER_HEIGHT.max}px;
  }
`;

const Text = styled.h1`
  ${tw`w-full text-2xl text-white text-center font-athletics uppercase`}

  ${up("lg")} {
    max-width: 75rem;
  }
`;

export const Hero = ({ image, imageMobile, text }: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useParallax(imageRef);

  return (
    <Wrapper>
      <BaseImageDesktop ref={imageRef} fullH fullW {...image[0]} />

      <BaseImageMobile fullH fullW {...(imageMobile?.[0] || image[0])} />

      <Overlay>
        <MaskOpacity>
          <Text>{text}</Text>
        </MaskOpacity>
      </Overlay>
    </Wrapper>
  );
};
